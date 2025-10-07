import { useRestaurantData } from "@/features/menu/hooks/useRestaurantData";
import { useUserLocation } from "@/hooks/useUserLocation";
import { useCheckoutHeader } from "../hooks/useCheckoutHeader";
import { usePickupDirections } from "../hooks/usePickupDirections";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { Store, Footprints, Clock } from 'lucide-react';
import { InfoRow } from "../components/InfoRow";
import PickupMap from "../components/PickupMap";
import PlaceOrderActionButton from "../components/PlaceOrderActionButton";

export default function CheckoutPage() {
    useCheckoutHeader({ title: 'Checkout' });

    const restaurantId = localStorage.getItem('lastVisitedRestaurantId');

    const { data: restaurantData, isLoading: isRestaurantLoading, isError: isRestaurantError } = useRestaurantData(restaurantId);
    const { location: userLocation, error: userLocationError, isLoading: isUserLocationLoading } = useUserLocation();
    
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
                <div className="h-2 bg-gray-100 -mx-4" />
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
            
            <div className="space-y-2 pl-8 mt-4">
                <div className="border-2 border-[#ff6800] rounded-lg p-3 flex justify-between items-center">
                    <span className="font-semibold">Standard</span>
                    <span className="text-sm">{pickupData?.duration || '...'}</span>
                </div>
                <div className="border rounded-lg p-3">
                    <span className="text-gray-500">Schedule</span>
                </div>
            </div>

            {/* This is the new section separator */}
            {/* <div className="h-[0.25rem] bg-[#F3F3F3] -mx-7 mt-6 mb-4" /> */}
            <Separator type="section" />

            {/* Placeholder for Order Summary etc. */}
            <div>
                <h2 className="text-lg font-bold">Order Summary</h2>
                {/* ... rest of your code for order summary ... */}
            </div>

            <Separator type="section" />
            <div>
                <h2 className="text-lg font-bold">Payment Methods</h2>
                {/* ... rest of your code for order summary ... */}
            </div>

            <Separator type="section" />

            <PlaceOrderActionButton restaurantId={restaurantId} />
        </div>
    );
}

