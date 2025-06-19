// src/providers/header-context.jsx
import { createContext, useContext, useState } from "react";

const HeaderContext = createContext();

export function HeaderProvider({ children }) {
  const [header, setHeader] = useState({
    left: null,         // { icon, title, subtitle }
    right: [],          // [{ icon, count, onClick }]
    className: "",      // Extra styling support
  });

  return (
    <HeaderContext.Provider value={{ header, setHeader }}>
      {children}
    </HeaderContext.Provider>
  );
}

export const useHeader = () => useContext(HeaderContext);