class String
  def parsed_markdown
    MarkdownPipeline.new.call(self)
  end
end
