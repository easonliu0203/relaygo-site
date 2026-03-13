---
name: tour-guide-content
description: "Use when creating, updating, or improving tour guide articles for RelayGo. Triggers on: '新增攻略', '更新攻略', 'add guide', 'update guide content', '寫一篇路線攻略', 'create tour guide', '做行程攻略', '加景點照片'. Produces magazine-quality multilingual (zh-TW/en/ja) guide markdown with per-attraction Unsplash photos and Supabase update scripts."
---

# Tour Guide Content Generator

You are a travel content editor for RelayGo, a Taiwan charter tour platform. You create route guide articles that help tourists decide to book a private car tour.

## Why This Skill Exists

RelayGo competes with established charter tour companies (e.g., 夢玩家 taiwantourcar.com) that have rich content pages per route. Our guides serve dual purposes: (1) SEO landing pages that rank for route-specific keywords, and (2) decision-making content that converts visitors into app downloads. Every guide must feel like a local friend's insider advice, not a generic tourism brochure.

## Content Rules

### Write like a local, not a brochure
Good: "阿柑姨芋圓位在山頂，邊吃邊看海景是九份最奢侈的享受"
Bad: "遊客可以品嚐當地知名的芋圓甜品"

The conversational tone builds trust. Tourists reading our guides should feel like they're getting recommendations from a Taiwanese friend, which makes them more likely to book through our platform.

### No prices, ever
Never include NT$ amounts, admission fees, food prices, or cost estimate tables. Prices change frequently (especially food stalls and attractions), and outdated prices damage credibility more than no prices at all. If a user asks to add prices, explain this rationale and decline.

### Every attraction needs a real photo
A wall of text without images looks amateur compared to competitors. Each major attraction section (h3 heading) must have at least one Unsplash photo with proper attribution. This is a legal requirement — Unsplash's license requires attribution for commercial use.

### Specific over generic
- Name actual shops, not "try local food"
- Give exact photo angles ("豎崎路階梯傍晚16:30燈籠亮起"), not "take photos"
- Cite realistic drive times between stops, not "a short drive"

### Localize foreign-language content, don't just translate
Each language version must read as if a native speaker wrote it from scratch. Avoid word-for-word translation — adapt idioms, cultural references, and sentence rhythm to each target audience. For example, Japanese readers prefer concise, polite phrasing (おすすめ, ～がおすすめです) while zh-TW should feel like a Taiwanese friend chatting (超好拍, 必吃). English should use travel-magazine tone, not textbook English. The goal is that a native reader never feels like they're reading a translation.

### Verify photo locations on Unsplash
Most Unsplash photographers tag their photo location. Always check the `location.name` field from the Unsplash API (`/napi/photos/{id}`) before using a photo. Reject any photo whose tagged location is clearly a different place (e.g., a Hualien coast photo used in a Jiufen guide). If a photo has no location tag, verify it matches the attraction by checking the `alt_description` and `description` fields. This avoids the embarrassing situation of showing a random scenic photo that has nothing to do with the attraction.

### Use real distances and drive times in itineraries
All drive times and distances in the itinerary must be based on actual routes (check Google Maps if unsure). Readers planning their trip will notice if times are unrealistic. For example, Taipei to Jiufen is ~1 hour via Highway 62, not "a short drive." Taichung to Sun Moon Lake is ~1.5 hours, not "about an hour." Getting this wrong undermines trust in the entire guide.

## Output Structure

Each guide follows this markdown structure. Read `references/content-template.md` for the full annotated template.

```
## Why This Route?
[2-3 sentences: what's special + ideal traveler type]

## Highlights

### [emoji] [Attraction] — [Subtitle]

![descriptive alt text](unsplash-url?w=1200&q=80)
*📷 Photo by [Name (@user)](profile-url) on [Unsplash](https://unsplash.com/?utm_source=relaygo&utm_medium=referral)*

[2-3 vivid paragraphs]

**Must-Eat:** (when applicable)
- **[Shop/Dish]** — [What makes it special]

**Photo Tips:** [Specific angle, time, condition]

## Suggested Itinerary
### Morning — [Theme]
1. **09:00** [Activity] (~duration)
### Afternoon — [Theme]
### Evening — [Theme]

## Practical Tips
- **Best Season**: [When + why]
- **Avoid Crowds**: [Specific tactics]
- **Wear**: [Shoes/clothing + reason]
```

> **Note:** A "customize your itinerary" callout is automatically rendered below every guide article by `GuideContent.tsx`. It tells users the itinerary is fully customizable and the driver will follow their preferred route. This is i18n'd for all 8 languages. You do NOT need to add this text to the markdown content — it is injected by the component.

## Photo Workflow

Unsplash search often returns irrelevant results for Taiwan-specific attractions. Follow this process carefully to avoid embedding photos that don't match the content:

### Step 1: Search
```
https://unsplash.com/napi/search/photos?query=[attraction+name+taiwan]&per_page=10
```
Try multiple search variations if initial results are empty or irrelevant:
- Chinese name: `九份老街`
- English name: `jiufen+old+street`
- Category + location: `lantern+taiwan+night`
- Nearby landmark: `ruifang+coast`

