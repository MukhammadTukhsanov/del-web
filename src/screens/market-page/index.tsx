import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner';
import { addToCart, removeFromCart } from '@/features/cart/cartSlice';
import { getMerchantProducts } from '@/features/merchants';
import { useAppDispatch } from '@/hooks';
import { RootState } from '@/store';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const MarketPage = () => {
  let params = useParams();
  const marketId = params.mid;
  const [activeCategory, setActiveCategory] = useState('Toza mevalar');
  const [scrolled, setScrolled] = useState(false);

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

  // const { products, merchantInformation, loading, error } = useSelector(
  const { products, loading, error } = useSelector((state: RootState) => state.merchants);

  const cartItems = useSelector((state: RootState) => state.cart.items);
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

    // Fix: Dispatch both actions to get merchant info and products
    // dispatch(getMerchantInformation(marketId));
    dispatch(getMerchantProducts(marketId));
  }, [dispatch, marketId]);

  const categories = [
    {
      name: 'Toza mevalar',
    },
    {
      name: 'Sabzavotlar',
    },
    {
      name: 'Sut mahsulotlari',
    },
    {
      name: 'Non mahsulotlari',
    },
  ];

  const getCartItemCount = (itemId: string) => {
    const cartItem = cartItems.find((item) => item.id === itemId);
    return cartItem ? cartItem.count : 0;
  };

  const handleAddToCart = (item: any) => {
    dispatch(
      addToCart({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.photo, // Fix: Use 'photo' instead of 'image'
        category: activeCategory,
      }),
    );
  };

  const handleRemoveFromCart = (itemId: string) => {
    dispatch(removeFromCart(itemId));
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  // Fix: Add error handling
  if (error) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <p>Error: {error}</p>
        <button
          onClick={() => {
            if (marketId) {
              // dispatch(getMerchantInformation(marketId));
              dispatch(getMerchantProducts(marketId));
            }
          }}
        >
          Retry
        </button>
      </div>
    );
  }

  // Fix: Add null check for merchantInformation
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
      <style>{`
        .market-page {
          min-height: 100vh;
          background-color: #f9fafb;
        }
        
        .market-header {
          position: relative;
        }
        
        .market-image {
          width: 100%;
          height: 12rem;
          object-fit: cover;
        }
        
        .image-overlay {
          position: absolute;
          inset: 0;
          background-color: rgba(0, 0, 0, 0.2);
        }
        
        .market-info {
          background-color: white;
          padding: 1rem;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
        }
        
        .market-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #111827;
          margin-bottom: 0.5rem;
        }
        
        .market-details {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 0.75rem;
        }
        
        .rating-container {
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }
        
        .star-icon {
          color: #fbbf24;
          font-size: 16px;
          line-height: 1;
        }
        
        .rating-text {
          font-size: 0.875rem;
          font-weight: 500;
          color: #111827;
        }
        
        .detail-item {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          color: #4b5563;
        }
        
        .detail-icon {
          font-size: 14px;
          line-height: 1;
        }
        
        .detail-text {
          font-size: 0.875rem;
        }
        
        .location-container {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          color: #6b7280;
        }
        
        .location-text {
          font-size: 0.875rem;
        }
        
        .category-tabs {
          position: sticky;
          top: 0;
          background-color: white;
          border-bottom: 1px solid #e5e7eb;
          transition: all 0.3s;
        }
        
        .category-tabs.scrolled {
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
        
        .tabs-container {
          display: flex;
          overflow-x: auto;
          padding: 0.75rem 1rem;
          gap: 0.5rem;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        
        .tabs-container::-webkit-scrollbar {
          display: none;
        }
        
        .category-tab {
          flex-shrink: 0;
          padding: 0.5rem 1rem;
          border-radius: 9999px;
          font-size: 0.875rem;
          font-weight: 500;
          transition: all 0.2s;
          border: none;
          cursor: pointer;
        }
        
        .category-tab.active {
          background-color: #ff9556;
          color: white;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
        
        .category-tab.inactive {
          background-color: #f3f4f6;
          color: #374151;
        }
        
        .category-tab.inactive:hover {
          background-color: #e5e7eb;
        }
        
        .products-section {
          padding: 1.5rem 1rem;
        }
        
        .section-title {
          font-size: 1.125rem;
          font-weight: 600;
          color: #111827;
          margin-bottom: 1rem;
        }
        
        .products-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }
        
        .product-card {
          background-color: white;
          border-radius: 0.5rem;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
          border: 1px solid #f3f4f6;
          overflow: hidden;
          transition: box-shadow 0.2s;
        }
        
        .product-card:hover {
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
        
        .product-image-container {
          aspect-ratio: 1;
        }
        
        .product-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .product-info {
          padding: 0.75rem;
        }
        
        .product-name {
          font-weight: 500;
          color: #111827;
          font-size: 0.875rem;
          margin-bottom: 0.25rem;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .product-price {
          color: #ff9556;
          font-weight: 600;
          font-size: 0.875rem;
        }
        
        .add-to-cart-btn {
          width: 100%;
          margin-top: 0.5rem;
          background-color: #ff9556;
          color: white;
          padding: 0.5rem 0.75rem;
          border-radius: 0.375rem;
          font-size: 0.875rem;
          font-weight: 500;
          border: none;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        
        .add-to-cart-btn:hover {
          background-color: #e8834a;
        }

        .cart-controls {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 0.5rem;
          gap: 0.5rem;
        }

        .cart-btn {
          width: 2rem;
          height: 2rem;
          border-radius: 0.25rem;
          border: 1px solid #ff9556;
          background-color: white;
          color: #ff9556;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .cart-btn:hover {
          background-color: #ff9556;
          color: white;
        }

        .cart-count {
          font-weight: 600;
          color: #111827;
          min-width: 1.5rem;
          text-align: center;
        }
        
        .bottom-spacing {
          height: 5rem;
        }
        .market-back{
         width: 44px;
         height: 44px;
         border-radius: 50%;
         background-color: #fff;
         position: absolute;
         z-index: 1;
         top: 16px;
         left: 16px;
         border: none;
         font-size: 20px;
         cursor: pointer;
        }
      `}</style>

      {/* Header Image */}
      <div className='market-header'>
        <img
          src={merchantInformation.photo || '/placeholder-image.jpg'}
          alt={merchantInformation.businessName}
          className='market-image'
        />
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
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => setActiveCategory(category.name)}
              className={`category-tab ${activeCategory === category.name ? 'active' : 'inactive'}`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className='products-section'>
        <h2 className='section-title'>{activeCategory}</h2>
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

      {/* Bottom spacing for mobile */}
      <div className='bottom-spacing'></div>
    </div>
  );
};

export default MarketPage;
