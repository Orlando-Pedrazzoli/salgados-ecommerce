// components/sections/CouponsSection.js
import { Gift } from 'lucide-react';

const CouponsSection = () => {
  const coupons = [
    { code: 'PRIMEIRA10', discount: '10% na 1ª compra', emoji: '🎁' },
    { code: 'FESTAS15', discount: '15% para festas', emoji: '🎉' },
    { code: 'AMIGO5', discount: '5% indicação', emoji: '👥' },
  ];

  return (
    <section className='py-8 bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 text-white shadow-inner'>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='flex items-center justify-center gap-3 mb-4'>
          <Gift className='w-8 h-8' />
          <h3 className='text-2xl font-bold'>Ofertas Especiais</h3>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto'>
          {coupons.map((coupon, index) => (
            <div
              key={index}
              className='bg-white/20 backdrop-blur-sm px-4 py-3 rounded-lg border border-white/30'
            >
              <div className='flex items-center justify-between'>
                <div>
                  <p className='font-bold text-lg'>{coupon.code}</p>
                  <p className='text-sm opacity-90'>{coupon.discount}</p>
                </div>
                <span className='text-2xl'>{coupon.emoji}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CouponsSection;
