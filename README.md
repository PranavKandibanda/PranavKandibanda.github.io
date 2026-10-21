# Pranav Kandibanda — Engineering Intelligence Into Motion

An interactive personal engineering portfolio focused on robotics projects, research, leadership, and service. It uses React/TypeScript with purposeful Three.js scenes built using React Three Fiber and Drei. GSAP ScrollTrigger synchronizes the hero robot scene with the first scroll.

## Develop and build

```sh
npm install
npm run dev
npm run build
```

`npm run build` type checks the application, writes a production build to `dist/`, then copies the GitHub Pages output to the repository root. The build step refreshes only the generated asset directory and site output files. `dist/` and `node_modules/` are ignored by Git.

## Source structure

- `app/src/App.tsx` — hero, project studies, compact autonomy study, experience, impact, and contact
- `app/src/components/AutonomyScene.tsx` — scroll controlled navigation world
- `app/src/components/ConceptModel.tsx` — inspectable, illustrative robot concepts
- `app/src/styles.css` — design system and responsive layout
- `app/public/resume.html` — curated, printable web résumé
- `app/public/fonts/` — locally hosted DM Sans and IBM Plex Mono with licenses
- `scripts/publish-local.mjs` — prepares root files for GitHub Pages

## Editorial and visual integrity

The 3D robots, routes, particles, LiDAR rays, and charts are educational concept visualizations. They do not reproduce project hardware, recordings, algorithms, or unpublished benchmark results. The cargo and weed robot pages clearly identify systems still in development. The AnthroPilot 14% speed figure is held out pending a supporting benchmark. Public repository links point only to identified repositories; the VEX team code is not labeled as PKLib's own repository.

The primary content remains available if WebGL fails or motion is reduced. On less capable devices the 3D scenes use lower render quality. Keyboard navigation, semantic headings, visible focus states, and a skip link are included.
