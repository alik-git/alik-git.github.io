# Agent Guidelines for Ali's Website

## Ali's Instructions for Ali's Website

- This repository is Ali's personal website built on top of `al-folio`.
- Prefer editing content files first:
  - `_pages/`, `_posts/`, `_projects/`, `_news/`, `_bibliography/`, `assets/img/`
- Avoid unnecessary edits to theme internals:
  - `_layouts/`, `_includes/`, `_sass/`, `.github/workflows/`
- Preserve `CNAME` unless explicitly asked to change domain settings.
- Keep `_config.yml` `url` and `baseurl` consistent with the real deployment target.
- Do not manually edit the `gh-pages` branch.
- When syncing with upstream `al-folio`, prefer a migration or selective porting approach rather than rebasing old history.
- Prefer current upstream `al-folio` defaults over custom overrides unless a customization is clearly still needed.
- When giving a local preview URL, keep the site running in a separate persistent terminal session.
- Do not give a local preview URL unless the local server is active and reachable.

## Current runtime and validation

- This site uses the released al-folio v1.2 plugin contract, with `theme: al_folio_core`. Keep plugin pins in `Gemfile` and activation in `_config.yml` aligned.
- Default layouts, Sass, JavaScript, search, citations and Distill runtime come from gems. Do not copy old theme trees back into the site.
- Intentional local overrides preserve the second profile photo, contact placement, direct navigation links, colors and project selector. Review their upstream diff after dependency changes; acknowledge reviewed changes in `.al-folio-overrides.yml`.
- Bootstrap compatibility is enabled for existing content. Check desktop/mobile navigation and publication buttons when changing it.
- Build locally with Ruby 3.3.12 and ImageMagick; Docker is optional and is not used by production deployment. Current commands take precedence over inherited Docker-only instructions.
- Install Python dependencies from `requirements-build.txt` with `--require-hashes`; use `requirements-citations.txt` only for citation updates. Never replace the lockfiles with an unpinned install.
- CDN library URLs contain explicit version pins and matching integrity hashes. The legacy downloader is not activated; its css_parser dependency remains indirectly packaged by al_img_tools. `test/runtime_smoke.rb` guards against activating the vulnerable parser. Do not reintroduce the downloader or {{version}} URL placeholders.
- Production builds run with `JEKYLL_ENV=production`. Do not run PurgeCSS on the prebuilt v1 Tailwind runtime.
- Automatic deployment occurs only from `master` (or after its citation workflow). PR and reusable workflow builds cannot publish. Preserve the `gh-pages` source and `CNAME`.
- Before committing: run the formatter, build, upgrade/override checks, generated-site checks, and browser tests. Preserve unrelated content formatting.

```bash
bundle install
npm ci
python3 -m pip install --require-hashes -r requirements-build.txt
npx --no-install prettier . --write
bundle exec al-folio upgrade audit
bundle exec al-folio upgrade overrides audit --fail-on-stale
JEKYLL_ENV=production bundle exec jekyll build
python3 bin/check_site.py _site
npx --no-install playwright install chromium
npm run test:site
```

See the upstream [architecture](https://github.com/alshedivat/al-folio/blob/v1.2/docs/ARCHITECTURE.md) and [migration skill](https://github.com/alshedivat/al-folio/blob/v1.2/.agents/skills/al-folio-v1-migration/SKILL.md).
