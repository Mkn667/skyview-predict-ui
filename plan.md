# Implementation Plan - Weather Prediction UI

Develop a modern, responsive weather prediction interface featuring image upload (sky photo), location search with autocomplete, prediction display, and a subscription section.

## Scope Summary
- **Frontend**: Create a clean, intuitive UI for weather forecasting.
- **Key Features**:
    - Image Upload: Drag-and-drop or file selection for sky photos.
    - Location Search: Input field with mock autocomplete (simulated).
    - Prediction Display: Visual cards/sections showing "analyzed" results (mocked).
    - Subscription Section: A CTA for users to subscribe for updates.
- **Non-Goals**: 
    - Real-time weather API integration (unless simple mock data is used).
    - Backend processing of images (analysis will be simulated).
    - Persistent database storage (localStorage only).
    - Actual email subscription service (frontend form only).

## Assumptions & Open Questions
- The user's request is in French, so the UI will be in French by default.
- No real-time weather API key was provided; will use static mock data for the "prediction" based on location or uploaded image.
- Image "analysis" will be a simulated loading state followed by a mock result.

## Affected Areas
- **Components**:
    - `SkyImageUpload`: Handles drag-and-drop and preview.
    - `LocationSearch`: Input with mock dropdown for autocomplete.
    - `WeatherDisplay`: Cards showing temperature, conditions, etc.
    - `SubscriptionForm`: Simple email capture section.
- **State Management**: React `useState` for handling upload state, search results, and predictions.

## Phases

### Phase 1: Layout & Core Components
- Setup the main application structure in `App.tsx`.
- Create basic layout containers using Tailwind CSS.
- Implement the `SkyImageUpload` component.
- **Owner**: frontend_engineer

### Phase 2: Location & Predictions
- Implement the `LocationSearch` component with mock autocomplete logic.
- Create the `WeatherDisplay` component to show mock prediction data.
- Connect the upload action to "trigger" a mock analysis state.
- **Owner**: frontend_engineer

### Phase 3: Subscription & Refinement
- Add the `SubscriptionSection` at the bottom.
- Polishing UI: Animations (using Framer Motion if available, otherwise CSS), responsive adjustments.
- Final copy review (French text).
- **Owner**: frontend_engineer

## Execution Handoff

**Plan status:** ready

**Dispatch order:**
1. frontend_engineer — Build the entire UI and interactive logic as no database is required.

**Per-agent instructions:**
### 1. frontend_engineer
- **Phases:** Phase 1, 2, and 3
- **Scope:** Build the Weather Prediction UI in French. Include:
    - `SkyImageUpload`: A component for uploading sky photos (drag/drop + preview).
    - `LocationSearch`: A search bar with simulated suggestions for cities.
    - `WeatherDisplay`: A section that appears after "analysis" or location search, showing mock weather (temp, wind, sky condition).
    - `SubscriptionSection`: A clean footer-area form for email subscriptions.
- **Files:** `src/App.tsx`, create components in `src/components/weather/`.
- **Depends on:** none
- **Acceptance criteria:**
    - User can "upload" an image and see a preview.
    - Typing in location shows city suggestions.
    - UI is responsive and aesthetically pleasing (modern "Glassmorphism" or "Neumorphism" style suited for weather apps).
    - All text is in French.

**Do not dispatch:**
- supabase_engineer (No persistence required).
- quick_fix_engineer (Frontend engineer handles initial build).
