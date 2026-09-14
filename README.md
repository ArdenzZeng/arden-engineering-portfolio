# Arden Zeng — Engineering Portfolio

A static, responsive portfolio designed for engineering recruiting. Content and presentation are intentionally separated so the site can grow without restructuring the layout.

## Update the content

Edit `src/portfolio-data.js` to add projects, experience, coursework, or contact links. Each project automatically appears in the interactive project explorer and can be opened for more detail.

For contact entries, replace the placeholder `value` and add the full `href`, for example:

```js
{
  label: "Email",
  value: "name@princeton.edu",
  href: "mailto:name@princeton.edu",
}
```

## Build and validate

```bash
npm run build
npm run check
```
