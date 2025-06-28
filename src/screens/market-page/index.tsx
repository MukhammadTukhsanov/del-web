import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner';
import { addToCart, removeFromCart } from '@/features/cart/cartSlice';
import { getMerchantProducts } from '@/features/merchants';
import { useAppDispatch } from '@/hooks';
import { RootState } from '@/store';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import './market-page.css';

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
      {/* Header Image */}
      <div className='market-header'>
        <div
          className='market-header-photo'
          style={{ backgroundImage: `url('${merchant.photo}')` }}
        ></div>
        {/* <img
          src={merchantInformation.photo || '/placeholder-image.jpg'}
          alt={merchantInformation.businessName}
          className='market-image'
        /> */}
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
