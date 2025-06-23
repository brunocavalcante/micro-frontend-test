# Firebase Authentication Setup

## Overview
The wrapper app now includes Firebase Authentication with email/password login. Unauthenticated users will see a login screen, and authenticated users can access all micro-frontend applications.

## Setup Instructions

### 1. Create a Firebase Project
1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or "Add project"
3. Follow the setup wizard to create your project

### 2. Enable Authentication
1. In your Firebase project, go to "Authentication" in the left sidebar
2. Click on "Get started" if it's your first time
3. Go to the "Sign-in method" tab
4. Enable "Email/Password" provider
5. Save the changes

### 3. Get Firebase Configuration
1. Go to Project Settings (gear icon next to "Project Overview")
2. In the "General" tab, scroll down to "Your apps"
3. Click the web icon (`</>`) to add a web app
4. Register your app with a name (e.g., "micro-frontend-wrapper")
5. Copy the Firebase configuration object

### 4. Configure Environment Variables
Create a `.env` file in the wrapper directory with your Firebase configuration:

```env
REACT_APP_FIREBASE_API_KEY=your-api-key-here
REACT_APP_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
REACT_APP_FIREBASE_APP_ID=your-app-id
```

### 5. Install Dependencies
Dependencies are already included in package.json. Run:
```bash
npm install
```

### 6. Start the Application
```bash
npm start
```

## Features Implemented

### Authentication Context
- `AuthProvider` - Provides authentication state to the entire app
- `useAuth` hook - Convenient hook to access authentication functions

### Login Component
- Email/password login form
- User registration (sign up) functionality
- Form validation and error handling
- Responsive design with modern UI

### Protected Routes
- Unauthenticated users see the login screen
- Authenticated users can access all micro-frontend apps
- Automatic redirect based on authentication state

### User Interface
- Updated topbar with user email and logout button
- Seamless integration with existing micro-frontend navigation
- Mobile-responsive design

## File Structure
```
wrapper/src/
├── components/
│   ├── Login.tsx                 # Login/signup form
│   └── AuthenticatedTopbar.tsx   # Topbar with user menu
├── contexts/
│   └── AuthContext.tsx           # Authentication context and hooks
├── config/
│   └── firebase.ts               # Firebase configuration
├── styles/
│   └── Login.css                 # Login component styles
└── App.tsx                       # Main app with authentication integration
```

## Security Notes
- Never commit your `.env` file to version control
- Use Firebase Security Rules to protect your data
- Consider implementing password reset functionality
- Monitor authentication usage in Firebase Console

## Troubleshooting
- If you see "Module not found" errors, make sure Firebase is installed: `npm install firebase`
- Check that all environment variables are properly set
- Verify that Email/Password authentication is enabled in Firebase Console
- Check the browser console for detailed error messages 