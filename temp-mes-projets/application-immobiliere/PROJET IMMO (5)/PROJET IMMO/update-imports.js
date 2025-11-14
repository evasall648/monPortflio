const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, 'src');

// Mappage des anciens chemins vers les nouveaux chemins
const pathMappings = [
  { 
    old: '@/components/ui/button', 
    new: '@/components/AdminCompotenants/ui/button' 
  },
  { 
    old: '@/components/ui/input', 
    new: '@/components/AdminCompotenants/ui/input' 
  },
  { 
    old: '@/components/ui/card', 
    new: '@/components/AdminCompotenants/ui/card' 
  },
  // Ajoutez d'autres mappages si nécessaire
];

function updateImportsInFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let updated = false;
    
    pathMappings.forEach(mapping => {
      if (content.includes(mapping.old)) {
        content = content.replace(
          new RegExp(mapping.old.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), 
          mapping.new
        );
        updated = true;
      }
    });
    
    if (updated) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Updated imports in: ${filePath}`);
    }
  } catch (error) {
    console.error(`Error processing file ${filePath}:`, error);
  }
}

function processDirectory(directory) {
  const files = fs.readdirSync(directory);
  
  files.forEach(file => {
    const fullPath = path.join(directory, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      updateImportsInFile(fullPath);
    }
  });
}

// Démarrer le traitement à partir du répertoire src
processDirectory(rootDir);

console.log('Mise à jour des imports terminée !');
