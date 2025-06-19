// features/menu/hooks/useMenuHeader.js
import { useHeader } from "@providers/header-context";
import { useEffect } from "react";

export function useMenuHeader() {
  const { setHeader } = useHeader();

  useEffect(() => {
    setHeader({
      left: {
        icon: "back",
        title: "Browse Menu",
      },
      right: [
        {
          icon: "bell",
          onClick: () => console.log("Notifications icon clicked"),
        },
        {
          icon: "cart",
          onClick: () => alert("Cart icon clicked"),
        },
      ],
      className: "bg-muted", // optional override
    });

    return () => setHeader(null); // Clean up on unmount
  }, [setHeader]);
}
