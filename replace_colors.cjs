const fs = require('fs');
const path = './src/components/AnimatedDashboard.tsx';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(/bg-\[#050505\]/g, 'bg-gray-50');
content = content.replace(/bg-\[#0a0a0a\]\/40/g, 'bg-white/80');
content = content.replace(/text-white/g, 'text-gray-900');
content = content.replace(/text-zinc-500/g, 'text-gray-500');
content = content.replace(/text-zinc-400/g, 'text-gray-500');
content = content.replace(/text-zinc-300/g, 'text-gray-600');
content = content.replace(/text-zinc-200/g, 'text-gray-700');
content = content.replace(/bg-white\/10/g, 'bg-gray-100');
content = content.replace(/border-white\/20/g, 'border-gray-200');
content = content.replace(/border-white\/10/g, 'border-gray-200');
content = content.replace(/border-white\/5/g, 'border-gray-200');
content = content.replace(/bg-white\/5/g, 'bg-gray-50');
content = content.replace(/bg-white\/\[0\.03\]/g, 'bg-white');
content = content.replace(/border-white\/\[0\.08\]/g, 'border-gray-200');
content = content.replace(/bg-white\/\[0\.05\]/g, 'bg-gray-50');
content = content.replace(/via-white\/\[0\.05\]/g, 'via-gray-100');
content = content.replace(/stroke-white\/5/g, 'stroke-gray-200');

fs.writeFileSync(path, content);
console.log('Done');
