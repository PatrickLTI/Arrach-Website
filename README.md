# Arraches Guild Site (scaffold)

This repository is a minimal Next.js scaffold for a bilingual (EN/FR) guild website with a gallery and events page.

Quick start:

```bash
npm install
npm run dev
```

Notes & next steps:
- Copy your theme images from your workspace `Arache Images/arraches_theme` into `public/arraches_theme`.
- The gallery page expects images named `image1.jpg`, `image2.jpg`, ... — you can edit `pages/gallery.js` to list actual filenames.
- I will add Discourse integration and SSO next. See `docker/discourse-docker.md` for guidance.
