import { useState } from 'react';

const ProfileScreen = () => {
  const [userInfo, setUserInfo] = useState({
    name: 'Akmal Karimov',
    phone: '+998 90 123 45 67',
  });

  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('uz');

  const languages = [
    { code: 'uz', name: "O'zbekcha", flag: '🇺🇿' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
  ];

  const menuItems = [
    {
      id: 'orders',
      title: 'Buyurtmalar tarixi',
      icon: 'bi-clock-history',
      onClick: () => console.log('Buyurtmalar tarixi clicked'),
    },
    {
      id: 'promo',
      title: 'Promokodlar',
      icon: 'bi-tag',
      onClick: () => console.log('Promokodlar clicked'),
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

  const handleLanguageSelect = (languageCode: any) => {
    setSelectedLanguage(languageCode);
    setShowLanguageModal(false);
    console.log('Language selected:', languageCode);
  };

  const handleCloseModal = () => {
    setShowLanguageModal(false);
  };

  const handleConfirmLogout = () => {
    console.log('User logged out');
    setShowLogoutModal(false);
    // Add your logout logic here
  };

  const handleCancelLogout = () => {
    setShowLogoutModal(false);
  };

  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#f5f5f5',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    },
    header: {
      backgroundColor: '#ffffff',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      padding: '24px 16px',
    },
    headerTitle: {
      fontSize: '20px',
      fontWeight: '600',
      color: '#1a1a1a',
      textAlign: 'center' as const,
      margin: 0,
    },
    userSection: {
      backgroundColor: '#ffffff',
      margin: '16px 16px 0 16px',
      borderRadius: '12px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      padding: '24px',
    },
    userContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    userInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
    },
    avatar: {
      width: '64px',
      height: '64px',
      borderRadius: '50%',
      backgroundColor: '#ff9556',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    avatarIcon: {
      fontSize: '32px',
      color: '#ffffff',
    },
    userDetails: {
      display: 'flex',
      flexDirection: 'column' as const,
    },
    userName: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#1a1a1a',
      margin: 0,
    },
    userPhone: {
      fontSize: '14px',
      color: '#666666',
      marginTop: '4px',
    },
    editButton: {
      padding: '8px',
      borderRadius: '50%',
      backgroundColor: 'transparent',
      border: 'none',
      cursor: 'pointer',
      transition: 'background-color 0.2s ease',
    },
    editIcon: {
      fontSize: '18px',
      color: '#666666',
    },
    menuSection: {
      backgroundColor: '#ffffff',
      margin: '16px 16px 0 16px',
      borderRadius: '12px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      overflow: 'hidden',
    },
    menuItem: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '16px',
      backgroundColor: 'transparent',
      border: 'none',
      borderBottom: '1px solid #f0f0f0',
      cursor: 'pointer',
      transition: 'background-color 0.2s ease',
      textAlign: 'left' as const,
    },
    // 90 007 61 57
    menuItemLast: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '16px',
      backgroundColor: 'transparent',
      border: 'none',
      cursor: 'pointer',
      transition: 'background-color 0.2s ease',
      textAlign: 'left' as const,
    },
    menuItemLeft: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
    },
    menuIconContainer: {
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      backgroundColor: '#f5f5f5',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    menuIcon: {
      fontSize: '18px',
      color: '#ff9556',
    },
    menuText: {
      fontSize: '16px',
      fontWeight: '500',
      color: '#1a1a1a',
    },
    chevronIcon: {
      fontSize: '16px',
      color: '#cccccc',
    },
    logoutSection: {
      margin: '16px 16px 32px 16px',
    },
    logoutButton: {
      width: '100%',
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      padding: '16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '12px',
      border: 'none',
      cursor: 'pointer',
      transition: 'background-color 0.2s ease',
    },
    logoutIconContainer: {
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      backgroundColor: '#fee',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    logoutIcon: {
      fontSize: '18px',
      color: '#ef4444',
    },
    logoutText: {
      fontSize: '16px',
      fontWeight: '500',
      color: '#ef4444',
    },
    bottomSpacer: {
      height: '32px',
    },
    // Modal styles
    modalOverlay: {
      position: 'fixed' as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '16px',
      animation: 'fadeIn 0.3s ease-out',
    },
    modalContent: {
      backgroundColor: '#ffffff',
      borderRadius: '16px',
      width: '100%',
      maxWidth: '400px',
      maxHeight: '80vh',
      overflow: 'hidden',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
      animation: 'slideUp 0.3s ease-out',
      transform: 'translateY(0)',
    },
    modalHeader: {
      padding: '20px 20px 16px 20px',
      borderBottom: '1px solid #f0f0f0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    modalTitle: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#1a1a1a',
      margin: 0,
    },
    closeButton: {
      background: 'none',
      border: 'none',
      fontSize: '24px',
      color: '#666666',
      cursor: 'pointer',
      padding: '4px',
      borderRadius: '4px',
    },
    modalBody: {
      padding: '8px 0',
      maxHeight: '400px',
      overflowY: 'auto' as const,
    },
    languageItem: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '16px 20px',
      backgroundColor: 'transparent',
      border: 'none',
      cursor: 'pointer',
      transition: 'background-color 0.2s ease',
    },
    languageItemLeft: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
    },
    languageFlag: {
      fontSize: '24px',
    },
    languageName: {
      fontSize: '16px',
      fontWeight: '500',
      color: '#1a1a1a',
    },
    checkIcon: {
      fontSize: '20px',
      color: '#ff9556',
    },
    // Logout Modal Styles
    logoutModalContent: {
      backgroundColor: '#ffffff',
      borderRadius: '16px',
      width: '100%',
      maxWidth: '340px',
      overflow: 'hidden',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
      animation: 'slideUp 0.3s ease-out',
      transform: 'translateY(0)',
    },
    logoutModalHeader: {
      padding: '24px 24px 16px 24px',
      textAlign: 'center' as const,
    },
    logoutModalIcon: {
      width: '56px',
      height: '56px',
      borderRadius: '50%',
      backgroundColor: '#fee2e2',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 16px auto',
    },
    logoutModalIconSymbol: {
      fontSize: '24px',
      color: '#ef4444',
    },
    logoutModalTitle: {
      fontSize: '20px',
      fontWeight: '600',
      color: '#1a1a1a',
      margin: '0 0 8px 0',
    },
    logoutModalText: {
      fontSize: '14px',
      color: '#666666',
      margin: 0,
      lineHeight: '1.4',
    },
    logoutModalActions: {
      padding: '16px 24px 24px 24px',
      display: 'flex',
      gap: '12px',
    },
    cancelButton: {
      flex: 1,
      padding: '12px 24px',
      backgroundColor: '#f5f5f5',
      border: 'none',
      borderRadius: '8px',
      fontSize: '16px',
      fontWeight: '500',
      color: '#666666',
      cursor: 'pointer',
      transition: 'background-color 0.2s ease',
    },
    confirmButton: {
      flex: 1,
      padding: '12px 24px',
      backgroundColor: '#ef4444',
      border: 'none',
      borderRadius: '8px',
      fontSize: '16px',
      fontWeight: '500',
      color: '#ffffff',
      cursor: 'pointer',
      transition: 'background-color 0.2s ease',
    },
  };

  return (
    <div style={styles.container}>
      {/* Bootstrap Icons CDN */}
      <link
        rel='stylesheet'
        href='https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.11.1/font/bootstrap-icons.min.css'
      />

      {/* CSS Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
          
          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(30px) scale(0.95);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
        `}
      </style>

      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.headerTitle}>Profil</h1>
      </div>

      {/* User Info Section */}
      <div style={styles.userSection}>
        <div style={styles.userContainer}>
          <div style={styles.userInfo}>
            <div style={styles.avatar}>
              <i className='bi bi-person' style={styles.avatarIcon}></i>
            </div>
            <div style={styles.userDetails}>
              <h2 style={styles.userName}>{userInfo.name}</h2>
              <p style={styles.userPhone}>{userInfo.phone}</p>
            </div>
          </div>
          <button
            onClick={handleEditProfile}
            style={styles.editButton}
            onMouseEnter={(e) =>
              ((e.target as HTMLButtonElement).style.backgroundColor = '#f5f5f5')
            }
            onMouseLeave={(e) =>
              ((e.target as HTMLButtonElement).style.backgroundColor = 'transparent')
            }
          >
            <i className='bi bi-pencil' style={styles.editIcon}></i>
          </button>
        </div>
      </div>

      {/* Menu Items */}
      <div style={styles.menuSection}>
        {menuItems.map((item, index) => {
          const isLast = index === menuItems.length - 1;
          return (
            <button
              key={item.id}
              onClick={item.onClick}
              style={isLast ? styles.menuItemLast : styles.menuItem}
              onMouseEnter={(e) =>
                ((e.target as HTMLButtonElement).style.backgroundColor = '#f9f9f9')
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLButtonElement).style.backgroundColor = 'transparent')
              }
            >
              <div style={styles.menuItemLeft}>
                <div style={styles.menuIconContainer}>
                  <i className={item.icon} style={styles.menuIcon}></i>
                </div>
                <span style={styles.menuText}>{item.title}</span>
              </div>
              <i className='bi bi-chevron-right' style={styles.chevronIcon}></i>
            </button>
          );
        })}
      </div>

      {/* Logout Button */}
      <div style={styles.logoutSection}>
        <button
          onClick={handleLogout}
          style={styles.logoutButton}
          onMouseEnter={(e) => ((e.target as HTMLButtonElement).style.backgroundColor = '#fef2f2')}
          onMouseLeave={(e) => ((e.target as HTMLButtonElement).style.backgroundColor = '#ffffff')}
        >
          <div style={styles.logoutIconContainer}>
            <i className='bi bi-box-arrow-right' style={styles.logoutIcon}></i>
          </div>
          <span style={styles.logoutText}>Chiqish</span>
        </button>
      </div>

      {/* Bottom Safe Area */}
      <div style={styles.bottomSpacer}></div>

      {/* Language Selection Modal */}
      {showLanguageModal && (
        <div style={styles.modalOverlay} onClick={handleCloseModal}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h3 style={styles.modalTitle}>Tilni tanlang</h3>
              <button style={styles.closeButton} onClick={handleCloseModal}>
                <i className='bi bi-x'></i>
              </button>
            </div>
            <div style={styles.modalBody}>
              {languages.map((language) => (
                <button
                  key={language.code}
                  style={styles.languageItem}
                  onClick={() => handleLanguageSelect(language.code)}
                  onMouseEnter={(e) =>
                    ((e.target as HTMLButtonElement).style.backgroundColor = '#f9f9f9')
                  }
                  onMouseLeave={(e) =>
                    ((e.target as HTMLButtonElement).style.backgroundColor = 'transparent')
                  }
                >
                  <div style={styles.languageItemLeft}>
                    <span style={styles.languageFlag}>{language.flag}</span>
                    <span style={styles.languageName}>{language.name}</span>
                  </div>
                  {selectedLanguage === language.code && (
                    <i className='bi bi-check' style={styles.checkIcon}></i>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div style={styles.modalOverlay} onClick={handleCancelLogout}>
          <div style={styles.logoutModalContent} onClick={(e) => e.stopPropagation()}>
            <div style={styles.logoutModalHeader}>
              <div style={styles.logoutModalIcon}>
                <i className='bi bi-exclamation-triangle' style={styles.logoutModalIconSymbol}></i>
              </div>
              <h3 style={styles.logoutModalTitle}>Chiqishni tasdiqlang</h3>
              <p style={styles.logoutModalText}>Haqiqatan ham hisobingizdan chiqmoqchimisiz?</p>
            </div>
            <div style={styles.logoutModalActions}>
              <button
                style={styles.cancelButton}
                onClick={handleCancelLogout}
                onMouseEnter={(e) =>
                  ((e.target as HTMLButtonElement).style.backgroundColor = '#e5e5e5')
                }
                onMouseLeave={(e) =>
                  ((e.target as HTMLButtonElement).style.backgroundColor = '#f5f5f5')
                }
              >
                Bekor qilish
              </button>
              <button
                style={styles.confirmButton}
                onClick={handleConfirmLogout}
                onMouseEnter={(e) =>
                  ((e.target as HTMLButtonElement).style.backgroundColor = '#dc2626')
                }
                onMouseLeave={(e) =>
                  ((e.target as HTMLButtonElement).style.backgroundColor = '#ef4444')
                }
              >
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
