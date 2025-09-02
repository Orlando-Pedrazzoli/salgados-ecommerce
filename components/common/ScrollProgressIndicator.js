// components/common/ScrollProgressIndicator.js
import { useState, useEffect } from 'react';

const ScrollProgressIndicator = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const currentScroll = window.scrollY;
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      if (scrollHeight > 0) {
        const progress = (currentScroll / scrollHeight) * 100;
        setScrollProgress(Math.min(progress, 100));
      }
    };

    window.addEventListener('scroll', updateScrollProgress);
    updateScrollProgress(); // Calcular inicial

    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);

  return (
    <>
      {/* Barra de progresso no topo */}
      <div className='fixed top-0 left-0 w-full h-1 bg-gray-200 z-50'>
        <div
          className='h-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-150 ease-out'
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Indicador circular opcional */}
      {scrollProgress > 10 && scrollProgress < 95 && (
        <div className='fixed bottom-8 left-8 z-40'>
          <div className='relative w-14 h-14'>
            {/* Background circle */}
            <svg className='w-14 h-14 transform -rotate-90'>
              <circle
                cx='28'
                cy='28'
                r='24'
                stroke='#e5e7eb'
                strokeWidth='4'
                fill='none'
              />
              {/* Progress circle */}
              <circle
                cx='28'
                cy='28'
                r='24'
                stroke='url(#gradient)'
                strokeWidth='4'
                fill='none'
                strokeDasharray={`${2 * Math.PI * 24}`}
                strokeDashoffset={`${
                  2 * Math.PI * 24 * (1 - scrollProgress / 100)
                }`}
                className='transition-all duration-150'
              />
              <defs>
                <linearGradient
                  id='gradient'
                  x1='0%'
                  y1='0%'
                  x2='100%'
                  y2='100%'
                >
                  <stop offset='0%' stopColor='#f59e0b' />
                  <stop offset='100%' stopColor='#ea580c' />
                </linearGradient>
              </defs>
            </svg>
            {/* Percentage text */}
            <div className='absolute inset-0 flex items-center justify-center'>
              <span className='text-xs font-bold text-gray-700'>
                {Math.round(scrollProgress)}%
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ScrollProgressIndicator;
