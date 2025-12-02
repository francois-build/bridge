# Project Blueprint

## Overview

This document outlines the design, features, and technical specifications for the Bounty Solutions application, a platform that connects individuals and organizations with skilled professionals to solve challenges.

## Design System: Machined Neumorphism

Our design system, "Machined Neumorphism," is a unique aesthetic that combines soft, extruded shapes with a subtle, "machined" texture, creating a tangible and high-quality user interface.

### Color Palette

- **Primary:** `#0F172A` (slate-900) - Used for text and primary UI elements.
- **Primary Muted:** `#64748B` (slate-500) - Used for less prominent text.
- **Surface:** `#F1F5F9` (slate-100) - The base background color for the application.
- **Surface Raised:** `#FFFFFF` (white) - Used for cards and other elevated surfaces.
- **Action:** `#2563EB` (blue-600) - Used for buttons, links, and other interactive elements.

### Shadow Styles

- **Mechanical:** `5px 5px 10px #a3a3a3, -5px -5px 10px #ffffff` - A hard-edged shadow that creates a "machined" look.
- **Levitated:** `10px 10px 20px #a3a3a3, -10px -10px 20px #ffffff` - A softer, more diffuse shadow that makes elements appear to float.

## Components

### Header

The header is a responsive and sticky component that provides navigation and access to user authentication.

- **Desktop:** Displays the logo, navigation links, and a login button.
- **Mobile:** A hamburger menu toggles a full-screen mobile navigation menu.

### Onboarding

The onboarding experience is designed to be simple and intuitive, guiding users through the process of creating an account and selecting a role.

- **Welcome Message:** A prominent welcome message and a "Sign in with Google" button.
- **Role Selection:** Users can choose between "Seeker," "Solver," and "Connector" roles, with each role presented in a visually distinct card.

### Solver Onboarding

A multi-step form to collect detailed information from users who sign up as "Solvers."

- **Step 1: Basic Information:** Collects the user's full name, headline, and a short bio.
- **Step 2: Skills & Experience:** Collects the user's skills, portfolio/GitHub URL, and LinkedIn profile URL.
- **Step 3: Confirmation:** A final confirmation step to review the entered information.

### Challenge Feed

The Challenge Feed is the central marketplace where users can browse and interact with available challenges.

- **Challenge Cards:** Each challenge is displayed on a neumorphic card with a title, description, budget, and a "View Challenge" button.
- **Responsive Layout:** The feed is a responsive grid that adapts to different screen sizes.

