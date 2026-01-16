# Car Tec - Firebase Setup Guide

## 1. Install Firebase

Run the following command to install Firebase:

```bash
npm install firebase
```

## 2. Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or select an existing project
3. Enable Google Analytics (optional)

## 3. Enable Authentication

1. In the Firebase Console, go to **Authentication** > **Sign-in method**
2. Enable **Google** as a sign-in provider
3. Add your app's domain to the authorized domains list

## 4. Create Firestore Database

1. Go to **Firestore Database** in the Firebase Console
2. Click "Create database"
3. Start in **test mode** for development (remember to add security rules for production)
4. Choose a location closest to your users

## 5. Enable Storage (for car images)

1. Go to **Storage** in the Firebase Console
2. Click "Get started"
3. Start in **test mode** for development

## 6. Get Your Firebase Config

1. Go to **Project Settings** (gear icon)
2. Scroll down to "Your apps"
3. Click the web icon (</>) to add a web app
4. Register your app and copy the config

## 7. Update Firebase Configuration

Open `src/lib/firebase.ts` and replace the placeholder config with your actual Firebase config:

```typescript
const firebaseConfig = {
  apiKey: "YOUR_ACTUAL_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

## 8. Firestore Security Rules (Production)

For production, update your Firestore rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read access to all users
    match /cars/{carId} {
      allow read: if true;
      allow write: if request.auth != null && 
                   request.auth.token.email == 'amolsalunke8199@gmail.com';
    }
  }
}
```

## 9. Storage Security Rules (Production)

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /cars/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null && 
                   request.auth.token.email == 'amolsalunke8199@gmail.com';
    }
  }
}
```

## Admin Access

The admin email is set to: `amolsalunke8199@gmail.com`

Only this email can access the `/admin` page and add/delete cars.

To change the admin email, update the `ADMIN_EMAIL` constant in `src/lib/firebase.ts`.

## WhatsApp Integration

The WhatsApp number is set to: `9527006593`

To change it, update the `WHATSAPP_NUMBER` constant in `src/lib/firebase.ts`.

## Running the App

```bash
npm run dev
```

The app will work with sample car data even without Firebase configuration. Once you add your Firebase config, the app will use Firestore for data storage.
