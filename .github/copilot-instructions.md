# Website build and deployment

Read `AGENTS.md` first. This is Ali's customized al-folio v1.2 site, not the upstream template-maintenance repository. Site-specific build instructions in `AGENTS.md` supersede older Docker-only examples in inherited instruction files.

Use Ruby 3.3.12, ImageMagick, a Python virtual environment with the hashed build requirements, and `npm ci`. Run `JEKYLL_ENV=production bundle exec jekyll build`, `python3 bin/check_site.py _site`, and `npm run test:site`.

Keep `_config.yml` at `url: https://www.alihkw.com` and an empty `baseurl`. The real CV is `cv.pdf`; it is not generated from example RenderCV data. The unpublished visuallearn post must remain unpublished. Preserve content, bibliography, news, projects, social links, and images.

Layouts and assets come from pinned Ruby gems. Keep only intentional local overrides and review `.al-folio-overrides.yml` on dependency updates. Do not reintroduce `_scripts`, copied citation plugins, or legacy search/Distill assets.

The deployment workflow builds and checks with a read-only token, then publishes the verified artifact in a separate job with write access. It keeps GitHub Pages on `gh-pages` and deploys pushes to `master`. PRs never deploy. Citation fetching also runs read-only; a separate job commits only `_data/citations.yml`, and successful master citation runs trigger deployment.

GitHub Actions must use full commit SHA pins. Use locked Ruby/Node dependencies and hashed Python requirements. Do not run unpinned remote scripts or globally install build tools at runtime.
