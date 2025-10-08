import { useState } from "react";
import { useRestaurantData } from "@/features/menu/hooks/useRestaurantData";
import { useUserLocation } from "@/hooks/useUserLocation";
import { useAuth } from "@/features/auth/context/AuthContext";
import { useCart } from "@/features/cart/hooks/useCart";
import { useCheckoutHeader } from "../hooks/useCheckoutHeader";
import { usePickupDirections } from "../hooks/usePickupDirections";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Store, Footprints, Clock, Pencil } from 'lucide-react';
import { InfoRow } from "../components/InfoRow";
import PickupMap from "../components/PickupMap";
import PlaceOrderActionButton from "../components/PlaceOrderActionButton";

export default function CheckoutPage() {
    useCheckoutHeader({ title: '  Review your order' });
    const [tip, setTip] = useState(0);
    const [activeTip, setActiveTip] = useState(null);
    const [isCustomTipEditing, setIsCustomTipEditing] = useState(false);
    const [customTipInput, setCustomTipInput] = useState('');

    const restaurantId = localStorage.getItem('lastVisitedRestaurantId');

    const { data: restaurantData, isLoading: isRestaurantLoading } = useRestaurantData(restaurantId);
    const { location: userLocation, isLoading: isUserLocationLoading } = useUserLocation();
    const { data: cartViewData, isLoading: isCartLoading } = useCart(restaurantId);
    const { data: pickupData, isLoading: isDirectionsLoading } = usePickupDirections(restaurantData?.address);
    const { user } = useAuth();

    const isLoading = isRestaurantLoading || isUserLocationLoading || isCartLoading || isDirectionsLoading;

    if (isLoading) {
        return (
            <div className="p-4 max-w-lg mx-auto space-y-4">
                <Skeleton className="h-6 w-1/3" />
                <Skeleton className="h-[150px] w-full rounded-lg" />
                <Skeleton className="h-24 w-full" />
                <Separator type="section" />
                <Skeleton className="h-32 w-full" />
            </div>
        );
    }

    if (!restaurantData || !userLocation || !cartViewData || !user) {
        console.log("Missing data among restaurantData, userLocation, cartViewData, user :", { restaurantData, userLocation, cartViewData, user });

        // Uncomment below in production
        //return <div className="p-4 text-center">Could not load all necessary checkout information. Please try again.</div>;
    }

    const restaurantLocation = {
        lat: restaurantData.latitude,
        lng: restaurantData.longitude,
    };
    
    const subtotal = cartViewData.totals.subtotal || 0;
    const tax = subtotal * 0.05;
    const total = subtotal + tax + tip;

    // --- Tip Handler Functions ---
    const handlePercentageTip = (percentage) => {
        setIsCustomTipEditing(false);
        setActiveTip(percentage.toString());
        setTip(subtotal * (percentage / 100));
    };

    const handleOtherTipClick = () => {
        setActiveTip('other');
        setTip(0);
        setCustomTipInput('');
        setIsCustomTipEditing(true);
    };
    
    const handleConfirmCustomTip = () => {
        const newTip = parseFloat(customTipInput) || 0;
        setTip(newTip);
        setIsCustomTipEditing(false);
    };

    const handleCustomTipKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleConfirmCustomTip();
        }
    };

    return (
        <div className="p-4 pt-1 max-w-lg mx-auto bg-white space-y-6 ">
            
            {/* --- PICKUP DETAILS SECTION --- */}
            <div className="mb-2">
                <h3 className="font-bold text-lg mb-2">Pickup from</h3>
                <PickupMap
                    restaurantLocation={restaurantLocation}
                    userLocation={userLocation || { lat: 37.4323, lng: -121.8996 }} // TO DO: Remove default coords if userLocation is guaranteed
                    restaurantName={restaurantData.name}
                    restaurantAddress={restaurantData.address}
                />
                <div className="mt-1 bg-white rounded-lg">
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
            </div>

            {/* --- PICKUP BY SECTION --- */}
            <div className="mb-2">
                <h3 className="font-bold text-lg mb-2">Pickup by</h3>
                <div className="border rounded-lg px-4 py-2 flex justify-between items-center">
                    <div>
                        <p className="font-semibold">{user.name || 'Valued Customer'}</p>
                        <p className="text-sm text-gray-500">{user.phone || 'No phone info'}</p>
                        <p className="text-sm text-gray-500">{user.email || 'No email info'}</p>
                    </div>
                    <Button variant="ghost" size="icon">
                        <Pencil size={16} /> 
                    </Button>
                </div>
            </div>

            {/* --- PICKUP INSTRUCTIONS --- */}
            <div>
                 <h3 className="font-bold text-lg mb-2">Pickup Instructions</h3>
                 <Input placeholder="e.g. Please double the bag, provide extra cutlery..." />
            </div>

            <Separator type="section" />

            {/* --- YOUR ORDER SECTION --- */}
            <div>
                <h3 className="font-bold text-lg mb-2">Your Order</h3>
                <div className="border rounded-lg p-4 space-y-3">
                    {cartViewData.cart_items.map(item => (
                        <div key={item.id} className="flex justify-between items-center text-sm">
                            <span className="font-medium">{item.quantity} x {item.menu_item.name}</span>
                            <span>₹{item.price_at_added.toFixed(2)}</span>
                        </div>
                    ))}
                    <Separator style={{ marginLeft: "0" }} />
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Subtotal</span>
                        <span>₹{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Taxes</span>
                        <span>₹{tax.toFixed(2)}</span>
                    </div>
                     <div className="flex justify-between text-sm items-center">
                        <span className="text-gray-600">Tip</span>
                        {isCustomTipEditing && activeTip === 'other' ? (
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="number"
                                    placeholder="Add custom tip ₹ "
                                    value={customTipInput}
                                    onChange={(e) => setCustomTipInput(e.target.value)}
                                    onKeyDown={handleCustomTipKeyDown}
                                    className="h-8 text-right w-36 placeholder:text-sm ml-0"
                                    autoFocus
                                />
                                <Button size="sm" className="h-8" onClick={handleConfirmCustomTip}>OK</Button>
                            </div>
                        ) : (
                            <span>₹{tip.toFixed(2)}</span>
                        )}
                    </div>
                    <div className="flex justify-end space-x-2 pt-2">
                        <Button variant={activeTip === '5' ? 'secondary' : 'outline'} size="sm" onClick={() => handlePercentageTip(5)}>5%</Button>
                        <Button variant={activeTip === '10' ? 'secondary' : 'outline'} size="sm" onClick={() => handlePercentageTip(10)}>10%</Button>
                        <Button variant={activeTip === '15' ? 'secondary' : 'outline'} size="sm" onClick={() => handlePercentageTip(15)}>15%</Button>
                        <Button variant={activeTip === '20' ? 'secondary' : 'outline'} size="sm" onClick={() => handlePercentageTip(20)}>20%</Button>
                        <Button variant={activeTip === 'other' ? 'secondary' : 'outline'} size="sm" onClick={handleOtherTipClick}>Other</Button>
                    </div>
                    
                    <Separator style={{ marginLeft: "0" }} />
                     <div className="flex justify-between font-bold text-base pt-2">
                        <span>Total</span>
                        <span>₹{total.toFixed(2)}</span>
                    </div>
                </div>
            </div>

            <Separator type="section" />

            {/* --- YOUR PAYMENT SECTION --- */}
            <div>
                <h3 className="font-bold text-lg mb-2">Your Payment</h3>
                <div className="text-sm text-gray-600 pb-1">Payment Method</div>
                <div className="border rounded-lg p-4 text-center text-gray-500">
                    Payment options will be shown here.
                </div>
            </div>

            <Separator type="section"/>

            {/* --- PLACE ORDER BUTTON --- */}

            <div className="py-2">
                <PlaceOrderActionButton restaurantId={restaurantId} total={total} />
            </div>
        </div>
    );
}

