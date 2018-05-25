class MarkdownPipeline < Banzai::Pipeline
  def initialize(options = {})
    Rails.logger.info 'MarkdownPipeline#initialize'

    super(
      # As Markdown
      FrontmatterFilter,
      PHPInlinerFilter,
      InlineEscapeFilter,
      BlockEscapeFilter,
      ScreenshotFilter,
      AnchorFilter,
      AudioFilter,
      TooltipFilter,
      CollapsibleFilter,
      TabFilter.new(options),
      BuildingBlocksFilter,
      CodeFilter,
      BuildingBlockFilter,
      IndentFilter,
      ModalFilter,
      JsSequenceDiagramFilter,
      PartialFilter.new(options),
      TechioFilter,
      TutorialsFilter,
      LanguageFilter,
      ColumnsFilter,
      MarkdownFilter,

      # As HTML
      UserPersonalizationFilter.new(options),
      HeadingFilter,
      LabelFilter,
      BreakFilter,
      UnfreezeFilter,
      IconFilter,
      ExternalLinkFilter
    )
  end
end
