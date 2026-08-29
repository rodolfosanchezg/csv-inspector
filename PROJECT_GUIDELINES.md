# CSV Inspector Project Guidelines

## Project objective

CSV Inspector is a small educational browser application that will let users select a CSV file, process it locally, and view its record and column counts.

## Technology stack

- HTML
- CSS
- Vanilla JavaScript

There is no backend.

## Code organization

- `index.html` contains the page structure and links project assets.
- `css/styles.css` contains styles.
- `js/csv-counting.js` contains reusable CSV record and column counting helpers.
- `js/app.js` contains client-side behavior.
- `tests/counting-tests.html` and `tests/counting-tests.js` provide browser-based tests.

The project uses classic browser scripts, so load `js/csv-counting.js` before
`js/app.js` or the test runner.

## Development principles

- Do not use frameworks.
- Do not add external libraries unless explicitly approved.
- Keep functions small, focused, and understandable.
- Explain important implementation decisions.
- Do not implement functionality beyond the requested step.
