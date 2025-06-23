import HeaderMenu from './header-menu/header-menu';
import HorixontalMenu from './horizontal-menu';
import VerticalMenuItem from './vertical-list-item.tsx';

export default function HomeBody() {
  return (
    <div className='body'>
      <HeaderMenu />
      <HorixontalMenu />
      <VerticalMenuItem />
      <VerticalMenuItem />
      <VerticalMenuItem />
      <VerticalMenuItem />
      <VerticalMenuItem />
    </div>
  );
}
