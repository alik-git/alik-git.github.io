# Guard the temporary mitigation for CVE-2026-53727: the legacy CDN downloader
# is not activated, so its vulnerable transitive parser must not load at boot.
require 'jekyll'

Jekyll::PluginManager.require_from_bundler
Jekyll::Site.new(Jekyll.configuration)
parser_loaded = $LOADED_FEATURES.any? { |path| path.include?('/css_parser') }
parser_version = Gem.loaded_specs['css_parser']&.version
abort 'Vulnerable CSS parser was activated' if parser_loaded && parser_version && parser_version < Gem::Version.new('3.0.0')
puts 'Runtime starts without activating the vulnerable legacy CSS parser.'
