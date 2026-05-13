# WAI - Who Am I

WAI is a quiz party app built with Expo and React Native.
Players guess names from different categories, collect points, and can manage their own content.

## Main Features

- Multiplayer quiz with rotating active players each round
- Scoring system with saved player points
- Name categories:
  - History
  - Media
  - Politics
  - Science
  - Sports
  - Custom
- Manage custom names
- Blacklist for unwanted names
- In-game controls during a round:
  - Pause / resume
  - Sound mute / enabled
  - End game
- Previous games and results on the home screen
- Local persistence (players, settings, results)
- Foundation for multilingual support (i18n locales already included)

## Tech Stack

- Expo + React Native
- Expo Router (file-based routing)
- TypeScript
- NativeWind / TailwindCSS
- React Navigation Tabs
- AsyncStorage (local data)

## Project Structure (Overview)

- app/: Screens and routes
- components/: UI building blocks and feature components
- context/: Global app state
- scripts/: Game and selection logic
- assets/names/: Name data by category
- assets/images/languages/locales/: Language files

## Screenshots

The following images are embedded directly from the assets/screenshots folder.

<table>
  <tr>
    <td align="center">
      <strong>Home</strong><br />
      <img src="assets/screenshots/home.png" alt="Home Screen" width="180" />
    </td>
    <td align="center">
      <strong>Live Game (Portrait)</strong><br />
      <img src="assets/screenshots/liveGame.png" alt="Live Game Screen" width="180" />
    </td>
  </tr>
  <tr>
    <td align="center">
      <strong>Manage Names</strong><br />
      <img src="assets/screenshots/manageNames.png" alt="Manage Names Screen" width="180" />
    </td>
    <td align="center">
      <strong>Score Overview</strong><br />
      <img src="assets/screenshots/pointOverview.png" alt="Point Overview Screen" width="180" />
    </td>
  </tr>
  <tr>
    <td colspan="2" align="center">
      <strong>Live Game (Landscape)</strong><br />
      <img src="assets/screenshots/liveGameHorizontal.png" alt="Live Game Horizontal Screen" width="320" />
    </td>
  </tr>
</table>

## Local Development

### Requirements

- Node.js LTS
- npm
- Expo CLI (optional globally, otherwise via npx)

### Installation

```bash
npm install
```

### Start the App

```bash
npm run start
```

### Start a Target Platform Directly

```bash
npm run android
npm run ios
npm run web
```

### Linting

```bash
npm run lint
```

## Bundling and Build

EAS Build is already configured in this project (see eas.json).

### 1) Set Up the EAS CLI

```bash
npm install -g eas-cli
eas login
```

### 2) Build Profiles

- development: development client, internal distribution, Android APK
- preview: internal distribution, Android APK
- production: release build, Android AAB (App Bundle), iOS device build

### 3) Run a Build

#### Android Preview (APK)

```bash
eas build --platform android --profile preview
```

#### Android Production (AAB)

```bash
eas build --platform android --profile production
```

#### iOS Production

```bash
eas build --platform ios --profile production
```

### 4) Optional: Submit the App to Stores

```bash
eas submit --platform android --profile production
eas submit --platform ios --profile production
```

### 5) Local Web Bundle (Optional)

```bash
npx expo export --platform web
```

## Routing Overview

- app/index.tsx
  - Redirects depending on the data state:
    - to onboarding if there are not enough users yet
    - otherwise to the home view
- app/(quiz)/home.tsx
  - Entry point for starting a game, quick options, and previous games
- app/(quiz)/users.tsx
  - Display and manage users
- app/(quiz)/settings.tsx
  - Custom names, terms, reset
- app/(game)/play.tsx
  - Main game screen with timer, scoring, answers, and controls

## Notes

- Android package: com.felix08.wai
- Expo project name/slug: WAI / wai
- Production Android builds generate an AAB (suitable for the Play Store).

## Roadmap (Optional)

- Expand the onboarding flow further (create players directly during onboarding)
- Integrate more languages actively into the UI
- Add more detailed statistics and history analysis
