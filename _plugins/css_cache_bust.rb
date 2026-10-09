require 'digest/md5'

# The theme versions its Sass partials; also version our local stylesheet.
module SiteStylesheetCacheBust
  # Refresh cached CSS when site-owned styles change, preserving the theme digest.
  def bust_css_cache(file_name)
    stylesheet = @context.registers[:site].in_source_dir('assets/css/main.scss')
    "#{super}-#{Digest::MD5.file(stylesheet).hexdigest}"
  end
end

Jekyll::CacheBust.prepend(SiteStylesheetCacheBust)
