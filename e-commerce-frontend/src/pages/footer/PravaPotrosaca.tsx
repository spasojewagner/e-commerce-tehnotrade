import React from 'react';
import { Shield, Phone, Mail, MapPin, FileText, Clock, RefreshCw, CreditCard, ArrowLeft } from 'lucide-react';

const PravaPotrosaca = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
    

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Title Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-orange-500 rounded-full mb-6">
            <Shield size={40} className="text-white" />
          </div>
          <h1 className="text-4xl font-bold text-orange-500 mb-4">Prava potrošača</h1>
          <p className="text-slate-300 text-lg max-w-3xl mx-auto">
            Tehnotrade Solutions d.o.o. poštuje prava potrošača u skladu sa Zakonom o zaštiti potrošača Republike Srbije. 
            Ovaj dokument ima za cilj da vas informiše o vašim pravima u vezi sa kupovinom proizvoda putem naše online prodavnice.
          </p>
        </div>

        {/* Company Info */}
        <div className="bg-slate-800 rounded-lg p-6 mb-12 border border-slate-700">
          <h2 className="text-xl font-semibold text-orange-500 mb-4 flex items-center">
            <FileText className="mr-2" size={24} />
            Tehnotrade Solutions d.o.o.
          </h2>
          <div className="grid md:grid-cols-2 gap-4 text-slate-300">
            <div className="flex items-center">
              <MapPin className="mr-2 text-orange-500" size={18} />
              <span>Vinogradski venac 36, Beograd</span>
            </div>
            <div className="flex items-center">
              <span className="mr-2 text-orange-500 font-semibold">PIB:</span>
              <span>114811600</span>
            </div>
            <div className="flex items-center">
              <span className="mr-2 text-orange-500 font-semibold">Matični broj:</span>
              <span>22073869</span>
            </div>
            <div className="flex items-center">
              <Mail className="mr-2 text-orange-500" size={18} />
              <span>contact@tehnotrade.rs</span>
            </div>
          </div>
        </div>

        {/* Rights Sections */}
        <div className="space-y-8">
          {/* Right 1 */}
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <h3 className="text-xl font-semibold text-orange-500 mb-4">1. Pravo na jasne i tačne informacije</h3>
            <p className="text-slate-300 mb-4">
              Kao potrošač imate pravo da dobijete jasne, tačne i potpune informacije o proizvodima koje nudimo, uključujući:
            </p>
            <ul className="text-slate-300 space-y-2 pl-6">
              <li className="flex items-start">
                <span className="text-orange-500 mr-2">•</span>
                <span>naziv, glavne karakteristike i namenu proizvoda</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-2">•</span>
                <span>ukupnu cenu, uključujući sve poreze i troškove dostave</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-2">•</span>
                <span>uslove plaćanja, isporuke i rokove isporuke</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-2">•</span>
                <span>kontakt podatke trgovca i reklamacioni postupak</span>
              </li>
            </ul>
          </div>

          {/* Right 2 */}
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <h3 className="text-xl font-semibold text-orange-500 mb-4 flex items-center">
              <RefreshCw className="mr-2" size={20} />
              2. Pravo na odustanak od ugovora
            </h3>
            <p className="text-slate-300 mb-4">
              U skladu sa Zakonom o zaštiti potrošača, imate pravo da odustanete od kupovine u roku od <strong className="text-orange-500">14 dana</strong> od dana kada vam je proizvod isporučen, bez navođenja razloga.
            </p>
            <p className="text-slate-300 mb-4">
              Da biste ostvarili ovo pravo, potrebno je da nas obavestite pisanim putem (emailom ili poštom), a zatim da u roku od 14 dana od dana slanja izjave o odustanku vratite proizvod u originalnom stanju, nekorišćen i u neoštećenoj ambalaži i uz priložen fiskalni račun.
            </p>
            <div className="bg-orange-500/20 border border-orange-500/30 rounded-lg p-4">
              <p className="text-orange-200 text-sm">
                <strong>Napomena:</strong> Troškove povraćaja robe snosi potrošač, osim u slučaju kada je isporučen pogrešan ili neispravan proizvod.
              </p>
            </div>
          </div>

          {/* Right 3 */}
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <h3 className="text-xl font-semibold text-orange-500 mb-4 flex items-center">
              <FileText className="mr-2" size={20} />
              3. Pravo na reklamaciju
            </h3>
            <p className="text-slate-300 mb-4">
              Ukoliko dobijete proizvod koji ima nedostatak, oštećenje ili nije u skladu sa opisom, imate pravo da podnesete reklamaciju u roku od <strong className="text-orange-500">2 godine</strong> od dana kupovine.
            </p>
            <p className="text-slate-300 mb-4">Možete zahtevati:</p>
            <ul className="text-slate-300 space-y-2 pl-6 mb-4">
              <li className="flex items-start">
                <span className="text-orange-500 mr-2">•</span>
                <span>Popravku ili zamenu proizvoda bez dodatnih troškova</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-2">•</span>
                <span>Umanjenje cene</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-2">•</span>
                <span>Raskid ugovora i povraćaj novca, ukoliko se problem ne može rešiti na drugi način</span>
              </li>
            </ul>
            <p className="text-slate-300">
              Reklamacije se mogu podneti putem emaila, telefona ili direktno u pisanoj formi. Na svaku reklamaciju odgovaramo najkasnije u roku od <strong className="text-orange-500">8 dana</strong> od prijema, a rešavamo je u zakonskom roku od <strong className="text-orange-500">15 dana</strong>.
            </p>
          </div>

          {/* Right 4 */}
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <h3 className="text-xl font-semibold text-orange-500 mb-4 flex items-center">
              <Shield className="mr-2" size={20} />
              4. Pravo na zaštitu podataka
            </h3>
            <p className="text-slate-300">
              Svi lični podaci koje dostavite prilikom kupovine biće obrađeni u skladu sa našim Pravilima privatnosti i važećim zakonima o zaštiti podataka.
            </p>
          </div>

          {/* Right 5 */}
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <h3 className="text-xl font-semibold text-orange-500 mb-4">5. Pravo na pravično poslovanje</h3>
            <p className="text-slate-300">
              Potrošačima je garantovano da će sve kupovine biti obavljene na transparentan i zakonit način, bez nepoštenih ugovornih odredbi ili skrivenih troškova.
            </p>
          </div>

          {/* Right 6 */}
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <h3 className="text-xl font-semibold text-orange-500 mb-4 flex items-center">
              <CreditCard className="mr-2" size={20} />
              6. Povraćaj sredstava
            </h3>
            <p className="text-slate-300 mb-4">
              Nakon uspešno obavljenog postupka vraćanja robe, kupac ima pravo na povraćaj uplaćenih sredstava pod sledećim uslovima:
            </p>
            <div className="space-y-4 text-slate-300">
              <p>
                Povraćaj sredstava vrši se isključivo nakon što proizvod bude vraćen, pregledan i utvrđeno je da ispunjava uslove za povraćaj (neoštećen, nekorišćen i u originalnoj ambalaži, osim u slučaju reklamacije zbog neispravnosti).
              </p>
              <div>
                <p className="mb-2">Povraćaj novca se vrši na isti način na koji je izvršeno plaćanje:</p>
                <ul className="space-y-2 pl-6">
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-2">•</span>
                    <span>Ako je plaćeno platnom karticom – sredstva se vraćaju na istu karticu</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-2">•</span>
                    <span>Ako je plaćeno uplatom na račun – novac se vraća na bankovni račun kupca</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-2">•</span>
                    <span>Ako je plaćeno pouzećem – kupac je dužan da dostavi broj tekućeg računa za povraćaj</span>
                  </li>
                </ul>
              </div>
              <p>
                Povraćaj se izvršava u roku od najkasnije <strong className="text-orange-500">14 dana</strong> od dana kada primimo vraćenu robu i utvrdimo ispunjenost uslova za povraćaj.
              </p>
              <p>
                U slučaju vraćanja proizvoda iz razloga koji nisu naša greška (npr. predomislili ste se), troškove povratne dostave snosi kupac.
              </p>
              <p>
                Potrošač je odgovoran za sve troškove koji nastanu prilikom vraćanja proizvoda.
              </p>
              <p>
                Trgovac nije odgovoran za eventualna oštećenja proizvoda koja nastanu usled nepravilnog pakovanja ili tokom transporta pri vraćanju robe.
              </p>
            </div>
          </div>

          {/* Contact */}
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <h3 className="text-xl font-semibold text-orange-500 mb-4 flex items-center">
              <Phone className="mr-2" size={20} />
              7. Kontakt
            </h3>
            <p className="text-slate-300 mb-4">
              Za sva pitanja, zahteve, reklamacije ili informacije u vezi sa pravima potrošača, možete nas kontaktirati:
            </p>
            <div className="space-y-3">
              <div className="flex items-center text-slate-300">
                <Mail className="mr-3 text-orange-500" size={18} />
                <span className="font-semibold mr-2">Email:</span>
                <a href="mailto:contact@tehnotrade.rs" className="text-orange-400 hover:text-orange-300">
                  contact@tehnotrade.rs
                </a>
              </div>
              <div className="flex items-center text-slate-300">
                <Phone className="mr-3 text-orange-500" size={18} />
                <span className="font-semibold mr-2">Telefon:</span>
                <a href="tel:+381640390223" className="text-orange-400 hover:text-orange-300">
                  +381 64 039 0223
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-12 text-slate-400 text-sm">
          <p>Ovaj dokument je poslednji put ažuriran: {new Date().toLocaleDateString('sr-Latn-RS')}</p>
        </div>
      </main>
    </div>
  );
};

export default PravaPotrosaca;