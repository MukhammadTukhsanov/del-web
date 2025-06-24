import { ArrowLeftOutlined, DeleteOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BasketItem from './basket-item';
import './style.css';

interface TopNavBarProps {
  title?: string;
  onTrashClick?: () => void;
}

export default function Basket({ title = 'Savat', onTrashClick }: TopNavBarProps) {
  const navigate = useNavigate();
  const [showFixedNavbar, setShowFixedNavbar] = useState(false);

  // Mock data - replace with your actual state/props
  const [basketData, setBasketData] = useState({
    itemCount: 3,
    totalPrice: 89000,
    deliveryPrice: 0, // Set to 0 for free delivery, or any number for paid delivery
    currency: "so'm",
  });

  const [comment, setComment] = useState('');
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [tempComment, setTempComment] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setShowFixedNavbar(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const formatPrice = (price: number) => {
    return price.toLocaleString('uz-UZ');
  };

  const isDeliveryFree = basketData.deliveryPrice === 0;
  const finalTotal = basketData.totalPrice + basketData.deliveryPrice;

  const handleCheckout = () => {
    // Handle checkout logic here
    const orderData = {
      items: basketData,
      comment: comment.trim(),
      total: finalTotal,
    };
    console.log('Proceeding to checkout with:', orderData);
  };

  const openCommentModal = () => {
    setTempComment(comment);
    setIsCommentModalOpen(true);
  };

  const closeCommentModal = () => {
    setIsCommentModalOpen(false);
    setTempComment('');
  };

  const saveComment = () => {
    setComment(tempComment);
    setIsCommentModalOpen(false);
    setTempComment('');
  };

  return (
    <div className='basket-page'>
      {/* Static navbar */}
      <div className='top-navbar'>
        <button className='nav-icon' onClick={() => navigate(-1)} aria-label='Back'>
          <ArrowLeftOutlined style={{ fontSize: 20 }} />
        </button>
        <div className='center-text'>
          <h6 className='nav-title m-0'>Savat</h6>
          <p className='nav-subtitle m-0'>Bellisimo Pizza · 35-40 min</p>
        </div>
        <button className='nav-icon trash' onClick={onTrashClick} aria-label='Delete'>
          <DeleteOutlined style={{ fontSize: 20 }} />
        </button>
      </div>

      {/* Fixed top navbar on scroll */}
      <div className={`fixed-navbar ${showFixedNavbar ? 'show' : ''}`}>
        <div className='fixed-navbar-content'>
          <button className='nav-icon' onClick={() => navigate(-1)} aria-label='Back'>
            <ArrowLeftOutlined style={{ fontSize: 20 }} />
          </button>
          <div className='center-text'>
            <h6 className='nav-title m-0'>Savat</h6>
            <p className='nav-subtitle m-0'>Bellisimo Pizza · 35-40 min</p>
          </div>
          <button className='nav-icon trash' onClick={onTrashClick} aria-label='Delete'>
            <DeleteOutlined style={{ fontSize: 20 }} />
          </button>
        </div>
      </div>

      <div className='basket-items'>
        {[...Array(8)].map((_, i) => (
          <BasketItem key={i} />
        ))}
      </div>

      {/* Comment Button */}
      <div className='comment-button-section'>
        <button className='comment-button' onClick={openCommentModal}>
          <div className='comment-button-content'>
            <span className='comment-icon'>💬</span>
            <div className='comment-text'>
              <span className='comment-title'>Restoranga izoh</span>
              {comment && (
                <span className='comment-preview'>
                  {comment.length > 30 ? `${comment.substring(0, 30)}...` : comment}
                </span>
              )}
            </div>
          </div>
          <span className='comment-arrow'>›</span>
        </button>
      </div>

      {/* Extra space for scrolling to account for sticky bottom bar */}
      <div className='separate-title'>
        <h4>Hech narsani unutmadingizmi ?</h4>
      </div>

      {/* Enhanced Sticky Bottom Bar */}
      <div className='sticky-bottom-bar'>
        <div className='delivery-info'>
          <div className='delivery-row'>
            <span className='delivery-label'>Yetkazish:</span>
            <span className={`delivery-price ${isDeliveryFree ? 'free' : ''}`}>
              {isDeliveryFree
                ? 'Bepul'
                : `${formatPrice(basketData.deliveryPrice)} ${basketData.currency}`}
            </span>
          </div>
          {!isDeliveryFree && (
            <div className='delivery-note'>
              <span>Minimal buyurtma miqdori: 25,000 so'm</span>
            </div>
          )}
        </div>

        <button className='checkout-button' onClick={handleCheckout}>
          <div className='checkout-content'>
            <div className='checkout-left'>
              <span className='item-count'>{basketData.itemCount} ta mahsulot</span>
              <span className='checkout-title'>Buyurtma berish</span>
            </div>
            <div className='checkout-right'>
              <span className='total-price'>
                {formatPrice(finalTotal)} {basketData.currency}
              </span>
              <div className='checkout-arrow'>
                <ArrowLeftOutlined style={{ fontSize: 16, transform: 'rotate(180deg)' }} />
              </div>
            </div>
          </div>
        </button>
      </div>

      {/* Comment Bottom Sheet Modal */}
      {isCommentModalOpen && (
        <>
          <div className='modal-overlay' onClick={closeCommentModal}></div>
          <div className='comment-modal'>
            <div className='modal-header'>
              <h6 className='modal-title'>Restoranga izoh</h6>
              <button className='modal-close' onClick={closeCommentModal}>
                ✕
              </button>
            </div>
            <div className='modal-body'>
              <textarea
                className='modal-textarea'
                placeholder="Buyurtmangiz uchun qo'shimcha talablar yoki izohlarni kiriting..."
                value={tempComment}
                onChange={(e) => setTempComment(e.target.value)}
                maxLength={200}
                rows={5}
                autoFocus
              />
              <div className='modal-counter'>
                <span className={tempComment.length > 180 ? 'warning' : ''}>
                  {tempComment.length}/200
                </span>
              </div>
            </div>
            <div className='modal-footer'>
              <button className='modal-cancel' onClick={closeCommentModal}>
                Bekor qilish
              </button>
              <button className='modal-save' onClick={saveComment}>
                Saqlash
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
