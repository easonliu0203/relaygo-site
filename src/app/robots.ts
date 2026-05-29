import type { MetadataRoute } from 'next';

// AI crawlers we block from /cases (text content can be indexed via main bots;
// we just don't want service photos showing up in AI search results).
const AI_USER_AGENTS = [
  'GPTBot',           // OpenAI training crawler
  'ChatGPT-User',     // ChatGPT plugin / browsing
  'OAI-SearchBot',    // OpenAI SearchGPT
  'PerplexityBot',    // Perplexity
  'Perplexity-User',  // Perplexity user-initiated
  'ClaudeBot',        // Anthropic crawler
  'anthropic-ai',     // Legacy Anthropic
  'Claude-Web',       // Anthropic browser
  'Google-Extended',  // Google AI training (Gemini, etc.) opt-out
  'Applebot-Extended',// Apple AI training
  'FacebookBot',      // Meta AI
  'Meta-ExternalAgent',
  'Bytespider',       // ByteDance / TikTok
  'Amazonbot',        // Amazon (Rufus, etc.)
  'cohere-ai',        // Cohere
  'Diffbot',
  'Omgilibot',
  'Omgili',
  'CCBot',            // Common Crawl (used by many AI trainers)
];

const CASES_PATHS = [
  '/cases',
  '/cases/*',
  '/*/cases',
  '/*/cases/*',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          // Customer-only booking flow — not for search indexing
          '/booking',
          '/booking/*',
          '/*/booking',
          '/*/booking/*',
          // Deep bookmark URLs (≥3 layers) — keep crawl budget for top pages
          '/bookmarks/*/*/*',
          '/*/bookmarks/*/*/*',
        ],
      },
      // Block AI crawlers from /cases (text on the page is still indexable
      // via normal search bots; AI-specific bots are denied entirely on /cases
      // to keep customer photos out of AI image results).
      ...AI_USER_AGENTS.map((userAgent) => ({
        userAgent,
        disallow: CASES_PATHS,
      })),
    ],
    sitemap: 'https://relaygo.pro/sitemap.xml',
  };
}
