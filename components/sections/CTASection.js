// components/sections/CTASection.js
import { MessageCircle } from 'lucide-react';

const CTASection = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className='py-16 bg-gradient-to-r from-amber-500 to-orange-500 text-white'>
      <div className='max-w-4xl mx-auto px-4 text-center'>
        <h2 className='text-3xl font-bold mb-4'>Faça seu Pedido Agora!</h2>
        <p className='text-lg mb-8 opacity-90'>
          Entrega rápida para toda a região de Oeiras e Lisboa
        </p>
        <div className='flex flex-col sm:flex-row gap-4 justify-center'>
          <a
            href='https://wa.me/351912164220'
            target='_blank'
            rel='noopener noreferrer'
            className='bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full font-bold transition-all shadow-lg flex items-center justify-center gap-2'
          >
            <MessageCircle className='w-6 h-6' />
            Pedir pelo WhatsApp
          </a>
          <button
            onClick={scrollToTop}
            className='bg-white text-amber-600 hover:bg-gray-100 px-8 py-4 rounded-full font-bold transition-all shadow-lg'
          >
            Ver Cardápio Completo
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
