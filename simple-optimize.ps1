# Script simple d'optimisation d'images
# Ne nécessite pas d'installation supplémentaire

# Fonction pour créer un dossier s'il n'existe pas
function New-DirectoryIfNotExists {
    param([string]$path)
    if (-not (Test-Path -Path $path)) {
        New-Item -ItemType Directory -Path $path -Force | Out-Null
    }
}

# Chemins
$projectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$outputDir = Join-Path $projectRoot "optimized"

# Créer le dossier de sortie
New-DirectoryIfNotExists $outputDir

# Copier la structure des dossiers
$folders = @(
    "image/projets/IMMO",
    "image/projets/BIBLIO",
    "image/projets/UNIBANK",
    "image/projets/MCN",
    "image/projets/UNISANTE"
)

foreach ($folder in $folders) {
    $fullPath = Join-Path $outputDir $folder
    New-DirectoryIfNotExists $fullPath
}

# Liste des images à copier
$imagesToCopy = @(
    "image/EVA2.jpg",
    "image/pro1.jpeg",
    "image/pro2.jpeg",
    "image/pro3.jpg",
    "image/mysql.jpg",
    "image/t1.jpg",
    "image/t2.jpg",
    "image/t3.jpg",
    "image/t4.jpg",
    "image/t5.jpg",
    "image/projets/UNIBANK/preview.jpg",
    "image/projets/BIBLIO/preview.jpg",
    "image/projets/MCN/preview.jpg",
    "image/projets/UNISANTE/preview.png"
)

# Copier les images
foreach ($img in $imagesToCopy) {
    $source = Join-Path $projectRoot $img
    $destination = Join-Path $outputDir $img
    
    if (Test-Path $source) {
        $destDir = [System.IO.Path]::GetDirectoryName($destination)
        New-DirectoryIfNotExists $destDir
        Copy-Item -Path $source -Destination $destination -Force
        Write-Host "Copié : $source" -ForegroundColor Green
    } else {
        Write-Host "Fichier introuvé : $source" -ForegroundColor Yellow
    }
}

# Mettre à jour les chemins dans index.html
$htmlPath = Join-Path $projectRoot "index.html"
if (Test-Path $htmlPath) {
    $content = Get-Content -Path $htmlPath -Raw
    
    # Mettre à jour les chemins des images
    $content = $content -replace 'src="image/', 'src="optimized/image/'
    $content = $content -replace 'srcset="image/', 'srcset="optimized/image/'
    $content = $content -replace 'poster="image/', 'poster="optimized/image/'
    
    # Sauvegarder une copie de sauvegarde
    $backupPath = Join-Path $projectRoot "index.html.bak"
    if (-not (Test-Path $backupPath)) {
        Copy-Item -Path $htmlPath -Destination $backupPath
    }
    
    # Écrire le nouveau contenu
    $content | Set-Content -Path $htmlPath -Encoding UTF8
    
    Write-Host "Le fichier index.html a été mis à jour avec les nouveaux chemins." -ForegroundColor Green
    Write-Host "Une copie de sauvegarde a été créée : index.html.bak" -ForegroundColor Cyan
} else {
    Write-Host "Le fichier index.html n'a pas été trouvé." -ForegroundColor Red
}

Write-Host "Optimisation terminée !" -ForegroundColor Green
Write-Host "Les fichiers optimisés sont dans le dossier: $outputDir" -ForegroundColor Green
