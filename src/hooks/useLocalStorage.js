import { useState, useEffect, useCallback } from 'react';

// Custom hook for managing localStorage with React state
export const useLocalStorage = (key, initialValue) => {
  // Get initial value from localStorage or use provided initial value
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that persists the new value to localStorage
  const setValue = useCallback((value) => {
    try {
      // Allow value to be a function so we have the same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;

      // Save state
      setStoredValue(valueToStore);

      // Save to localStorage
      if (valueToStore === undefined || valueToStore === null) {
        window.localStorage.removeItem(key);
      } else {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  // Remove the item from localStorage
  const removeValue = useCallback(() => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  }, [key, initialValue]);

  // Get current value from localStorage (useful for checking if value changed externally)
  const getStoredValue = useCallback(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  }, [key, initialValue]);

  // Check if the key exists in localStorage
  const hasStoredValue = useCallback(() => {
    return window.localStorage.getItem(key) !== null;
  }, [key]);

  // Listen for storage events (when localStorage is changed in another tab)
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === key && e.newValue !== null) {
        try {
          setStoredValue(JSON.parse(e.newValue));
        } catch (error) {
          console.error(`Error parsing localStorage value for key "${key}":`, error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key]);

  return {
    value: storedValue,
    setValue,
    removeValue,
    getStoredValue,
    hasStoredValue
  };
};

// Hook for managing multiple localStorage keys as an object
export const useLocalStorageObject = (keyPrefix, initialObject = {}) => {
  const [storedObject, setStoredObject] = useState(() => {
    const result = {};
    Object.keys(initialObject).forEach(key => {
      const fullKey = `${keyPrefix}-${key}`;
      try {
        const item = window.localStorage.getItem(fullKey);
        result[key] = item ? JSON.parse(item) : initialObject[key];
      } catch (error) {
        console.error(`Error reading localStorage key "${fullKey}":`, error);
        result[key] = initialObject[key];
      }
    });
    return result;
  });

  const setObjectValue = useCallback((key, value) => {
    const fullKey = `${keyPrefix}-${key}`;
    try {
      const valueToStore = value instanceof Function ? value(storedObject[key]) : value;

      setStoredObject(prev => ({ ...prev, [key]: valueToStore }));

      if (valueToStore === undefined || valueToStore === null) {
        window.localStorage.removeItem(fullKey);
      } else {
        window.localStorage.setItem(fullKey, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${fullKey}":`, error);
    }
  }, [keyPrefix, storedObject]);

  const removeObjectValue = useCallback((key) => {
    const fullKey = `${keyPrefix}-${key}`;
    try {
      window.localStorage.removeItem(fullKey);
      setStoredObject(prev => {
        const newObj = { ...prev };
        delete newObj[key];
        return newObj;
      });
    } catch (error) {
      console.error(`Error removing localStorage key "${fullKey}":`, error);
    }
  }, [keyPrefix]);

  const clearAllObjectValues = useCallback(() => {
    Object.keys(storedObject).forEach(key => {
      const fullKey = `${keyPrefix}-${key}`;
      try {
        window.localStorage.removeItem(fullKey);
      } catch (error) {
        console.error(`Error removing localStorage key "${fullKey}":`, error);
      }
    });
    setStoredObject({});
  }, [keyPrefix, storedObject]);

  return {
    object: storedObject,
    setObjectValue,
    removeObjectValue,
    clearAllObjectValues
  };
};

export default useLocalStorage;
