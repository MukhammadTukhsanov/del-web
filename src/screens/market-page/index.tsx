import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner';
import { addToCart, clearAndAddToCart, removeFromCart } from '@/features/cart/cartSlice';
import { getMerchantProducts } from '@/features/merchants/merchantsSlice';
import { useAppDispatch } from '@/hooks';
import { RootState } from '@/store';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { MarketTypesFoodCategories } from '@/constants/MarketType';
import './market-page.css';

const MarketPage = () => {
  let params = useParams();
  const marketId = params.mid;
  const [activeCategory, setActiveCategory] = useState('all');
  const [scrolled, setScrolled] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [pendingItem, setPendingItem] = useState<any>(null);

  const dispatch = useAppDispatch();

  const location = useLocation();
  const merchant = location.state;

  const { photo, deliveryTime, deliveryPrice, businessAddress, businessName, rate } = merchant;

  const merchantInformation = {
    photo: photo,
    deliveryPrice: deliveryPrice,
    deliveryTime: deliveryTime,
    businessAddress: businessAddress,
    businessName: businessName,
    rate: rate,
  };

  const { products, loading, error } = useSelector((state: RootState) => state.merchants);
  const {
    items: cartItems,
    currentMerchantId,
    currentMerchantName,
  } = useSelector((state: RootState) => state.cart);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 200);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    console.log('merchantInformation: ', merchantInformation);

    if (!marketId) {
      return;
    }

    dispatch(getMerchantProducts(marketId));
  }, [dispatch, marketId]);

  const getCartItemCount = (itemId: string) => {
    const cartItem = cartItems.find((item) => item.id === itemId);
    return cartItem ? cartItem.count : 0;
  };

  const handleAddToCart = (item: any) => {
    const itemWithMerchant = {
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.photo,
      category: activeCategory,
      merchantId: marketId!,
      merchantName: merchantInformation.businessName,
    };

    // Check if cart has items from different merchant
    if (currentMerchantId && currentMerchantId !== marketId) {
      setPendingItem(itemWithMerchant);
      setShowAlert(true);
      return;
    }

    // Safe to add to cart
    dispatch(addToCart(itemWithMerchant));
  };

  const handleRemoveFromCart = (itemId: string) => {
    dispatch(removeFromCart(itemId));
  };

  const handleConfirmClearCart = () => {
    if (pendingItem) {
      dispatch(clearAndAddToCart(pendingItem));
      setPendingItem(null);
    }
    setShowAlert(false);
  };

  const handleCancelAlert = () => {
    setPendingItem(null);
    setShowAlert(false);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <p>Error: {error}</p>
        <button
          onClick={() => {
            if (marketId) {
              dispatch(getMerchantProducts(marketId));
            }
          }}
        >
          Retry
        </button>
      </div>
    );
  }

  if (!merchantInformation) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <p>Merchant information not found</p>
        <button onClick={() => navigate(-1)}>Go Back</button>
      </div>
    );
  }

  return (
    <div className='market-page'>
      {/* Header Image */}
      <div className='market-header'>
        <div
          className='market-header-photo'
          style={{ backgroundImage: `url('${merchant.photo}')` }}
        ></div>
        <div className='image-overlay'></div>
        <button onClick={() => navigate(-1)} className='market-back'>
          <ArrowLeftOutlined />
        </button>
      </div>

      {/* Market Info */}
      <div className='market-info'>
        <h1 className='market-title'>{merchantInformation.businessName}</h1>

        <div className='market-details'>
          <div className='rating-container'>
            <div className='star-icon'>★</div>
            <span className='rating-text'>{merchantInformation.rate || 'N/A'}</span>
          </div>

          <div className='detail-item'>
            <div className='detail-icon'>🕐</div>
            <span className='detail-text'>{merchantInformation.deliveryTime || 'N/A'}</span>
          </div>

          <div className='detail-item'>
            <div className='detail-icon'>🚚</div>
            <span className='detail-text'>
              {merchantInformation.deliveryPrice
                ? `${new Intl.NumberFormat('uz-UZ').format(merchantInformation.deliveryPrice)} so'm`
                : 'N/A'}
            </span>
          </div>
        </div>

        <div className='location-container'>
          <div className='detail-icon'>📍</div>
          <span className='location-text'>{merchantInformation.businessAddress || 'N/A'}</span>
        </div>
      </div>

      {/* Category Tabs */}
      <div className={`category-tabs ${scrolled ? 'scrolled' : ''}`}>
        <div className='tabs-container'>
          {merchant.merchantType === 'food' &&
            MarketTypesFoodCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`category-tab ${activeCategory === category.id ? 'active' : 'inactive'}`}
              >
                {category.text}
              </button>
            ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className='products-section'>
        <h2 className='section-title'>
          {MarketTypesFoodCategories.find((item) => item.id === activeCategory)?.text}
        </h2>
        <div className='products-grid'>
          {products?.map((item, index) => {
            const cartCount = getCartItemCount(item.id);

            return (
              <div key={item.id || index} className='product-card'>
                <div className='product-image-container'>
                  <img
                    src={item.photo || '/placeholder-product.jpg'}
                    alt={item.name}
                    className='product-image'
                  />
                </div>
                <div className='product-info'>
                  <h3 className='product-name'>{item.name}</h3>
                  <p className='product-price'>
                    {new Intl.NumberFormat('uz-UZ').format(item.price)} so'm
                  </p>

                  {cartCount === 0 ? (
                    <button className='add-to-cart-btn' onClick={() => handleAddToCart(item)}>
                      Savatga qo'shish
                    </button>
                  ) : (
                    <div className='cart-controls'>
                      <button className='cart-btn' onClick={() => handleRemoveFromCart(item.id)}>
                        −
                      </button>
                      <span className='cart-count'>{cartCount}</span>
                      <button className='cart-btn' onClick={() => handleAddToCart(item)}>
                        +
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Alert Modal */}
      {showAlert && (
        <>
          <div className='alert-overlay' onClick={handleCancelAlert}></div>
          <div className='alert-modal'>
            <div className='alert-header'>
              <h3>Savatni tozalash</h3>
            </div>
            <div className='alert-body'>
              <p>
                Sizning savatingizda <strong>{currentMerchantName}</strong> restoranidan mahsulotlar
                bor.
              </p>
              <p>
                <strong>{merchantInformation.businessName}</strong> restoranidan mahsulot qo'shish
                uchun avval savatni tozalash kerak.
              </p>
            </div>
            <div className='alert-actions'>
              <button className='alert-cancel' onClick={handleCancelAlert}>
                Bekor qilish
              </button>
              <button className='alert-confirm' onClick={handleConfirmClearCart}>
                Savatni tozalab qo'shish
              </button>
            </div>
          </div>
        </>
      )}

      {/* Bottom spacing for mobile */}
      <div className='bottom-spacing'></div>

      <style jsx>{`
        .alert-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          z-index: 1000;
        }

        .alert-modal {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: white;
          border-radius: 12px;
          padding: 24px;
          max-width: 90%;
          width: 400px;
          z-index: 1001;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        }

        .alert-header h3 {
          margin: 0;
          font-size: 18px;
          font-weight: 600;
          color: #333;
          margin-bottom: 16px;
        }

        .alert-body p {
          margin: 0 0 12px 0;
          font-size: 14px;
          line-height: 1.5;
          color: #666;
        }

        .alert-body p:last-child {
          margin-bottom: 24px;
        }

        .alert-actions {
          display: flex;
          gap: 12px;
        }

        .alert-cancel,
        .alert-confirm {
          flex: 1;
          padding: 12px 16px;
          border: none;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }

        .alert-cancel {
          background: #f5f5f5;
          color: #666;
        }

        .alert-cancel:hover {
          background: #e0e0e0;
        }

        .alert-confirm {
          background: #ff6b35;
          color: white;
        }

        .alert-confirm:hover {
          background: #e55a2b;
        }
      `}</style>
    </div>
  );
};

export default MarketPage;
