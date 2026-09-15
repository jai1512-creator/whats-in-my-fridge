import { FridgeItem, RecentlyCookedItem, UserPreferences } from '../types';

const STORAGE_KEYS = {
  FRIDGE_ITEMS: 'wimf_fridge_items_v4',
  PREFERENCES: 'wimf_preferences_v4',
  FAVORITES: 'wimf_favorites_v4',
  RECENTLY_COOKED: 'wimf_recently_cooked_v4',
};

export const DEFAULT_PREFERENCES: UserPreferences = {
  dietary: 'all',
  cookingTime: 'all',
  difficulty: 'all',
  mealType: 'all',
  spiceLevel: 'all',
  cuisine: 'all',
  assumePantryStaples: true,
};

// Basic starter fridge items for first-time visitors (just everyday essentials: Milk & Bread)
export const STARTER_FRIDGE_ITEMS: FridgeItem[] = [
  { id: 'milk', name: 'Milk', category: 'dairy', emoji: '🥛', addedAt: Date.now() },
  { id: 'bread', name: 'Bread', category: 'grains', emoji: '🍞', addedAt: Date.now() },
];

const isBrowserStorageAvailable = (): boolean => {
  return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
};

export const storageService = {
  // --- Fridge Items ---
  getFridgeItems(): FridgeItem[] {
    if (!isBrowserStorageAvailable()) return STARTER_FRIDGE_ITEMS;
    try {
      // Clean up legacy keys from previous sessions to avoid stale fridge
      localStorage.removeItem('wimf_fridge_items_v1');
      localStorage.removeItem('wimf_preferences_v1');
      localStorage.removeItem('wimf_fridge_items_v2');
      localStorage.removeItem('wimf_preferences_v2');
      localStorage.removeItem('wimf_fridge_items_v3');
      localStorage.removeItem('wimf_preferences_v3');

      const data = localStorage.getItem(STORAGE_KEYS.FRIDGE_ITEMS);
      if (data === null) {
        // First time visitor: initialize with basic everyday essentials (Milk & Bread)
        this.saveFridgeItems(STARTER_FRIDGE_ITEMS);
        return STARTER_FRIDGE_ITEMS;
      }
      const parsed = JSON.parse(data);
      if (!Array.isArray(parsed)) {
        this.saveFridgeItems(STARTER_FRIDGE_ITEMS);
        return STARTER_FRIDGE_ITEMS;
      }
      // Return parsed even if empty array [] - preserves user's empty fridge across refreshes!
      return parsed;
    } catch {
      return STARTER_FRIDGE_ITEMS;
    }
  },

  saveFridgeItems(items: FridgeItem[]): void {
    if (!isBrowserStorageAvailable()) return;
    try {
      localStorage.setItem(STORAGE_KEYS.FRIDGE_ITEMS, JSON.stringify(items));
    } catch (e) {
      console.error('Failed to persist fridge items', e);
    }
  },

  resetFridgeToStarter(): FridgeItem[] {
    this.saveFridgeItems(STARTER_FRIDGE_ITEMS);
    return STARTER_FRIDGE_ITEMS;
  },

  clearFridge(): FridgeItem[] {
    this.saveFridgeItems([]);
    return [];
  },

  // --- User Preferences ---
  getPreferences(): UserPreferences {
    // Ephemeral discovery filters reset to DEFAULT_PREFERENCES on reload/refresh
    // so user is never permanently stuck in restrictive filtered views (e.g. mealType: 'breakfast').
    return { ...DEFAULT_PREFERENCES };
  },

  resetPreferences(): UserPreferences {
    this.savePreferences(DEFAULT_PREFERENCES);
    return DEFAULT_PREFERENCES;
  },

  savePreferences(prefs: UserPreferences): void {
    if (!isBrowserStorageAvailable()) return;
    try {
      localStorage.setItem(STORAGE_KEYS.PREFERENCES, JSON.stringify(prefs));
    } catch (e) {
      console.error('Failed to persist preferences', e);
    }
  },

  // --- Favorite Recipe IDs ---
  getFavorites(): string[] {
    if (!isBrowserStorageAvailable()) return ['creamy-garlic-pasta', 'spicy-garlic-noodles'];
    try {
      const data = localStorage.getItem(STORAGE_KEYS.FAVORITES);
      if (!data) return ['creamy-garlic-pasta', 'spicy-garlic-noodles'];
      return JSON.parse(data);
    } catch {
      return ['creamy-garlic-pasta', 'spicy-garlic-noodles'];
    }
  },

  saveFavorites(ids: string[]): void {
    if (!isBrowserStorageAvailable()) return;
    try {
      localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(ids));
    } catch (e) {
      console.error('Failed to persist favorites', e);
    }
  },

  toggleFavorite(recipeId: string): string[] {
    const current = this.getFavorites();
    const updated = current.includes(recipeId)
      ? current.filter(id => id !== recipeId)
      : [...current, recipeId];
    this.saveFavorites(updated);
    return updated;
  },

  // --- Recently Cooked ---
  getRecentlyCooked(): RecentlyCookedItem[] {
    if (!isBrowserStorageAvailable()) return [];
    try {
      const data = localStorage.getItem(STORAGE_KEYS.RECENTLY_COOKED);
      if (!data) {
        return [
          {
            id: 'demo-cooked-1',
            recipeId: 'classic-herb-omelette',
            recipeName: 'Fluffy French Herb & Cheese Omelette',
            recipeImage: 'https://images.unsplash.com/photo-1510693206972-df098062cb71?auto=format&fit=crop&w=600&q=80',
            totalTimeMinutes: 7,
            cookedAt: Date.now() - 1000 * 60 * 60 * 24 * 2, // 2 days ago
            rating: 5,
          }
        ];
      }
      return JSON.parse(data);
    } catch {
      return [];
    }
  },

  addRecentlyCooked(item: Omit<RecentlyCookedItem, 'id' | 'cookedAt'>): RecentlyCookedItem[] {
    if (!isBrowserStorageAvailable()) return [];
    try {
      const current = this.getRecentlyCooked();
      const newItem: RecentlyCookedItem = {
        ...item,
        id: `cooked-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        cookedAt: Date.now(),
      };
      // Keep up to 20 recent items, most recent first
      const updated = [newItem, ...current.filter(c => c.recipeId !== item.recipeId)].slice(0, 20);
      localStorage.setItem(STORAGE_KEYS.RECENTLY_COOKED, JSON.stringify(updated));
      return updated;
    } catch (e) {
      console.error('Failed to add recently cooked item', e);
      return [];
    }
  },

  clearRecentlyCooked(): void {
    if (!isBrowserStorageAvailable()) return;
    try {
      localStorage.removeItem(STORAGE_KEYS.RECENTLY_COOKED);
    } catch (e) {
      console.error('Failed to clear history', e);
    }
  }
};
