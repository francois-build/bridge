# Builder Prompts for Bridge Onboarding

This file contains a series of strict, ordered prompts to guide the AI in building the specific onboarding flows (A, B, C) outlined in the `user_flow.md` document. 

**Instructions:** Feed these prompts to the AI one by one. Do not proceed to the next prompt until the current one is successfully implemented.

---

### Prompt 1: Implement "Deck-to-Data" Solver Onboarding (Flow A)

**Action:** Create the Solver Onboarding Experience.

**Context:** According to `user_flow.md` (Section 5, Flow A), a user who selects the `solver` role and has `probationaryStatus: true` must be routed to a specific onboarding flow. This flow requires them to upload a resume or a presentation deck, which will be used to auto-populate their profile.

**Strict Instructions:**

1.  **Create `src/features/onboarding/SolverOnboarding.tsx`:**
    *   This component should contain a file upload zone (you can use a simple `<input type="file" />` for now).
    *   Include a headline: `Upload Your Deck or Resume`.
    *   Add a paragraph explaining: `To streamline your profile creation, we'll analyze your existing documents. Upload a PDF, DOCX, or PPTX file.`
    *   Add a button `Create My Profile` which will (in the future) trigger the data extraction and profile creation.

2.  **Modify `src/layouts/App.tsx`:**
    *   Update the routing logic. If `userProfile.role === 'solver'` and `userProfile.probationaryStatus === true`, the user must be redirected to the `/onboarding/solver` route, which renders the new `SolverOnboarding` component.

3.  **Update `src/main.tsx`:**
    *   Add the new route `/onboarding/solver` to your routing setup, rendering the `SolverOnboarding` component.

---

### Prompt 2: Implement Seeker Onboarding (Flow B)

*(To be used after Prompt 1 is completed)*

---

### Prompt 3: Implement Profile Finalization (Flow C)

*(To be used after Prompt 2 is completed)*
