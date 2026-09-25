// guide.tags are stored in Chinese only (e.g. "台北包車"). Showing them on
// /en, /ja, /ko … puts off-language text in the page and its meta keywords,
// so they're only surfaced on the Chinese locales.
export function tagsForLocale(tags: string[] | null | undefined, lang: string): string[] {
  return lang === 'zh-TW' || lang === 'zh-CN' ? tags || [] : [];
}
