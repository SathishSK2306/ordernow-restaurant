// features/menu/hooks/useMenuHeader.js
import { useNavigate, useParams } from "react-router-dom";
import { useHeader } from "@providers/header-context";
import { useEffect } from "react";

export function useMenuHeader() {
  const { setHeader } = useHeader();
  const navigate = useNavigate();
  const {restaurantId} = useParams();

  useEffect(() => {
    setHeader({
      left: {
        icon: "back",
        title: "Browse Menu",
        onClick: () => {
          navigate(-1); // Go back to the previous page
        },
      },
      right: [
        {
          icon: "bell",
          onClick: () => console.log("Notifications icon clicked")
        },
        {
          icon: "cart",
          onClick: () => navigate(`/restaurant/${restaurantId}/cart`)
        }
      ],
      className: "bg-muted",
  });

    return () => setHeader(null); // Clean up on unmount
  }, [setHeader, navigate, restaurantId]);
}
