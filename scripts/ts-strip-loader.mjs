import { access } from 'node:fs/promises';
import { extname } from 'node:path';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

/** Resolve extensionless local TypeScript imports for Node's native type stripping. */
export async function resolve(specifier, context, nextResolve) {
  if (specifier.startsWith('.') && !extname(specifier)) {
    try {
      const candidate = new URL(`${specifier}.ts`, context.parentURL);
      await access(candidate);
      return nextResolve(candidate.href, context, nextResolve);
    } catch {
      // Fall through to Node's normal resolver for non-TypeScript imports.
    }
  }
  return nextResolve(specifier, context, nextResolve);
}

export async function load(url, context, nextLoad) {
  if (url.endsWith('.json')) {
    const source = await readFile(fileURLToPath(url), 'utf8');
    return { format: 'module', source: `export default ${source};`, shortCircuit: true };
  }
  return nextLoad(url, context, nextLoad);
}
