import { openDB, DBSchema, IDBPDatabase } from 'idb';
import { ArticleData } from '@/types';

interface EditorDB extends DBSchema {
  articles: {
    key: string;
    value: ArticleData;
    indexes: { 'by-updated': string };
  };
  autosave: {
    key: string;
    value: {
      articleId: string;
      content: any;
      title: string;
      timestamp: number;
    };
  };
}

let db: IDBPDatabase<EditorDB> | null = null;

/**
 * Initialize IndexedDB
 */
export async function initDB(): Promise<IDBPDatabase<EditorDB>> {
  if (db) return db;

  db = await openDB<EditorDB>('medium-editor', 1, {
    upgrade(db) {
      // Articles store
      if (!db.objectStoreNames.contains('articles')) {
        const articleStore = db.createObjectStore('articles', { keyPath: 'id' });
        articleStore.createIndex('by-updated', 'updatedAt');
      }

      // Autosave store
      if (!db.objectStoreNames.contains('autosave')) {
        db.createObjectStore('autosave', { keyPath: 'articleId' });
      }
    },
  });

  return db;
}

/**
 * Save article to IndexedDB
 */
export async function saveArticle(article: ArticleData): Promise<void> {
  const database = await initDB();
  await database.put('articles', {
    ...article,
    id: article.id || `article-${Date.now()}`,
    updatedAt: new Date().toISOString(),
  });
}

/**
 * Get article from IndexedDB
 */
export async function getArticle(id: string): Promise<ArticleData | undefined> {
  const database = await initDB();
  return await database.get('articles', id);
}

/**
 * Get all articles from IndexedDB
 */
export async function getAllArticles(): Promise<ArticleData[]> {
  const database = await initDB();
  return await database.getAll('articles');
}

/**
 * Delete article from IndexedDB
 */
export async function deleteArticle(id: string): Promise<void> {
  const database = await initDB();
  await database.delete('articles', id);
}

/**
 * Save autosave draft
 */
export async function saveAutosaveDraft(
  articleId: string,
  title: string,
  content: any
): Promise<void> {
  const database = await initDB();
  await database.put('autosave', {
    articleId,
    title,
    content,
    timestamp: Date.now(),
  });
}

/**
 * Get autosave draft
 */
export async function getAutosaveDraft(articleId: string) {
  const database = await initDB();
  return await database.get('autosave', articleId);
}

/**
 * Clear autosave draft
 */
export async function clearAutosaveDraft(articleId: string): Promise<void> {
  const database = await initDB();
  await database.delete('autosave', articleId);
}

/**
 * LocalStorage fallback for basic settings
 */
export const LocalStorageKeys = {
  THEME: 'editor-theme',
  LAYOUT_MODE: 'editor-layout-mode',
  LAST_ARTICLE_ID: 'editor-last-article-id',
} as const;

export function getFromLocalStorage<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
}

export function saveToLocalStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
}
