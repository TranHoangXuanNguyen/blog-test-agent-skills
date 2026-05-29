// Generates a mapping from asset filename -> resolved URL using Vite's import.meta.glob
// This lets runtime code reference images by filename (e.g. transcluded ![[img.png]])
// Use new glob options: `query: '?url'` and `import: 'default'` (replaces deprecated `as: 'url'`).
const modules = import.meta.glob('../assets/*', { query: '?url', import: 'default', eager: true }) as Record<string, string>;

const map: Record<string, string> = {};
for (const p in modules) {
  const parts = p.split('/');
  const name = parts[parts.length - 1];
  map[name] = modules[p];
}

export default map;
