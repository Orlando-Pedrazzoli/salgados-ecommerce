// components/sections/FeaturesSection.js
import { ChefHat, Truck, Shield, Clock } from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: <ChefHat className='w-8 h-8' />,
      title: 'Artesanal',
      description: 'Feito com carinho e receitas tradicionais',
    },
    {
      icon: <Truck className='w-8 h-8' />,
      title: 'Entrega Rápida',
      description: 'Produtos fritos em até 30 minutos',
    },
    {
      icon: <Shield className='w-8 h-8' />,
      title: 'Qualidade Garantida',
      description: 'Ingredientes selecionados e frescos',
    },
    {
      icon: <Clock className='w-8 h-8' />,
      title: 'Horário Flexível',
      description: 'Agende seu pedido para o melhor horário',
    },
  ];

  return (
    <section className='py-12 bg-white'>
      <div className='max-w-7xl mx-auto px-4'>
        <h2 className='text-3xl font-bold text-center mb-8'>
          Por que escolher a Salgados Premium?
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
          {features.map((feature, index) => (
            <div key={index} className='text-center'>
              <div className='inline-flex items-center justify-center w-16 h-16 bg-amber-100 text-amber-600 rounded-full mb-4'>
                {feature.icon}
              </div>
              <h3 className='text-lg font-semibold mb-2'>{feature.title}</h3>
              <p className='text-gray-600 text-sm'>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
