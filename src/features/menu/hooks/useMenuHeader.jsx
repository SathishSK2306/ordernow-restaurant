// features/menu/hooks/useMenuHeader.js
import { useNavigate, useParams } from "react-router-dom";
import { useHeader } from "@providers/header-context";
import { useEffect } from "react";
import { useCart } from "@/features/cart/hooks/useCart";

export function useMenuHeader() {
  const { setHeader } = useHeader();
  const navigate = useNavigate();
  const {restaurantId} = useParams();
  const { data: cartData } = useCart(restaurantId);

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
          count: cartData?.totals.total_items || 0, // Show cart item count
          onClick: () => navigate(`/restaurant/${restaurantId}/cart`)
        }
      ],
      className: "bg-muted",
  });

    return () => setHeader(null); // Clean up on unmount
  }, [setHeader, navigate, restaurantId]);
}
