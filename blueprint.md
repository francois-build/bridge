# Project Blueprint

## Overview

This project is a React application with a Firebase backend. It includes a serverless infrastructure using Cloud Functions for backend logic and Firestore for the database.

## Application Details

### Frontend

- **Framework:** React
- **Styling:** Tailwind CSS
- **State Management:** React hooks and context

### Backend

- **Platform:** Firebase
- **Database:** Firestore
- **Serverless Functions:** Cloud Functions for Firebase (Gen 2)

## Implemented Features

- **Authentication:** Firebase Authentication with email and password.
- **User Profile:** Firestore collection to store user data.
- **Security Rules:** Firestore security rules to protect user data.
- **Cloud Functions:**
    - `onUserCreate`: Triggered on new user creation to create a user document in Firestore.
    - `sanitizeInputs`: Callable function to sanitize user input.
    - `generateBridgeLink`: HTTPS callable function to generate a link.

## Current Plan

- Set up the serverless backend logic with Cloud Functions Gen 2.
- Create a modular structure for functions.
- Implement secret management using `defineSecret()`.
- Configure functions for performance and cost-effectiveness.