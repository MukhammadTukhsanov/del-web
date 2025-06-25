import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { useState } from 'react';

export default function GridMenuItem() {
  const [count, setCount] = useState(0);
  const price = 12000; // Example price

  const handleAddItem = () => {
    setCount(count + 1);
  };

  // Add keyframes for animations
  const keyframes = `
    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateX(-10px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }
    
    @keyframes pulse {
      0% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.05);
      }
      100% {
        transform: scale(1);
      }
    }
  `;

  return (
    <div>
      <style>{keyframes}</style>
      <div
        style={{
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          cursor: 'pointer',
          borderRadius: '12px',
          overflow: 'hidden',
          WebkitTapHighlightColor: 'transparent',
          WebkitTouchCallout: 'none',
          WebkitUserSelect: 'none',
          userSelect: 'none',
          outline: 'none',
        }}
      >
        <div
          style={{
            position: 'relative',
            overflow: 'hidden',
            borderRadius: '1.25rem',
            marginBottom: '.75rem',
          }}
        >
          <img
            style={{
              width: '114px',
              height: '114px',
              borderRadius: '1.25rem',
              transition: 'transform 0.3s ease',
              display: 'block',
            }}
            src='https://img.freepik.com/free-photo/crispy-mixed-pizza-with-olives-sausage_140725-3095.jpg?uid=R28494730&ga=GA1.1.492278078.1744949520&semt=ais_hybrid&w=740'
            alt='Pizza'
            onMouseEnter={(e) => {
              const target = e.currentTarget as HTMLImageElement;
              target.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
              const target = e.currentTarget as HTMLImageElement;
              target.style.transform = 'scale(1)';
            }}
          />
        </div>
        <div
          style={{
            padding: '16px',
            backgroundColor: '#fff',
            borderRadius: '8px',
            position: 'relative',
          }}
        >
          <h6
            className='m-0'
            style={{
              fontSize: '.775rem',
              height: '2rem',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflowWrap: 'anywhere',
              marginBottom: '.25rem',
              transition: 'color 0.2s ease',
            }}
          >
            Pitsa Alfredo mosaretteasss
          </h6>
          {/* Price */}
          <div
            style={{
              fontSize: '.75rem',
              fontWeight: '600',
              color: '#ff9556',
              marginBottom: '12px',
              transition: 'color 0.2s ease, transform 0.2s ease',
            }}
          >
            {new Intl.NumberFormat('uz-UZ').format(price)} so'm
          </div>

          {count === 0 ? (
            <button
              onClick={handleAddItem}
              style={{
                backgroundColor: '#ff9556',
                border: 'none',
                borderRadius: '8px',
                width: '22px',
                height: '22px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: '0 2px 4px rgba(255, 149, 86, 0.2)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <PlusOutlined
                style={{
                  fontSize: '16px',
                  color: 'white',
                  transition: 'transform 0.2s ease',
                }}
              />
            </button>
          ) : (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                animation: count > 0 ? 'slideIn 0.3s ease-out' : 'none',
              }}
            >
              <button
                onClick={() => setCount(Math.max(0, count - 1))}
                style={{
                  backgroundColor: '#e5e7eb',
                  color: '#374151',
                  border: 'none',
                  borderRadius: '6px',
                  width: '22px',
                  height: '22px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 2px 4px rgba(255, 149, 86, 0.2)',
                }}
              >
                <MinusOutlined
                  style={{
                    fontSize: '14px',
                    transition: 'transform 0.2s ease',
                  }}
                />
              </button>
              <span
                style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  minWidth: '20px',
                  textAlign: 'center',
                  transition: 'transform 0.2s ease',
                  color: '#333',
                }}
              >
                {count}
              </span>
              <button
                onClick={handleAddItem}
                style={{
                  backgroundColor: '#ff9556',
                  border: 'none',
                  borderRadius: '6px',
                  width: '22px',
                  height: '22px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 2px 4px rgba(255, 149, 86, 0.2)',
                }}
                onMouseEnter={(e) => {
                  const target = e.currentTarget as HTMLButtonElement;
                  target.style.backgroundColor = '#e8834a';
                  target.style.transform = 'scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  const target = e.currentTarget as HTMLButtonElement;
                  target.style.backgroundColor = '#ff9556';
                  target.style.transform = 'scale(1)';
                }}
              >
                <PlusOutlined
                  style={{
                    fontSize: '14px',
                    color: 'white',
                    transition: 'transform 0.2s ease',
                  }}
                />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
