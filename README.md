# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Dependencies

The project's architecture is built upon these fundamental libraries and tools.
Ensure you have Node.js, npm, Expo CLI installed on your system.

Core Runtime Environment:

- Node: v22.11.0
- NPM: 10.9.0
- Expo: 52.0.43

React & React Native Environment:

- React: v18.3.1
- React-Native: 0.76.9

Target Mobile Platforms:

(Android)
Android SDK Versions:

- compileSdkVersion: 35
- minSdkVersion: 24
- targetSdkVersion: 34

(iOS)
iOS SDK Version: 18.2

Development Operating System:
Operating System: macOs Sonoma 14.6

Additional NPM Packages:
react-native-paper: v5.13.1
jest: v29.7.0
babel-plugin-module-resolver: v5.0.2

## Installation Instructions

1. Clone this repository

   ```bash
   git clone https://github.com/WongWeiLoon/cryptocom-assessment.git
   cd cryptocom-assessment
   ```

2. Install dependencies

   ```bash
    npm install
   ```

3. iOS Setup (Skip this step if you don't wish to test on iOS)

   ```bash
    cd ios
    pod install
    cd ..
   ```

4. Run the app

- Using Expo Go App:

1. Download the Expo Go app from the App Store (iOS) or Google Play Store (Android) on your mobile device.
2. Run command to generate QR Code: npx expo start --go
3. Scan the QR code displayed in the Expo Developer Tools or in your terminal using the Expo Go app.

- Using Android Emulator/ iOS Simulator

1. Run command: npm run android OR npm run ios

## Architecture

app/
├── index.tsx # Entry point
android/
├── ... # Android-specific code and configurations
ios/
├── ... # iOS-specific code and configurations
src/
├── assets/ # Contains images, fonts, icons, and other static resources
├── components/ # Reusable UI components
├── constants/ # Stores color schemes and other predefined values used throughout the app.
├── screens/ # Application screens
├── database/ # Manages local database interactions, including schemas, queries, and data access logic.
├── mockData/ # Holds mock data used for development and testing purposes.

Key Design Patterns:

- Component-Based Architecture: This project using component-based structure, e.g.: "src/components/" for reusable UI components and "src/screens/" for application screens. This follows React’s philosophy of breaking the UI into reusable, self-contained pieces.
- Separation of Concerns: UI-related code is isolated from business logic (e.g., database interactions in src/database/). Constants like predefined values are centralized in src/constants/ for consistency.
- Mocking: Use of src/mockData/ suggests a pattern for mocking data during development and testing. This can swapping real and mock data sources dynamically.

## Testing

Unit tests: Jest + React Testing Library

```bash
 npm test
```
