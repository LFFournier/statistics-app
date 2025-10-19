'use client'
import React, {useContext, useEffect} from "react";
import { DashboardContext } from "@/providers/AviationProvider";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import 'leaflet/dist/leaflet.css';

interface MapUpdaterProps {
    lat: number;
    lon: number;
}

const MapUpdater: React.FC<MapUpdaterProps> = ({ lat, lon }) => {
    const map = useMap();
    useEffect(() => {
        map.setView([lat, lon], 13);
    }, [lat, lon, map]);
    return null;
};

const Maps: React.FC = () => {
    const aviationContext = useContext(DashboardContext);
    const airport = aviationContext?.activeAirport;

    if (!airport) return null;
    return (
        <div className="w-full h-[300px] w-[300px] rounded-lg shadow-md">
            <MapContainer
                center={[airport.lat, airport.lon]}
                zoom={12}
                scrollWheelZoom={false}
                className="w-full h-full"
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <MapUpdater lat={airport.lat} lon={airport.lon} />
            </MapContainer>
        </div>
    );
};

export default Maps;