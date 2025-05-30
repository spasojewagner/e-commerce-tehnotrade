import React from 'react';
import { Facebook, Instagram, Youtube, MapPin, Phone, Mail, CreditCard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface FooterProps {}

const Footer: React.FC<FooterProps> = () => {

    const navigate=useNavigate()

  return (
    <footer className="bg-gray-900 text-white border-t border-gray-800">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <h3 className="text-xl font-black mb-6 bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
              TEHNOTRADE SOLUTIONS
            </h3>
            <div className="space-y-4 text-gray-300">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-orange-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium">Vinogradski venac 36</p>
                  <p>Beograd, Srbija</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <p><span className="text-orange-400 font-medium">PIB:</span> 114811600</p>
                <p><span className="text-orange-400 font-medium">MB:</span> 22073889</p>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-orange-400" />
                <a href="tel:+381640390223" className="hover:text-orange-400 transition-colors">
                  +381 64 0390223
                </a>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-orange-400" />
                <a href="mailto:contact@tehnotrade.rs" className="hover:text-orange-400 transition-colors">
                  contact@tehnotrade.rs
                </a>
              </div>
            </div>
          </div>

          {/* Legal & Privacy Links */}
          <div className="lg:col-span-1">
            <h4 className="text-lg font-bold mb-6 text-white">PRAVNE INFORMACIJE</h4>
            <ul className="space-y-3">
              <li onClick={()=>navigate('/zastita-privatnosti')}>
                <a href="/zastita-privatnosti" className="text-gray-300 hover:text-orange-400 transition-colors">
                  Zaštita privatnosti
                </a>
              </li>
              <li onClick={()=>navigate('/prava-potrosaca')}>
                <a href="/prava-potrosaca" className="text-gray-300 hover:text-orange-400 transition-colors">
                  Prava potrošača
                </a>
              </li>
              <li onClick={()=>navigate('/uslovi-koriscenja-i-prodaje')}>
                <a href="/uslovi-koriscenja-i-prodaje" className="text-gray-300 hover:text-orange-400 transition-colors">
                  Uslovi korišćenja i prodaje
                </a>
              </li>
              <li onClick={()=>navigate('/uslovi-isporuke')}>
                <a href="/uslovi-isporuke" className="text-gray-300 hover:text-orange-400 transition-colors">
                  Uslovi isporuke
                </a>
              </li>
              <li onClick={()=>navigate('/placanje-platnim-karticama')}>
                <a href="/placanje-platnim-karticama" className="text-gray-300 hover:text-orange-400 transition-colors">
                  Plaćanje platnim karticama
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Service Links */}
          <div className="lg:col-span-1">
            <h4 className="text-lg font-bold mb-6 text-white">KORISNIČKA PODRŠKA</h4>
            <ul className="space-y-3">
              <li  onClick={()=>navigate('/reklamacije')}>
                <a href="/reklamacije" className="text-gray-300 hover:text-orange-400 transition-colors">
                  Reklamacije i pravo na odustajanje od ugovora
                </a>
              </li>
              <li>
                <a href="/warranty-form" className="text-gray-300 hover:text-orange-400 transition-colors">
                  Obrazac za reklamacije
                </a>
              </li>
              <li>
                <a href="/withdrawal-statement" className="text-gray-300 hover:text-orange-400 transition-colors">
                  Izjava o odustanku od ugovora
                </a>
              </li>
              <li>
                <a href="/distance-selling-contract" className="text-gray-300 hover:text-orange-400 transition-colors">
                  Ugovor o prodaji na daljinu
                </a>
              </li>
              <li>
                <a href="/faq" className="text-gray-300 hover:text-orange-400 transition-colors">
                  Često postavljana pitanja
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media & Payment */}
          <div className="lg:col-span-1">
            <h4 className="text-lg font-bold mb-6 text-white">DRUŠTVENE MREŽE</h4>
            <div className="flex space-x-4 mb-8">
              <a 
                href="https://facebook.com/tehnotrade" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-orange-500 transition-colors group"
              >
                <Facebook className="w-6 h-6 text-gray-300 group-hover:text-white" />
              </a>
              <a 
                href="https://instagram.com/tehnotrade" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-orange-500 transition-colors group"
              >
                <Instagram className="w-6 h-6 text-gray-300 group-hover:text-white" />
              </a>
              <a 
                href="https://youtube.com/tehnotrade" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-orange-500 transition-colors group"
              >
                <Youtube className="w-6 h-6 text-gray-300 group-hover:text-white" />
              </a>
            </div>

            <h4 className="text-lg font-bold mb-4 text-white">PLAĆANJE</h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white rounded-lg p-3 flex items-center justify-center">
                <img 
                  src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCA0MCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjI0IiByeD0iNCIgZmlsbD0iIzAwNTFBNSIvPgo8dGV4dCB4PSI1IiB5PSIxNiIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjEwIiBmb250LXdlaWdodD0iYm9sZCIgZmlsbD0id2hpdGUiPlZJU0E8L3RleHQ+Cjwvc3ZnPg==" 
                  alt="Visa" 
                  className="h-6"
                />
              </div>
              <div className="bg-white rounded-lg p-3 flex items-center justify-center">
                <div className="flex space-x-1">
                  <div className="w-4 h-4 bg-red-500 rounded-full opacity-80"></div>
                  <div className="w-4 h-4 bg-orange-400 rounded-full opacity-80"></div>
                </div>
              </div>
              <div className="bg-white rounded-lg p-3 flex items-center justify-center">
                <div className="text-blue-800 font-bold text-xs">DINA</div>
              </div>
              <div className="bg-white rounded-lg p-3 flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-gray-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Methods Bar */}
      <div className="border-t border-gray-800 bg-gray-950 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-6">
              <div className="bg-white rounded-lg px-4 py-2 flex items-center space-x-2">
                <div className="w-8 h-5 bg-blue-600 rounded text-white text-xs font-bold flex items-center justify-center">AIK</div>
                <span className="text-gray-800 text-sm font-medium">Bank</span>
              </div>
              <div className="bg-white rounded-lg px-4 py-2">
                <div className="text-gray-800 text-sm font-bold">Banca Intesa</div>
              </div>
              <div className="bg-white rounded-lg px-4 py-2 flex items-center">
                <div className="text-blue-600 font-bold text-sm">VISA</div>
              </div>
              <div className="bg-white rounded-lg px-4 py-2 flex items-center space-x-1">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
                <span className="text-gray-800 text-sm font-medium ml-1">Mastercard</span>
              </div>
              <div className="bg-white rounded-lg px-4 py-2">
                <div className="text-blue-800 font-bold text-sm">DinaCard</div>
              </div>
            </div>
            
            <div className="text-gray-400 text-sm">
              Svi logotipi su vlasništvo njihovih vlasnika
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 bg-black py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © Tehnotrade solutions doo 2025
            </div>
            
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;