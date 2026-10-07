import { parseFragment, serialize, type DefaultTreeAdapterMap } from 'parse5';
import translations from './pt.json';
import { localePath, type Locale } from './locale';

const dictionary: Record<string, string> = translations;
const normalize = (value: string) => value.replace(/\s+/g, ' ').trim();

export function translate(value: string, locale: Locale): string {
  if (locale === 'en') return value;
  const key = normalize(value);
  const translated = dictionary[key];
  if (translated === undefined) return value;
  return `${value.match(/^\s*/)?.[0] ?? ''}${translated}${value.match(/\s*$/)?.[0] ?? ''}`;
}

type Node = DefaultTreeAdapterMap['node'];
const attributes = new Set(['alt', 'aria-label', 'placeholder', 'title', 'data-caption', 'data-text', 'data-area']);
const untouched = new Set(['script', 'style', 'code', 'pre']);

/** Translate trusted, repo-rendered content at build time, never visitor input.
 * An HTML parser keeps text, URLs, code, and client data separate. The browser
 * receives complete localized HTML and does not download the prose catalog.
 */
export function localizeHtml(html: string, locale: Locale): string {
  if (locale === 'en') return html;
  const fragment = parseFragment(html, { scriptingEnabled: false });
  const text = (node: Node): string => 'value' in node ? node.value : 'childNodes' in node ? node.childNodes.map(text).join(' ') : '';
  const visit = (node: Node) => {
    if ('value' in node) { node.value = translate(node.value, locale); return; }
    if ('tagName' in node) {
      if (untouched.has(node.tagName)) return;
      const attr = (name: string) => node.attrs.find((item) => item.name === name);
      for (const item of node.attrs) {
        if (attributes.has(item.name) || (node.tagName === 'input' && item.name === 'value')) item.value = translate(item.value, locale);
        if (item.name === 'href' && !attr('hreflang')) item.value = localePath(item.value, locale);
        if (item.name === 'data-details') item.value = JSON.stringify((JSON.parse(item.value) as string[]).map((value) => translate(value, locale)));
      }
      if (node.tagName === 'time' && attr('datetime')) {
        const date = new Date(`${attr('datetime')!.value.slice(0, 10)}T12:00:00Z`);
        if (!Number.isNaN(date.valueOf()) && node.childNodes[0]?.nodeName === '#text') {
          (node.childNodes[0] as DefaultTreeAdapterMap['textNode']).value = date.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
        }
      }
      node.childNodes.forEach(visit);
      // Search accepts the original stack terms and the visible Portuguese copy.
      if (attr('data-search')) attr('data-search')!.value += ` ${normalize(text(node)).toLowerCase()}`;
      return;
    }
    if ('childNodes' in node) node.childNodes.forEach(visit);
  };
  visit(fragment);
  return serialize(fragment);
}
