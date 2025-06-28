import { useAppDispatch, useAppSelector } from '@/hooks';
import { AimOutlined, ArrowLeftOutlined, LoadingOutlined } from '@ant-design/icons';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import mapboxgl, { Map as MapboxMap } from 'mapbox-gl';
import './LocationSelectorMap.css';
import AddressSearch from './AutoCompleteSearch';
import { getAddressFromLatLng, setLocation } from '@/features/location/locationSlice';
import { updateCurrentUser } from '@/features/auth/userSlice';
mapboxgl.accessToken = process.env.MAPBOX_API;

export default function CenteredLocationSelector() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  
  const mapRef = useRef<MapboxMap | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  const { user } = useAppSelector((state) => state.user);
  const { selection } = useAppSelector((state) => state.location);

  useEffect(() => {
    if (!mapRef.current || !selection) return;
    console.log('Selection changed:', selection);

    // Update map center when lat/lng changes
    mapRef.current.setCenter([
      selection.lng,
      selection.lat,
    ]);
    // Optionally, you can also set the zoom level if needed
    mapRef.current.setZoom(18);
  }, [selection]);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/satellite-streets-v12',
      center: [
        69.2401,
        41.2995,
      ],
      zoom: 16,
    });

    mapRef.current = map;

    map.on('load', () => {
      dispatch(getAddressFromLatLng({lat: 41.2995, lng: 69.2401}));
    });

    map.on('moveend', () => {
      const { lat, lng } = map.getCenter();
      dispatch(getAddressFromLatLng({lat, lng}))
    });

    return () => {
      map.remove();
    };
  }, [dispatch]);

  const handleSelect = () => {
    dispatch(
      updateCurrentUser({
        location: selection,
        locations: [
          ...(user.locations || []).slice(0, 3),
          selection,
        ],
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
          mapRef.current.setCenter([longitude, latitude]);
        }
        setIsLoading(false);
      },
      (error) => {
        console.error('Error getting current location:', error);
        setIsLoading(false);
      },
    );
  }

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className='map-wrapper'>
      <div className='map-header'>
        <button onClick={handleBack} className='map-back-button'>
          <ArrowLeftOutlined />
        </button>
        <form className='map-header-address'>
          <AddressSearch />
        </form>
      </div>

      <div
        id='map-container'
        ref={mapContainerRef}
        style={{ height: '100%', width: '100%' }}
      />

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

      <button
        onClick={handleSelect}
        className='map-bottom-controller'
      >
        Bu joylashuvni tanlash
      </button>
    </div>
  );
}
