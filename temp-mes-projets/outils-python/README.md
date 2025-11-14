# Outils Python - Boîte à Outils du Développeur

Collection d'outils et de scripts Python pour faciliter le développement et l'automatisation des tâches courantes.

## 🛠️ Outils inclus

1. **Convertisseur d'images**
   - Conversion entre différents formats (JPG, PNG, WebP)
   - Redimensionnement par lot
   - Compression avec contrôle qualité

2. **Extracteur de données**
   - Extraction de données depuis des fichiers PDF
   - Web scraping basique
   - Traitement de fichiers CSV/Excel

3. **Automatisation**
   - Renommage de fichiers par lots
   - Nettoyage de répertoires
   - Téléchargement de fichiers

4. **Utilitaires**
   - Générateur de mots de passe sécurisés
   - Vérificateur de syntaxe JSON
   - Calculateur de hachage

## 🚀 Prérequis

- Python 3.8+
- pip (gestionnaire de paquets Python)
- Bibliothèques requises (voir `requirements.txt`)

## ⚙️ Installation

1. Cloner le dépôt :
   ```bash
   git clone https://github.com/evasall648/mes-projets.git
   cd mes-projets/outils-python
   ```

2. Créer un environnement virtuel (recommandé) :
   ```bash
   python -m venv venv
   source venv/bin/activate  # Sur Windows: .\venv\Scripts\activate
   ```

3. Installer les dépendances :
   ```bash
   pip install -r requirements.txt
   ```

## 🏃‍♂️ Utilisation

Chaque outil peut être exécuté individuellement. Par exemple :

```bash
# Pour le convertisseur d'images
python image_converter.py --input images/ --output converted/ --format webp

# Pour le générateur de mots de passe
python password_generator.py --length 12 --special-chars
```

## 📝 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](../LICENSE) pour plus de détails.
