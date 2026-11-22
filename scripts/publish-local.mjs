import { cpSync, existsSync, rmSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = resolve(root, 'dist');
const assets = resolve(root, 'build-assets');
const fonts = resolve(root, 'fonts');
const media = resolve(root, 'media');

if ([assets, fonts, media].some(path => dirname(path) !== root) || !existsSync(resolve(dist, 'index.html'))) {
  throw new Error('Unexpected build paths; refusing to publish local files.');
}

rmSync(assets, { recursive: true, force: true });
rmSync(fonts, { recursive: true, force: true });
rmSync(media, { recursive: true, force: true });
for (const name of ['index.html', 'favicon.svg', 'resume.html', 'build-assets', 'fonts', 'media']) {
  cpSync(resolve(dist, name), resolve(root, name), { recursive: true, force: true });
}
console.log('GitHub Pages files refreshed in repository root.');
