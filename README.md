# Ali's Website

This is the repo for Ali's website. You should find the website [here](https://www.alihkw.com).

It was made using the [al-folio theme](https://github.com/alshedivat/al-folio). Learn more via their [README](https://github.com/alshedivat/al-folio/blob/main/README.md).

## Local Development
- This repo is typically run locally with `rbenv` Ruby `3.2.10`.
- Install ImageMagick so responsive image generation works:
  - `sudo apt-get update && sudo apt-get install -y imagemagick`
- Install Ruby dependencies:
  - `RBENV_VERSION=3.2.10 rbenv exec bundle install`
- Run the local server:
  - `RBENV_VERSION=3.2.10 rbenv exec bundle exec jekyll serve --host 127.0.0.1 --port 4001 --livereload --livereload-port 35730`

## Fast Prose Preview
- For quick prose-only editing, a temporary local override can be used to speed up rebuilds.
- The idea is to disable ImageMagick and temporarily exclude the notebook-heavy `visuallearn` post from the local preview only.
- This is a local convenience workflow, not a committed site setting, and should be reverted when you want the local preview to match production behavior again.

## Customizations
- Replaced the stock demo pages, posts, projects, and news items with Ali's own content.
- Uses the custom domain `https://www.alihkw.com` with GitHub Actions deployment from `master`.
- Keeps `cv.pdf` as the real CV target and links `cv` and `podcast` directly instead of using the old custom redirect page.
- Uses custom light/dark accent colors, `800px` content width, and shortened footer text.
- The about page has two profile images and shows contact links below the bio and above the news section.
- The blog page keeps the navbar label `blog`, shows the page heading `ali's blog`, and generates the top tag list automatically from real post tags.
- Google Scholar citation badges are driven by the generated `_data/citations.yml` file for Ali's Scholar profile.
