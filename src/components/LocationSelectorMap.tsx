import { useEffect, useRef, useState } from "react";
import {
  MapContainer,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { updateCurrentUser } from "@/features/auth/userSlice";
import { useNavigate } from "react-router-dom";

// Fix Leaflet icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Map movement listener component
function CenterListener({ onMove }: { onMove: (center: L.LatLng) => void }) {
  useMapEvents({
    moveend(e) {
      onMove(e.target.getCenter());
    },
  });
  return null;
}

export default function CenteredLocationSelector() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const [center, setCenter] = useState<L.LatLngLiteral>({
    lat: 41.2995,
    lng: 69.2401,
  });

  const mapRef = useRef<L.Map>(null);

  // Fetch user's current location on mount
  useEffect(() => {
    if (!navigator.geolocation) {
      console.warn("Geolocation is not supported by this browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCenter({ lat: latitude, lng: longitude });
      },
      (err) => {
        console.error("Geolocation error:", err.message);
      }
    );
  }, []);

  const handleSelect = () => {
    if (mapRef.current) {
      const currentCenter = mapRef.current.getCenter();
      const title = prompt("Enter a title for this location:", "My Location");
      dispatch(updateCurrentUser({
        location: {
          lat: currentCenter.lat,
          lng: currentCenter.lng,
          title
        },
        locations: [...(user.locationHistory || []).slice(0, 3), { lat: currentCenter.lat, lng: currentCenter.lng }],
      }));
      navigate(-1);
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <MapContainer
        center={center}
        zoom={13}
        scrollWheelZoom
        style={{ height: "100vh", width: "100%" }}
        ref={mapRef}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        <CenterListener onMove={(newCenter) => setCenter(newCenter)} />
      </MapContainer>

      {/* Fixed center marker */}
      <img
        src="https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png"
        alt="Map center marker"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-12px, -41px)",
          pointerEvents: "none",
          zIndex: 1000,
        }}
      />

      {/* Select location button */}
      <div
        style={{
          position: "absolute",
          bottom: 20,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 1000,
        }}
      >
        <button
          onClick={handleSelect}
          style={{
            padding: "10px 20px",
            backgroundColor: "#ff9556",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Select Location
        </button>
      </div>
    </div>
  );
}
