# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Initial project structure with two sub-projects: `context/` and `taxonomy/`
- `context/` — AI Code Security Anti-Patterns (breadth + depth)
- `taxonomy/` — Prompt Injection Taxonomy (interactive web app + JSON data)
- Root-level project documentation

## [1.0.0] - 2026-01-18

### Added
- **context/** module with:
  - `ANTI_PATTERNS_BREADTH.md` — 25+ security anti-patterns (~65K tokens)
  - `ANTI_PATTERNS_DEPTH.md` — Deep dive on 7 critical patterns (~100K tokens)
  - `index.html` — Standalone interactive landing page
  - `README.md` — Module overview and usage guide
- **taxonomy/** module with:
  - `docs/index.html` — Interactive taxonomy web app
  - `docs/styles.css` — Application stylesheet
  - `docs/app.js` — Application JavaScript
  - `docs/data/taxonomy.json` — Primary taxonomy data (172 nodes)
  - `docs/data/taxonomy.js` — Web app data wrapper
  - `README.md` — Module overview
  - `CHANGELOG.md` — Version history
  - `.nojekyll` — GitHub Pages configuration

### Changed
- Taxonomy maintained as interactive site plus single JSON data file from v1.6
- Old per-node Markdown folders retired

---

See [GitHub Releases](https://github.com/threatcode/resources/releases) for full release history.
