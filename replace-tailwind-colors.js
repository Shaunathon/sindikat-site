import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Required for ESM path resolution
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define the directory where your components are located
const COMPONENTS_DIR = path.join(__dirname, 'src/pages'); // Adjust this if your components are in a different folder

// Define the mapping of Tailwind classes to your global classes
const colorReplacements = {
  'text-white': 'text-text',
  'text-zinc-300': 'text-secondary',
  'text-zinc-400': 'text-secondary',
  'text-blue-400': 'text-primary',
  'bg-zinc-800': 'bg-background',
  'bg-zinc-700': 'bg-primary',
  'bg-blue-500': 'bg-primary',
  'bg-blue-600': 'bg-primary-dark',
  'bg-zinc-900': 'bg-background-dark'
};

// Function to replace classes in a file
function replaceClassesInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  for (const [oldClass, newClass] of Object.entries(colorReplacements)) {
    const regex = new RegExp(`\b${oldClass}\b`, 'g');
    content = content.replace(regex, newClass);
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✅ Updated: ${filePath}`);
}

// Function to recursively process all .jsx files
function processDirectory(dir) {
  fs.readdirSync(dir).forEach((file) => {
    const filePath = path.join(dir, file);

    if (fs.statSync(filePath).isDirectory()) {
      processDirectory(filePath);
    } else if (file.endsWith('.jsx')) {
      replaceClassesInFile(filePath);
    }
  });
}

// Run the script
console.log('🚀 Replacing Tailwind color classes with global theme classes...');
processDirectory(COMPONENTS_DIR);
console.log('✅ All components processed.');
