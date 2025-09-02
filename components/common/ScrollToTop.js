// components/common/ScrollToTop.js
import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  // Mostrar botão quando scroll passar de 400px
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // Função para voltar ao topo
  const scrollToTop = () => {
    setIsScrolling(true);

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

    // Reset animation após scroll
    setTimeout(() => {
      setIsScrolling(false);
    }, 1000);
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className={`
            fixed bottom-8 right-8 z-50
            bg-gradient-to-r from-amber-500 to-amber-600
            text-white p-4 rounded-full shadow-lg
            hover:from-amber-600 hover:to-amber-700
            transform transition-all duration-300
            hover:scale-110 hover:shadow-xl
            ${
              isVisible
                ? 'translate-y-0 opacity-100'
                : 'translate-y-16 opacity-0'
            }
            ${isScrolling ? 'animate-bounce' : ''}
            group
          `}
          aria-label='Voltar ao topo'
        >
          <ArrowUp className='w-6 h-6 group-hover:animate-pulse' />

          {/* Tooltip */}
          <span
            className='
            absolute bottom-full right-0 mb-2
            bg-gray-900 text-white text-xs px-2 py-1 rounded
            opacity-0 group-hover:opacity-100
            transition-opacity duration-200
            whitespace-nowrap
            pointer-events-none
          '
          >
            Voltar ao topo
          </span>

          {/* Efeito de pulso */}
          <span className='absolute inset-0 rounded-full bg-amber-400 animate-ping opacity-20'></span>
        </button>
      )}
    </>
  );
};

export default ScrollToTop;
