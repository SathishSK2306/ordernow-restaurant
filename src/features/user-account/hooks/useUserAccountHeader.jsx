import { useNavigate } from "react-router-dom";
import { useHeader } from "@/providers/header-context";
import { useEffect, useState } from "react";
import { useCart } from "@/features/cart/hooks/useCart";
import { toast } from "sonner";

export function useUserAccountHeader(options = {}) {
  const { title = 'Account' } = options;
  const { setHeader } = useHeader();
  const navigate = useNavigate();
  const [lastRestaurantId, setLastRestaurantId] = useState(null);

  // On component mount, try to get the last visited restaurant ID from storage.
  useEffect(() => {
    const storedId = localStorage.getItem('lastVisitedRestaurantId');
    if (storedId) {
      setLastRestaurantId(storedId);
    }
  }, []); // Runs once when the hook is first used.

  // Pass the retrieved ID to useCart.
  // The useCart hook will automatically be disabled if lastRestaurantId is null, preventing an API error.
  const { data: cartData } = useCart(lastRestaurantId); 
  const totalItems = cartData?.totals?.total_items || 0;

  useEffect(() => {
    setHeader({
      left: {
        icon: "close",
        title: title,
        onClick: () => {
          navigate(-1); 
        },
      },
      right: [
        {
          icon: "bell",
          onClick: () => console.log("Notifications icon clicked"),
        },
        {
          icon: "cart",
          // Only show the item count if we have a valid cart.
          count: lastRestaurantId ? totalItems : 0,
          onClick: () => {
            // Only navigate to the cart if we have a restaurant context.
            if (lastRestaurantId) {
              navigate(`/restaurant/${lastRestaurantId}/cart`);
            } else {
              // Optionally, inform the user if they have no active cart.
              toast.info("Please visit a restaurant menu to see your cart.");
            }
          },
        },
      ],
      className: "bg-background border-b",
    });

    // On unmount, reset the header to a default empty state instead of null.
    return () => setHeader({
        left: null,
        right: [],
        className: "",
    });
  }, [setHeader, navigate, totalItems, title, lastRestaurantId]);
}