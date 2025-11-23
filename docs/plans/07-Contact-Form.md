Create Plan 7 - "Contact Form"
Plan Name: "Contact Form with File Upload"
Plan Description:
Build a functional contact form with client-side validation, file upload
for 3D models (STL/OBJ), and server action for form submission.

Tasks:
Task 1: Contact Form Component
Create components/sections/Contact/ContactForm.tsx:
- Client component with form state
- Fields: name, email, phone, project type (dropdown: Prototyping, Custom Parts, Design Services, Quote Request), message
- File upload for 3D models (STL, OBJ, STEP files) - optional
- Use shadcn Input, Textarea, Select components
- Glassmorphism styling (theme-aware):
  * Light: bg-white border border-slate-200 shadow-md
  * Dark: dark:bg-white/5 dark:backdrop-blur-md dark:border-white/10
- Cyan submit button (bg-cyan-500 hover:bg-cyan-600 text-white)
- Loading state during submission with spinner
- Success/error messages with animations
- Sharp corners (rounded-md)

Task 2: Form Validation
Add validation to ContactForm:
- Required fields validation (name, email, message)
- Email format validation
- Min length for message (20 chars)
- File size limit (max 50MB for 3D models)
- File type validation (only .stl, .obj, .step)
- Display error messages below fields (text-red-400)
- Disable submit button until valid

Task 3: Server Action
Create app/actions/contact.ts:
- Server action to handle form submission
- Validate data server-side
- Handle file upload to /public/uploads or cloud storage
- For now, console.log the data (later connect to email service)
- Return success/error response with proper types

Task 4: Contact Section
Create components/sections/Contact.tsx:
- Section heading: "Let's Build Together" (gradient text)
- Subheading: "Upload your design or tell us about your project"
  * Light: text-slate-600
  * Dark: dark:text-slate-400
- ContactForm component
- Contact info sidebar: email, phone, response time
- Two column layout on desktop (form + info)
- Glassmorphism cards (theme-aware)

Task 5: Add to Homepage

Update app/page.tsx:
- Add Contact section near bottom (before footer)
- Ensure proper spacing and visual hierarchy