import { updateCurrentUser } from '@/features/auth/userSlice';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { AimOutlined, ArrowLeftOutlined, LoadingOutlined } from '@ant-design/icons';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import mapboxgl, { Map as MapboxMap } from 'mapbox-gl';
import { AddressAutofill, SearchBox } from '@mapbox/search-js-react';
import Button from '../Button/Button';
import Input from '../Input/Input';
import Modal from '../Modal/Modal';
import './LocationSelectorMap.css';
import AddressSearch from './AutoCompleteSearch';
mapboxgl.accessToken = 'pk.eyJ1Ijoic2hha2hyaWxsbzEzIiwiYSI6ImNtY2c1eGI2cDBmbHUyaXNlbzkxd2ZteDAifQ.zX4h_ennSb1_kaTgD0Ijmg';

export default function CenteredLocationSelector() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);

  const [center, setCenter] = useState<{ lat: number; lng: number }>({
    lat: 41.2995,
    lng: 69.2401,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [address, setAddress] = useState('');
  const [addressName, setAddressName] = useState('');
  const [showAdresTitleModal, setShowAdresTitleModal] = useState(false);

  const mapRef = useRef<MapboxMap | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [
        69.2401,
        41.2995,
      ],
      zoom: 10,
    });

    mapRef.current = map;

    map.on('moveend', (e) => {
      console.log('Map moved:', e);
      const center = e.target.getCenter();
      const newCenter = { lat: center.lat, lng: center.lng };
      setCenter(newCenter);
    });

    return () => {
      map.remove();
    };
  }, [mapContainerRef]);

  const handleSelect = () => {
    if (mapRef.current && addressName.length) {
      const currentCenter = mapRef.current.getCenter();
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
  };

  const getCurrentLocation = () => {
    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCenter({ lat: latitude, lng: longitude });
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
        <form className='map-header-address'>
          <AddressSearch location={center} />
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
        onClick={() => setShowAdresTitleModal(true)}
        className='map-bottom-controller'
      >
        Bu joylashuvni tanlash
      </button>
    </div>
  );
}
