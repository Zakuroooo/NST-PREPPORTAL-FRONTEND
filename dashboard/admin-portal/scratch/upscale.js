const fs = require('fs');
const path = require('path');

const files = [
  'app/(app)/overview/page.tsx',
  'app/(app)/calendar/page.tsx',
  'app/(app)/students/page.tsx',
  'app/(app)/faculty/page.tsx'
];

function processFile(relPath) {
  const fullPath = path.join(process.cwd(), relPath);
  if (!fs.existsSync(fullPath)) return;
  
  let content = fs.readFileSync(fullPath, 'utf8');

  // Fix Students View link
  if (relPath.includes('students/page.tsx')) {
    if (!content.includes('import Link')) {
      content = content.replace('import { useState', 'import Link from "next/link";\nimport { useState');
    }
    content = content.replace(/<button className="inline-flex items-center gap-1 text-\[11px\] font-semibold text-blue-600 hover:text-blue-800 opacity-0 group-hover:opacity-100 transition-all">\s*View <ArrowUpRight className="w-3 h-3" \/>\s*<\/button>/g, 
      '<Link href={`/students/${s.id}`} className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-800 opacity-0 group-hover:opacity-100 transition-all bg-blue-50 px-3 py-1.5 rounded-lg">\n                        View Profile <ArrowUpRight className="w-4 h-4" />\n                      </Link>');
  }

  // Cascading typography replace (do it in order to avoid double replacements)
  // 1. replace text-xs to text-sm TEMPORARY
  content = content.replace(/text-xs/g, 'TEXT_XS_TEMP');
  // 2. replace text-[11px] to text-sm
  content = content.replace(/text-\[11px\]/g, 'text-sm');
  // 3. replace text-[10px] to text-xs
  content = content.replace(/text-\[10px\]/g, 'text-xs');
  // 4. replace text-[9px] to text-xs
  content = content.replace(/text-\[9px\]/g, 'text-[10px]');
  // 5. restore TEMP to text-sm
  content = content.replace(/TEXT_XS_TEMP/g, 'text-sm');

  // Upscale structure and icons
  content = content.replace(/py-2\.5/g, 'py-4');
  content = content.replace(/px-4/g, 'px-6');
  content = content.replace(/p-3/g, 'p-5');
  content = content.replace(/p-1\.5/g, 'p-2');
  
  // Icon and Avatar sizes
  content = content.replace(/w-3\.5 h-3\.5/g, 'w-4 h-4');
  content = content.replace(/w-7 h-7/g, 'w-9 h-9');
  content = content.replace(/w-8 h-8/g, 'w-10 h-10');

  // Text sizes for KPI numbers
  content = content.replace(/text-lg font-black/g, 'text-2xl font-black');
  content = content.replace(/text-lg font-bold/g, 'text-2xl font-bold');
  content = content.replace(/text-xl font-bold/g, 'text-2xl font-bold');

  fs.writeFileSync(fullPath, content);
  console.log(`Processed ${relPath}`);
}

files.forEach(processFile);
