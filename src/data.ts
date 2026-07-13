import type { StoreData } from './types';

export const storeData: StoreData = {
  name: 'Nenhum Café',
  tagline: 'Cafés especiais, aconchego e confeitaria artesanal em Lagoa Nova',
  description: 'Um refúgio acolhedor em Natal. Grãos selecionados com torra fresca, espressos, coados especiais, tortas irresistíveis e o espaço ideal para ler, trabalhar ou conversar.',
  aboutText: 'O Nenhum Café surgiu com o desejo de criar um espaço onde o tempo passa mais devagar. Localizado em Lagoa Nova, nos dedicamos a servir cafés de altíssima qualidade (grãos 100% arábica pontuados), preparados com cuidado em diversos métodos. Nossa confeitaria artesanal produz doces e salgados diariamente para harmonizar perfeitamente com sua bebida preferida, num ambiente climatizado, com internet rápida e tomadas para seu coworking.',
  aboutImage: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=1200',
  phone: '(84) 99888-2222',
  phoneFormatted: '84998882222',
  whatsappNumber: '5584998882222',
  whatsappMessage: 'Olá! Gostaria de consultar o cardápio do dia, fazer uma reserva ou encomendar uma torta.',
  address: 'Rua Jaguarari, 2454 - Lagoa Nova, Natal - RN, 59022-300',
  googleMapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3969.2154388365287!2d-35.218575!3d-5.8112111!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7b301c402ad7799%3A0xe54e6fa16b0b2305!2sRua%20Jaguarari%2C%202454%20-%20Lagoa%20Nova%2C%20Natal%20-%20RN%2C%2059022-300!5e0!3m2!1spt-BR!2sbr!4v1710000000000!5m2!1spt-BR!2sbr',
  googleMapsDirectionsUrl: 'https://maps.app.goo.gl/u1XvXQ5V9c7s6b6C10',
  businessHours: {
    weekdays: 'Terça a Sexta: 12:00 às 20:00',
    saturday: 'Sábado: 08:30 às 12:00, 14:00 às 20:00',
    sunday: 'Domingo: 14:00 às 20:00 (Segunda: Fechado)',
  },
  colors: {
    primaryHex: '#78350f', // Marrom Café Quente
    accentHex: '#fbbf24',  // Dourado/Âmbar
  },
  typography: {
    displayFontFamily: 'Merriweather',
    bodyFontFamily: 'Source Sans 3',
    importUrl: 'https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,300;0,400;0,700;1,300&family=Source+Sans+3:wght@300;400;500;600;700&display=swap',
  },
  features: [
    {
      title: 'Grãos 100% Arábica',
      description: 'Cafés especiais de pequenos produtores brasileiros com torra sempre fresca.',
      iconName: 'Coffee',
    },
    {
      title: 'Confeitaria Própria',
      description: 'Bolos, tortas e quiches assados diariamente na nossa cozinha artesanal.',
      iconName: 'Smile',
    },
    {
      title: 'Coworking Friendly',
      description: 'Espaço com tomadas, Wi-Fi ultra rápido e ambiente silencioso para trabalhar.',
      iconName: 'Activity',
    },
  ],
  products: [
    {
      id: 'prod-1',
      name: 'Cafés Coados Especiais',
      description: 'Extraídos com precisão nos métodos Hario V60 ou Aeropress, ressaltando as notas sensoriais dos grãos.',
      price: 'A partir de R$ 9,00',
      iconName: 'Coffee',
      imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=600',
    },
    {
      id: 'prod-2',
      name: 'Cappuccino Italiano Cremoso',
      description: 'Dose dupla de espresso, leite vaporizado com textura sedosa e finalizado com cacau belga em pó.',
      price: 'R$ 13,50',
      iconName: 'Coffee',
      imageUrl: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=600',
    },
    {
      id: 'prod-3',
      name: 'Torta Red Velvet Premium',
      description: 'Nossa famosa massa vermelha aveludada com recheio e cobertura cremosa de cream cheese e chocolate branco.',
      price: 'R$ 17,90 a fatia',
      iconName: 'Cookie',
      imageUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=600',
    },
  ],
  instagramUrl: 'https://instagram.com',
  facebookUrl: 'https://facebook.com',
};
