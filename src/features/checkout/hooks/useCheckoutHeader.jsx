import { useNavigate } from "react-router-dom";
import { useHeader } from "@/providers/header-context";
import { useEffect, useState } from "react";

export function useCheckoutHeader(options = {}) {
  const { title = 'Checkout' } = options;
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


  useEffect(() => {
    setHeader({
      left: {
        icon: "back",
        title: title,
        onClick: () => {
          navigate(-1);
        },
      },
      right: [],
      className: "bg-background border-b",
    });

    // On unmount, reset the header to a default empty state instead of null.
    return () => setHeader({
      left: null,
      right: [],
      className: "",
    });
  }, [setHeader, navigate, title, lastRestaurantId]);
}