// Central site settings. Edit names, links and contact details here;
// every page reads from this file.

export const SITE = {
  name: 'Alexercise',
  tagline: 'Személyi edzés, ami beleillik az életedbe',
  description:
    'Alexercise: személyi edzés és online coaching. Egyéni edzésterv, követhető fejlődés és saját edzésnapló alkalmazás.',
  lang: 'hu',
  locale: 'hu_HU',
  coach: 'Alex',
  // TODO(Alex): replace the placeholder contact details below.
  email: 'hello@example.com',
  phone: '',
  instagram: '',
  location: '',
  // Optional: a form-handling endpoint (e.g. Formspree, Netlify Forms) for the contact form.
  // Left empty, the form opens the visitor's email app with the message filled in.
  formAction: '',
  app: {
    url: 'https://alexercise.app',
    loginUrl: 'https://alexercise.app/login',
  },
} as const;

export const NAV = [
  { href: '/', label: 'Főoldal' },
  { href: '/szolgaltatasok', label: 'Szolgáltatások' },
  { href: '/alkalmazas', label: 'Alkalmazás' },
  { href: '/blog', label: 'Blog' },
  { href: '/rolam', label: 'Rólam' },
] as const;
