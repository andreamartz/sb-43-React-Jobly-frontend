/** useLocalStorage 
 * - custom hook
 * 
 * Purpose: keeps state data synced with localStorage
 * 
 * What it does:
 * - creates `storedValue` as state
 *    - looks in localStorage for current value
 *    - (if not found, defaults to `firstValue`)
 * 
 * - when storedValue changes, the effect re-runs:
 *    - if new state is null, removes from localStorage
 *    - else, updates localStorage
 * 
 * - to the component, this just acts like state that is also synced to/from localStorage:
 *    - const [myThing, setMyThing] = useLocalStorage("myThing", null)
 */

import { useEffect, useState } from "react";

// key can be "token"
const useLocalStorage = (key, firstValue = null) => {
  const initialValue = localStorage.getItem(key) || firstValue;
  const [storedValue, setStoredValue] = useState(initialValue);

  useEffect(function setKeyInLocalStorage() {
    console.debug("hooks/useLocalStorage useEffect:", "storedValue=", storedValue);

    // storedValue can be used for the token's value
    if (storedValue === null) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, storedValue);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}

export default useLocalStorage;