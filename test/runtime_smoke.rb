# Reject the legacy downloader and CSS parser anywhere in the resolved bundle,
# including dependencies that are installed but never loaded by Jekyll.
require 'bundler'
require 'jekyll'
require 'tmpdir'
require 'fileutils'

forbidden_dependencies = %w[css_parser jekyll-3rd-party-libraries]
locked_names = Bundler.locked_gems.specs.map(&:name)
present = forbidden_dependencies & locked_names
abort "Legacy downloader dependencies were reintroduced: #{present.join(', ')}" unless present.empty?

Jekyll::PluginManager.require_from_bundler
site = Jekyll::Site.new(Jekyll.configuration)

# Exercise the rendered URL: local CSS changes must invalidate browser caches.
Dir.mktmpdir('site-styles') do |source|
  FileUtils.mkdir_p(File.join(source, 'assets/css'))
  stylesheet = File.join(source, 'assets/css/main.scss')
  File.write(stylesheet, '.profile { color: blue; }')
  test_site = Jekyll::Site.new(site.config.merge('source' => source, 'destination' => File.join(source, '_site')))
  template = Liquid::Template.parse("{{ '/assets/css/main.css' | bust_css_cache }}")
  before = template.render!({}, registers: { site: test_site }, strict_filters: true)
  unchanged = template.render!({}, registers: { site: test_site }, strict_filters: true)
  abort 'Stylesheet cache version is not deterministic.' unless before == unchanged
  File.write(stylesheet, '.profile { color: red; }')
  after = template.render!({}, registers: { site: test_site }, strict_filters: true)
  abort 'Local CSS changes do not invalidate cached styles.' if before == after
end

puts 'Runtime starts without the legacy downloader or CSS parser in its bundle.'
puts 'Local stylesheet changes invalidate browser caches.'
