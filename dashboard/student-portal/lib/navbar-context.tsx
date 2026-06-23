"use client";
import { createContext, useContext, useState, useCallback, ReactNode } from "react";

interface NavbarContextValue {
  onSubmitClick: (() => void) | null;
  setOnSubmitClick: (fn: (() => void) | null) => void;
}

const NavbarContext = createContext<NavbarContextValue>({
  onSubmitClick: null,
  setOnSubmitClick: () => {},
});

export function NavbarProvider({ children }: { children: ReactNode }) {
  const [onSubmitClick, setOnSubmitClickState] = useState<(() => void) | null>(null);

  const setOnSubmitClick = useCallback((fn: (() => void) | null) => {
    setOnSubmitClickState(() => fn);
  }, []);

  return (
    <NavbarContext.Provider value={{ onSubmitClick, setOnSubmitClick }}>
      {children}
    </NavbarContext.Provider>
  );
}

export function useNavbar() {
  return useContext(NavbarContext);
}
