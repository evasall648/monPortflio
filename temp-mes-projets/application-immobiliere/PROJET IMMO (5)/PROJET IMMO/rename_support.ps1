$source = "src/pages/admin/Support"
$temp = "src/pages/admin/support_temp"
$dest = "src/pages/admin/support"

# Rename to temp name
Rename-Item -Path $source -NewName (Split-Path -Leaf $temp) -Force

# Remove destination if it exists
if (Test-Path $dest) {
    Remove-Item -Path $dest -Recurse -Force
}

# Rename to final name
Rename-Item -Path $temp -NewName (Split-Path -Leaf $dest) -Force

Write-Host "Dossier renommé avec succès"
