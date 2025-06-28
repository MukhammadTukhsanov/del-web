import { addToCart, removeFromCart } from '@/features/cart/cartSlice';
import { getMerchantProducts } from '@/features/merchants';
import { useAppDispatch } from '@/hooks';
import { RootState } from '@/store';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

const MarketPage = () => {
  let params = useParams();
  const marketId = params.mid;
  const [activeCategory, setActiveCategory] = useState('Toza mevalar');
  const [scrolled, setScrolled] = useState(false);

  const dispatch = useAppDispatch();
  const products = useSelector((state: RootState) => state.merchants.products);
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
    if (!marketId) {
      return;
    }
    
    dispatch(getMerchantProducts(marketId));
  }, [dispatch, marketId]);

  const marketData = {
    name: 'Yangi Bozor',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&h=400&fit=crop',
    rating: 4.8,
    deliveryTime: '20-30 daq',
    deliveryPrice: "15,000 so'm",
    location: 'Shahar markazi',
  };

  const categories = [
    {
      name: 'Toza mevalar',
      items: [
        {
          id: 'apple-organic',
          name: 'Organik olma',
          price: "25,000 so'm/kg",
          image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=150&h=150&fit=crop',
        },
        {
          id: 'banana-fresh',
          name: 'Yangi banan',
          price: "18,000 so'm/kg",
          image:
            'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=150&h=150&fit=crop',
        },
        {
          id: 'strawberry-box',
          name: 'Qulupnay',
          price: "35,000 so'm/quti",
          image:
            'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=150&h=150&fit=crop',
        },
        {
          id: 'orange-bag',
          name: "Apelsin to'plami",
          price: "28,000 so'm/xalta",
          image: 'https://images.unsplash.com/photo-1547514701-42782101795e?w=150&h=150&fit=crop',
        },
      ],
    },
    {
      name: 'Sabzavotlar',
      items: [
        {
          id: 'tomato-fresh',
          name: 'Yangi pomidor',
          price: "12,000 so'm/kg",
          image:
            'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=150&h=150&fit=crop',
        },
        {
          id: 'lettuce-green',
          name: 'Yashil salat',
          price: "8,000 so'm/dona",
          image:
            'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=150&h=150&fit=crop',
        },
        {
          id: 'pepper-colorful',
          name: 'Rang-barang qalampir',
          price: "22,000 so'm/kg",
          image: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=150&h=150&fit=crop',
        },
        {
          id: 'carrot-bunch',
          name: 'Sabzi',
          price: "10,000 so'm/bog'lam",
          image:
            'https://images.unsplash.com/photo-1445282768818-728615cc910a?w=150&h=150&fit=crop',
        },
      ],
    },
    {
      name: 'Sut mahsulotlari',
      items: [
        {
          id: 'milk-organic',
          name: 'Organik sut',
          price: "18,000 so'm/litr",
          image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=150&h=150&fit=crop',
        },
        {
          id: 'eggs-dozen',
          name: 'Tuxum',
          price: "22,000 so'm/o'nlik",
          image:
            'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=150&h=150&fit=crop',
        },
        {
          id: 'yogurt-greek',
          name: 'Yunoncha yogurt',
          price: "25,000 so'm/paket",
          image:
            'https://images.unsplash.com/photo-1571212515416-fca0b8b3e3e8?w=150&h=150&fit=crop',
        },
        {
          id: 'cheese-block',
          name: 'Pishloq',
          price: "45,000 so'm/blok",
          image:
            'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=150&h=150&fit=crop',
        },
      ],
    },
    {
      name: 'Non mahsulotlari',
      items: [
        {
          id: 'bread-fresh',
          name: 'Yangi non',
          price: "5,000 so'm/dona",
          image:
            'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=150&h=150&fit=crop',
        },
        {
          id: 'croissant-pack',
          name: 'Kruassan',
          price: "12,000 so'm/paket",
          image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=150&h=150&fit=crop',
        },
        {
          id: 'bagel-pack',
          name: 'Bagel',
          price: "8,000 so'm/paket",
          image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=150&h=150&fit=crop',
        },
        {
          id: 'muffin-box',
          name: 'Keks',
          price: "15,000 so'm/quti",
          image:
            'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=150&h=150&fit=crop',
        },
      ],
    },
  ];

  const currentCategory = categories.find((cat) => cat.name === activeCategory);

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
        image: item.image,
        category: activeCategory,
      }),
    );
  };

  const handleRemoveFromCart = (itemId: string) => {
    dispatch(removeFromCart(itemId));
  };

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
         font-size: 20px
        }
      `}</style>
      {/* Header Image */}
      <div className='market-header'>
        <img src={marketData.image} alt={marketData.name} className='market-image' />
        <div className='image-overlay'></div>
        <button onClick={() => navigate(-1)} className='market-back'>
          <ArrowLeftOutlined />
        </button>
      </div>

      {/* Market Info */}
      <div className='market-info'>
        <h1 className='market-title'>{marketData.name}</h1>

        <div className='market-details'>
          <div className='rating-container'>
            <div className='star-icon'>★</div>
            <span className='rating-text'>{marketData.rating}</span>
          </div>

          <div className='detail-item'>
            <div className='detail-icon'>🕐</div>
            <span className='detail-text'>{marketData.deliveryTime}</span>
          </div>

          <div className='detail-item'>
            <div className='detail-icon'>🚚</div>
            <span className='detail-text'>{marketData.deliveryPrice}</span>
          </div>
        </div>

        <div className='location-container'>
          <div className='detail-icon'>📍</div>
          <span className='location-text'>{marketData.location}</span>
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
              <div key={index} className='product-card'>
                <div className='product-image-container'>
                  <img src={item.photo} alt={item.name} className='product-image' />
                </div>
                <div className='product-info'>
                  <h3 className='product-name'>{item.name}</h3>
                  <p className='product-price'>{item.price}</p>

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
