import { useAppSelector } from '@/hooks';
import HeaderMenu from './header-menu/header-menu';
// import HorixontalMenu from './horizontal-menu';
import MerchantCard from './merchant-card';

export default function HomeBody() {
  const merchants = useAppSelector((state) => state.merchants.merchants);

  return (
    <div className='body'>
      <svg
        viewBox='0 0 100 15'
        preserveAspectRatio='none'
        style={{
          width: '100%',
          height: '20px',
          display: 'block',
        }}
      >
        <path
          d='M0,15 A50,20 0 0 1 100,25 L100,0 L0,0 Z'
          fill='#ff9556'
          filter='url(#outerShadow)'
        />
      </svg>
      <HeaderMenu />
      {/* <HorixontalMenu /> */}
      {
        merchants.map((merchant, index) => <MerchantCard key={index} merchant={merchant} />)
      }
      {/* <MerchantCard />
      <MerchantCard />
      <MerchantCard />
      <MerchantCard /> */}
    </div>
  );
}
