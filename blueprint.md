# Project Blueprint: BRIDGE - The Open Marketplace for Technical Challenges

## 1. Overview

BRIDGE is a React-based web application designed as an open marketplace for technical challenges. It connects **Seekers** (clients who post challenges) with **Solvers** (individuals or teams who solve them for bounties) and **Connectors** (brokers who facilitate deals). The platform aims to provide a secure, transparent, and efficient environment for all parties.

This document outlines the application's architecture, design system, and core features as of the latest version.

## 2. Design System: "Machined Neumorphism"

The visual identity of BRIDGE is defined by a custom design system called "Machined Neumorphism." It blends clean, modern aesthetics with subtle, physically-inspired UI elements to create a sense of depth and tactility.

### Core Principles:

*   **Clean & Uncluttered:** A minimalist layout with generous whitespace.
*   **Tactile Surfaces:** UI elements that appear tangible, with soft shadows and surface textures.
*   **Purposeful Animation:** Subtle transitions and animations that provide feedback and enhance the user experience.
*   **Strong Typography:** Clear and legible fonts (Inter for sans-serif, JetBrains Mono for monospaced) with a strong visual hierarchy.

### Color Palette:

*   **Primary (Ink):** `slate-900`
*   **Surface:** `slate-50`
*   **Ceramic:** `slate-100` (for cards and elevated surfaces)
*   **Action (Electric Blue):** `blue-600`
*   **Success (Signal Green):** `emerald-500`
*   **Warning (Amber):** `amber-500`

### Shadows:

*   **`shadow-levitated`:** A soft, deep shadow for elements that appear to be floating.
*   **`shadow-mechanical`:** A harder, more defined shadow for interactive elements like buttons.
*   **`shadow-inner`:** An inner shadow to create a pressed or inset effect.
*   **`shadow-ceramic`:** A subtle shadow for card elements.

## 3. Core Features & Components

### 3.1. Onboarding (`RoleSelection.tsx`)

*   **Purpose:** The initial landing page that forces a user to select their role (Seeker, Solver, or Connector).
*   **Design:** Features three distinct, interactive cards representing each role. The cards use the `shadow-levitated` effect on hover to encourage interaction.

### 3.2. Application Shell (`App.tsx`)

*   **Purpose:** The main layout of the application after a role has been selected.
*   **Features:**
    *   A persistent top navigation bar that displays the application's title ("BRIDGE") and the user's current role.
    *   A "Switch Role" button that returns the user to the `RoleSelection` screen.
    *   A main content area that renders the different pages of the application.

### 3.3. Marketplace: Challenge Feed (`ChallengeFeed.tsx`)

*   **Purpose:** Displays a list of available challenges to the user.
*   **Design:**
    *   Each challenge is presented as a card with the `shadow-ceramic` style.
    *   Challenges have a clear title, a brief description, budget range, and tags for easy scanning.
    *   A "Stealth Mode" or "Verified Client" badge is prominently displayed.

### 3.4. Marketplace: Challenge Detail (`ChallengeDetail.tsx`)

*   **Purpose:** Provides a detailed view of a single challenge.
*   **Design:**
    *   A detailed header card with the full challenge description, budget, and client information.
    *   A "Payout Schedule" section that lists the project milestones and their funding status (Unfunded, Funds Secured, Paid).
    *   An action bar with buttons to "Fund Next Milestone" or "Message Lead."

## 4. Technical Implementation

*   **Framework:** React with Vite
*   **Styling:** Tailwind CSS with the `@tailwindcss/typography` and `@tailwindcss/forms` plugins.
*   **Routing:** `react-router-dom`
*   **Icons:** `lucide-react`

## 5. Current Plan

There are no active development plans. The application is in a stable state with the initial styling complete.
