class BuildingBlockFilter < Banzai::Filter
  def call(input)
    input.gsub(/```building-block(.+?)```/m) do |_s|
      config = YAML.safe_load($1)

      if config['config']
        configs = YAML.load_file("#{Rails.root}/config/code_examples.yml")
        config = config['config'].split('.').inject(configs) { |h, k| h[k] }
      end

      code = File.read("#{Rails.root}/#{config['source']}")
      language = File.extname("#{Rails.root}/#{config['source']}")[1..-1]
      lexer = language_to_lexer(language)

      total_lines = code.lines.count

      # Minus one since lines are not zero-indexed
      from_line = (config['from_line'] || 1) - 1
      to_line = (config['to_line'] || total_lines) - 1

      code = code.lines[from_line..to_line].join
      code.unindent! if config['unindent']

      highlighted_source = highlight(code, lexer)

      line_numbers = (1..total_lines).map do |line_number|
        <<~HEREDOC
          <span class="focus__lines__line">#{line_number}</span>
        HEREDOC
      end

      dep_managers = {
        "javascript" => "npm install",
        "php" => "composer require"
      }

      dependency_html = ''
      if config['dependencies']
          dependencies = config['dependencies'].join(" ")

          dependency_html = <<~HEREDOC
          <p>Install the required dependencies:</p>
          <pre class="highlight bash"><code>$ #{dep_managers[lexer.tag]} #{dependencies}</code></pre>
          HEREDOC
      end

      code_html = <<~HEREDOC
        <p>Create <code>#{config['file_name']}</code> with the following contents:</p>
        <pre class="highlight #{lexer.tag}"><code>#{highlighted_source}</code></pre>
      HEREDOC

      run_html = <<~HEREDOC
        ## Run your server

        Save this file to your machine and run it:

        <pre class="highlight bash"><code>$ #{config['run_command']}</code></pre>

      HEREDOC

      dependency_html + code_html + run_html
    end
  end

  private

  def highlight(source, lexer)
    formatter = Rouge::Formatters::HTML.new
    formatter.format(lexer.lex(source))
  end

  def language_to_lexer_name(language)
    if language_configuration[language]
      language_configuration[language]['lexer']
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
end
