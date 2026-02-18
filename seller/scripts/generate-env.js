#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const templatePath = path.resolve(__dirname, '..', 'env.js.template');
const outPath = path.resolve(__dirname, '..', 'dist', 'vendor', 'assets', 'env.js');

if (!fs.existsSync(templatePath)) {
  console.warn('env.js.template not found at', templatePath);
  process.exit(0);
}

let content = fs.readFileSync(templatePath, 'utf8');

const replaceVar = (_, name) => {
  const v = process.env[name];
  return v !== undefined ? v : '';
};

content = content.replace(/\$\{([A-Z0-9_]+)\}/g, replaceVar);
content = content.replace(/%([A-Z0-9_]+)%/g, replaceVar);
content = content.replace(/__([A-Z0-9_]+)__/g, replaceVar);

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, content, 'utf8');

console.log('Wrote', outPath);
