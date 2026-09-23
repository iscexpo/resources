# ThreatCode Resources

A collection of open security research resources for AI/LLM safety, built by [ThreatCode Information Security](https://threatcode.github.io).

## Projects

### [resources/context](/context) — AI Code Security Anti-Patterns

Comprehensive security anti-pattern references distilled from 150+ sources to help LLMs generate safer code. Covers 25+ patterns across breadth and depth versions.

- [ANTI_PATTERNS_BREADTH.md](/context/ANTI_PATTERNS_BREADTH.md) — ~65K tokens, 25+ patterns
- [ANTI_PATTERNS_DEPTH.md](/context/ANTI_PATTERNS_DEPTH.md) — ~100K tokens, 7 critical patterns
- [Interactive Website](/context/index.html)

### [resources/taxonomy](/taxonomy) — Prompt Injection Taxonomy

An interactive, searchable classification of prompt injection and LLM attacks (172 nodes across 4 pillars), built for cybersecurity auditors and penetration testers moving into AI red teaming.

- [Interactive Website](https://threatcode.github.io/resources/taxonomy/)
- [JSON Data](/taxonomy/docs/data/taxonomy.json)
- [GitHub Pages](https://threatcode.github.io/resources/taxonomy/)

## Quick Stats

| Metric | Value |
|--------|-------|
| Sources Analyzed | 150+ |
| Anti-Patterns Covered | 25+ |
| Taxonomy Nodes | 172 |
| CVEs Documented | 40+ |
| License | CC BY 4.0 |

## Structure

```
resources/
├── context/          # AI Code Security Anti-Patterns
│   ├── README.md
│   ├── index.html    # Standalone landing page
│   ├── ANTI_PATTERNS_BREADTH.md
│   └── ANTI_PATTERNS_DEPTH.md
└── taxonomy/         # Prompt Injection Taxonomy
    ├── README.md
    ├── CHANGELOG.md
    ├── docs/
    │   ├── index.html
    │   ├── styles.css
    │   ├── app.js
    │   └── data/
    │       ├── taxonomy.json
    │       └── taxonomy.js
```

## Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/threatcode/resources.git
   ```

2. **View the websites** — Open `context/index.html` or `taxonomy/docs/index.html` in a browser, or deploy to GitHub Pages.

3. **Use the data** — Include the markdown files in your AI system prompt, or use the JSON data programmatically.

## Contributing

We welcome contributions! See [CONTRIBUTING.md](/CONTRIBUTING.md) for guidelines.

## License

This work is licensed under the [Creative Commons Attribution 4.0 International (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/) license.

## Research Sources

This project synthesizes findings from 150+ sources across CVE databases, academic research, security blogs, developer forums, and GitHub security advisories.

