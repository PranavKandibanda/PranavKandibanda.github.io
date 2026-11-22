# Pranav Kandibanda — engineering portfolio

An editorial portfolio for robotics, autonomous navigation, embedded systems, research, and community work. Built with React, TypeScript, and Vite; hosted from the repository root on GitHub Pages.

## Development

```sh
npm install
npm run dev
npm run build
```

`npm run build` type checks and builds the site, then refreshes `index.html`, `resume.html`, `favicon.svg`, `build-assets/`, `fonts/`, and `media/` in the repository root. Commit those generated files with source changes when preparing a deployment. The build does not push or deploy.

## Editing content

- `app/src/content.ts`: featured projects, smaller projects, experience, recognition, and contact links.
- `app/src/App.tsx`: page sections and project illustrations.
- `app/src/styles.css`: typography, color, layout, and responsive rules.
- `app/public/media/`: user-provided GHOST event photographs and the robotic arm CAD image from Pranav's Blueprint journal.
- `app/public/resume.html`: printable web résumé.

Project diagrams are clearly labeled conceptual. The cargo and weed robots are presented as work in progress. The AnthroPilot performance percentages, the GHOST Think Award, and the later Innovate Award are withheld until supporting records are available. Add a verified personal LinkedIn URL to `contact.linkedin` when supplied.
