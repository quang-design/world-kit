# WorldKit Bento Homepage Redesign Tasks

This file tracks the progress of redesigning the WorldKit homepage into an interactive bento-style layout.

## Phase 1: Foundation & Basic Layout

- [ ] **Routing:** Modify `src/routes/+page.svelte` to be the main container for the bento layout. Archive or remove old `/dashboard` and `/dashboard/setup` routes if they become redundant.
- [ ] **Create `BentoGrid.svelte`:**
  - Located at `src/lib/components/bento/BentoGrid.svelte`.
  - Implement the core 6-column CSS Grid layout (`grid grid-cols-6 auto-rows-auto gap-4 p-4`). Adjust styling as needed.
- [ ] **Create `BaseCard.svelte`:**
  - Located at `src/lib/components/bento/cards/BaseCard.svelte`.
  - Acts as a wrapper around `shadcn-svelte`'s `Card` component (`<Card>`, `<CardHeader>`, `<CardContent>`, etc.).
  - Accept props for grid positioning (`col-span`, `row-span`) and potentially basic content slots.
- [ ] **Create Placeholder Card Components:**
  - Create initial files in `src/lib/components/bento/cards/`:
    - `WorldKitInfoCard.svelte`
    - `StatementCard.svelte`
    - `ColorPaletteCard.svelte`
    - `TypographyDisplayCard.svelte`
    - `TypographyScaleCard.svelte`
    - `EmptyCard.svelte`
  - Each should initially just use `BaseCard.svelte` with basic placeholder text/structure relevant to its type.
- [ ] **Create `BottomNavbar.svelte`:**
  - Located at `src/lib/components/bento/BottomNavbar.svelte`.
  - Add basic structure and placeholder elements (Logo, URL, Theme Toggle, Download, Login, Edit Button). Use `shadcn-svelte` components where appropriate (e.g., `Button`).
- [ ] **Integrate into `+page.svelte`:**
  - Clear existing content in `src/routes/+page.svelte`.
  - Import and use `BentoGrid.svelte` and `BottomNavbar.svelte`.
  - Populate `BentoGrid.svelte` with instances of the placeholder card components, assigning initial `col-span` and `row-span` values to mimic the target layout.

## Phase 2: Edit Mode & Interactivity

- [ ] **Edit Mode State:**
  - Create a Svelte store (e.g., `src/lib/stores/editMode.ts`) to manage the global edit state (`isEditing`).
  - Connect the "Edit" button in `BottomNavbar.svelte` to toggle this state.
- [ ] **Card Interaction:**
  - Modify `BaseCard.svelte` (or a wrapper) to:
    - Detect long-press events (consider a helper function or library).
    - Toggle `isEditing` state on long press.
    - Conditionally apply a "shaking" CSS class when `isEditing` is true.
- [ ] **Drag and Drop:**
  - Integrate `svelte-dnd-action` or a similar library into `BentoGrid.svelte`.
  - Enable drag-and-drop functionality for cards _only_ when `isEditing` is true.
- [ ] **Resizing/Duplication (Research Needed):**
  - Investigate methods for resizing grid items within CSS Grid.
  - Add duplicate functionality (e.g., a small icon button on cards in edit mode).

## Phase 3: Detail Editing (Svelte Vault)

- [ ] **Create `DetailVault.svelte`:**
  - Component that slides in from the right.
  - Triggered by clicking a card (perhaps only in edit mode, TBD).
  - Receives data about the selected card.
- [ ] **Vault Content:**
  - Develop conditional content within `DetailVault.svelte` based on the selected card's type.
  - Implement editing controls (text inputs, color pickers, font selectors, etc.).

## Phase 4: Feature Implementation

- [ ] **Theme Switching:** Implement dark/light mode toggle in `BottomNavbar.svelte`.
- [ ] **WorldKit Card:**
  - Implement logo drop/upload.
  - Handle SVG/PNG styling based on theme.
  - Allow text editing for the name.
- [ ] **Statement Card:**
  - Implement text editing.
  - **(Future)** Add placeholder/logic for AI generation button.
- [ ] **Color Palette Card:**
  - Implement adding/removing colors.
  - Display basic color info (HEX, RGB, CMYK).
  - **(Future)** Expand detail view with PANTONE, oklch, gradients.
- [ ] **Typography Cards:**
  - Implement font selection (Google Fonts/upload).
  - Implement dynamic display based on selected fonts.
- [ ] **Empty Card:** Implement image drop/upload.
- [ ] **Download as Image:** Integrate `html2canvas` or similar in `BottomNavbar.svelte`.
- [ ] **Login/Save:** Plan and implement user authentication and data persistence.

## Phase 5: Refinement

- [ ] **Styling:** Ensure cohesive look and feel.
- [ ] **Responsiveness:** Adapt layout for different screen sizes.
- [ ] **Transitions & Polish:** Add subtle animations and improve UX.
- [ ] **Testing:** Thoroughly test all features.
