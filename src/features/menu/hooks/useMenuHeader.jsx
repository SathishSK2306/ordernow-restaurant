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
          icon: "search",
          onClick: () => console.log("Search clicked"),
        },
        {
          icon: "options",
          onClick: () => alert("More options"),
        },
      ],
      className: "bg-muted", // optional override
    });

    return () => setHeader(null); // Clean up on unmount
  }, [setHeader]);
}
