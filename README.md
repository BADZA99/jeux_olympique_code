# JO 2024 - Visualisation des Médailles

Ce projet est une application web pour visualiser les médailles olympiques par continent pour les Jeux Olympiques de Paris 2024. L'application utilise React pour le front-end, Tailwind CSS pour le style, et Vite pour le bundling et le développement.

![Visualisation des Médailles](./assets/demo.png)

## Lancer le Projet

Pour lancer le projet, suivez les étapes ci-dessous :

1. **Cloner le dépôt** :
   ```sh
   git clone <https://github.com/BADZA99/jeux_olympique_code.git>
   cd jo_2024

   # ou si vous avez déjà cloner le dépôt
   cd jo_2024
   ```
  2. **Installer les dépendances** :
   ```sh
   npm install
   ```

3. **Démarrer le serveur de développement** :
   ```sh
   npm run dev
   ```

4. **Construire le projet pour la production** :
   ```sh
   npm run build
   ```

5. **Prévisualiser la build de production** :
   ```sh
   npm run preview
   ```

## Fonctionnalités

### Visualisation des Médailles

- **Affichage des médailles par continent** : L'application affiche le nombre total de médailles (or, argent, bronze) pour chaque continent.
- **Détails des pays** : En survolant sur le nombre de médailles totales d'un continent, une popup s'affiche avec le top 3 des pays avec le plus de medailles pour ce continent.
- **Animation des cercles** : En survolant le nom d'un continent, son cercle correspondant s'anime.

### Animations

- **Animations GSAP** : Utilisation de GSAP pour animer l'affichage des statistiques des médailles.

### Chargement et Erreurs

- **Indicateur de chargement** : Utilisation de `react-spinners` pour afficher un indicateur de chargement pendant la récupération des données.
- **Gestion des erreurs** : Affichage d'un message d'erreur en cas de problème lors de la récupération des données.

## API Utilisée

Cette application utilise l'API publique de [Codante](https://apis.codante.io) pour récupérer les données des médailles par continent.

### Notes de Développement

- **Responsive Design** : J'ai rencontré des difficultés pour rendre l'application entièrement responsive. Des ajustements supplémentaires peuvent être nécessaires pour une meilleure compatibilité avec tous les appareils.
- Cela m'a pris environ 4 heures pour le faire.

### Configuration et Outils

- **Vite** : Utilisé pour le bundling et le développement rapide.
- **Tailwind CSS** : Utilisé pour le style avec des classes utilitaires.
- **ESLint** : Utilisé pour le linting du code JavaScript et JSX.
- **PostCSS** : Utilisé pour le traitement des CSS.

### Structure des Dossiers

- **src/** : Contient le code source de l'application.
  - **components/** : Contient les composants React.
    - **CustomHoverCard.jsx** : Composant pour afficher les détails des pays.
    - **ui/** : Contient des composants UI comme `button.jsx` et `hover-card.jsx`.
  - **pages/** : Contient les pages de l'application, comme `Home.jsx`.
  - **utils/** : Contient des utilitaires comme `fetcher.js` pour les requêtes API.
  - **assets/** : Contient les ressources statiques.
  - **lib/** : Contient des utilitaires supplémentaires.

Pour plus de détails, consultez les fichiers de configuration comme [`vite.config.js`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FC%3A%2FUsers%2FLENOVO%2FDesktop%2Fjo_2024%2Fvite.config.js%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%5D "\jo_2024\vite.config.js"), [`tailwind.config.js`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FC%3A%2FUsers%2FLENOVO%2FDesktop%2Fjo_2024%2Ftailwind.config.js%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%5D "\jo_2024\tailwind.config.js"), et [`package.json`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FC%3A%2FUsers%2FLENOVO%2FDesktop%2Fjo_2024%2Fpackage.json%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%5D "\jo_2024\package.json").
   