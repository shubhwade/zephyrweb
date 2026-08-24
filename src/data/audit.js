import { MASTER_EVENTS } from './eventsMaster.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to wordmark directory
const wordmarkDir = path.resolve(__dirname, '../../public/wordmark');

// Get all files in wordmark directory
let wordmarkFiles = [];
try {
  wordmarkFiles = fs.readdirSync(wordmarkDir);
} catch (err) {
  console.error('Error reading wordmark directory:', err);
}

console.log('--- EVENT IMAGE AUDIT ---');
console.log('Event Name -> Image -> Status');
console.log('-----------------------------');

const matchedFiles = new Set();
let missingCount = 0;
let foundCount = 0;

MASTER_EVENTS.forEach((event) => {
  const imagePath = event.image;
  let status = '⚠ Image missing';
  let filename = '';

  if (imagePath && imagePath.startsWith('/wordmark/')) {
    filename = imagePath.replace('/wordmark/', '');
    // Check if file exists in the directory (case-insensitive check)
    const fileExists = wordmarkFiles.some(f => f.toLowerCase() === filename.toLowerCase());
    if (fileExists) {
      status = '✓ Image found';
      foundCount++;
      // Mark file as matched
      const actualFile = wordmarkFiles.find(f => f.toLowerCase() === filename.toLowerCase());
      matchedFiles.add(actualFile);
    } else {
      missingCount++;
    }
  } else {
    missingCount++;
  }

  console.log(`${event.eventName} -> ${imagePath || 'None'} -> ${status}`);
});

console.log('\n--- AUDIT SUMMARY ---');
console.log(`Total Events: ${MASTER_EVENTS.length}`);
console.log(`✓ Image found: ${foundCount}`);
console.log(`⚠ Image missing: ${missingCount}`);

console.log('\n--- UNUSED / UNMATCHED ASSETS ---');
// Exclude official festival branding files and letter animations from being flagged as "unused event assets"
const excludeList = [
  'zephyr-full-wordmark.jpg',
  'zephyr-wordmark-trans.png',
  'zephyr-wordmark-motion.mp4',
  'zephyr-wordmark-motion.webm',
  'forge of worlds.mp4',
  'forge-of-worlds-transparent.webm',
  'forge-of-worlds-transparent.webp',
  'letter-e-trans.png',
  'letter-e.mp4',
  'letter-e.webm',
  'letter-h-trans.png',
  'letter-h.mp4',
  'letter-h.webm',
  'letter-p-trans.png',
  'letter-p.mp4',
  'letter-p.webm',
  'letter-r-trans.png',
  'letter-r.mp4',
  'letter-r.webm',
  'letter-y-trans.png',
  'letter-y.mp4',
  'letter-y.webm',
  'letter-z-trans.png',
  'letter-z.mp4',
  'letter-z.webm'
];

let unusedCount = 0;
wordmarkFiles.forEach((file) => {
  if (!matchedFiles.has(file)) {
    const isBranding = excludeList.includes(file);
    const label = isBranding ? 'Unused branding asset (excluded from warnings)' : 'Unused / unmatched asset';
    console.log(`- ${file} (${label})`);
    if (!isBranding) {
      unusedCount++;
    }
  }
});
if (unusedCount === 0) {
  console.log('No unused event-specific assets found.');
}
