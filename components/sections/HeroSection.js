// components/sections/HeroSection.js
import { ChefHat, MessageCircle } from 'lucide-react';

const HeroSection = () => {
  const scrollToProducts = () => {
    document.getElementById('produtos').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className='relative text-white py-24 md:py-32 min-h-[500px] md:min-h-[600px] flex items-center justify-center overflow-hidden'>
      {/* Background para desktop */}
      <div
        className='absolute inset-0 bg-cover bg-center bg-no-repeat hidden md:block'
        style={{ backgroundImage: 'url(/salgado-hero.jpg)' }}
      ></div>

      {/* Background para mobile */}
      <div
        className='absolute inset-0 bg-cover bg-center bg-no-repeat block md:hidden'
        style={{ backgroundImage: 'url(/salgado-hero-mobile.jpg)' }}
      ></div>

      {/* Overlay escuro para melhor legibilidade do texto */}
      <div className='absolute inset-0 bg-black bg-opacity-40'></div>

      {/* Pattern overlay opcional */}
      <div className='absolute inset-0 opacity-10'>
        <div className='absolute inset-0 bg-[url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")] bg-repeat'></div>
      </div>

      <div className='relative max-w-7xl mx-auto px-4 text-center z-10'>
        <div className='animate-bounce mb-6'>
          <ChefHat className='w-20 h-20 mx-auto text-white drop-shadow-xl' />
        </div>
        <h2 className='text-4xl md:text-6xl font-bold mb-6 drop-shadow-2xl'>
          Salgados Artesanais Premium
        </h2>
        <p className='text-xl md:text-2xl mb-4 drop-shadow-xl max-w-2xl mx-auto'>
          Os melhores salgados para seus eventos especiais
        </p>
        <p className='text-lg opacity-95 drop-shadow-lg mb-8'>
          🥟 Coxinha • 🥐 Rissol • 🐟 Pastel de Bacalhau • 🧀 Pão de Queijo
        </p>
        <div className='flex flex-col sm:flex-row gap-4 justify-center'>
          <button
            onClick={scrollToProducts}
            className='bg-white text-amber-600 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl transform hover:scale-105'
          >
            Ver Cardápio
          </button>
          <a
            href='https://wa.me/351912345678'
            target='_blank'
            rel='noopener noreferrer'
            className='bg-green-500 text-white px-8 py-3 rounded-full font-bold hover:bg-green-600 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2'
          >
            <MessageCircle className='w-5 h-5' />
            Fale Conosco
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
