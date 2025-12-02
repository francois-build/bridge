# Project Blueprint

## Overview

This document outlines the architecture and development plan for the "Bridge" application, a platform designed to connect problem solvers with those seeking solutions to various challenges.

## Current State

### Core Functionality

*   **User Authentication:** Users can sign in with their Google accounts using Firebase Authentication.
*   **Onboarding:** A guided onboarding process allows users to select a role (Solver, Seeker, or Scout) and complete a role-specific onboarding flow.
*   **Challenge Marketplace:** A central feed displays a list of available challenges.
*   **Challenge Details:** Users can view the details of a specific challenge.

### Technology Stack

*   **Frontend:** React, TypeScript, Vite
*   **Styling:** Tailwind CSS
*   **Routing:** `react-router-dom`
*   **Authentication:** Firebase Authentication
*   **Database:** Cloud Firestore

### Project Structure

```
src
├── assets
├── components
│   ├── Header.tsx
│   └── ui
├── contexts
│   ├── AuthContext.tsx
│   └── authContextDefinition.ts
├── features
│   ├── challenges
│   │   └── ChallengeDetail.tsx
│   ├── marketplace
│   │   ├── ChallengeBiddingForm.tsx
│   │   └── ChallengeFeed.tsx
│   └── onboarding
│       ├── Onboarding.tsx
│       ├── RoleSelection.tsx
│       ├── ScoutOnboarding.tsx
│       ├── SeekerOnboarding.tsx
│       └── SolverOnboarding.tsx
├── hooks
│   └── useAuth.ts
├── layouts
│   └── App.tsx
├── lib
│   ├── firebase.ts
│   ├── schemas.ts
│   └── utils.ts
├── main.tsx
└── index.css
```

## Next Steps

Now that the initial setup and linting are complete, I will focus on enhancing the user experience and adding new features. I will start by improving the visual design of the existing pages to create a more modern and engaging interface. I will then move on to implementing new functionality, such as creating and managing challenges.

I am ready for your next instruction.
