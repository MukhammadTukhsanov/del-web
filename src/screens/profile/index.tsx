import { logout } from '@/features/auth/userSlice';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LanguageModal from './profile-modals/modal';
import './style.css'; // Import the CSS file

const ProfileScreen = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user = useAppSelector((state) => state.user.user);

  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [showUserAgreement, setShowUserAgreement] = useState(false);

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
      onClick: () => setShowHelpModal(true),
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
      onClick: () => setShowPrivacyPolicy(true),
    },
    {
      id: 'terms',
      title: 'Foydalanuvchi shartnomasi',
      icon: 'bi-file-text',
      onClick: () => setShowUserAgreement(true),
    },
  ];

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const handleCloseModal = () => {
    setShowLanguageModal(false);
    setShowLogoutModal(false);
    setShowEditModal(false);
    setShowHelpModal(false);
    setShowPrivacyPolicy(false);
    setShowUserAgreement(false);
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
      {/* user agreement */}
      <LanguageModal type={'agreement'} show={showUserAgreement} hide={handleCloseModal} />
      {/* privacy policy */}
      <LanguageModal type={'privacy'} show={showPrivacyPolicy} hide={handleCloseModal} />
      {/* Language Selection Modal */}
      <LanguageModal type={'language'} show={showLanguageModal} hide={handleCloseModal} />
      {/* help modal */}
      <LanguageModal type={'help'} show={showHelpModal} hide={handleCloseModal} />
      {/* Edit modal */}
      <LanguageModal type={'edit'} show={showEditModal} hide={handleCloseModal} />
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
