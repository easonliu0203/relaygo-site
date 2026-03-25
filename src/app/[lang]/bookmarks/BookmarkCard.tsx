'use client';

import type { TravelBookmark } from '@/lib/bookmarks';
import { localizedCategory, categoryIcon } from '@/lib/bookmark-categories';
import { localizedCityBySlug, localizedCountry } from '@/lib/bookmark-locations';

const PLATFORM_LABELS: Record<string, string> = {
  instagram: 'Instagram',
  facebook: 'Facebook',
  x: 'X',
  tiktok: 'TikTok',
  threads: 'Threads',
  xiaohongshu: '小紅書',
  other: 'Link',
};

const PLATFORM_COLORS: Record<string, string> = {
  instagram: '#E4405F',
  facebook: '#1877F2',
  x: '#000000',
  tiktok: '#000000',
  threads: '#000000',
  xiaohongshu: '#FF2442',
  other: '#6C63FF',
};

interface Props {
  bookmark: TravelBookmark;
  lang: string;
  index: number;
  isFavorited?: boolean;
  onToggleFavorite?: (bookmarkId: string) => void;
}

export default function BookmarkCard({ bookmark, lang, index, isFavorited, onToggleFavorite }: Props) {
  const cats = bookmark.category.split(',').filter(Boolean);
  const mainCat = cats[0] || bookmark.category;
  const icon = categoryIcon(mainCat);
  const city = localizedCityBySlug(bookmark.country_slug, bookmark.city_slug, lang);
  const country = localizedCountry(bookmark.country_slug, lang);
  const platform = PLATFORM_LABELS[bookmark.platform] || bookmark.platform;
  const platformColor = PLATFORM_COLORS[bookmark.platform] || '#6C63FF';

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleFavorite?.(bookmark.id);
  };

  return (
    <a
      href={bookmark.url}
      target="_blank"
      rel="noopener noreferrer"
      className="bm-card"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <div className="bm-card-img">
        {bookmark.thumbnail_url ? (
          <img src={bookmark.thumbnail_url} alt={bookmark.title || ''} loading="lazy" />
        ) : (
          <div className="bm-card-placeholder">
            <span>{icon}</span>
          </div>
        )}
        <span className="bm-card-platform" style={{ backgroundColor: platformColor }}>
          {platform}
        </span>
        {onToggleFavorite && (
          <button
            className={`bm-card-fav ${isFavorited ? 'active' : ''}`}
            onClick={handleFavorite}
            aria-label="Favorite"
          >
            {isFavorited ? '♥' : '♡'}
          </button>
        )}
      </div>
      <div className="bm-card-body">
        <div className="bm-card-tags">
          {cats.map((c) => (
            <span key={c} className="bm-card-cat">{categoryIcon(c)} {localizedCategory(c, lang)}</span>
          ))}
          <span className="bm-card-loc">{city}, {country}</span>
        </div>
        {bookmark.author && <span className="bm-card-author">@{bookmark.author}</span>}
        {bookmark.title && <h3 className="bm-card-title">{bookmark.title}</h3>}
        {bookmark.description && <p className="bm-card-desc bm-card-desc-full">{bookmark.description}</p>}
        {bookmark.district && <span className="bm-card-district">{bookmark.district}</span>}
      </div>
    </a>
  );
}
