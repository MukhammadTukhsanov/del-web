import { updateCurrentUser } from '@/features/auth/userSlice';
import { getAddressFromLatLng } from '@/features/location/locationSlice';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { AimOutlined, ArrowLeftOutlined, LoadingOutlined } from '@ant-design/icons';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import mapboxgl from 'mapbox-gl';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../Button/Button';
import AddressSearch from './AutoCompleteSearch';
import './LocationSelectorMap.css';
mapboxgl.accessToken = process.env.MAPBOX_API;

// Define the libraries array as a constant outside the component
const GOOGLE_MAP_LIBRARIES = ['places'];

const LocationSelectorMap = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const mapRef = useRef<google.maps.Map | null>(null);

  // const mapRef = useRef<MapboxMap | null>(null);
  // const mapContainerRef = useRef<HTMLDivElement | null>(null);

  const { user } = useAppSelector((state) => state.user);
  const { selection, lat, lng, address } = useAppSelector((state) => state.location);

  useEffect(() => {
    if (!mapRef.current || !selection) return;
    console.log('Selection changed:', selection);

    // Update map center when lat/lng changes
    // mapRef.current.setCenter([
    //   selection.lng,
    //   selection.lat,
    // ]);
    // // Optionally, you can also set the zoom level if needed
    // mapRef.current.setZoom(18);
    if (mapRef.current) {
      const center = new google.maps.LatLng(selection.lat, selection.lng);
      mapRef.current.setCenter(center);
      console.log('Map center updated to:', center);
    }
  }, [selection]);

  // useEffect(() => {
  //   if (!mapContainerRef.current) return;

  //   const map = new mapboxgl.Map({
  //     container: mapContainerRef.current,
  //     style: 'mapbox://styles/mapbox/satellite-streets-v12',
  //     center: [
  //       69.2401,
  //       41.2995,
  //     ],
  //     zoom: 16,
  //   });

  //   mapRef.current = map;

  //   map.on('load', () => {
  //     dispatch(getAddressFromLatLng({lat: 41.2995, lng: 69.2401}));
  //   });

  //   map.on('moveend', () => {
  //     const { lat, lng } = map.getCenter();
  //     dispatch(getAddressFromLatLng({lat, lng}))
  //   });

  //   return () => {
  //     map.remove();
  //   };
  // }, [dispatch]);

  const handleSelect = () => {
    dispatch(
      updateCurrentUser({
        location: {
          lat: lat || 41.2995, // Default to Tashkent if no selection
          lng: lng || 69.2401, // Default to Tashkent if no selection
          address: address || '',
        },
        locations: [
          ...(user.locations || []),
          {
            lat: lat || 41.2995, // Default to Tashkent if no selection
            lng: lng || 69.2401, // Default to Tashkent if no selection
            address: address || '',
          },
        ]
          .filter((loc) => !!loc)
          .filter((loc) => loc.address && loc.lat && loc.lng) // Filter out empty locations
          .slice(0, 3),
      }),
    );
    navigate(-1);
  };

  const getCurrentLocation = () => {
    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        if (mapRef.current) {
          mapRef.current.setCenter(new google.maps.LatLng(latitude, longitude));
        }
        setIsLoading(false);
      },
      (error) => {
        console.error('Error getting current location:', error);
        setIsLoading(false);
      },
    );
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <LoadScript
      googleMapsApiKey={process.env.GOOGLE_API_KEY || ''}
      libraries={GOOGLE_MAP_LIBRARIES as any[]}
    >
      <div className='map-wrapper'>
        <div className='map-header'>
          <button onClick={handleBack} className='map-back-button'>
            <ArrowLeftOutlined />
          </button>
          <form className='map-header-address'>
            <AddressSearch />
          </form>
        </div>

        {/* <div
          id='map-container'
          ref={mapContainerRef}
          style={{ height: '100%', width: '100%' }}
        /> */}
        <GoogleMap
          mapContainerStyle={{
            height: '100%',
            width: '100%',
          }}
          // center={{
          // lat: 41.2995,
          // lng: 69.2401,
          // lng: selection?.lng || 69.2401, // Default to Tashkent if no selection
          // lat: selection?.lat || 41.2995, // Default to Tashkent if no selection
          // }}
          zoom={18}
          mapTypeId='satellite' // 👈 this enables satellite view
          // show labels
          options={{
            disableDefaultUI: true,
            zoomControl: false,
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: false,
          }}
          onLoad={(map) => {
            mapRef.current = map;
            console.log('Google Map loaded:', map);
            // If you want to set the initial center based on selection
            if (selection) {
              const center = new google.maps.LatLng(selection.lat, selection.lng);
              map.setCenter(center);
            } else {
              // Default center if no selection
              map.setCenter(new google.maps.LatLng(41.2995, 69.2401));
            }
          }}
          // onCenterChanged={() => {
          //   if (mapRef.current) {
          //     console.log('Map center changed:', mapRef);
          //     // const center = mapRef.current.getCenter();
          //     // dispatch(getAddressFromLatLng({ lat: center.lat(), lng: center.lng() }));
          //   }
          // }}
          onDragEnd={() => {
            if (mapRef.current) {
              const center = mapRef.current?.getCenter();
              if (center) {
                const lat = center.lat();
                const lng = center.lng();
                console.log('Map drag ended at:', { lat, lng });
                dispatch(getAddressFromLatLng({ lat, lng }));
              }
            }
          }}
        >
          {/* Add markers, polygons, etc. here if needed */}
        </GoogleMap>

        <img
          src={require('@/assets/icons/map-pin.svg')}
          alt='Map center marker'
          className='map-center-marker'
        />

        <button
          onClick={getCurrentLocation}
          disabled={isLoading}
          className='map-get-current-location'
          title="Joriy joylashuvga o'tish"
        >
          {isLoading ? <LoadingOutlined /> : <AimOutlined />}
        </button>

        <Button
          onClick={handleSelect}
          className='map-bottom-controller'
          disabled={!address || !lat || !lng}
          title={'Bu joylashuvni tanlash'}
        ></Button>
      </div>
    </LoadScript>
  );
};

export default LocationSelectorMap;
