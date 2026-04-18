import fs from 'fs';

const content = fs.readFileSync('src/App.tsx', 'utf-8');
const lines = content.split('\n');

const startIdx = lines.findIndex((l, i) => i >= 2690 && l.includes("{auditStep === 'idle' && (") && lines[i+1].includes("<>"));
const endIdx = lines.findIndex((l, i) => i >= 3480 && l.includes("</div>") && lines[i-1].includes("</div>") && lines[i-2].includes("</div>") && lines[i-3].includes("</AnimatePresence>"));

if (startIdx !== -1 && endIdx !== -1) {
  lines.splice(startIdx, endIdx - startIdx + 1);
  fs.writeFileSync('src/App.tsx', lines.join('\n'));
  console.log(`Removed lines ${startIdx + 1} to ${endIdx + 1}`);
} else {
  console.log('Could not find the block to remove');
  console.log('startIdx:', startIdx);
  console.log('endIdx:', endIdx);
}
