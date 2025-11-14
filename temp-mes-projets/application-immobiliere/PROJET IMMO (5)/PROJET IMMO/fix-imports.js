const fs = require('fs');
const path = require('path');
const { glob } = require('glob');

// Configuration des chemins
const SRC_DIR = path.join(__dirname, 'src');
const COMPONENTS_DIR = path.join(SRC_DIR, 'components');
const ADMIN_COMPONENTS_DIR = path.join(COMPONENTS_DIR, 'AdminCompotenants');
const UI_COMPONENTS_DIR = path.join(ADMIN_COMPONENTS_DIR, 'ui');

// Mappage des corrections de chemins
const PATH_CORRECTIONS = {
  // Corrections de casse
  'card': 'Card',
  'select': 'Select',
  'badge': 'Badge',
  'button': 'button',
  'input': 'input',
  'label': 'label',
  'switch': 'switch',
  'toast': 'toast',
  'dialog': 'dialog',
  'dropdown-menu': 'dropdown-menu',
  'form': 'form',
  'table': 'table',
  'tabs': 'tabs',
  'tooltip': 'tooltip',
  'popover': 'popover',
  'alert-dialog': 'alert-dialog',
  'avatar': 'avatar',
  'checkbox': 'checkbox',
  'command': 'command',
  'context-menu': 'context-menu',
  'drawer': 'drawer',
  'hover-card': 'hover-card',
  'input-otp': 'input-otp',
  'menubar': 'menubar',
  'navigation-menu': 'navigation-menu',
  'pagination': 'pagination',
  'progress': 'progress',
  'radio-group': 'radio-group',
  'resizable': 'resizable',
  'scroll-area': 'scroll-area',
  'select': 'select',
  'separator': 'separator',
  'sheet': 'sheet',
  'skeleton': 'skeleton',
  'slider': 'slider',
  'sonner': 'sonner',
  'textarea': 'textarea',
  'toggle': 'toggle',
  'toggle-group': 'toggle-group',
  'toolbar': 'toolbar'
};

// Fonction pour corriger les chemins d'importation
async function fixImports() {
  try {
    // Trouver tous les fichiers TypeScript/JavaScript
    const files = await glob('**/*.{ts,tsx,js,jsx}', { 
      cwd: SRC_DIR,
      ignore: ['**/node_modules/**', '**/.next/**', '**/dist/**', '**/build/**']
    });

    let fixedCount = 0;

    for (const file of files) {
      const filePath = path.join(SRC_DIR, file);
      let content = fs.readFileSync(filePath, 'utf8');
      let updated = false;

      // Corriger les chemins d'importation
      const importRegex = /from\s+['"](@\/components\/AdminCompotenants\/ui\/[^'"\/]+)['"]/g;
      
      content = content.replace(importRegex, (match, importPath) => {
        const componentName = importPath.split('/').pop();
        const correctedComponent = PATH_CORRECTIONS[componentName.toLowerCase()];
        
        if (correctedComponent && componentName !== correctedComponent) {
          updated = true;
          return `from "@/components/AdminCompotenants/ui/${correctedComponent}"`;
        }
        return match;
      });

      // Corriger les chemins relatifs vers les composants
      const relativeImportRegex = /from\s+['"](?:\.\.\/)+components\/([^'"\/]+\/[^'"\/]+)['"]/g;
      
      content = content.replace(relativeImportRegex, (match, compPath) => {
        updated = true;
        return `from "@/components/${compPath}"`;
      });

      // Écrire les modifications si nécessaire
      if (updated) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Fixed imports in: ${file}`);
        fixedCount++;
      }
    }

    console.log(`\n✅ Fixed imports in ${fixedCount} files.`);
  } catch (error) {
    console.error('Error fixing imports:', error);
    process.exit(1);
  }
}

// Exécuter le script
fixImports();
