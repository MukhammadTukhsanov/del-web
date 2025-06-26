import Button from '@/components/Button/Button';
import Input from '@/components/Input/Input';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { getUserInfo } from '@/services/profile.services';
import { CloseOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css'; // Import the CSS file
import { logout } from '@/features/auth/userSlice';

const ProfileScreen = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user = useAppSelector((state) => state.user.user);

  console.log('user: ', user);

  const [userInfo, setUserInfo] = useState({
    name: '',
    phone: '',
  });

  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [selectedLanguage, setSelectedLanguage] = useState('uz');

  const languages = [{ code: 'uz', name: "O'zbekcha", flag: '🇺🇿' }];

  const menuItems = [
    {
      id: 'orders',
      title: 'Buyurtmalar tarixi',
      icon: 'bi-clock-history',
      onClick: () => navigate('/orders'),
    },
    {
      id: 'help',
      title: 'Yordam',
      icon: 'bi-question-circle',
      onClick: () => console.log('Yordam clicked'),
    },
    {
      id: 'language',
      title: 'Til',
      icon: 'bi-globe',
      onClick: () => setShowLanguageModal(true),
    },
    {
      id: 'privacy',
      title: 'Maxfiylik siyosati',
      icon: 'bi-shield-check',
      onClick: () => console.log('Maxfiylik siyosati clicked'),
    },
    {
      id: 'terms',
      title: 'Foydalanuvchi shartnomasi',
      icon: 'bi-file-text',
      onClick: () => console.log('Foydalanuvchi shartnomasi clicked'),
    },
  ];

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const handleEditProfile = () => {
    console.log('Edit profile clicked');
  };

  const handleLanguageSelect = (languageCode: string) => {
    setSelectedLanguage(languageCode);
    setShowLanguageModal(false);
    console.log('Language selected:', languageCode);
  };

  const handleCloseModal = () => {
    setShowLanguageModal(false);
    setShowLogoutModal(false);
    setShowEditModal(false);
  };

  const handleConfirmLogout = async () => {
    console.log('User logged out');
    try {
      await dispatch(logout());
      localStorage.removeItem('auth_token');
      navigate('/');
    } catch {
      console.log('error');
    }
    setShowLogoutModal(false);
  };

  function formatUzbekPhone(phone: string) {
    if (!phone || phone.length !== 12) return phone;
    return `${phone.slice(0, 3)} ${phone.slice(3, 5)} ${phone.slice(5, 8)} ${phone.slice(
      8,
      10,
    )} ${phone.slice(10, 12)}`;
  }

  return (
    <div className='container'>
      {/* Bootstrap Icons CDN */}
      <link
        rel='stylesheet'
        href='https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.11.1/font/bootstrap-icons.min.css'
      />

      {/* Header */}
      <div className='header'>
        <h1 className='header-title'>Profil</h1>
      </div>

      {/* User Info Section */}
      <div className='user-section'>
        <div className='user-container'>
          <div className='user-info'>
            <div className='avatar'>
              <i className='bi bi-person avatar-icon'></i>
            </div>
            <div className='user-details'>
              <h2 className='user-name'>{user?.name}</h2>
              <p className='user-phone'>+{formatUzbekPhone(`${user?.phone}`)}</p>
            </div>
          </div>
          <button onClick={() => setShowEditModal(true)} className='edit-button'>
            <i className='bi bi-pencil edit-icon'></i>
          </button>
        </div>
      </div>

      <div className='menu-section'>
        {menuItems.map((item, index) => {
          const isLast = index === menuItems.length - 1;
          return (
            <button
              key={item.id}
              onClick={item.onClick}
              className={isLast ? 'menu-item-last' : 'menu-item'}
            >
              <div className='menu-item-left'>
                <div className='menu-icon-container'>
                  <i className={`${item.icon} menu-icon`}></i>
                </div>
                <span className='menu-text'>{item.title}</span>
              </div>
              <i className='bi bi-chevron-right chevron-icon'></i>
            </button>
          );
        })}
      </div>

      {/* Logout Button */}
      <div className='logout-section'>
        <button onClick={handleLogout} className='logout-button'>
          <div className='logout-icon-container'>
            <i className='bi bi-box-arrow-right logout-icon'></i>
          </div>
          <span className='logout-text'>Chiqish</span>
        </button>
      </div>

      {/* Bottom Safe Area */}
      <div className='bottom-spacer'></div>

      {/* Language Selection Modal */}
      {showLanguageModal && (
        <div className='modal-overlay' onClick={handleCloseModal}>
          <div className='modal-content' onClick={(e) => e.stopPropagation()}>
            <div className='modal-header'>
              <h3 className='modal-title'>Tilni tanlang</h3>
              <button className='close-button' onClick={handleCloseModal}>
                <i className='bi bi-x'></i>
              </button>
            </div>
            <div className='modal-body'>
              {languages.map((language) => (
                <button
                  key={language.code}
                  className='language-item'
                  onClick={() => handleLanguageSelect(language.code)}
                >
                  <div className='language-item-left'>
                    <span className='language-flag'>{language.flag}</span>
                    <span className='language-name'>{language.name}</span>
                  </div>
                  {selectedLanguage === language.code && <i className='bi bi-check check-icon'></i>}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
      {showEditModal && (
        <div className='modal-overlay' onClick={handleCloseModal}>
          <div className='logout-modal-content' onClick={(e) => e.stopPropagation()}>
            <div className='p-16 d-flex f-column gap-16'>
              <div className='d-flex'>
                <h1 className='header-title'>Malumotlar</h1>
                <CloseOutlined />
              </div>
              <Input
                value={`+${formatUzbekPhone(userInfo.phone)}`}
                onChange={() => null}
                disabled
                placeholder={userInfo.phone}
              />
              <Input
                value={userInfo.name}
                onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                placeholder='Ism va Familiya'
              />
              <Button title='Yangilash' onClick={() => {}} />
            </div>
          </div>
        </div>
      )}
      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className='modal-overlay' onClick={handleCloseModal}>
          <div className='logout-modal-content' onClick={(e) => e.stopPropagation()}>
            <div className='logout-modal-header'>
              <div className='logout-modal-icon'>
                <i className='bi bi-exclamation-triangle logout-modal-icon-symbol'></i>
              </div>
              <h3 className='logout-modal-title'>Chiqishni tasdiqlang</h3>
              <p className='logout-modal-text'>Haqiqatan ham hisobingizdan chiqmoqchimisiz?</p>
            </div>
            <div className='logout-modal-actions'>
              <button className='cancel-button' onClick={handleCloseModal}>
                Bekor qilish
              </button>
              <button className='confirm-button' onClick={handleConfirmLogout}>
                Chiqish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileScreen;
