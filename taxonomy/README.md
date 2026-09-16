<div align="center">

![ThreatCode Prompt Injection Taxonomy](docs/pitax-banner.png)

**An open, interactive classification of prompt injection and LLM attacks, built for cybersecurity auditors and penetration testers moving into AI red teaming.**

</div>

## The taxonomy is interactive

The ThreatCode Prompt Injection Taxonomy lives as an interactive, searchable web app. The two deployed versions below are the main, always-current copies. They are kept in parity and are the canonical reference:

- **GitHub Pages:** https://threatcode.github.io/resources/taxonomy/

Every entry has a citable reference code (for example `PIT-I-01`), the alternate names other frameworks use for the same attack (OWASP, MITRE ATLAS, NIST, MLCommons, garak, and others), a delivery tag (direct, indirect, or either), and example prompts. White-box attacks that need the model weights are flagged `LOCAL` so testers know they do not apply to a black-box API or chatbot.

## Structure

The taxonomy is organized into four pillars (172 nodes total):

| Pillar | Code | What it answers | Count |
|---|---|---|---|
| Intents | `PIT-I-NN` | What is the attacker trying to achieve? | 27 |
| Techniques | `PIT-T-NN` | What method manipulates the model? | 70 |
| Evasions | `PIT-E-NN` | How is it obfuscated past filters? | 63 |
| Inputs | `PIT-N-NN` | Where does the payload enter? | 12 |

## Building on the data

If you want to analyze, extend, or build tools on top of the taxonomy, use the data file:

- **`docs/data/taxonomy.json`** is plain JSON: one object with `intents`, `techniques`, `evasions`, and `inputs` arrays. Each node carries `code`, `title`, `description`, `aliases`, `ideas`, and `examples`. It parses cleanly in any language and is easy for LLMs to consume directly.

`docs/data/taxonomy.js` is the same data wrapped for the web app to load; treat `taxonomy.json` as the source for programmatic use.

> **Note on format.** Versions through 1.0 shipped the taxonomy as one Markdown file per node. From 1.6 onward the taxonomy is maintained as the interactive site plus the single JSON data file, and the old per-node Markdown folders have been retired. To build on the data, use `taxonomy.json`.

## Contributing

This GitHub repository is the canonical source. Community input is welcome: open an issue, or submit a pull request editing `docs/data/taxonomy.js` (and `taxonomy.json`). Reviewed changes are merged here and then deployed to the GitHub Pages site and the website.

## Changelog

See [CHANGELOG.md](CHANGELOG.md). The current release is **v1.6.1**; **v1.6** was a large expansion and rebuild.

## License and attribution

Licensed under [Creative Commons Attribution 4.0 International (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/). You may use, share, and build upon this taxonomy, including commercially, provided you give attribution.