# FindMyBroker.io 🚀

Une plateforme moderne de comparaison de brokers, construite avec Next.js et Payload CMS.

## 🛠 Technologies Utilisées

### Front-end
- **Next.js 15.2.2** - Framework React avec Turbopack
- **React 19.0.0** - Bibliothèque UI
- **Tailwind CSS** - Framework CSS utilitaire
- **Radix UI** - Composants UI accessibles

### Back-end
- **Payload CMS** - Headless CMS
- **MongoDB** - Base de données NoSQL
- **TypeScript** - Typage statique
 ## 🚀 Installation

 **Prérequis**
```bash
# Versions requises
Node.js >= 18.20.2
MongoDB >= 6.0
```

**Cloner le projet**
```bash
git clone https://github.com/votre-repo/FindMyBroker.git
cd FindMyBroker
```
**Installer les dépendances**
```bash
npm install
```
**Configuration**

Créer un fichier .env à la racine :
```bash
MONGODB_URI=mongodb://127.0.0.1:27017/find-my-broker
PAYLOAD_SECRET=votre_secret_ici
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
```

**Lancer le projet**
```bash
# Développement
npm run dev

# Production
npm run build
npm start
```
* http://localhost:3000

## 📍 Routes Disponibles

### 🌐 Pages Publiques
| Route | Description |
|-------|-------------|
| `/` | Page d'accueil |
| `/brokers` | Liste des brokers |
| `/brokers/[slug]` | Page détaillée d'un broker |
| `/blog` | Articles et actualités |
| `/blog/[slug]` | Article individuel |

### 👑 Administration
| Route | Description |
|-------|-------------|
| `/admin` | Interface d'administration |
| `/admin/brokers` | Gestion des brokers |
| `/admin/articles` | Gestion des articles |
| `/admin/questions` | Gestion du questionnaire |
| `/admin/subscribers` | Gestion des abonnés |

### 🔌 API
| Route | Description |
|-------|-------------|
| `/api/brokers` | API Brokers |
| `/api/articles` | API Articles |
| `/api/questions` | API Questions |
| `/api/subscribers` | API Subscribers |

## 🔐 Sécurité

- ✅ Interface d'administration sécurisée
- 🛡️ API REST protégée
- 🔒 Authentification robuste
- ✔️ Validation des données

## 📦 Collections Payload

### 💼 Brokers
- 📋 Informations des brokers
  - Nom
  - Description
  - Logo
  - URL
- 📊 Caractéristiques
  - Frais
  - Instruments
  - Plateformes
- ⭐ Évaluations
  - Notes
  - Avis
  - Classement

### 📝 Articles
- 📄 Contenu du blog
  - Titre
  - Contenu
  - Images
- 🔍 SEO
  - Meta description
  - Meta title
  - Keywords
- 📑 Catégories
  - Trading
  - Analyse
  - Actualités

### ❓ Questions
- 📋 Questionnaire utilisateur
  - Questions
  - Options
  - Ordre
- 🧮 Logique de recommandation
  - Règles
  - Pondération
  - Filtres

### 📫 Subscribers
- 📧 Gestion de la newsletter
  - Email
  - Date d'inscription
  - Statut
- 👤 Préférences utilisateur
  - Fréquence
  - Catégories
  - Format

## 📝 License

| Type | Description | Fichier |
|------|-------------|---------|
| MIT License | Permission est accordée gratuitement à toute personne obtenant une copie de ce logiciel | [LICENSE.md](LICENSE.md) |

### 📜 Droits accordés
- ✅ Utilisation commerciale
- ✅ Modification
- ✅ Distribution
- ✅ Usage privé

## 🙋‍♂️ Support & Contact

### 📮 Pour toute question ou problème

| Type de Support | Comment Procéder | Temps de Réponse |
|----------------|------------------|------------------|
| Issue GitHub | [Ouvrir une nouvelle issue](https://github.com/votre-repo/issues/new) | 24-48h |
| Bug Report | [Template de bug report](https://github.com/votre-repo/issues/new?template=bug_report.md) | 24h |
| Feature Request | [Template de feature](https://github.com/votre-repo/issues/new?template=feature_request.md) | 48h |



### 💬 Communauté (Soon)
- 📢 [Discord](https://discord.gg/findmybroker)
- 🐦 [Twitter](https://twitter.com/findmybroker)
- 💼 [LinkedIn](https://linkedin.com/company/findmybroker)

### ⚡ Réponse Rapide
Pour une réponse rapide, assurez-vous d'inclure :
- 📝 Description détaillée
- 🔍 Étapes pour reproduire
- 📱 Environnement (OS, navigateur)