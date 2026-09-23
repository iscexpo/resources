const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '..', 'taxonomy', 'docs', 'data', 'taxonomy.json');
const outPath = path.join(__dirname, '..', 'taxonomy', 'docs', 'data', 'taxonomy.js');

if (!fs.existsSync(dataPath)) {
  console.error(`ERROR: ${dataPath} not found`);
  process.exit(1);
}

const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

const requiredPillars = ['intents', 'techniques', 'evasions', 'inputs'];
const missing = requiredPillars.filter((pillar) => !Array.isArray(data[pillar]));
if (missing.length > 0) {
  console.error(`ERROR: taxonomy.json missing required pillar(s): ${missing.join(', ')}`);
  process.exit(1);
}

const totalNodes = requiredPillars.reduce((sum, pillar) => sum + data[pillar].length, 0);

const file = [
  '// ============================================================',
  '// GENERATED FILE — do not edit by hand.',
  '// Source of truth: taxonomy/docs/data/taxonomy.json',
  '// Regenerate with: npm run build:taxonomy',
  '// ============================================================',
  '',
  `var taxonomyData = ${JSON.stringify(data, null, 2)};`,
  '',
].join('\n');

fs.writeFileSync(outPath, file);
console.log(`Generated ${outPath}`);
console.log(`  pillars: ${requiredPillars.join(', ')}`);
console.log(`  nodes: ${totalNodes}`);
console.log(`  bytes: ${fs.statSync(outPath).size}`);