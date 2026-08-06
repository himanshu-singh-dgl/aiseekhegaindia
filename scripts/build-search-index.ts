import fs from 'node:fs/promises';
import path from 'node:path';
import { buildSearchIndex } from '../lib/content/build-search-index';

async function main() {
  const index = await buildSearchIndex();
  const outPath = path.join(process.cwd(), 'public/search-index.json');
  await fs.writeFile(outPath, JSON.stringify(index, null, 2));
  console.log(`Wrote ${index.length} documents to public/search-index.json`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
