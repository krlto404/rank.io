import fs from 'fs';

const content = fs.readFileSync('src/App.tsx', 'utf-8');
const lines = content.split('\n');

const startIdx = lines.findIndex((l, i) => l.includes("{auditStep === 'results' && auditData && (") && lines[i+1].includes("<motion.div"));
const endIdx = lines.findIndex((l, i) => i > startIdx && l.includes("{/* Testimonials Marquee */}"));

if (startIdx !== -1 && endIdx !== -1) {
  // We want to remove up to the line BEFORE {/* Testimonials Marquee */}
  // Let's check what is before it.
  // It should be `        )}`
  const actualEndIdx = endIdx - 1;
  lines.splice(startIdx, actualEndIdx - startIdx + 1);
  fs.writeFileSync('src/App.tsx', lines.join('\n'));
  console.log(`Removed lines ${startIdx + 1} to ${actualEndIdx + 1}`);
} else {
  console.log('Could not find the block to remove');
  console.log('startIdx:', startIdx);
  console.log('endIdx:', endIdx);
}
