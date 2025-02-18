source "https://rubygems.org"

# Use GitHub Pages' managed Jekyll
gem "github-pages", group: :jekyll_plugins

# Jekyll Plugins
group :jekyll_plugins do
  gem "jekyll-feed", "~> 0.6"
  gem "jekyll-include-cache"
  gem "jekyll-read-time"
  gem "jekyll-lunr-js-search", require: false
  gem "jekyll-paginate"
  gem "minimal-mistakes-jekyll"
end

# Additional Dependencies
gem "webrick", "~> 1.8"
gem "kramdown-parser-gfm"

# Windows Fixes
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end

# JRuby-Specific Fix
gem "http_parser.rb", "~> 0.6.0", platforms: [:jruby]