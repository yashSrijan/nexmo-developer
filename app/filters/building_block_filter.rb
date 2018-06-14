class BuildingBlockFilter < Banzai::Filter
  def call(input)
    input.gsub(/```single_building_block(.+?)```/m) do |_s|
      config = YAML.safe_load($1)

      lexer = language_to_lexer(config['language'])

      # Read the client
      if config['client']
          highlighted_client_source = generate_code_block(config['client'], config['unindent'])
      end

      # Read the code
      highlighted_code_source = generate_code_block(config['code'], config['unindent'])

      dependency_html = ''
      if config['dependencies']
          dependency_html = generate_dependencies(lexer.tag, config['dependencies'])
      end

      client_html = ""
      if highlighted_client_source
      client_html = <<~HEREDOC
        <p>Create a file named <code>#{config['file_name']}</code> and initialize the client:</p>
        <pre class="highlight #{lexer.tag}"><code>#{highlighted_client_source}</code></pre>
      HEREDOC
      end

      code_html = <<~HEREDOC
        <p>Add the following to <code>#{config['file_name']}</code>:</p>
        <pre class="highlight #{lexer.tag}"><code>#{highlighted_code_source}</code></pre>
      HEREDOC

      run_html = generate_run_command(config['run_command'], config['file_name'])

      dependency_html + client_html + code_html + run_html
    end
  end

  private

  def highlight(source, lexer)
    formatter = Rouge::Formatters::HTML.new
    formatter.format(lexer.lex(source))
  end

  def language_to_lexer_name(language)
    if language_configuration['languages'][language]
      language_configuration['languages'][language]['lexer']
    else
      language
    end
  end

  def language_to_lexer(language)
    language = language_to_lexer_name(language)
    return Rouge::Lexers::PHP.new({ start_inline: true }) if language == 'php'
    Rouge::Lexer.find(language.downcase) || Rouge::Lexer.find('text')
  end

  def language_configuration
    @language_configuration ||= YAML.load_file("#{Rails.root}/config/code_languages.yml")
  end

  def generate_code_block(input, unindent)
      # TODO: Remove the n/a check by updating YAML definitions
      filename = "#{Rails.root}/#{input['source']}"
      if input && input['source'] != 'n/a'
          raise "BuildingBlockFilter - Could not load #{filename}" unless File.exist?(filename)

          code = File.read(filename)
          language = File.extname(filename)[1..-1]
          lexer = language_to_lexer(language)

          total_lines = code.lines.count

          # Minus one since lines are not zero-indexed
          from_line = (input['from_line'] || 1) - 1
          to_line = (input['to_line'] || total_lines) - 1

          puts code
          code = code.lines[from_line..to_line].join
          code.unindent! if unindent

          highlight(code, lexer)
      end
  end

  def generate_dependencies(language, dependencies)
      dep_managers = {
          "javascript" => lambda { |deps| "$ npm install #{dependencies.join(' ')}" },
          "csharp" => lambda { |deps| "$ Install-Package #{dependencies.join(' ')}" },
          "php" => lambda { |deps| "$ composer require #{dependencies.join(' ')}" },
          "python" => lambda { |deps| "$ pip install #{dependencies.join(' ')}" },
          "ruby" => lambda { |deps| "$ gem install #{dependencies.join(' ')}" },
          "java" => lambda { |deps| 
              {

                'text' => 'Add the following to <code>build.gradle</code>:',
                'code' => dependencies.map { |d| "compile '#{d}'" }.join("<br />")
              }
          },
      }

      deps = dep_managers[language].call(dependencies)
      deps = {'code' => deps} unless deps['code']
      deps['text'] = 'Install the required dependencies:' unless deps['text']
      dependency_html = <<~HEREDOC
          <p>#{deps['text']}</p>
          <pre class="highlight bash"><code>#{deps['code']}</code></pre>
      HEREDOC
  end

  def generate_run_command(command, filename)
      if command == 'java-ide'
          command = <<~HEREDOC
## Run your code
We can use the `application` plugin for Gradle to simplify the running of our application.

Update your `build.gradle` with the following:

```groovy
apply plugin: 'application'
mainClassName = project.hasProperty('main') ? project.getProperty('main') : ''
```

Run the following command to execute your application:

```sh
gradle run -Pmain=com.nexmo.quickstart.voice.#{filename.gsub(".java","")}
```
HEREDOC
      else
      command = <<~HEREDOC
        ## Run your code

        Save this file to your machine and run it:

        <pre class="highlight bash"><code>$ #{command}</code></pre>

      HEREDOC
      end

      command
  end
end
