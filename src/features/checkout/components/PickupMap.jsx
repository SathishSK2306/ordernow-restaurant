import { useState, useEffect, useMemo } from "react";
import { default as Map, Marker } from "react-map-gl/mapbox";
import { ENV } from "@/config/env";
import { toast } from "sonner";
import "mapbox-gl/dist/mapbox-gl.css";

const MAPBOX_TOKEN = ENV.MAPBOX_ACCESS_TOKEN;

const openGoogleMaps = (restaurantAddress) => {
    const destination = encodeURIComponent(restaurantAddress);
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${destination}`;
    window.open(googleMapsUrl, "_blank");
};

const interpolateCoords = ([lon1, lat1], [lon2, lat2], t) => [
    lon1 + (lon2 - lon1) * t,
    lat1 + (lat2 - lat1) * t,
];

const NUM_DOTS = 15;
const MOVE_DURATION = 4000;

const PickupMap = ({ restaurantAddress, restaurantLocation, userLocation }) => {
    const userCoords = useMemo(() => [userLocation.lng, userLocation.lat], [userLocation]);
    const restaurantCoords = useMemo(() => [restaurantLocation.lng, restaurantLocation.lat], [restaurantLocation]);

    const initialViewState = useMemo(() => ({
        longitude: (userCoords[0] + restaurantCoords[0]) / 2,
        latitude: (userCoords[1] + restaurantCoords[1]) / 2,
        zoom: 12.4,
    }), [userCoords, restaurantCoords]);
    
    const [viewState, setViewState] = useState(initialViewState);
    const [progress, setProgress] = useState(0);
    
    useEffect(() => {
        let animationFrameId;
        let startTime;
        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;
            setProgress((elapsed % MOVE_DURATION) / MOVE_DURATION);
            animationFrameId = requestAnimationFrame(animate);
        };
        animationFrameId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrameId);
    }, []);

    const dotsPositions = Array.from({ length: NUM_DOTS }, (_, i) => {
        const offset = i / NUM_DOTS;
        const dotProgress = (progress + offset) % 1;
        const coords = interpolateCoords(userCoords, restaurantCoords, dotProgress);
        const fadeStart = 0.8;
        const opacity = dotProgress < fadeStart ? 1 : Math.max(0, 1 - (dotProgress - fadeStart) / 0.2);
        return { coords, opacity };
    });

    return (
        <div
            className="relative rounded-lg overflow-hidden border cursor-pointer"
            onClick={() => {
                if (restaurantAddress) {
                    openGoogleMaps(restaurantAddress);
                } else {
                    toast.error("Restaurant information not available.");
                }
            }}
        >
            <Map
                {...viewState}
                onMove={evt => setViewState(evt.viewState)}
                mapboxAccessToken={MAPBOX_TOKEN}
                style={{ width: "100%", height: "150px" }}
                mapStyle="mapbox://styles/mapbox/streets-v12"
                interactive={false}
            >
                {dotsPositions.map(({ coords: [lon, lat], opacity }, idx) => (
                    <Marker longitude={lon} latitude={lat} key={idx} anchor="center">
                        <div style={{ width: 8, height: 8, backgroundColor: "black", borderRadius: "50%", opacity }} />
                    </Marker>
                ))}
                <Marker longitude={userCoords[0]} latitude={userCoords[1]} anchor="center">
                    <div className="relative z-10">
                        <div className="absolute w-12 h-12 bg-blue-500 rounded-full opacity-30 animate-pulse top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                        <div className="w-4 h-4 bg-blue-600 rounded-full border-2 border-white relative z-10" />
                    </div>
                </Marker>
                <Marker longitude={restaurantCoords[0]} latitude={restaurantCoords[1]} anchor="bottom">
                    <div className="relative flex flex-col items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="23px" height="23px" viewBox="-3.84 -3.84 31.68 31.68" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-store-icon lucide-store">
                        <circle cx="12" cy="12" r="15.84" fill="black"/>
                        <g>
                            <path d="M15 21v-5a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v5"/>
                            <path d="M17.774 10.31a1.12 1.12 0 0 0-1.549 0 2.5 2.5 0 0 1-3.451 0 1.12 1.12 0 0 0-1.548 0 2.5 2.5 0 0 1-3.452 0 1.12 1.12 0 0 0-1.549 0 2.5 2.5 0 0 1-3.77-3.248l2.889-4.184A2 2 0 0 1 7 2h10a2 2 0 0 1 1.653.873l2.895 4.192a2.5 2.5 0 0 1-3.774 3.244"/>
                            <path d="M4 10.95V19a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8.05"/>
                        </g>
                        </svg>

                        <div className="w-1 h-2.5 bg-[black] mt-[-2px] rounded-b-sm"></div>
                    </div>
                </Marker>
            </Map>
        </div>
    );
};

export default PickupMap;
