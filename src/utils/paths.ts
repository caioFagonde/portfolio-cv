const base = import.meta.env.BASE_URL.replace(/\/$/, '');

/** Prefix local destinations once. Leave external URLs, mail and anchors intact. */
export function sitePath(value: string | URL | undefined): string | undefined {
  if (value === undefined) return undefined;
  const path = String(value);
  if (!base || !path.startsWith('/') || path.startsWith('//') || path === base || path.startsWith(`${base}/`)) return path;
  return `${base}${path}`;
}

export function withoutBasePath(path: string): string {
  return base && (path === base || path.startsWith(`${base}/`)) ? path.slice(base.length) || '/' : path;
}
