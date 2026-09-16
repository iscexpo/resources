const fs = require('fs');
const path = require('path');

const errors = [];

// Check for .DS_Store files
function checkDSStore(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (file === '.DS_Store') {
      errors.push(`Found .DS_Store at ${fullPath}`);
    }
    if (stat.isDirectory() && file !== '.git' && file !== 'node_modules') {
      checkDSStore(fullPath);
    }
  }
}

// Check for broken links (https://)
function checkBrokenLinks(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory() && file !== '.git' && file !== 'node_modules' && file !== 'scripts') {
      checkBrokenLinks(fullPath);
    } else if (file.endsWith('.html') || file.endsWith('.md')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      if (content.includes('hhttps://')) {
        errors.push(`Found broken link in ${fullPath}`);
      }
    }
  }
}

// Validate JSON files
function validateJSON(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory() && file !== '.git' && file !== 'node_modules') {
      validateJSON(fullPath);
    } else if (file.endsWith('.json')) {
      try {
        JSON.parse(fs.readFileSync(fullPath, 'utf8'));
      } catch (e) {
        errors.push(`Invalid JSON: ${fullPath} - ${e.message}`);
      }
    }
  }
}

// Run checks
checkDSStore('.');
checkBrokenLinks('.');
validateJSON('.');

if (errors.length > 0) {
  console.error('Validation errors:');
  errors.forEach(e => console.error(`  - ${e}`));
  process.exit(1);
} else {
  console.log('All validations passed!');
}
