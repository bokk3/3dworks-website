Create Plan 7 - "Contact Form"
Plan Name: "Contact Form with File Upload"
Plan Description:
Build a functional contact form with client-side validation, file upload
for 3D models (STL/OBJ), and server action for form submission.

Tasks:
Task 1: Contact Form Component [x]
Create components/sections/Contact/ContactForm.tsx:

- [x] Client component with form state
- [x] Fields: name, email, phone, project type (dropdown: Prototyping, Custom Parts, Design Services, Quote Request), message
- [x] File upload for 3D models (STL, OBJ, STEP files) - optional
- [x] Use shadcn Input, Textarea, Select components
- [x] Glassmorphism styling (theme-aware):
  - Light: bg-white border border-slate-200 shadow-md
  - Dark: dark:bg-white/5 dark:backdrop-blur-md dark:border-white/10
- [x] Cyan submit button (bg-cyan-500 hover:bg-cyan-600 text-white)
- [x] Loading state during submission with spinner
- [x] Success/error messages with animations
- [x] Sharp corners (rounded-md)

Task 2: Form Validation [x]
Add validation to ContactForm:

- [x] Required fields validation (name, email, message)
- [x] Email format validation
- [x] Min length for message (20 chars)
- [x] File size limit (max 50MB for 3D models)
- [x] File type validation (only .stl, .obj, .step)
- [x] Display error messages below fields (text-red-400)
- [x] Disable submit button until valid

Task 3: Server Action [x]
Create app/actions/contact.ts:

- [x] Server action to handle form submission
- [x] Validate data server-side
- [x] Handle file upload to /public/uploads or cloud storage
- [x] For now, console.log the data (later connect to email service)
- [x] Return success/error response with proper types

Task 4: Contact Section [x]
Create components/sections/Contact.tsx:

- [x] Section heading: "Let's Build Together" (gradient text)
- [x] Subheading: "Upload your design or tell us about your project"
  - Light: text-slate-600
  - Dark: dark:text-slate-400
- [x] ContactForm component
- [x] Contact info sidebar: email, phone, response time
- [x] Two column layout on desktop (form + info)
- [x] Glassmorphism cards (theme-aware)

Task 5: Add to Homepage [x]

Update app/page.tsx:

- [x] Add Contact section near bottom (before footer)
- [x] Ensure proper spacing and visual hierarchy
