# Ali's Website

This is the repo for Ali's website. You should find the website [here](https://www.alihkw.com).

It was made using the [al-folio theme](https://github.com/alshedivat/al-folio). Learn more via their [README](https://github.com/alshedivat/al-folio/blob/main/README.md).

## Local Development

The site uses the released al-folio v1.2 plugin runtime. Install Ruby 3.3.12, ImageMagick and Node.js, then use an isolated Python environment:

```bash
bundle install
npm ci
python3 -m venv .venv
source .venv/bin/activate
python -m pip install --require-hashes -r requirements-build.txt
bundle exec jekyll serve --host 127.0.0.1 --port 4001
```

Production validation uses `JEKYLL_ENV=production bundle exec jekyll build`, `python3 bin/check_site.py _site` and `npm run test:site`. See `AGENTS.md` for upgrade and browser setup commands.

## Updates and deployment

Pushes to `master` automatically publish checked builds to the existing `gh-pages` branch and `www.alihkw.com`. PR builds are previews and cannot publish. Google Scholar citation updates retain their Monday/Wednesday/Friday schedule and trigger deployment when successful.

GitHub currently marks the scheduled Scholar and CodeQL workflows inactive, and the standalone formatter workflow manually disabled. Re-enable the scheduled workflows when activating this migration. Formatting is also checked inside every deployment build.

Dependabot proposes monthly Ruby, Node, Python and GitHub Actions updates. Plugin versions are exact pins: upgrade the pins and lockfile together, then review `bundle exec al-folio upgrade overrides audit --fail-on-stale` before accepting any changed override. Theme/runtime fixes come from the plugin gems; follow [upstream release notes](https://github.com/alshedivat/al-folio/releases) for new features and starter wiring changes.

The local overrides preserve the two-photo about layout, contact placement, direct CV/podcast navigation, blue accents and project card selector. Bootstrap compatibility currently preserves existing page markup; upstream plans to deprecate it after v1.2, so review that before a later major migration.

Docker publishing and upstream-demo badge/TOC workflows are removed. Local Docker development files remain available, but are not part of production deployment and were not validated in this migration.

## Known dependency limitation

`al_img_tools` 1.0.3 indirectly packages `css_parser` 1.22.0, which has advisory CVE-2026-53727. The downloader is not activated and CDN URLs are explicit; a startup check confirms the vulnerable parser is not loaded. An upstream dependency fix or a maintained plugin patch is still needed to remove the advisory from the lockfile. Ruby dependency audit therefore reports this one dormant build dependency; Node and Python dependency audits are clean.

The manual accessibility check reports the same pre-existing homepage findings as the original site; accessibility cleanup is separate from this migration.

## Customizations

- Replaced the stock demo pages, posts, projects, and news items with Ali's own content.
- Uses the custom domain `https://www.alihkw.com` with GitHub Actions deployment from `master`.
- Keeps `cv.pdf` as the real CV target and links `cv` and `podcast` directly instead of using the old custom redirect page.
- Uses custom light/dark accent colors, `800px` content width, and shortened footer text.
- The about page has two profile images and shows contact links below the bio and above the news section.
- The blog page keeps the navbar label `blog`, shows the page heading `ali's blog`, and generates the top tag list automatically from real post tags.
- Google Scholar citation badges are driven by the generated `_data/citations.yml` file for Ali's Scholar profile.
