import React from 'react';
import { 
  Shield, 
  Lock, 
  Eye, 
  Users, 
  Database, 
  Clock, 
  Cookie, 
  FileText, 
  Mail, 
  Phone,
  MapPin,
  Building2
} from 'lucide-react';

const ZastitaPrivatnosti: React.FC = () => {
  return (
    <div className="flex-1 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Hero Section */}
      <div className="relative py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-4 rounded-full">
              <Shield className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-400 to-orange-300 bg-clip-text text-transparent mb-6">
            Zaštita privatnosti
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Posvećeni smo zaštiti vaše privatnosti i bezbednosti vaših ličnih podataka
          </p>
        </div>
      </div>

      {/* Company Info */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/30">
          <div className="flex items-center mb-6">
            <Building2 className="w-6 h-6 text-orange-500 mr-3" />
            <h2 className="text-2xl font-bold text-white">Tehnotrade Solutions d.o.o.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">
            <div className="flex items-center">
              <MapPin className="w-4 h-4 text-orange-500 mr-2" />
              <span>Vinogradski venac 36, Beograd</span>
            </div>
            <div className="flex items-center">
              <span className="text-orange-500 mr-2">PIB:</span>
              <span>114811600</span>
            </div>
            <div className="flex items-center">
              <span className="text-orange-500 mr-2">Matični broj:</span>
              <span>22073869</span>
            </div>
            <div className="flex items-center">
              <Mail className="w-4 h-4 text-orange-500 mr-2" />
              <span>contact@tehnotrade.rs</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="prose prose-invert max-w-none">
          
          {/* Introduction */}
          <div className="bg-gray-800/20 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-gray-700/30">
            <p className="text-lg text-gray-300 leading-relaxed">
              <strong>Tehnotrade Solutions d.o.o.</strong> posvećen je zaštiti vaše privatnosti 
              i bezbednosti vaših ličnih podataka. Ova Pravila privatnosti objašnjavaju koje 
              podatke prikupljamo, na koji način ih obrađujemo, u koje svrhe ih koristimo, 
              kako ih štitimo i koja prava imate u vezi sa svojim podacima.
            </p>
          </div>

          {/* Section 1 */}
          <div className="bg-gray-800/20 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-gray-700/30">
            <div className="flex items-center mb-6">
              <Database className="w-6 h-6 text-orange-500 mr-3" />
              <h2 className="text-2xl font-bold text-white">1. Koje podatke prikupljamo?</h2>
            </div>
            <p className="text-gray-300 mb-4">Možemo prikupljati sledeće vrste informacija:</p>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start">
                <span className="text-orange-400 mr-2">•</span>
                <span><strong>Lični podaci:</strong> ime, prezime, adresa, broj telefona, email adresa.</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-400 mr-2">•</span>
                <span><strong>Podaci o transakcijama:</strong> kupljeni proizvodi, datum i vreme narudžbine, način plaćanja, istorija kupovine.</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-400 mr-2">•</span>
                <span><strong>Podaci o uređaju i mreži:</strong> IP adresa, tip uređaja, operativni sistem, pretraživač, geolokacija.</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-400 mr-2">•</span>
                <span><strong>Podaci o korišćenju sajta:</strong> stranice koje posećujete, vreme provedeno na sajtu, klikovi, navigacija i interakcije sa sadržajem.</span>
              </li>
            </ul>
          </div>

          {/* Section 2 */}
          <div className="bg-gray-800/20 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-gray-700/30">
            <div className="flex items-center mb-6">
              <Eye className="w-6 h-6 text-orange-500 mr-3" />
              <h2 className="text-2xl font-bold text-white">2. Kako koristimo vaše podatke?</h2>
            </div>
            <p className="text-gray-300 mb-4">Vaši podaci se koriste u sledeće svrhe:</p>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start">
                <span className="text-orange-400 mr-2">•</span>
                <span>Obrada i isporuka narudžbina.</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-400 mr-2">•</span>
                <span>Komunikacija sa korisnicima u vezi sa narudžbinama, pitanjima i reklamacijama.</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-400 mr-2">•</span>
                <span>Unapređenje korisničkog iskustva i optimizacija sajta i ponude.</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-400 mr-2">•</span>
                <span>Slanje promotivnih ponuda i obaveštenja (ako ste dali saglasnost).</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-400 mr-2">•</span>
                <span>Ispunjavanje zakonskih i regulatornih obaveza.</span>
              </li>
            </ul>
          </div>

          {/* Section 3 */}
          <div className="bg-gray-800/20 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-gray-700/30">
            <div className="flex items-center mb-6">
              <Users className="w-6 h-6 text-orange-500 mr-3" />
              <h2 className="text-2xl font-bold text-white">3. Deljenje podataka sa trećim stranama</h2>
            </div>
            <p className="text-gray-300 mb-4">Vaše podatke delimo isključivo kada je to neophodno:</p>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start">
                <span className="text-orange-400 mr-2">•</span>
                <span>Sa partnerima koji učestvuju u obradi narudžbina (npr. kurirske službe).</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-400 mr-2">•</span>
                <span>Sa nadležnim organima kada je to zakonski obavezno.</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-400 mr-2">•</span>
                <span>Sa pouzdanim partnerima koji pružaju usluge kao što su analitika, email marketing ili hostovanje sajta, a koji su obavezani ugovorom da čuvaju poverljivost podataka.</span>
              </li>
            </ul>
          </div>

          {/* Section 4 */}
          <div className="bg-gray-800/20 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-gray-700/30">
            <div className="flex items-center mb-6">
              <Lock className="w-6 h-6 text-orange-500 mr-3" />
              <h2 className="text-2xl font-bold text-white">4. Bezbednost podataka</h2>
            </div>
            <p className="text-gray-300">
              Primenujemo odgovarajuće tehničke i organizacione mere zaštite kako bismo sprečili 
              neovlašćen pristup, gubitak, izmenu ili zloupotrebu podataka. Pristup podacima ima 
              isključivo ovlašćeno osoblje.
            </p>
          </div>

          {/* Section 5 */}
          <div className="bg-gray-800/20 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-gray-700/30">
            <div className="flex items-center mb-6">
              <FileText className="w-6 h-6 text-orange-500 mr-3" />
              <h2 className="text-2xl font-bold text-white">5. Vaša prava</h2>
            </div>
            <p className="text-gray-300 mb-4">U skladu sa važećim zakonima, imate pravo da:</p>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start">
                <span className="text-orange-400 mr-2">•</span>
                <span>Zatražite pristup svojim ličnim podacima.</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-400 mr-2">•</span>
                <span>Ispravite netačne ili nepotpune podatke.</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-400 mr-2">•</span>
                <span>Zatražite brisanje podataka, u slučajevima kada obrada više nije potrebna.</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-400 mr-2">•</span>
                <span>Opozovete saglasnost za marketinške aktivnosti.</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-400 mr-2">•</span>
                <span>Uložite prigovor na obradu vaših podataka.</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-400 mr-2">•</span>
                <span>Zatražite prenosivost podataka, ukoliko je primenljivo.</span>
              </li>
            </ul>
            <p className="text-gray-300 mt-4">
              Za ostvarivanje svojih prava, kontaktirajte nas putem emaila ili telefona 
              navedenih u odeljku Kontakt.
            </p>
          </div>

          {/* Section 6 */}
          <div className="bg-gray-800/20 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-gray-700/30">
            <div className="flex items-center mb-6">
              <Clock className="w-6 h-6 text-orange-500 mr-3" />
              <h2 className="text-2xl font-bold text-white">6. Period čuvanja podataka</h2>
            </div>
            <p className="text-gray-300">
              Vaši lični podaci se čuvaju onoliko dugo koliko je potrebno za ispunjenje svrhe 
              zbog koje su prikupljeni, osim ako zakon ne nalaže drugačije.
            </p>
          </div>

          {/* Section 7 */}
          <div className="bg-gray-800/20 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-gray-700/30">
            <div className="flex items-center mb-6">
              <Cookie className="w-6 h-6 text-orange-500 mr-3" />
              <h2 className="text-2xl font-bold text-white">7. Korišćenje kolačića</h2>
            </div>
            <p className="text-gray-300">
              Naša internet stranica koristi kolačiće radi unapređenja funkcionalnosti sajta 
              i vašeg korisničkog iskustva. Kolačiće možete kontrolisati kroz podešavanja 
              pretraživača. Napominjemo da onemogućavanje kolačića može uticati na 
              funkcionalnost sajta.
            </p>
          </div>

          {/* Section 8 */}
          <div className="bg-gray-800/20 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-gray-700/30">
            <div className="flex items-center mb-6">
              <FileText className="w-6 h-6 text-orange-500 mr-3" />
              <h2 className="text-2xl font-bold text-white">8. Izmene Pravila privatnosti</h2>
            </div>
            <p className="text-gray-300">
              Zadržavamo pravo da povremeno izmenimo ova Pravila privatnosti. Sve izmene biće 
              objavljene na ovoj stranici, a važe od trenutka objavljivanja. Preporučujemo 
              redovno informisanje o aktuelnim pravilima.
            </p>
          </div>

          {/* Contact Section */}
          <div className="bg-gradient-to-r from-orange-500/10 to-orange-600/10 backdrop-blur-sm rounded-2xl p-8 border border-orange-500/30">
            <div className="flex items-center mb-6">
              <Mail className="w-6 h-6 text-orange-500 mr-3" />
              <h2 className="text-2xl font-bold text-white">9. Kontakt</h2>
            </div>
            <p className="text-gray-300 mb-6">
              Za sva pitanja, zahteve, reklamacije ili informacije u vezi sa pravima potrošača, 
              možete nas kontaktirati:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center">
                <Mail className="w-5 h-5 text-orange-500 mr-3" />
                <span className="text-white font-medium">contact@tehnotrade.rs</span>
              </div>
              <div className="flex items-center">
                <Phone className="w-5 h-5 text-orange-500 mr-3" />
                <span className="text-white font-medium">+381 64 039 0223</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ZastitaPrivatnosti;