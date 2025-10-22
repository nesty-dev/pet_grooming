# Tech Standards – Pet Theme

Technical guidelines for using and modifying this HTML + Tailwind CSS theme.

---

## ✅ Stack

- HTML5 (semantic)
- Tailwind CSS (via CDN)
- No build tools, no JS frameworks

---

## 📁 Structure

pet-theme/
├── index.html
├── assets/
│ ├── css/
│ ├── js/
│ └── images/
└── components/

---

## 🧱 HTML Rules

- Use semantic tags: `<header>`, `<main>`, `<section>`, `<footer>`
- Only one `<h1>` per page
- Use consistent 2-space indentation
- Keep class usage clear (avoid cluttered utility chains)
- Group related sections logically (comment if needed)

---

## 🎨 Tailwind Rules

- Use Tailwind utility classes only
- Use responsive prefixes: `sm:`, `md:`, `lg:`
- Stick to project color palette (orange/yellow/blue/gray)
- Avoid inline styles

---

## 🧼 Clean Code Tips

- Remove unused code and files
- Keep file and class names readable
- Separate layout logic (Tailwind) from content structure
- Avoid nesting too deep or unnecessary divs

---

## 📱 Responsive

- Mobile-first design
- No horizontal scroll on mobile
- Test breakpoints across common devices

---

## ✅ Deployment

- Fully static, ready to upload
- Compatible with any hosting (Netlify, Vercel, etc.)
