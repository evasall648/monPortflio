# Script pour corriger les chemins d'importation dans les fichiers TypeScript/JavaScript
$files = Get-ChildItem -Path "C:\Users\hp\OneDrive\Documents\PROJEJ IMMO\PROJET IMMO\src\components\ui" -Recurse -Include *.tsx,*.ts

foreach ($file in $files) {
    $content = Get-Content -Path $file.FullName -Raw
    
    # Remplacer les différents formats de chemins relatifs par le chemin absolu
    $newContent = $content -replace "from\s+['\"](\.\./)+lib/utils['\"]", 'from "@/lib/utils"'
    $newContent = $newContent -replace "from\s+['\"](\\.\\.\\\\)+lib\\utils['\"]", 'from "@/lib/utils"'
    
    if ($newContent -ne $content) {
        Set-Content -Path $file.FullName -Value $newContent -NoNewline
        Write-Host "Corrigé: $($file.FullName)"
    }
}

Write-Host "Correction des imports terminée !"
