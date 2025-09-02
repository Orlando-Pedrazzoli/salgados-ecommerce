// components/layout/Footer.js
import {
  Package,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  MessageCircle,
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className='bg-gray-900 text-white py-12'>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          <div>
            <div className='flex items-center mb-4'>
              <Package className='w-8 h-8 text-amber-500 mr-2' />
              <h3 className='text-xl font-bold'>Salgados Premium</h3>
            </div>
            <p className='text-gray-400'>
              Os melhores salgados artesanais para seus eventos especiais.
              Qualidade e sabor garantidos desde 2020.
            </p>
          </div>

          <div>
            <h4 className='font-bold mb-4'>Contato</h4>
            <div className='space-y-2 text-gray-400'>
              <a
                href='tel:+351912345678'
                className='flex items-center gap-2 hover:text-amber-500 transition-colors'
              >
                <Phone className='w-4 h-4' />
                +351 912 164 220
              </a>
              <a
                href='mailto:contato@salgadospremium.pt'
                className='flex items-center gap-2 hover:text-amber-500 transition-colors'
              >
                <Mail className='w-4 h-4' />
                contato@salgadospremium.pt
              </a>
              <div className='flex items-center gap-2'>
                <MapPin className='w-4 h-4' />
                Oeiras, Lisboa
              </div>
            </div>
          </div>

          <div>
            <h4 className='font-bold mb-4'>Redes Sociais</h4>
            <div className='flex gap-4'>
              <a
                href='#'
                className='bg-gray-800 p-3 rounded-full hover:bg-amber-600 transition-colors'
              >
                <Facebook className='w-5 h-5' />
              </a>
              <a
                href='#'
                className='bg-gray-800 p-3 rounded-full hover:bg-amber-600 transition-colors'
              >
                <Instagram className='w-5 h-5' />
              </a>
              <a
                href='https://wa.me/351912164220'
                target='_blank'
                rel='noopener noreferrer'
                className='bg-gray-800 p-3 rounded-full hover:bg-amber-600 transition-colors'
              >
                <MessageCircle className='w-5 h-5' />
              </a>
            </div>
            <div className='mt-6'>
              <p className='text-sm text-gray-400'>Horário de Atendimento:</p>
              <p className='text-sm text-gray-400'>Seg-Sáb: 09h às 20h</p>
              <p className='text-sm text-gray-400'>Domingo: 10h às 18h</p>
            </div>
          </div>
        </div>

        <div className='border-t border-gray-800 mt-8 pt-8 text-center text-gray-400'>
          <p>&copy; 2024 Salgados Premium. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
