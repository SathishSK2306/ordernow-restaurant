// src/features/cart/hooks/useCartHeader.js
import { useNavigate } from "react-router-dom";
import { useHeader } from "@providers/header-context";
import { useEffect } from "react";


export function useCartHeader() {
  const { setHeader } = useHeader(); 
  const navigate = useNavigate();

  useEffect(() => {
    setHeader({
      left: {
        icon: "close",
        title: "Your Cart",
        onClick: () => navigate(-1), // Replace with actual close logic
      },
      right: [],
      className: "bg-muted",
    });

    return () => setHeader(null);
  }, [setHeader]);
}