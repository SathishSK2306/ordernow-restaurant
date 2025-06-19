// src/features/cart/hooks/useCartHeader.js
import { useHeader } from "@providers/header-context";
import { useEffect } from "react";

export function useCartHeader() {
  const { setHeader } = useHeader();

  useEffect(() => {
    setHeader({
      left: {
        icon: "close",
        title: "Your Cart",
      },
      right: [],
      className: "bg-muted",
    });

    return () => setHeader(null);
  }, [setHeader]);
}