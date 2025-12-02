/**
 * QA Script: Phase 1 (Design System)
 * Usage: node scripts/qa_phase_1.js
 */
const fs = require('fs');
const path = require('path');

const RED = '\x1b[31m';
const GREEN = '\x1b[32m';
const RESET = '\x1b[0m';

function check() {
  console.log("🔍 Starting QA Phase 1: Design System & Tokens...\n");
  let hasError = false;

  // 1. Check package.json for forbidden libs
  const packageJsonPath = path.join(process.cwd(), 'package.json');
  if (fs.existsSync(packageJsonPath)) {
    const pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    const allDeps = { ...pkg.dependencies, ...pkg.devDependencies };
    const forbidden = ['@mui/material', 'framer-motion', 'bootstrap', 'sass', 'styled-components'];
    
    forbidden.forEach(lib => {
      if (allDeps[lib]) {
        console.log(`${RED}❌ FAIL: Forbidden library found: ${lib}${RESET}`);
        hasError = true;
      }
    });
    if (!hasError) console.log(`${GREEN}✅ PASS: No forbidden libraries found.${RESET}`);
  } else {
    console.log(`${RED}❌ FAIL: package.json not found.${RESET}`);
    hasError = true;
  }

  // 2. Check tailwind.config.js for Tokens
  const tailwindPath = path.join(process.cwd(), 'tailwind.config.js');
  if (fs.existsSync(tailwindPath)) {
    const content = fs.readFileSync(tailwindPath, 'utf8');
    const requiredTokens = [
      '#0F172A', // Primary
      '#F8FAFC', // Surface
      'levitated', // Shadow key
      'mechanical', // Shadow key
      'concave', // Shadow key
      'Inter', // Font
      'JetBrains Mono' // Mono Font
    ];

    requiredTokens.forEach(token => {
      if (!content.includes(token)) {
        console.log(`${RED}❌ FAIL: Missing Design Token in Tailwind Config: "${token}"${RESET}`);
        hasError = true;
      }
    });
    if (!hasError) console.log(`${GREEN}✅ PASS: Tailwind Config contains all required tokens.${RESET}`);
  } else {
    console.log(`${RED}❌ FAIL: tailwind.config.js not found.${RESET}`);
    hasError = true;
  }

  if (hasError) {
    console.log(`\n${RED}⛔ QA FAILED. Fix issues before proceeding to Phase 2.${RESET}`);
    process.exit(1);
  } else {
    console.log(`\n${GREEN}🎉 QA PASSED. Ready for Phase 2.${RESET}`);
  }
}

check();