# PRX Projects Lead-Generation Website

React + Vite website for PRX Projects, focused on quote requests through WhatsApp and contact forms.

## Run Locally

```text
npm install --cache .\.npm-cache
npm run dev -- --host 127.0.0.1 --port 5173
```

Local URL:

```text
http://127.0.0.1:5173/
```

## Edit Business Details

Update this file:

```text
src/config/siteData.js
```

It contains:

- business name, phone, WhatsApp number, email, website and location,
- service pages and WhatsApp messages,
- FAQs,
- reviews,
- gallery items,
- stats,
- SEO page titles and descriptions.

## Main Files

```text
index.html
package.json
src/main.jsx
src/App.jsx
src/styles.css
src/config/siteData.js
src/components/
src/pages/
public/images/
```

The `public/images/` folder contains the downloaded project photos used across the hero, service cards and gallery.

## Form Handling

Quote forms currently log submissions to the browser console. In `src/components/QuoteForm.jsx`, connect a real service later where the comment marks the integration point.
