import { sitePath, withoutBasePath } from '@/utils/paths';

export type Locale = 'en' | 'pt';

export function localeFromPath(path: string): Locale {
  return /^\/pt(?:\/|$)/.test(withoutBasePath(path)) ? 'pt' : 'en';
}

export function withoutLocalePath(path: string): string {
  return withoutBasePath(path).replace(/^\/pt(?=\/|$)/, '') || '/';
}

/** Page destinations follow the locale; shared media and technical files do not. */
export function localePath(value: string, locale: Locale): string {
  if (!value.startsWith('/') || value.startsWith('//')) return value;
  const route = withoutLocalePath(value);
  if (/\.[a-z0-9]+(?:[?#]|$)/i.test(route)) {
    if (locale === 'pt' && (route === '/cv-summary.md' || route.startsWith('/downloads/'))) {
      return sitePath(route.replace(/(?<!\.pt)\.md(?=[?#]|$)/, '.pt.md'))!;
    }
    return sitePath(route)!;
  }
  return sitePath(locale === 'pt' ? `/pt${route}` : route)!;
}
