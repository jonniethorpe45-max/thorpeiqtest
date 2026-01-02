// Safe storage wrapper for iOS WebView compatibility
// This must be imported BEFORE any Supabase code
// CRITICAL: This polyfill runs IMMEDIATELY on module load

// Create in-memory storage fallback
const createMemoryStorage = (): Storage => {
  const memoryStorage: Record<string, string> = {};
  return {
    getItem: (key: string) => memoryStorage[key] ?? null,
    setItem: (key: string, value: string) => { memoryStorage[key] = value; },
    removeItem: (key: string) => { delete memoryStorage[key]; },
    clear: () => { Object.keys(memoryStorage).forEach(key => delete memoryStorage[key]); },
    get length() { return Object.keys(memoryStorage).length; },
    key: (index: number) => Object.keys(memoryStorage)[index] ?? null,
  };
};

// IMMEDIATELY polyfill localStorage if broken (before any other code runs)
const polyfillStorageIfNeeded = (): Storage => {
  if (typeof window === 'undefined') {
    return createMemoryStorage();
  }

  try {
    const testKey = '__storage_test__';
    window.localStorage.setItem(testKey, testKey);
    window.localStorage.removeItem(testKey);
    return window.localStorage;
  } catch (e) {
    console.warn('localStorage not available, using memory storage');
    const memStorage = createMemoryStorage();
    
    // Immediately replace broken localStorage
    try {
      Object.defineProperty(window, 'localStorage', {
        value: memStorage,
        writable: false,
        configurable: true,
      });
    } catch (defineError) {
      console.warn('Could not replace localStorage:', defineError);
    }
    
    return memStorage;
  }
};

// Run polyfill immediately on module load
export const safeStorage = polyfillStorageIfNeeded();
