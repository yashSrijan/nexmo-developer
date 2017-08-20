class CodeExampleAuditor::Example
  attr_reader :documents

  def initialize(config)
    @config = config
    @documents = []
  end

  def source
    @config['source']
  end

  def add_document(document)
    @documents << document
    @documents.uniq!
  end

  def missing_languages
    CodeExampleAuditor.all_languages - languages
  end

  def languages
    Dir.glob("#{source}/*").map { |s| File.basename(s) }
  end
end
