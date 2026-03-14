# Dev Log

## 2026-03-14 15:53 - Repo cloned
Cloned `alik-git/alik-git.github.io` into the local workspace.

## 2026-03-14 16:04 - Folder naming fixed
Renamed the local repo folder from `webstuff` to `alik-git.github.io` so it uses the default clone-style repo name inside `website_stuff`.

## 2026-03-14 15:56 - Upstream and deploy audit
Audited the repo against `alshedivat/al-folio`, confirmed auto-deploy is already working (`master` push -> deploy workflow -> `gh-pages` publish), and noted key follow-ups: update `_config.yml` `url` to custom domain and refresh deploy workflow paths/toolchain to match current upstream best practices.

## 2026-03-14 16:05 - Repo docs initialized
Added repo-local `AGENTS.md` and initialized this `dev_log.md`.

## 2026-03-14 16:16 - Full site and best-practice audit
The site is live and auto-deploy is working, but the repo is substantially behind upstream and has a few high-impact config/workflow gaps.
Details:
- Live checks: `www.alihkw.com` and key pages returned `200`; root/non-www and `alik-git.github.io` redirect correctly.
- Deploy checks: push to `master` triggers `Deploy site`, updates `gh-pages`, and publishes successfully via Pages.
- Upstream drift: base matches upstream state from 2024-02-19; upstream has advanced significantly (`main` default, latest release `v0.16.3`).
- Best-practice gaps: `_config.yml` `url` still points to `https://alik-git.github.io`, so canonical/OG URLs do not match the custom domain.
- Best-practice gaps: `.github/workflows/deploy.yml` trigger paths/toolchain are older than upstream and may miss some valid change types.
- Account settings confirmed by user: Pages source branch is `gh-pages`; Actions workflow permissions are `Read and write`.

## 2026-03-14 16:20 - Canonical URL fixed
Updated `_config.yml` so the site `url` matches the real custom domain `https://www.alihkw.com`, which should fix canonical and Open Graph URLs on the next deploy.

## 2026-03-14 16:28 - Deploy workflow updated
Updated `.github/workflows/deploy.yml` to match current upstream trigger coverage and build toolchain so real site changes in `_sass`, `_scripts`, bibliography files, and gem files reliably trigger deploys.

## 2026-03-14 16:31 - Workflow cache fix
Added `requirements.txt` with `nbconvert` so the new `actions/setup-python` cache step has the dependency file it expects.

## 2026-03-14 16:36 - Gem and plugin stack updated
Updated `Gemfile` and the plugin-related `_config.yml` settings to match the current upstream build stack more closely without changing site content.

## 2026-03-14 16:40 - Plugin compatibility fix
Removed `jekyll-3rd-party-libraries` after confirming the repo still uses hardcoded third-party asset references and does not define the `third_party_libraries` config block that plugin expects.

## 2026-03-14 17:01 - Local preview setup
Set up native local preview with `rbenv` Ruby `3.2.10`; to complete responsive image generation locally, run `sudo apt-get update && sudo apt-get install -y imagemagick`.

## 2026-03-14 17:11 - Archive layout fixed
Added the missing shared `archive` layout so blog year/tag archive pages match the current upstream archive system and stop warning during local builds.
