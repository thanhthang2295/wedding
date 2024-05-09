// HeaderContext.js
import React, { createContext, useContext, useState } from 'react';

// Create a context for the header
const HeaderContext = createContext();

// Create a HeaderProvider component to wrap your app
export function HeaderProvider({ children }) {
  const [headerLeft, setHeaderLeft] = useState(null);
  const [headerCenter, setHeaderCenter] = useState(null);
  const [headerRight, setHeaderRight] = useState(null);

  return (
    <HeaderContext.Provider value={{ headerLeft, setHeaderLeft, headerCenter, setHeaderCenter, headerRight, setHeaderRight }}>
      {children}
    </HeaderContext.Provider>
  );
}

// Create a custom hook to access the header context
export function useHeader() {
  return useContext(HeaderContext);
}
