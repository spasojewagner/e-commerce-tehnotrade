import React from 'react';
import { FileText, Phone, CreditCard, MapPin, Mail, ArrowLeft, CheckCircle, AlertCircle, ShoppingCart, RefreshCw } from 'lucide-react';

const UsloviKoriscenja = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
   

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Title Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-orange-500 rounded-full mb-6">
            <FileText size={40} className="text-white" />
          </div>
          <h1 className="text-4xl font-bold text-orange-500 mb-4">Uslovi korišćenja i prodaje</h1>
          <p className="text-slate-300 text-lg max-w-3xl mx-auto">
            Na osnovu odredbe čl.13. i čl.27. Zakona o zaštiti potrošača (Sl.glasnik RS 62/2014) 
            <strong className="text-orange-400"> Tehnotrade Solutions d.o.o.</strong> svoje cenjene potrošače 
            koji robu kupuju preko internet <strong className="text-orange-400">tehnotrade.rs</strong> obaveštava:
          </p>
        </div>

        {/* Company Info */}
        <div className="bg-slate-800 rounded-lg p-6 mb-12 border border-slate-700">
          <h2 className="text-xl font-semibold text-orange-500 mb-4 flex items-center">
            <MapPin className="mr-2" size={24} />
            Tehnotrade Solutions d.o.o.
          </h2>
          <div className="grid md:grid-cols-2 gap-4 text-slate-300">
            <div className="flex items-center">
              <MapPin className="mr-2 text-orange-500" size={18} />
              <span>Rajačka 9, Zvezdara, Beograd</span>
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
              <span className="mr-2 text-orange-500 font-semibold">Website:</span>
              <span className="text-orange-400">tehnotrade.rs</span>
            </div>
          </div>
        </div>

        {/* Terms and Conditions */}
        <div className="space-y-8">
          {/* Registration and Documentation */}
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <h3 className="text-xl font-semibold text-orange-500 mb-4 flex items-center">
              <CheckCircle className="mr-2" size={20} />
              Registracija i dokumentacija
            </h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <span className="text-orange-500 mr-3 mt-1">•</span>
                <p className="text-slate-300">
                  Prodaja robe putem internet sajta <strong className="text-orange-400">tehnotrade.rs</strong> obavlja se u okviru registrovane delatnosti privrednog društva <strong className="text-orange-400">Tehnotrade Solutions d.o.o. Rajačka 9, Zvezdara, Beograd, MB: 22073869, PIB: 114811600</strong>
                </p>
              </div>
              <div className="flex items-start">
                <span className="text-orange-500 mr-3 mt-1">•</span>
                <p className="text-slate-300">
                  Roba koja se prodaje putem internet sajta <strong className="text-orange-400">tehnotrade.rs</strong> poseduje potrebnu dokumentaciju za upotrebu te vrste robe u skladu sa njenom namenom.
                </p>
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <h3 className="text-xl font-semibold text-orange-500 mb-4 flex items-center">
              <CreditCard className="mr-2" size={20} />
              Cene i plaćanje
            </h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <span className="text-orange-500 mr-3 mt-1">•</span>
                <p className="text-slate-300">
                  Prodajna cena robe je naznačena uz svaki artikal. Cene na portalu izražene su u <strong className="text-orange-400">dinarima (RSD)</strong> sa uračunatim porezom na dodatu vrednost (PDV).
                </p>
              </div>
              <div className="flex items-start">
                <span className="text-orange-500 mr-3 mt-1">•</span>
                <p className="text-slate-300">
                  Potrošač robu koju kupuje putem internet sajta <strong className="text-orange-400">tehnotrade.rs</strong> može platiti <strong className="text-orange-400">pouzećem gotovinski</strong> u trenutku isporuke, kao i platnim karticama <strong className="text-orange-400">Visa, Mastercard i Dina</strong>.
                </p>
              </div>
            </div>
          </div>

          {/* Return Policy */}
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <h3 className="text-xl font-semibold text-orange-500 mb-4 flex items-center">
              <RefreshCw className="mr-2" size={20} />
              Povraćaj i reklamacije
            </h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <span className="text-orange-500 mr-3 mt-1">•</span>
                <p className="text-slate-300">
                  U slučaju prijema robe potrošač isti ne želi da zadrži, ima pravo na raskid ugovora i povraćaj sredstava u visini plaćene kupoprodajne cene za predmetnu robu, na način koji je definisan za robu kupljenu putem <strong className="text-orange-400">tehnotrade.rs</strong> online prodavnice.
                </p>
              </div>
              <div className="flex items-start">
                <span className="text-orange-500 mr-3 mt-1">•</span>
                <p className="text-slate-300">
                  Za robu koja je poručena putem <strong className="text-orange-400">tehnotrade.rs</strong> online prodavnice potrošač ima pravo da uz račun/otpremnicu priloži reklamaciju na već korišćen proizvod, na način koji je definisan za robu kupljenu putem naše online prodavnice.
                </p>
              </div>
            </div>
          </div>

          {/* Order Process */}
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <h3 className="text-xl font-semibold text-orange-500 mb-4 flex items-center">
              <ShoppingCart className="mr-2" size={20} />
              Postupak narudžbe
            </h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <span className="text-orange-500 mr-3 mt-1">•</span>
                <p className="text-slate-300">
                  Nakon prijema narudžbe putem sajta, prodavac je obavezan da izvrši <strong className="text-orange-400">telefonsku potvrdu</strong>.
                </p>
              </div>
              <div className="flex items-start">
                <span className="text-orange-500 mr-3 mt-1">•</span>
                <p className="text-slate-300">
                  Nakon potvrde narudžbe od strane kupca, <strong className="text-orange-400">narudžba je neopoziva</strong>.
                </p>
              </div>
              <div className="flex items-start">
                <span className="text-orange-500 mr-3 mt-1">•</span>
                <p className="text-slate-300">
                  Prodavac se obavezuje da naručene proizvode isporuči <strong className="text-orange-400">ispravne i u predviđenom roku</strong>.
                </p>
              </div>
            </div>
          </div>

          {/* Changes and Updates */}
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <h3 className="text-xl font-semibold text-orange-500 mb-4 flex items-center">
              <AlertCircle className="mr-2" size={20} />
              Promene i obaveštenja
            </h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <span className="text-orange-500 mr-3 mt-1">•</span>
                <p className="text-slate-300">
                  U slučaju bilo kakve promene, prodavac je dužan da obavesti kupca prilikom <strong className="text-orange-400">telefonske potvrde narudžbe</strong>.
                </p>
              </div>
              <div className="flex items-start">
                <span className="text-orange-500 mr-3 mt-1">•</span>
                <p className="text-slate-300">
                  Sve eventualne promene, sem promena vezanih za isporuku, <strong className="text-orange-400">se ne odnose na potvrđene narudžbe</strong>.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Legal Notice */}
        <div className="bg-orange-500/20 border border-orange-500/30 rounded-lg p-6 mt-12">
          <div className="flex items-start">
            <AlertCircle className="text-orange-500 mr-3 mt-1 flex-shrink-0" size={20} />
            <div>
              <p className="text-orange-200 font-semibold mb-2">Pravna osnova</p>
              <p className="text-orange-200 text-sm">
                Ovi uslovi korišćenja su definisani na osnovu odredbi čl.13. i čl.27. Zakona o zaštiti potrošača (Službeni glasnik RS 62/2014) i predstavljaju obavezujući dokument za sve transakcije obavljene putem sajta tehnotrade.rs.
              </p>
            </div>
          </div>
        </div>

        {/* Signature */}
        <div className="text-center mt-12">
          <div className="inline-block bg-slate-800 rounded-lg px-8 py-4 border border-slate-700">
            <p className="text-2xl font-bold text-orange-500 mb-2">Vaš Tehnotrade</p>
            <p className="text-slate-400 text-sm">
              Poslednja izmena: {new Date().toLocaleDateString('sr-Latn-RS')}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UsloviKoriscenja;