Step 2: Create Your First Plan - "Project Setup"
Plan Name: "Project Setup & Configuration"
Plan Description:

Set up the foundation for the 3Dworks 3D printing landing page:
- Configure Tailwind with modern tech color palette (light & dark)
- Set up layout with metadata and theme detection
- Create reusable utility functions
- Establish light mode first design with dark mode support


Task 1: Update Tailwind Configuration

Update tailwind.config.ts to include our custom color palette and dark mode:
- Enable dark mode: darkMode: 'class' (allows manual toggle + system preference)
- cyan: { 400: '#22d3ee', 500: '#06b6d4', 600: '#0891b2' }
- purple: { 400: '#c084fc', 500: '#a855f7', 600: '#9333ea' }
- Add custom colors for consistency

Add custom font families:
- fontFamily: { sans: ['Inter', 'sans-serif'], display: ['Space Grotesk', 'Outfit', 'sans-serif'], mono: ['JetBrains Mono', 'monospace'] }

Extend theme with minimal border-radius values.
Configure backdrop-blur utilities for glassmorphism effects.

Task 2: Configure Global Styles

Update app/globals.css with theme-aware styles:
- **Light mode (default)**:
  - Background: white to light gray gradient
  - Text: dark slate colors (text-slate-900, text-slate-600)
  - Smooth scrolling behavior
  - Custom scrollbar with cyan accent
- **Dark mode (dark: prefix)**:
  - Background: #050505 to #0a0a0f gradient
  - Text: white to light gray
  - Custom scrollbar with cyan accent
- Add base glassmorphism classes for both themes
- Tech-inspired subtle grid background pattern (theme-aware)
- Smooth theme transition: transition-colors duration-200

Task 3: Create Root Layout with Theme Support

Update app/layout.tsx:
- Add comprehensive metadata (title: "3Dworks - Precision 3D Printing", description, og tags)
- Set up Inter font as primary with Space Grotesk for headings
- Include viewport settings for mobile
- **Theme detection script** (before app renders):
  - Check user preference in localStorage
  - Fall back to system preference (prefers-color-scheme)
  - Apply 'dark' class to <html> if needed
- Optional: Theme toggle button component
- Basic structure with <html>, <body>
- Add preload for critical fonts


Task 4: Create Utility Functions

Create lib/utils.ts if it doesn't exist:
- Export 'cn' function for className merging
- Add helper functions for formatting (formatDate, formatFileSize for 3D models)
- Add utilities for 3D printing specific needs (dimensionFormatter, etc.)

Task 5: Theme Toggle Component (Optional)

Create components/ui/ThemeToggle.tsx:
- Sun/moon icon button (lucide-react)
- Toggle between light and dark mode
- Save preference to localStorage
- Smooth icon transition
- Glassmorphism button style (theme-aware)
- Position in navbar or as floating button
