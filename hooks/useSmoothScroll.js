// hooks/useSmoothScroll.js
import { useEffect } from 'react';

const useSmoothScroll = () => {
  useEffect(() => {
    // Adicionar smooth scroll para todos os links âncora
    const handleAnchorClick = e => {
      const href = e.currentTarget.getAttribute('href');

      // Verificar se é um link âncora
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const element = document.querySelector(href);

        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      }
    };

    // Adicionar listener para todos os links âncora
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
      link.addEventListener('click', handleAnchorClick);
    });

    // Cleanup
    return () => {
      links.forEach(link => {
        link.removeEventListener('click', handleAnchorClick);
      });
    };
  }, []);
};

export default useSmoothScroll;
