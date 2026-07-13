import { useEffect, useState } from 'react';
import { storeData } from './data';
import { Icon } from './components/Icon';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Estado do Seletor de Método de Extração
  const [selectedMethod, setSelectedMethod] = useState<string>('Hario V60');

  // Métodos de Extração e suas Notas Sensoriais
  const extractionMethods: Record<string, { desc: string; body: string; acidity: string; sweetness: string; intensity: string }> = {
    'Hario V60': {
      desc: 'Filtro de papel cônico com ranhuras em espiral. Destaca a acidez e as notas florais/frutadas mais limpas do grão especial.',
      body: 'Leve / Limpo',
      acidity: 'Alta e Cítrica',
      sweetness: 'Média',
      intensity: 'Delicada'
    },
    'Prensa Francesa': {
      desc: 'Extração por infusão direta com filtro metálico. Preserva os óleos essenciais do café, resultando em uma bebida encorpada.',
      body: 'Muito Encorpado',
      acidity: 'Baixa e Suave',
      sweetness: 'Alta',
      intensity: 'Rica e Densa'
    },
    'Aeropress': {
      desc: 'Combina infusão direta com pressão de ar manual. Permite uma ampla gama de receitas, equilibrando doçura e corpo de forma versátil.',
      body: 'Médio / Aveludado',
      acidity: 'Média e Brilhante',
      sweetness: 'Alta',
      intensity: 'Equilibrada'
    },
    'Espresso Clássico': {
      desc: 'Extração sob alta pressão de água em segundos. Entrega uma bebida extremamente concentrada com a clássica crema aveludada.',
      body: 'Muito Encorpado',
      acidity: 'Média-Alta',
      sweetness: 'Média-Baixa',
      intensity: 'Marcante'
    }
  };

  // Injeção de fontes e cores
  useEffect(() => {
    if (storeData.typography.importUrl) {
      const linkId = 'store-google-fonts';
      let fontLink = document.getElementById(linkId) as HTMLLinkElement;
      if (!fontLink) {
        fontLink = document.createElement('link');
        fontLink.id = linkId;
        fontLink.rel = 'stylesheet';
        document.head.appendChild(fontLink);
      }
      fontLink.href = storeData.typography.importUrl;
    }

    const root = document.documentElement;
    root.style.setProperty('--font-display-family', storeData.typography.displayFontFamily);
    root.style.setProperty('--font-body-family', storeData.typography.bodyFontFamily);

    // Cores da Cafeteria (Tons Terrosos, Caramelo, Creme)
    root.style.setProperty('--p-50', '#fdf8f5');
    root.style.setProperty('--p-100', '#fcefe8');
    root.style.setProperty('--p-500', storeData.colors.primaryHex); // Marrom Café Escuro
    root.style.setProperty('--p-600', '#542617');
    root.style.setProperty('--p-700', '#451e11');
    root.style.setProperty('--p-800', '#32140a');

    root.style.setProperty('--a-50', `${storeData.colors.accentHex}10`);
    root.style.setProperty('--a-100', `${storeData.colors.accentHex}20`);
    root.style.setProperty('--a-500', storeData.colors.accentHex); // Caramelo / Dourado

    document.title = `${storeData.name} — Experiência em Cafés Especiais`;
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getWhatsAppLink = (msg?: string) => {
    const defaultMsg = msg || storeData.whatsappMessage;
    return `https://api.whatsapp.com/send?phone=${storeData.whatsappNumber}&text=${encodeURIComponent(defaultMsg)}`;
  };

  return (
    <div className="min-h-screen bg-[#faf7f2] text-amber-950 antialiased selection:bg-amber-100 selection:text-amber-900">
      
      {/* HEADER */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#faf7f2]/95 backdrop-blur-md shadow-sm border-b border-amber-900/10 py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <a href="#hero" className="flex items-center space-x-2">
              <span className="text-2xl font-serif font-black tracking-wide text-[#3e2723]">
                NENHUM<span className="text-amber-700 font-sans font-bold text-sm ml-1 uppercase">CAFÉ</span>
              </span>
            </a>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#experiencia" className="text-xs font-bold uppercase tracking-widest text-[#3e2723]/70 hover:text-amber-700 transition-colors">Experiência</a>
              <a href="#metodos" className="text-xs font-bold uppercase tracking-widest text-[#3e2723]/70 hover:text-amber-700 transition-colors">Métodos</a>
              <a href="#menu" className="text-xs font-bold uppercase tracking-widest text-[#3e2723]/70 hover:text-amber-700 transition-colors">Cardápio</a>
              <a href="#localizacao" className="text-xs font-bold uppercase tracking-widest text-[#3e2723]/70 hover:text-amber-700 transition-colors">Localização</a>
              <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-6 py-2 text-xs font-extrabold uppercase tracking-widest text-white bg-[#3e2723] hover:bg-amber-900 rounded-none transition-all hover:scale-105">
                <Icon name="Coffee" className="mr-2" size={14} /> Reservar Mesa
              </a>
            </nav>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 rounded-lg text-[#3e2723] hover:bg-amber-900/5 transition-colors">
              <Icon name={mobileMenuOpen ? 'X' : 'Menu'} size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section id="hero" className="relative pt-36 pb-24 md:pt-48 md:pb-36 bg-[#f5ede3] border-b border-amber-900/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Texto Hero */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <span className="text-xs font-extrabold uppercase tracking-widest text-amber-700 bg-amber-700/10 px-3 py-1 border border-amber-700/20">
                ☕ Cafés Especiais Torrados na Casa
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-black text-[#3e2723] leading-[1.08]">
                Café de verdade para momentos de <span className="font-light italic block text-amber-750 mt-1">desaceleração</span>
              </h1>
              <p className="text-base text-stone-600 font-serif leading-relaxed max-w-xl mx-auto lg:mx-0">
                {storeData.description} Torras frescas semanais de grãos 100% arábica pontuados acima de 82 pontos, extraídos em métodos precisos.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-full sm:w-auto px-8 py-4 text-xs font-bold uppercase tracking-widest text-white bg-[#3e2723] hover:bg-amber-900 shadow-md transition-all hover:scale-105">
                  Encomendar Grãos / Torras
                </a>
                <a href="#metodos" className="flex items-center justify-center w-full sm:w-auto px-8 py-4 text-xs font-bold uppercase tracking-widest text-stone-700 bg-white border border-stone-250 hover:bg-stone-50 rounded-none transition-all">
                  Seletor de Métodos
                </a>
              </div>
            </div>

            {/* Imagem Estilo Vintage */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-sm">
                <div className="absolute top-4 left-4 w-full h-full border-2 border-[#3e2723]/20 pointer-events-none"></div>
                <div className="relative bg-white p-3 shadow-xl">
                  <img src="https://images.unsplash.com/photo-1507133750040-4a8f57021571?auto=format&fit=crop&q=80&w=800" alt="Método Coado Especial" className="w-full h-80 object-cover" />
                  <div className="absolute bottom-6 right-6 bg-[#3e2723] text-white font-serif italic px-4 py-2 text-xs">
                    Café Especial do Dia
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SELETOR DE MÉTODOS DE EXTRAÇÃO */}
      <section id="metodos" className="py-20 bg-white border-b border-amber-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-serif font-black text-[#3e2723]">
              O Ritual de Extração <span className="font-light italic text-amber-700">Perfeito</span>
            </h2>
            <div className="w-12 h-0.5 bg-amber-700 mx-auto"></div>
            <p className="text-stone-500 font-serif">
              Selecione o método de extração abaixo e veja como a engenharia do café muda o corpo, a doçura e a acidez na sua xícara.
            </p>
          </div>

          <div className="bg-[#faf7f2] border border-amber-900/10 p-8 lg:p-12 shadow-sm max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              
              {/* Seleção do Método */}
              <div className="space-y-6">
                <h3 className="text-lg font-bold font-serif text-[#3e2723] uppercase tracking-wider">Escolha um Método:</h3>
                
                <div className="flex flex-col space-y-3">
                  {Object.keys(extractionMethods).map((method) => (
                    <button
                      key={method}
                      onClick={() => setSelectedMethod(method)}
                      className={`px-6 py-4 text-left font-serif font-bold transition-all border ${
                        selectedMethod === method
                          ? 'bg-[#3e2723] text-white border-[#3e2723] shadow-md pl-8'
                          : 'bg-white text-stone-600 border-[#3e2723]/10 hover:border-[#3e2723]'
                      }`}
                    >
                      ☕ {method}
                    </button>
                  ))}
                </div>

                <div className="bg-white p-6 border border-amber-900/10 shadow-sm space-y-4 text-left">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-[#3e2723] flex items-center">
                    <Icon name="Activity" className="mr-2 text-amber-750" size={16} /> Sobre o Método:
                  </h4>
                  <p className="text-xs text-stone-600 font-serif leading-relaxed">
                    {extractionMethods[selectedMethod].desc}
                  </p>
                  <a href={getWhatsAppLink(`Olá! Gostaria de reservar o grão especial extraído no método ${selectedMethod}.`)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-amber-700 hover:text-amber-800">
                    Provar este método no local <Icon name="ChevronRight" className="ml-1" size={12} />
                  </a>
                </div>
              </div>

              {/* Lado Notas Sensoriais */}
              <div className="bg-white p-8 border border-amber-900/10 shadow-inner flex flex-col justify-center space-y-6 min-h-[300px]">
                <h4 className="text-xs font-bold uppercase tracking-widest text-stone-400 text-center">Ficha Sensorial Resultante</h4>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-stone-100">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#3e2723]">Corpo / Densidade</span>
                    <span className="text-xs font-semibold text-stone-600 font-serif">{extractionMethods[selectedMethod].body}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-stone-100">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#3e2723]">Acidez</span>
                    <span className="text-xs font-semibold text-stone-600 font-serif">{extractionMethods[selectedMethod].acidity}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-stone-100">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#3e2723]">Doçura</span>
                    <span className="text-xs font-semibold text-stone-600 font-serif">{extractionMethods[selectedMethod].sweetness}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#3e2723]">Intensidade</span>
                    <span className="text-xs font-semibold text-stone-600 font-serif">{extractionMethods[selectedMethod].intensity}</span>
                  </div>
                </div>

                <p className="text-[10px] text-center text-stone-400 font-serif italic">Notas baseadas em grãos de torra média-clara</p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* CARDÁPIO VINTAGE */}
      <section id="menu" className="py-20 bg-[#faf7f2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-serif font-black text-[#3e2723]">
              Nosso <span className="font-light italic text-amber-700">Cardápio do Dia</span>
            </h2>
            <div className="w-12 h-0.5 bg-amber-700 mx-auto"></div>
            <p className="text-stone-500 font-serif">Grãos especiais selecionados e comidinhas artesanais assadas na hora.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {storeData.products.map((product) => (
              <div key={product.id} className="bg-white border border-amber-900/10 shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col group">
                <div className="relative h-60 overflow-hidden bg-slate-100">
                  <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover transition-transform duration-750 group-hover:scale-102" loading="lazy" />
                </div>
                <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-serif font-bold text-[#3e2723] line-clamp-1">{product.name}</h3>
                    <p className="text-xs text-stone-500 font-serif leading-relaxed line-clamp-2">{product.description}</p>
                  </div>
                  <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-800 bg-[#faf7f2] px-3 py-1 border border-amber-900/10 font-serif">{product.price}</span>
                    <a href={getWhatsAppLink(`Olá! Gostaria de reservar/pedir o item do cardápio: ${product.name}`)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-4 py-2 text-xs font-bold uppercase tracking-widest text-white bg-[#3e2723] hover:bg-amber-900">
                      Pedir
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AMBIENTE (SOBRE NÓS) */}
      <section id="experiencia" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5">
              <div className="relative p-3 border border-amber-900/10 bg-[#faf7f2] shadow-xl">
                <img src={storeData.aboutImage} alt="Nossa Cafeteria" className="w-full h-96 object-cover" />
              </div>
            </div>
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-700">Torrefação Artesanal</span>
              <h2 className="text-3xl sm:text-4xl font-serif font-black text-[#3e2723] leading-tight">
                Um espaço pensado para os <span className="font-light italic text-amber-750 block mt-2">apaixonados por café</span>
              </h2>
              <p className="text-stone-600 font-serif leading-relaxed text-base font-light">
                {storeData.aboutText}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="flex items-center space-x-3 p-4 bg-[#faf7f2] border border-amber-900/10">
                  <Icon name="Heart" className="text-amber-800" size={24} />
                  <div>
                    <h4 className="font-bold text-xs uppercase tracking-widest text-[#3e2723]">Grãos Especiais</h4>
                    <p className="text-[10px] text-stone-400">Cafés pontuados acima de 82 pontos na escala SCAA.</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-[#faf7f2] border border-amber-900/10">
                  <Icon name="Activity" className="text-amber-800" size={24} />
                  <div>
                    <h4 className="font-bold text-xs uppercase tracking-widest text-[#3e2723]">Micro Torrefação</h4>
                    <p className="text-[10px] text-stone-400">Torramos grãos semanalmente em pequenos lotes.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LOCALIZAÇÃO E CONTATO */}
      <section id="localizacao" className="py-20 bg-[#f5ede3] border-t border-amber-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-serif font-black text-[#3e2723]">Onde Encontrar</h2>
            <div className="w-12 h-0.5 bg-amber-700 mx-auto"></div>
            <p className="text-stone-500 font-serif">Venha nos visitar no coração de Lagoa Nova e desfrute de uma experiência completa.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            <div className="lg:col-span-5 bg-white p-8 border border-amber-900/10 shadow-sm flex flex-col justify-between space-y-8">
              <div className="space-y-6">
                <h3 className="text-sm font-bold uppercase tracking-widest text-stone-700">Café Info</h3>
                <div className="space-y-4 text-left">
                  <div className="flex items-start space-x-3">
                    <span className="p-2 bg-[#faf7f2] text-[#3e2723]">
                      <Icon name="MapPin" size={18} />
                    </span>
                    <div>
                      <h4 className="font-bold text-[#3e2723] text-xs uppercase tracking-wider">Endereço</h4>
                      <p className="text-xs text-stone-500 font-serif mt-1">{storeData.address}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="p-2 bg-[#faf7f2] text-[#3e2723]">
                      <Icon name="Phone" size={18} />
                    </span>
                    <div>
                      <h4 className="font-bold text-[#3e2723] text-xs uppercase tracking-wider">WhatsApp</h4>
                      <p className="text-xs text-stone-500 font-serif mt-1">{storeData.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="p-2 bg-[#faf7f2] text-[#3e2723]">
                      <Icon name="Clock" size={18} />
                    </span>
                    <div>
                      <h4 className="font-bold text-[#3e2723] text-xs uppercase tracking-wider">Horários</h4>
                      <div className="text-xs text-stone-500 font-serif mt-1 space-y-1">
                        <p>{storeData.businessHours.weekdays}</p>
                        <p>{storeData.businessHours.saturday}</p>
                        <p>{storeData.businessHours.sunday}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3 pt-6 border-t border-stone-200">
                <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-full px-6 py-4 text-xs font-extrabold uppercase tracking-widest text-white bg-[#3e2723] hover:bg-amber-900 transition-all shadow-md">
                  Chamar no WhatsApp
                </a>
                <a href={storeData.googleMapsDirectionsUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-full px-6 py-4 text-xs font-bold uppercase tracking-widest text-stone-700 bg-stone-100 hover:bg-stone-200 transition-all">
                  Rotas Google Maps
                </a>
              </div>
            </div>

            <div className="lg:col-span-7 h-96 lg:h-auto overflow-hidden shadow-sm border border-amber-900/10 bg-white p-2">
              <iframe src={storeData.googleMapsEmbedUrl} className="w-full h-full border-0" allowFullScreen={false} loading="lazy" title="Localização Nenhum Café"></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-stone-900 text-stone-400 py-12 border-t border-stone-850">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="text-center md:text-left space-y-3">
              <span className="text-xl font-serif font-black text-white" style={{ fontFamily: 'var(--font-display)' }}>
                NENHUM<span className="text-amber-500 font-sans font-bold text-xs ml-1 uppercase">CAFÉ</span>
              </span>
              <p className="text-[10px] text-stone-500 max-w-sm mx-auto md:mx-0">
                © {new Date().getFullYear()} Nenhum Café. Todos os direitos reservados.
              </p>
            </div>
            <div className="text-center md:text-right space-y-4">
              <p className="text-[10px] text-stone-500">
                Desenvolvido com carinho por{' '}
                <a href="https://github.com/FalAiquoc" target="_blank" rel="noopener noreferrer" className="underline hover:text-white transition-colors">
                  Diogo Falcão (FalAiquoc)
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
