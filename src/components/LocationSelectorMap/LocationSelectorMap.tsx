import { updateCurrentUser } from '@/features/auth/userSlice';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { AimOutlined, ArrowLeftOutlined, LoadingOutlined } from '@ant-design/icons';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import Button from '../Button/Button';
import Input from '../Input/Input';
import Modal from '../Modal/Modal';
import './LocationSelectorMap.css';

// delete (L.Icon.Default.prototype as any)._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
//   iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
//   shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
// });

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
  const [currentLocation, setCurrentLocation] = useState<L.LatLngLiteral | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [address, setAddress] = useState('');
  const [addressName, setAddressName] = useState('');

  const [showAdresTitleModal, setShowAdresTitleModal] = useState(false);

  const mapRef = useRef<L.Map>(null);

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolokatsiya bu brauzerda qo'llab-quvvatlanmaydi");
      return;
    }

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const newLocation = { lat: latitude, lng: longitude };
        setCurrentLocation(newLocation);
        setCenter(newLocation);

        // Move map to current location
        if (mapRef.current) {
          mapRef.current.setView([latitude, longitude], 15);
        }

        setIsLoading(false);
        reverseGeocode(latitude, longitude);
      },
      (err) => {
        console.error('Geolocation error:', err.message);
        alert("Joylashuvni aniqlab bo'lmadi. Iltimos, qaytadan urinib ko'ring.");
        setIsLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      },
    );
  };

  const reverseGeocode = async (lat: number, lng: number) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`,
      );
      const data = await response.json();
      if (data.display_name) {
        setAddress(data.display_name);
      }
    } catch (error) {
      console.error('Reverse geocoding error:', error);
    }
  };

  // Initial location fetch
  useEffect(() => {
    getCurrentLocation();
  }, []);

  // Handle map center change
  const handleMapMove = (newCenter: L.LatLng) => {
    setCenter(newCenter);
    reverseGeocode(newCenter.lat, newCenter.lng);
  };

  const handleSelect = () => {
    if (mapRef.current) {
      const currentCenter = mapRef.current.getCenter();
      if (addressName.length) {
        dispatch(
          updateCurrentUser({
            location: {
              lat: currentCenter.lat,
              lng: currentCenter.lng,
              addressName,
            },
            locations: [
              ...(user.locationHistory || []).slice(0, 3),
              { lat: currentCenter.lat, lng: currentCenter.lng },
            ],
          }),
        );
        setShowAdresTitleModal(false);
        navigate(-1);
      }
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className='map-wrapper'>
      <Modal
        show={showAdresTitleModal}
        title='Joylashuv nomi'
        hide={() => setShowAdresTitleModal(false)}
      >
        <div className='px-16 d-flex f-column gap-16'>
          <Input
            placeholder='Joylashuv nomi'
            value={addressName}
            onChange={(e) => setAddressName(e.target.value)}
          />
          <Button
            disabled={!addressName.length}
            className='mb-16'
            title='Saqlash'
            onClick={handleSelect}
          />
        </div>
      </Modal>
      <div className='map-header'>
        <button onClick={handleBack} className='map-back-button'>
          <ArrowLeftOutlined />
        </button>
        <div className='map-header-address'>
          <h6>{address}</h6>
        </div>
      </div>

      <MapContainer
        center={center}
        zoom={13}
        zoomControl={false}
        scrollWheelZoom
        className='map-container'
        ref={mapRef}
      >
        <TileLayer
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          attribution='&copy; OpenStreetMap contributors'
        />
        <CenterListener onMove={handleMapMove} />
      </MapContainer>

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

      <button onClick={() => setShowAdresTitleModal(true)} className='map-bottom-controller'>
        Bu joylashuvni tanlash
      </button>
    </div>
  );
}
