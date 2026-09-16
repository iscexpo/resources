# Contributing to ThreatCode Resources

Thank you for your interest in contributing! This project is open source under the CC BY 4.0 license.

## How to Contribute

### Reporting Issues

- Use the [GitHub Issues](https://github.com/threatcode/resources/issues) page
- Include relevant details: patterns, sources, or corrections

### Pull Requests

1. **Fork** the repository
2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes**
   - For `context/`: Add anti-patterns to `ANTI_PATTERNS_BREADTH.md` or `ANTI_PATTERNS_DEPTH.md` using the existing pseudocode format
   - For `taxonomy/`: Edit `docs/data/taxonomy.json` and `docs/data/taxonomy.js`
   - Keep pseudocode consistent with existing examples
4. **Commit** with a clear message
   ```bash
   git commit -m "Add: brief description of change"
   ```
5. **Push** and open a Pull Request

### Contribution Guidelines

#### Adding Anti-Patterns (context/)

- Follow the existing structure: BAD example, GOOD example, Edge Cases, Common Mistakes, Detection Hints, Security Checklist
- Include CWE references
- Use pseudocode format consistent with existing entries
- Provide real statistics and sources
- Update the ranking table if adding a high-priority pattern

#### Adding Taxonomy Entries (taxonomy/)

- Edit `docs/data/taxonomy.json` — this is the source of truth
- Each entry must have: `code`, `title`, `description`, `aliases`, `ideas`, `examples`
- Include `delivery` field: `"direct"`, `"indirect"`, or omitted for either
- Set `local: true` for white-box attacks requiring model weights
- Regenerate `taxonomy.js` after editing `taxonomy.json`
- Maintain alphabetical ordering within each category

#### Documentation

- Update relevant `README.md` files
- Update the `CHANGELOG.md`
- Keep statistics current (source counts, pattern counts, etc.)

### Code Style

- Pseudocode comments use `//` for single-line and `/* */` for blocks
- BAD examples use `bad-code` CSS class, GOOD examples use `good-code` class
- Consistent indentation and formatting throughout

### Code of Conduct

Please be respectful and constructive in all interactions. See [CODE_OF_CONDUCT.md](/CODE_OF_CONDUCT.md).

## Review Process

1. Maintainers will review your PR within 7 days
2. Changes may request revisions for consistency or accuracy
3. All contributions are licensed under CC BY 4.0

## Questions?

Open an issue on GitHub or reach out to the maintainers.
