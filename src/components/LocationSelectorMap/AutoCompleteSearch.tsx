import { useEffect, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
declare let google: any; // Declare google as any to avoid TypeScript errors

interface Window {
  google?: any;
}

const GOOGLE_API_KEY = "AIzaSyCYS5qMlBLhQ4cIYaTcR0Hxpo1g8ki5Cpw";

// Step 1: Wrapper that loads script and then renders the input
const AddressSearchLoader = ({
  location: {
    lat = 41.2995,
    lng = 69.2401,
  } = {}
}: {
  location?: { lat?: number; lng?: number };
}) => {
  const [geocoder, setGeocoder] = useState<any | null>(null);
  const [value, setValue] = useState("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Get location name
    console.log("📍 Getting location name for:", { lat, lng });
    if (!lat || !lng) {
      console.warn("❗ No location provided, using default coordinates");
      return;
    }

    if (!window['google']) {
      console.error("❌ Google Maps API not loaded");
      return;
    }

    const geocoder = new google.maps.Geocoder();
    const latLng = { lat: 41.3275, lng: 69.2817 }; // Replace with your coordinates
  
    geocoder.geocode({ location: latLng }, (results: { formatted_address: any; }[], status: string) => {
      if (status === "OK") {
        if (results[0]) {
          console.log("Formatted address:", results[0].formatted_address);
          setValue(results[0].formatted_address);
        } else {
          console.warn("No results found");
        }
      } else {
        console.error("Geocoder failed due to: " + status);
      }
    });
  }, [lat, lng]);

  useEffect(() => {
    const loader = new Loader({
      apiKey: GOOGLE_API_KEY,
      libraries: ["places"],
    });

    loader
      .load()
      .then(() => {
        console.log("✅ Google Maps script loaded");

        console.log('window.google', window);
        setReady(true);
      })
      .catch((e) => {
        console.error("❌ Failed to load Google Maps", e);
      });
  }, []);

  return ready ? <AddressSearch value={value} /> : <p>⏳ Loading Google Maps…</p>;
};

// Step 2: Actual address input component (mounted only after script is ready)
const AddressSearch = ({
  value = "",
}: {
  value?: string;
}) => {
  const {
    ready,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: { componentRestrictions: { country: "uz" } },
    debounce: 300,
  });

  const handleSelect = async (address: string) => {
    try {
      setValue(address, false);
      clearSuggestions();

      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);

      console.log("📍 Selected Location:", { lat, lng });
    } catch (err) {
      console.error("❌ Geocoding failed:", err);
    }
  };

  return (
    <div>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={!ready}
        placeholder="Manzilni qidirish"
      />
      {status === "OK" && (
        <ul style={{ padding: "0.5rem", border: "1px solid #ccc" }}>
          {data.map(({ place_id, description }) => (
            <li
              key={place_id}
              onClick={() => handleSelect(description)}
              style={{ cursor: "pointer", margin: "0.25rem 0" }}
            >
              {description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AddressSearchLoader;
