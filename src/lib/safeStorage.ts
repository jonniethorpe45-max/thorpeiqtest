// Safe storage wrapper for iOS WebView compatibility
// This must be imported BEFORE any Supabase code

const createSafeStorage = (): Storage => {
  try {
    // Test if localStorage is available
    if (typeof window !== 'undefined' && window.localStorage) {
      const testKey = '__storage_test__';
      window.localStorage.setItem(testKey, testKey);
      window.localStorage.removeItem(testKey);
      return window.localStorage;
    }
  } catch (e) {
    console.warn('localStorage not available, using memory storage');
  }
  
  // Fallback to in-memory storage
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

// Initialize safe storage and attach to window if needed
export const safeStorage = createSafeStorage();

// Polyfill localStorage if it's broken
if (typeof window !== 'undefined') {
  try {
    const testKey = '__test__';
    window.localStorage.setItem(testKey, testKey);
    window.localStorage.removeItem(testKey);
  } catch (e) {
    // localStorage is broken, replace it with our safe version
    Object.defineProperty(window, 'localStorage', {
      value: safeStorage,
      writable: false,
      configurable: true,
    });
  }
}
