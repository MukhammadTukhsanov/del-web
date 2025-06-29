import { setLocation } from '@/features/location/locationSlice';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { useEffect, useState } from 'react';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

const AddressSearchLoader = () => {
  const [ready, setReady] = useState(false);

  // useEffect(() => {
  //   const loader = new Loader({
  //     apiKey: GOOGLE_API_KEY,
  //     libraries: ["places"],
  //   });

  //   loader
  //     .load()
  //     .then(() => {
  //       console.log("✅ Google Maps script loaded");

  //       console.log('window.google', window);
  //       setReady(true);
  //     })
  //     .catch((e) => {
  //       console.error("❌ Failed to load Google Maps", e);
  //     });
  // }, []);

  return <AddressSearch />;
};

const AddressSearch = () => {
  const dispatch = useAppDispatch();
  const { address } = useAppSelector((state) => state.location);
  const {
    value,
    ready,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: { componentRestrictions: { country: 'uz' } },
    debounce: 300,
  });
  const [isFocused, setIsFocused] = useState(false);

  const handleSelect = async (address: string) => {
    try {
      clearSuggestions();

      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      dispatch(setLocation({ lat, lng, address }));
    } catch (err) {
      console.error('Error fetching address:', err);
    }
  };

  useEffect(() => {
    setValue('');
    setIsFocused(false);
  }, [address, setValue]);

  return (
    <div style={{ height: '100%' }}>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => {
          setIsFocused(true);
          setValue(address || '');
        }}
        disabled={!ready}
        placeholder={isFocused ? 'Search for an address...' : address || 'Search for a location...'}
      />
      {status === 'OK' && (
        <ul style={{ padding: '0.5rem', border: '1px solid #ccc' }}>
          {data.map(({ place_id, description }) => (
            <li key={place_id} onClick={() => handleSelect(description)}>
              {description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AddressSearchLoader;
