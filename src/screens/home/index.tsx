React;
import { ShoppingCartOutlined } from '@ant-design/icons';
import { Button, Input } from 'antd';
import React from 'react';
import HomeBody from './components/body/index';
import './style.css';
const { Search } = Input;

export default function Home() {
  const handleSearch = (value: any) => {
    console.log('Searching for:', value);
  };
  return (
    <div style={{ height: '100%' }}>
      <div className={'wrapper'}>
        <div className={'header'}>
          <div className={'header-location'}>
            <i className='bi bi-geo-alt icon'></i>
            <div>
              <h6>O'zbekiston ko'chasi 141 asdda asdasdd aasdsdsd</h6>
              <small>Yangibozor buxoro</small>
            </div>
          </div>
          <Button
            shape='circle'
            icon={<ShoppingCartOutlined style={{ fontSize: '24px' }} />}
            size='large'
            onClick={() => console.log('Go to basket')}
          />
        </div>
        <div className={'searchbar'}>
          <Search
            placeholder='Ovqat, restoran, do`kon ...'
            prefix={<i className='bi bi-search' style={{ color: '#666666', marginRight: 8 }} />}
            allowClear
            size='large'
            onSearch={handleSearch}
            className='search-input'
            style={{ width: '100%', borderRadius: '20px' }}
          />
        </div>
        <HomeBody />
      </div>
    </div>
  );
}
