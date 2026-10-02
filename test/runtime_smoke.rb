# Reject the legacy downloader and CSS parser anywhere in the resolved bundle,
# including dependencies that are installed but never loaded by Jekyll.
require 'bundler'
require 'jekyll'

forbidden_dependencies = %w[css_parser jekyll-3rd-party-libraries]
locked_names = Bundler.locked_gems.specs.map(&:name)
present = forbidden_dependencies & locked_names
abort "Legacy downloader dependencies were reintroduced: #{present.join(', ')}" unless present.empty?

Jekyll::PluginManager.require_from_bundler
Jekyll::Site.new(Jekyll.configuration)
puts 'Runtime starts without the legacy downloader or CSS parser in its bundle.'
