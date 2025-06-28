import { HomeBodyHeaderMenu } from '@/constants/HomeBodyHeaderMenu';
import { Space } from 'antd';
import HeaderMenuItem from './header-menu-item';

function HeaderMenu({}) {
  return (
    <div>
      <div className={'body-header-menu-wrapper'}>
        <Space direction='horizontal'>
          {HomeBodyHeaderMenu.map((e) => (
            <HeaderMenuItem src={e.image} title={e.text} />
          ))}
        </Space>
      </div>
    </div>
  );
}

export default HeaderMenu;
