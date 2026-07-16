import { useEffect, useState } from 'react';
import { storeData } from './data';
import { Icon } from './components/Icon';

// Componente de Logotipo Vetorial Sofisticado (Xícara de cerâmica com espiral de vapor Hario V60 dourado e traços vintage)
function Logo({ className = "h-10", dark = false }: { className?: string; dark?: boolean }) {
  const accentColor = '#fbbf24'; // Dourado/Caramelo
  const textColor = dark ? '#0F172A' : '#FFFFFF';

  return (
    <div className={`flex items-center space-x-2.5 ${className}`}>
      <svg className="h-full aspect-square overflow-visible" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g stroke={accentColor} strokeWidth="10" strokeLinecap="round">
          {/* Xícara e Pires */}
          <path d="M 40 90 C 40 140 140 140 140 90 Z" strokeWidth="14" />
          <path d="M 140 90 C 170 90 170 120 140 120" strokeWidth="10" />
          <path d="M 20 150 L 160 150" strokeWidth="12" />
          {/* Espirais de vapor do café quente */}
          <path d="M 70 70 Q 80 50 70 30" strokeWidth="8" />
          <path d="M 110 70 Q 120 50 110 30" strokeWidth="8" />
        </g>
      </svg>
      <div className="flex flex-col leading-[0.9] text-left font-display">
        <span className="text-xl font-black tracking-[0.05em] uppercase" style={{ color: textColor }}>NENHUM</span>
        <span className="text-[14px] font-black tracking-[0.25em]" style={{ color: accentColor }}>CAFÉ</span>
        <span className="text-[8px] font-bold tracking-[0.1em] text-stone-400">Cafés de Especialidade</span>
      </div>
    </div>
  );
}

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  
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

    // Cores da Cafeteria
    root.style.setProperty('--p-50', '#fdf8f5');
    root.style.setProperty('--p-100', '#fcefe8');
    root.style.setProperty('--p-500', storeData.colors.primaryHex); // Marrom Café Escuro
    root.style.setProperty('--p-600', '#542617');
    root.style.setProperty('--p-700', '#451e11');
    root.style.setProperty('--p-800', '#32140a');

    root.style.setProperty('--a-50', `${storeData.colors.accentHex}10`);
    root.style.setProperty('--a-100', `${storeData.colors.accentHex}20`);
    root.style.setProperty('--a-500', storeData.colors.accentHex); // Caramelo / Dourado

    document.title = `${storeData.name} — Cafés Especiais e Confeitaria Autoral`;
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
    <div className="min-h-screen bg-[#FAF6F0] text-[#3E2723] antialiased selection:bg-amber-100 selection:text-[#3E2723]">
      
      {/* LETREIRO MARQUEE DESLIZANTE DE INFORMAÇÕES DE CAFETERIA */}
      <div className="bg-[#3E2723] text-[#F5EDE3] text-[10px] font-black uppercase tracking-widest py-2.5 overflow-hidden relative z-50 border-b border-white/10">
        <div className="whitespace-nowrap flex space-x-12 animate-marquee">
          <span>☕ TORRAS FRESCAS SEMANAIS DE GRÃOS 100% ARÁBICA DO SUL DE MINAS!</span>
          <span>🍰 CONFEITARIA ARTESANAL PRÓPRIA – RECEITAS ASSADAS TODOS OS DIAS!</span>
          <span>💻 AMBIENTE COWORKING FRIENDLY COM WI-FI ULTRA RÁPIDO E TOMADAS INDIVIDUAIS!</span>
          <span>☕ TORRAS FRESCAS SEMANAIS DE GRÃOS 100% ARÁBICA DO SUL DE MINAS!</span>
        </div>
      </div>

      {/* TOPBAR */}
      <div className="bg-stone-900 text-stone-400 text-xs py-2 border-b border-stone-850 relative z-50 hidden sm:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <span className="flex items-center gap-1.5"><Icon name="Phone" size={13} className="text-[#fbbf24]" /> (84) 99888-2222</span>
            <span className="flex items-center gap-1.5"><Icon name="Coffee" size={13} className="text-[#fbbf24]" /> Cafés Coados e Confeitaria</span>
            <a href="#localizacao" className="hover:text-white flex items-center gap-1.5 transition-colors"><Icon name="MapPin" size={13} className="text-[#fbbf24]" /> Lagoa Nova, Natal</a>
          </div>
          <div className="flex items-center space-x-6">
            <a href="#metodos" className="hover:text-white transition-colors font-bold text-[#F5EDE3]">Ritual de Métodos</a>
            <div className="flex items-center space-x-3 pl-3 border-l border-stone-700">
              {storeData.instagramUrl && <a href={storeData.instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><Icon name="Instagram" size={14} /></a>}
              {storeData.facebookUrl && <a href={storeData.facebookUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><Icon name="Facebook" size={14} /></a>}
            </div>
          </div>
        </div>
      </div>

      {/* HEADER */}
      <header className={`fixed left-0 right-0 z-40 transition-all duration-300 ${scrolled ? 'top-0 bg-[#FAF6F0] shadow-lg py-2 border-b border-amber-900/10' : 'top-0 sm:top-18 bg-transparent py-4'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            <a href="#hero" className="flex items-center transition-transform hover:scale-101 shrink-0">
              <Logo className="h-10 sm:h-11" />
            </a>
            
            <nav className="hidden lg:flex items-center space-x-8 text-xs font-black uppercase tracking-wider text-[#3E2723]">
              <a href="#metodos" className="hover:text-[#3E2723]/70 transition-colors">Métodos</a>
              <a href="#menu" className="hover:text-[#3E2723]/70 transition-colors">Cardápio</a>
              <a href="#sobre" className="hover:text-[#3E2723]/70 transition-colors">Nossa Casa</a>
              <a href="#localizacao" className="hover:text-[#3E2723]/70 transition-colors">Contato</a>
              <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-5 py-2.5 text-[10px] font-black uppercase tracking-widest text-[#FAF6F0] bg-[#3E2723] hover:bg-amber-900 transition-all shadow-md shadow-amber-950/20">
                <Icon name="Coffee" className="mr-2" size={14} /> Reservar Mesa
              </a>
            </nav>

            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-2 text-[#3E2723] hover:bg-amber-900/5 transition-colors">
              <Icon name={mobileMenuOpen ? 'X' : 'Menu'} size={24} />
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-stone-900 border-t border-stone-850 px-4 pt-4 pb-6 space-y-4 shadow-2xl text-slate-350 text-sm font-semibold">
            <a href="#metodos" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 border-b border-stone-800 hover:text-[#fbbf24]">☕ Métodos de Extração</a>
            <a href="#menu" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 border-b border-stone-800 hover:text-[#fbbf24]">🍰 Nosso Cardápio</a>
            <a href="#sobre" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 border-b border-stone-800 hover:text-[#fbbf24]">🏡 A Casa</a>
            <a href="#localizacao" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 border-b border-stone-800 hover:text-[#fbbf24]">📍 Localização</a>
            
            <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center py-3 text-xs font-bold uppercase tracking-widest text-white bg-[#3E2723] hover:bg-amber-900">
              <Icon name="Phone" className="mr-2" size={16} /> WhatsApp Atendimento
            </a>
          </div>
        )}
      </header>

      {/* HERO SECTION - Vintage Cozy Coffeehouse Style */}
      <section id="hero" className="relative pt-36 pb-24 md:pt-56 md:pb-36 bg-[#F5EDE3] overflow-hidden border-b-4 border-[#3E2723]">
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute top-1/4 left-1/12 w-[400px] h-[400px] rounded-full bg-[#fbbf24] filter blur-[140px] animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/12 w-[550px] h-[550px] rounded-full bg-[#3E2723] filter blur-[160px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center px-4 py-1.5 text-xs font-black tracking-widest uppercase border border-[#3E2723]/30 bg-[#3E2723]/10 text-[#3E2723]">
                ☕ REFÚGIO DE CAFÉS ESPECIAIS EM LAGOA NOVA
              </div>
              
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-display font-black tracking-tight leading-[0.95] text-[#3E2723] uppercase">
                Cafés artesanais, <br />
                <span className="text-amber-800 italic font-light lowercase">ambiente acolhedor.</span>
              </h1>
              
              <p className="text-base sm:text-lg text-[#3E2723] font-serif leading-relaxed max-w-xl mx-auto lg:mx-0">
                {storeData.description} Grãos 100% arábica de pequenos produtores brasileiros, moídos na hora e harmonizados com nossa clássica confeitaria.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <a href={getWhatsAppLink('Olá! Gostaria de reservar uma mesa ou agendar retirada de café.')} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-full sm:w-auto px-8 py-4 text-xs font-black uppercase tracking-wider text-[#FAF6F0] bg-[#3E2723] hover:bg-amber-900 transition-all shadow-lg hover:shadow-amber-955/20">
                  <Icon name="Coffee" className="mr-2" size={16} /> Reservar Mesa
                </a>
                <a href="#metodos" className="flex items-center justify-center w-full sm:w-auto px-8 py-4 text-xs font-black uppercase tracking-wider text-[#3E2723] border border-stone-400 hover:border-[#3E2723] hover:bg-[#FAF6F0]/50 transition-all">
                  <Icon name="Sparkles" className="mr-2" size={16} /> Ver Métodos de Extração
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-sm">
                <div className="absolute -inset-4 border border-[#3E2723]/30 transform translate-x-3 translate-y-3 pointer-events-none"></div>
                <div className="relative bg-white p-3 border border-stone-200 shadow-2xl">
                  <img 
                    src={storeData.aboutImage} 
                    alt="Café coado na Hario V60" 
                    className="w-full h-[400px] object-cover filter brightness-[0.98]" 
                  />
                  <div className="absolute bottom-6 left-6 bg-[#3E2723]/95 backdrop-blur-sm border-l-4 border-[#fbbf24] text-white p-4">
                    <p className="text-[10px] uppercase tracking-widest text-[#fbbf24] font-black">Grãos Pontuados 86+</p>
                    <p className="text-xs text-stone-300 font-light mt-0.5">Torra semanal artesanal</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* MARCAS E FORNECEDORES DE CAFÉ */}
      <section className="py-10 bg-stone-950 border-y border-stone-900 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-center text-[10px] tracking-widest uppercase text-slate-500 font-bold mb-6">Equipamentos e Origem dos Grãos</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-4 items-center justify-items-center opacity-85">
            {storeData.brands?.map((brand, idx) => (
              <div key={idx} className="text-center group pointer-events-none">
                <span className="font-display text-base sm:text-lg tracking-wider text-slate-350 font-semibold italic border-b border-amber-500/20 pb-1 group-hover:text-[#fbbf24] transition-colors">
                  {brand.name}
                </span>
                <span className="block text-[8px] text-slate-500 uppercase tracking-widest mt-1">{brand.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DIFERENCIAIS DA CASA */}
      <section className="py-8 bg-stone-900 border-b border-stone-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
            
            <div className="space-y-2 flex flex-col items-center">
              <span className="p-3 bg-amber-500/10 text-[#fbbf24] rounded-none border border-amber-500/20">
                <Icon name="Coffee" size={22} />
              </span>
              <h4 className="font-display font-black text-xs uppercase tracking-wider">Moagem na hora</h4>
              <p className="text-[10px] text-stone-400">Grãos moídos segundos antes de cada extração especial.</p>
            </div>
            
            <div className="space-y-2 flex flex-col items-center">
              <span className="p-3 bg-amber-500/10 text-[#fbbf24] rounded-none border border-amber-500/20">
                <Icon name="Smile" size={22} />
              </span>
              <h4 className="font-display font-black text-xs uppercase tracking-wider">Confeitaria Fina</h4>
              <p className="text-[10px] text-stone-400">Doces artesanais produzidos diariamente em nossa cozinha.</p>
            </div>
            
            <div className="space-y-2 flex flex-col items-center">
              <span className="p-3 bg-amber-500/10 text-[#fbbf24] rounded-none border border-amber-500/20">
                <Icon name="Activity" size={22} />
              </span>
              <h4 className="font-display font-black text-xs uppercase tracking-wider">Coworking Space</h4>
              <p className="text-[10px] text-stone-400">Tomadas nas mesas e Wi-Fi ultra rápido de cortesia.</p>
            </div>
            
            <div className="space-y-2 flex flex-col items-center">
              <span className="p-3 bg-amber-500/10 text-[#fbbf24] rounded-none border border-amber-500/20">
                <Icon name="Heart" size={22} />
              </span>
              <h4 className="font-display font-black text-xs uppercase tracking-wider">Lounge Externo</h4>
              <p className="text-[10px] text-stone-400">Espaço pet friendly aberto e cercado por plantas.</p>
            </div>

            <div className="space-y-2 flex flex-col items-center col-span-2 md:col-span-1">
              <span className="p-3 bg-amber-500/10 text-[#fbbf24] rounded-none border border-amber-500/20">
                <Icon name="ShieldCheck" size={22} />
              </span>
              <h4 className="font-display font-black text-xs uppercase tracking-wider">Grãos Rastreáveis</h4>
              <p className="text-[10px] text-stone-400">Saca e fazenda de origem declarados em cada lote.</p>
            </div>

          </div>
        </div>
      </section>

      {/* RITUAL DE MÉTODOS DE EXTRAÇÃO INTERATIVO */}
      <section id="metodos" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#3E2723]">Rituais do Café</span>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-[#3E2723] uppercase">
              Métodos de <span className="text-amber-800 italic font-light lowercase">extração</span>
            </h2>
            <div className="w-16 h-1 bg-[#3E2723] mx-auto"></div>
            <p className="text-stone-550 text-sm sm:text-base font-light max-w-2xl mx-auto font-serif">
              A escolha do método altera completamente o sabor do café. Clique nos botões abaixo e compare as fichas sensoriais.
            </p>
          </div>

          <div className="bg-[#FAF6F0] border border-amber-900/10 rounded-none p-8 lg:p-12 shadow-sm max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              
              <div className="space-y-6">
                <h3 className="text-base font-display font-black text-[#3E2723] uppercase tracking-wider border-b border-[#3E2723]/10 pb-3">Selecione o Método</h3>
                
                <div className="flex flex-col space-y-3">
                  {Object.keys(extractionMethods).map((method) => (
                    <button
                      key={method}
                      onClick={() => setSelectedMethod(method)}
                      className={`px-6 py-4 text-left font-bold uppercase tracking-widest text-xs transition-all border ${
                        selectedMethod === method
                          ? 'bg-[#3E2723] text-[#FAF6F0] border-[#3E2723] shadow-lg pl-8'
                          : 'bg-white text-stone-600 border-[#3E2723]/10 hover:border-[#3E2723]'
                      }`}
                    >
                      ☕ {method}
                    </button>
                  ))}
                </div>

                <div className="bg-white p-6 border border-amber-900/10 shadow-inner space-y-4">
                  <h4 className="text-xs font-black uppercase text-[#3E2723] tracking-wider flex items-center">
                    <Icon name="Activity" className="mr-2 text-[#fbbf24]" size={16} /> Sobre a Bebida Resultante
                  </h4>
                  <p className="text-xs text-stone-600 leading-relaxed font-serif">
                    {extractionMethods[selectedMethod].desc}
                  </p>
                  
                  <div className="pt-2">
                    <a 
                      href={getWhatsAppLink(`Olá, gostaria de reservar o café especial extraído no método ${selectedMethod} para degustação no local.`)} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-amber-700 hover:text-amber-800"
                    >
                      Quero degustar no local <Icon name="ChevronRight" className="ml-1" size={16} />
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-none border border-amber-900/10 shadow-xl min-h-[300px] flex flex-col justify-center space-y-6">
                <h4 className="text-xs font-black uppercase tracking-widest text-[#3E2723] text-center">Ficha Sensorial do Método</h4>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-stone-100">
                    <span className="text-xs font-black uppercase tracking-wider text-[#3E2723]">Corpo / Sensação</span>
                    <span className="text-xs font-semibold text-stone-600 font-serif">{extractionMethods[selectedMethod].body}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-stone-100">
                    <span className="text-xs font-black uppercase tracking-wider text-[#3E2723]">Acidez</span>
                    <span className="text-xs font-semibold text-stone-600 font-serif">{extractionMethods[selectedMethod].acidity}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-stone-100">
                    <span className="text-xs font-black uppercase tracking-wider text-[#3E2723]">Doçura</span>
                    <span className="text-xs font-semibold text-stone-600 font-serif">{extractionMethods[selectedMethod].sweetness}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-xs font-black uppercase tracking-wider text-[#3E2723]">Intensidade</span>
                    <span className="text-xs font-semibold text-stone-600 font-serif">{extractionMethods[selectedMethod].intensity}</span>
                  </div>
                </div>

                <p className="text-[9px] text-center text-stone-400 font-serif italic">Notas baseadas no grão Bourbon Amarelo (86+ pontos)</p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* VITRINE DE BEBIDAS E DOCES (CARDÁPIO) */}
      <section id="menu" className="py-24 bg-[#FAF6F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#3E2723]">Harmonização Completa</span>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-[#3E2723] uppercase">
              Nosso <span className="text-amber-800 italic font-light lowercase">Cardápio</span>
            </h2>
            <div className="w-16 h-1 bg-[#3E2723] mx-auto"></div>
            <p className="text-stone-550 text-sm sm:text-base font-light font-serif">
              Nossos doces, tortas e quiches são assados na casa diariamente.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {storeData.products.map((product) => (
              <div key={product.id} className="bg-white border border-amber-900/10 rounded-none overflow-hidden flex flex-col group hover:shadow-2xl hover:border-amber-900/40 transition-all duration-300 relative">
                {product.tag && (
                  <span className="absolute top-3 left-3 bg-[#3E2723] text-[#FAF6F0] text-[9px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-none z-20 shadow-md">
                    {product.tag}
                  </span>
                )}
                
                <div className="relative h-80 overflow-hidden bg-stone-100 border-b border-stone-200">
                  <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 filter brightness-[0.98]" loading="lazy" />
                  <div className="absolute inset-0 bg-[#3E2723]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20">
                    <span className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-stone-950 border border-white">Pedir no WhatsApp</span>
                  </div>
                </div>
                
                <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-base font-display font-extrabold text-[#3E2723] uppercase tracking-wide line-clamp-1">{product.name}</h3>
                    <p className="text-xs text-stone-500 font-serif leading-relaxed line-clamp-3">{product.description}</p>
                  </div>
                  <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                    <span className="text-xs font-black text-amber-800 bg-amber-500/5 border border-amber-500/20 px-3 py-1">{product.price}</span>
                    <a href={getWhatsAppLink(`Olá, gostaria de reservar o item do cardápio: ${product.name} (${product.price}).`)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-4 py-2.5 text-[10px] font-bold uppercase tracking-wider text-white bg-[#3E2723] hover:bg-amber-900 transition-all border border-[#3E2723]">
                      Pedir Item <Icon name="ChevronRight" className="ml-1" size={12} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEÇÃO: HISTÓRIA E COWORKING COZY (WOW Factor) */}
      <section id="sobre" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto w-full max-w-sm">
                <div className="absolute -inset-3 border-2 border-[#3E2723]/30 transform -translate-x-2 translate-y-2 pointer-events-none"></div>
                <div className="relative bg-stone-900 p-2 shadow-2xl">
                  <img 
                    src={storeData.aboutImage} 
                    alt="Showroom e salão do Nenhum Café" 
                    className="w-full h-96 object-cover filter brightness-[0.95]" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent"></div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-2 text-center lg:text-left">
                <span className="text-xs font-bold uppercase tracking-widest text-[#3E2723] bg-[#3E2723]/10 px-3 py-1 border border-[#3E2723]/20">Um Lugar de Desaceleração</span>
                <h2 className="text-3xl sm:text-4xl font-display font-black text-[#3E2723] leading-tight uppercase">
                  O tempo passa mais <span className="text-amber-800 italic font-light lowercase">devagar por aqui</span>
                </h2>
              </div>
              
              <p className="text-stone-600 text-base sm:text-lg leading-relaxed font-light font-serif text-center lg:text-left">
                {storeData.aboutText}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center space-x-4 p-5 bg-[#FAF6F0] border border-amber-900/10">
                  <span className="p-3 bg-[#3E2723] text-white rounded-none">
                    <Icon name="Activity" size={24} />
                  </span>
                  <div>
                    <h4 className="font-display font-black text-[#3E2723] text-sm uppercase tracking-wide">Internet Rápida</h4>
                    <p className="text-xs text-stone-500 mt-0.5 font-serif">Rede Wi-Fi dedicada e tomadas em todas as mesas internas.</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 p-5 bg-[#FAF6F0] border border-amber-900/10">
                  <span className="p-3 bg-[#3E2723] text-white rounded-none">
                    <Icon name="Smile" size={24} />
                  </span>
                  <div>
                    <h4 className="font-display font-black text-[#3E2723] text-sm uppercase tracking-wide">Espaço Pet Friendly</h4>
                    <p className="text-xs text-stone-500 mt-0.5 font-serif">Deck arborizado e potinhos de água fresca para seu pet.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SEÇÃO: DEPOIMENTOS COZY */}
      <section className="py-24 bg-[#FAF6F0] border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#3E2723]">Feedbacks dos Clientes</span>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-[#3E2723] uppercase">
              Quem frequenta a casa, <span className="text-amber-800 italic font-light lowercase">recomenda</span>
            </h2>
            <div className="w-16 h-1 bg-[#3E2723] mx-auto"></div>
            <p className="text-stone-550 text-sm sm:text-base font-light font-serif">
              O depoimento de quem encontra aconchego, café fresco e bom papo por aqui.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="bg-white p-8 border border-amber-900/10 relative">
              <div className="flex items-center space-x-1 text-amber-550 mb-4">
                <Icon name="Star" size={16} className="fill-[#fbbf24] text-[#fbbf24]" />
                <Icon name="Star" size={16} className="fill-[#fbbf24] text-[#fbbf24]" />
                <Icon name="Star" size={16} className="fill-[#fbbf24] text-[#fbbf24]" />
                <Icon name="Star" size={16} className="fill-[#fbbf24] text-[#fbbf24]" />
                <Icon name="Star" size={16} className="fill-[#fbbf24] text-[#fbbf24]" />
              </div>
              <p className="text-stone-600 text-xs leading-relaxed italic mb-6 font-serif">
                "O cappuccino deles é de longe o melhor de Natal. Além do sabor do café ser limpo, a doçura e a crema são impecáveis. Frequento sempre para fazer reuniões de trabalho."
              </p>
              <div className="flex items-center space-x-3">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150" alt="Mateus Guedes" className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <h4 className="font-display font-black text-[#3E2723] text-xs uppercase tracking-wider">Mateus Guedes</h4>
                  <span className="text-[10px] text-stone-400">Designer Freelancer</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 border border-amber-900/10 relative">
              <div className="flex items-center space-x-1 text-amber-550 mb-4">
                <Icon name="Star" size={16} className="fill-[#fbbf24] text-[#fbbf24]" />
                <Icon name="Star" size={16} className="fill-[#fbbf24] text-[#fbbf24]" />
                <Icon name="Star" size={16} className="fill-[#fbbf24] text-[#fbbf24]" />
                <Icon name="Star" size={16} className="fill-[#fbbf24] text-[#fbbf24]" />
                <Icon name="Star" size={16} className="fill-[#fbbf24] text-[#fbbf24]" />
              </div>
              <p className="text-stone-600 text-xs leading-relaxed italic mb-6 font-serif">
                "Sou apaixonada pela fatia de Red Velvet. A massa é úmida, macia e a cobertura de cream cheese tem o azedinho na medida. Sem falar no atendimento que é super carinhoso."
              </p>
              <div className="flex items-center space-x-3">
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150" alt="Isabella Pimentel" className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <h4 className="font-display font-black text-[#3E2723] text-xs uppercase tracking-wider">Isabella Pimentel</h4>
                  <span className="text-[10px] text-stone-400">Arquiteta - Lagoa Nova</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 border border-amber-900/10 relative">
              <div className="flex items-center space-x-1 text-amber-550 mb-4">
                <Icon name="Star" size={16} className="fill-[#fbbf24] text-[#fbbf24]" />
                <Icon name="Star" size={16} className="fill-[#fbbf24] text-[#fbbf24]" />
                <Icon name="Star" size={16} className="fill-[#fbbf24] text-[#fbbf24]" />
                <Icon name="Star" size={16} className="fill-[#fbbf24] text-[#fbbf24]" />
                <Icon name="Star" size={16} className="fill-[#fbbf24] text-[#fbbf24]" />
              </div>
              <p className="text-stone-600 text-xs leading-relaxed italic mb-6 font-serif">
                "Cafés coados na Hario V60 são perfeitos. As notas florais saltam no aroma da xícara. Muito bom ter uma cafeteria desse nível de especialidade perto de casa."
              </p>
              <div className="flex items-center space-x-3">
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150" alt="Dra. Cláudia Melo" className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <h4 className="font-display font-black text-[#3E2723] text-xs uppercase tracking-wider">Dra. Cláudia Melo</h4>
                  <span className="text-[10px] text-stone-400">Médica - Natal</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FAQ INTERATIVO CAFETERIA */}
      <section className="py-24 bg-white text-[#3E2723] relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#3E2723]">Dúvidas Frequentes</span>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-slate-950 uppercase">
              Perguntas <span className="text-amber-800 italic font-light lowercase">Frequentes</span>
            </h2>
            <div className="w-16 h-1 bg-[#3E2723] mx-auto"></div>
            <p className="text-stone-550 text-sm sm:text-base font-light font-serif">
              Respostas rápidas sobre encomendas de bolos, estacionamento e reserva de espaço de coworking.
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "Posso fazer reserva de mesa para reuniões?",
                a: "Sim, aceitamos reservas de mesas para pequenas reuniões de trabalho ou confraternizações. Basta entrar em contato pelo nosso WhatsApp com pelo menos 24h de antecedência."
              },
              {
                q: "Vocês aceitam encomenda de tortas e bolos inteiros?",
                a: "Sim. Nossas tortas e doces do cardápio (incluindo a Red Velvet e Banoffee) podem ser encomendadas inteiras para aniversários e eventos através de cotação direta no WhatsApp."
              },
              {
                q: "A cafeteria tem vagas de estacionamento?",
                a: "Sim. Contamos com estacionamento rotativo gratuito em frente à cafeteria e vagas acessíveis na calçada."
              },
              {
                q: "Quais os métodos de extração que vocês servem diariamente?",
                a: "Servimos Hario V60, Aeropress, Prensa Francesa, Clever e o clássico Espresso extraído em máquina italiana La Marzocco."
              }
            ].map((faq, idx) => (
              <div key={idx} className="border border-slate-200 overflow-hidden">
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-6 bg-slate-50 hover:bg-slate-100 transition-colors text-left text-slate-950 font-display font-black text-sm uppercase tracking-wide"
                >
                  <span>{faq.q}</span>
                  <Icon
                    name={openFaqIndex === idx ? "Minus" : "Plus"}
                    className="text-amber-700"
                    size={16}
                  />
                </button>
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    openFaqIndex === idx ? "max-h-[300px] border-t border-slate-200" : "max-h-0"
                  }`}
                >
                  <p className="p-6 text-xs text-slate-600 leading-relaxed font-light bg-white font-serif">
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LOCALIZAÇÃO E CONTATO */}
      <section id="localizacao" className="py-24 bg-[#FAF6F0] border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#3E2723]">Venha nos ver</span>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-[#3E2723] uppercase">Nossa Localização</h2>
            <div className="w-16 h-1 bg-[#3E2723] mx-auto"></div>
            <p className="text-stone-550 text-sm sm:text-base font-light font-serif">
              Estamos situados na Rua Jaguarari, com rampa de acessibilidade e deck climatizado.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            <div className="lg:col-span-5 bg-white p-8 rounded-none border border-amber-900/10 shadow-sm flex flex-col justify-between space-y-8">
              <div className="space-y-6">
                <h3 className="text-lg font-display font-black text-[#3E2723] uppercase tracking-wide">Informações de Contato</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <span className="p-2 bg-[#FAF6F0] rounded-none text-stone-500 border border-amber-900/10">
                      <Icon name="MapPin" size={20} />
                    </span>
                    <div>
                      <h4 className="font-bold text-stone-850 text-xs uppercase tracking-wider">Endereço da Casa</h4>
                      <p className="text-xs text-stone-505 font-serif mt-1 leading-relaxed">{storeData.address}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <span className="p-2 bg-[#FAF6F0] rounded-none text-stone-500 border border-amber-900/10">
                      <Icon name="Phone" size={20} />
                    </span>
                    <div>
                      <h4 className="font-bold text-stone-850 text-xs uppercase tracking-wider">WhatsApp Central</h4>
                      <p className="text-xs text-stone-505 font-serif mt-1">{storeData.phone}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <span className="p-2 bg-[#FAF6F0] rounded-none text-stone-500 border border-amber-900/10">
                      <Icon name="Clock" size={20} />
                    </span>
                    <div>
                      <h4 className="font-bold text-stone-850 text-xs uppercase tracking-wider">Horário da Cafeteria</h4>
                      <div className="text-xs text-stone-505 font-serif mt-1 space-y-1">
                        <p>{storeData.businessHours.weekdays}</p>
                        <p>{storeData.businessHours.saturday}</p>
                        <p>{storeData.businessHours.sunday}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3 pt-6 border-t border-stone-200">
                <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-full px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#FAF6F0] bg-[#3E2723] hover:bg-amber-900 transition-all">
                  <Icon name="Phone" className="mr-2" size={16} /> Chamar no WhatsApp
                </a>
                <a href={storeData.googleMapsDirectionsUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-full px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#3E2723] bg-[#FAF6F0] border border-amber-900/10 hover:bg-[#FAF6F0]/80 transition-all">
                  <Icon name="MapPin" className="mr-2 text-stone-500" size={16} /> Como Chegar (Google Maps)
                </a>
              </div>
            </div>

            <div className="lg:col-span-7 h-96 lg:h-auto rounded-none overflow-hidden border border-amber-900/10 bg-white p-2">
              <iframe src={storeData.googleMapsEmbedUrl} className="w-full h-full border-0" allowFullScreen={false} loading="lazy" title="Localização Nenhum Café"></iframe>
            </div>

          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-stone-950 text-stone-450 py-16 border-t border-[#3E2723]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            
            <div>
              <h4 className="text-white font-black text-xs uppercase tracking-wider mb-4">Institucional</h4>
              <ul className="space-y-2 text-xs">
                <li><a href="#hero" className="hover:text-white transition-colors">Sobre o Café</a></li>
                <li><a href="#localizacao" className="hover:text-white transition-colors">Nossa Casa</a></li>
                <li><a href={getWhatsAppLink('Olá! Gostaria de falar sobre vagas de barista.')} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Trabalhe conosco</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-black text-xs uppercase tracking-wider mb-4">Serviços & Métodos</h4>
              <ul className="space-y-2 text-xs">
                <li><a href="#metodos" className="hover:text-white transition-colors">Métodos de Extração</a></li>
                <li><a href="#menu" className="hover:text-white transition-colors">Cardápio Completo</a></li>
                <li><a href={getWhatsAppLink('Olá! Gostaria de reservar o espaço para eventos.')} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Reserva de Eventos</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-black text-xs uppercase tracking-wider mb-4">Acompanhe-nos</h4>
              <ul className="space-y-2 text-xs">
                {storeData.instagramUrl && <li><a href={storeData.instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center"><Icon name="Instagram" size={13} className="mr-2 text-[#fbbf24]" /> Instagram</a></li>}
                {storeData.facebookUrl && <li><a href={storeData.facebookUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center"><Icon name="Facebook" size={13} className="mr-2 text-[#fbbf24]" /> Facebook</a></li>}
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-black text-xs uppercase tracking-wider mb-4">Formas de Pagamento</h4>
              <div className="grid grid-cols-2 gap-2 text-[10px] font-bold uppercase">
                <span className="bg-stone-900 px-2.5 py-1.5 border border-stone-850 text-center text-stone-300">💳 Crédito</span>
                <span className="bg-stone-900 px-2.5 py-1.5 border border-stone-850 text-center text-slate-300">⚡ Pix</span>
                <span className="bg-stone-900 px-2.5 py-1.5 border border-stone-850 text-center text-slate-300">💵 Dinheiro</span>
                <span className="bg-stone-900 px-2.5 py-1.5 border border-stone-850 text-center text-slate-300">✍️ Vale Refeição</span>
              </div>
            </div>

          </div>

          <div className="border-t border-stone-900 pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left text-xs">
            <div className="space-y-2">
              <Logo className="h-10 mx-auto md:mx-0" />
              <p className="text-[10px] text-stone-500 font-light mt-2">
                © {new Date().getFullYear()} Nenhum Café – Natal. Todos os direitos reservados.
              </p>
            </div>
            
            <div className="text-center md:text-right space-y-2 text-stone-500 text-[9px] uppercase font-bold tracking-wider">
              <p>Espaço de Cafés Especiais e Confeitaria Artesanal</p>
              <p>Alvará Sanitário de Gastronomia Nº 8912/RN</p>
              <p>
                Desenvolvido por{' '}
                <a href="https://github.com/FalAiquoc" target="_blank" rel="noopener noreferrer" className="underline hover:text-white transition-colors text-slate-400">
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
