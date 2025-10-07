import { useRestaurantData } from "@/features/menu/hooks/useRestaurantData";
import { useUserLocation } from "@/hooks/useUserLocation";
import { useCheckoutHeader } from "../hooks/useCheckoutHeader";
import { usePickupDirections } from "../hooks/usePickupDirections";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { Store, Footprints, Clock } from 'lucide-react';
import { InfoRow } from "../components/InfoRow";
import PickupMap from "../components/PickupMap";

export default function CheckoutPage() {
    useCheckoutHeader({ title: 'Checkout' });

    // Corrected the key to match what we discussed
    const restaurantId = localStorage.getItem('lastVisitedRestaurantId');

    const { data: restaurantData, isLoading: isRestaurantLoading, isError: isRestaurantError } = useRestaurantData(restaurantId);
    const { location: userLocation, error: userLocationError, isLoading: isUserLocationLoading } = useUserLocation();
    
    // Fetch directions data here to get distance and time
    const { data: pickupData, isLoading: isDirectionsLoading, isError: isDirectionsError } = usePickupDirections(restaurantData?.address);

    const isLoading = isRestaurantLoading || isUserLocationLoading || isDirectionsLoading;
    const isError = isRestaurantError || userLocationError || isDirectionsError;

    if (isLoading) {
        return (
            <div className="p-4 max-w-lg mx-auto space-y-4">
                <Skeleton className="h-[150px] w-full rounded-lg" />
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-5 w-1/2" />
                <Skeleton className="h-5 w-1/3" />
                <Separator />
                <Skeleton className="h-24 w-full" />
            </div>
        );
    }

    if (isError) {
        return <div className="p-4 text-red-600">Error loading checkout details. Please try again.</div>;
    }

    if (!restaurantData || !userLocation) {
        return <div className="p-4">Could not find restaurant or user location. Please select a restaurant first.</div>;
    }

    const restaurantLocation = {
        lat: restaurantData.latitude,
        lng: restaurantData.longitude,
    };

    return (
        <div className="p-4 max-w-lg mx-auto bg-white">
            <h3 className="font-bold text-lg mb-4">Pickup Details</h3>

            <PickupMap
                restaurantLocation={restaurantLocation}
                userLocation={userLocation}
                restaurantName={restaurantData.name}
                restaurantAddress={restaurantData.address}
            />

            <div className="mt-4 bg-white rounded-lg">
                <InfoRow 
                    icon={<Store size={20} />}
                    label={
                        <div>
                            <p className="font-semibold text-base">{restaurantData.name}</p>
                            <p className="text-xs text-gray-500">{restaurantData.address}</p>
                        </div>
                    }
                />
                <InfoRow 
                    icon={<Footprints size={20} />}
                    label="Distance"
                    value={pickupData?.distance || '...'}
                />
                <InfoRow 
                    icon={<Clock size={20} />}
                    label="Pickup time"
                    value={pickupData?.duration || '...'}
                    isLast={true}
                />
            </div>
            
            
                 <div className="space-y-2 pl-8">
                    <div className="border-2 border-[#ff6800] rounded-lg p-3 flex justify-between items-center">
                        <span className="font-semibold">Standard</span>
                        <span className="text-sm">{pickupData?.duration || '...'}</span>
                    </div>
                    <div className="border rounded-lg p-3">
                        <span className="text-gray-500">Schedule</span>
                    </div>
                 </div>

            <Separator className="my-4" />

            {/* Placeholder for Order Summary etc. */}
            <div className="mt-4">
                <h2 className="text-lg font-bold">Order Summary</h2>
                {/* ... rest of your code for order summary ... */}
            </div>
        </div>
    );
}