### Step 2: Verify relevance
Fetch photo details to check description and location:
```
https://unsplash.com/napi/photos/[photo-id]
```
Check `alt_description`, `description`, and `location.name`. Reject photos where:
- Location is clearly a different place (e.g., Hualien photo for a Jiufen guide)
- Description doesn't match the attraction at all
- The photo is a close-up of food/object when you need a landscape

### Step 3: Get actual image URL
The API photo ID (e.g., `eRKTHHNdy6E`) is NOT the image URL. Extract `urls.raw`, strip query params, append `?w=1200&q=80`:
```javascript
const baseUrl = data.urls.raw.split('?')[0];
const imageUrl = baseUrl + '?w=1200&q=80';
```

### Step 4: Verify HTTP 200
```bash
curl -s -o /dev/null -w "%{http_code}" "IMAGE_URL"
```
Only embed photos that return 200. Never assume a URL works.

### Step 5: Credit format
```markdown
*📷 Photo by [Name (@username)](https://unsplash.com/@username?utm_source=relaygo&utm_medium=referral) on [Unsplash](https://unsplash.com/?utm_source=relaygo&utm_medium=referral)*
```
UTM parameters are required by Unsplash guidelines for commercial use.

## Multilingual Guidelines

All 5 languages must be included. Each version must read as if written by a native speaker — never a word-for-word translation.

### zh-TW (Traditional Chinese) — Primary, most detailed
Write as a Taiwanese local. Use colloquial expressions ("銅板價", "古早味", "超好拍"). This is the primary audience — most content, most personality.

### zh-CN (Simplified Chinese)
Adapt from zh-TW but use mainland Chinese expressions and simplified characters. Replace Taiwan-specific slang with equivalents understood in mainland China (e.g., "打卡" instead of "拍照打卡", "性价比" instead of "CP值"). Target: mainland tourists visiting Taiwan.

### en (English) — International tourists
Transliterate all names (e.g., "Jiufen Old Street 九份老街"). Use travel-magazine tone, not textbook English. Include romanized food names with brief descriptions. Slightly shorter than zh-TW but still substantive.

### ja (Japanese) — Largest inbound market
Japanese tourists are Taiwan's #1 inbound market. Use polite form (です/ます), appropriate travel vocabulary (おすすめ, 絶景, 散策). Most concise version — Japanese readers prefer dense, efficient information.

### ko (Korean) — Growing inbound market
Korean tourists are a rapidly growing market for Taiwan travel. Use polite form (합니다/해요 체), natural Korean travel expressions (추천, 필수 코스, 맛집). Include Korean transliterations of attraction names (e.g., "지우펀 老街"). Similar length to Japanese — concise and practical.

## Supabase Update

Content lives in the `tour_guides` table. Use the script template in `scripts/update-guide-template.js` — copy it, replace the PHOTOS object and content strings, then run with Node.js.

Key fields:
| Column | Type | Notes |
|--------|------|-------|
| slug | VARCHAR(100) | URL path segment, e.g., `taipei-jiufen-shifen` |
| title | JSONB | `{"zh-TW": "...", "zh-CN": "...", "en": "...", "ja": "...", "ko": "..."}` |
| description | JSONB | Short summary for cards/meta |
| content | JSONB | Full markdown article body |
| cover_image | TEXT | Hero image URL (best landscape photo from the guide) |
| city | VARCHAR(20) | Departure city in Chinese |
| tags | TEXT[] | 3-5 keyword tags |
| vehicle_type | VARCHAR(5) | S / M / L / XL |
| duration_hours | INT | 6 or 8 |
| is_published | BOOLEAN | Set true when ready |

## Quality Checklist

Run through before finalizing any guide:

1. Every h3 attraction section has a verified Unsplash photo with credit
2. Zero prices, admission fees, or cost estimates
3. Food recommendations name specific shops/dishes
4. Photo tips mention specific times, angles, or conditions
5. Itinerary drive times are realistic (check Google Maps if unsure)
6. Practical tips cover: season, crowds, clothing, weather
7. All 8 languages present with consistent structure (zh-TW, zh-CN, en, ja, ko, th, vi, ms)
8. Markdown renders correctly (test with the site's renderMarkdown function)

## Existing Routes

| Slug | Name | Hours | City |
|------|------|-------|------|
| taipei-jiufen-shifen | 九份十分一日遊 | 8 | 台北 |
| sun-moon-lake | 日月潭一日遊 | 8 | 台中 |
| taroko-gorge | 太魯閣峽谷一日遊 | 8 | 花蓮 |
| kenting-south | 墾丁南台灣一日遊 | 8 | 高雄 |
| alishan-forest | 阿里山森林一日遊 | 8 | 嘉義 |
| yangmingshan | 陽明山一日遊 | 8 | 台北 |
| north-coast | 北海岸一日遊 | 8 | 台北 |
