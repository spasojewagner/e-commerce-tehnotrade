import React from 'react';
import { CreditCard, Shield, Lock, CheckCircle, AlertCircle } from 'lucide-react';

const PlacanjePlatnimKarticama = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-white">


      {/* Main Content */}
      <main className="container px-4 py-12 mx-auto ">
        {/* Title Section */}
        <div className="text-center mb-12">
          <CreditCard className="w-16 h-16 text-orange-500 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4">Plaćanje platnim karticama</h1>
          <p className="text-slate-400 text-lg">Sigurno i pouzdano online plaćanje</p>
        </div>

        {/* Main Content Card */}
        <div className="bg-slate-800 rounded-xl p-8 mb-8 border border-slate-700">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Left Column */}
            <div>
              <h2 className="text-2xl font-semibold mb-6 text-orange-500">Podržane kartice</h2>
              <div className="flex space-x-4 mb-6">
                <div className="bg-slate-700 rounded-lg p-4 flex-1 text-center">
                  <div className="font-bold text-blue-400">VISA</div>
                </div>
                <div className="bg-slate-700 rounded-lg p-4 flex-1 text-center">
                  <div className="font-bold text-red-400">MasterCard</div>
                </div>
                <div className="bg-slate-700 rounded-lg p-4 flex-1 text-center">
                  <div className="font-bold text-green-400">DINA</div>
                </div>
              </div>
              
              <p className="text-slate-300 leading-relaxed">
                Svoju porudžbinu možete platiti koristeći Visa, MasterCard i Dina platnu karticu. 
                Kartica mora biti odobrena od strane banke izdavaoca za online (Internet) plaćanje.
              </p>
            </div>

            {/* Right Column */}
            <div>
              <h2 className="text-2xl font-semibold mb-6 text-orange-500">Kako funkcioniše</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-sm font-bold text-white">1</div>
                  <p className="text-slate-300">Odaberite plaćanje karticom tokom poručivanja</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-sm font-bold text-white">2</div>
                  <p className="text-slate-300">Bićete preusmereni na sigurnu WSPay stranicu</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-sm font-bold text-white">3</div>
                  <p className="text-slate-300">Unesite podatke kartice i završite plaćanje</p>
                </div>
              </div>
            </div>
          </div>

          {/* WSPay Section */}
          <div className="bg-slate-700 rounded-lg p-6 mb-8">
            <div className="flex items-center mb-4">
              <Shield className="w-6 h-6 text-green-400 mr-3" />
              <h3 className="text-xl font-semibold">WSPay - Sigurno plaćanje</h3>
            </div>
            <p className="text-slate-300 leading-relaxed">
              Prilikom online poručivanja, odabirom odgovarajućeg načina plaćanja bićete preusmereni 
              na stranicu platnog provajdera <strong className="text-orange-500">WSPay</strong>, koji ima zaštićen i 
              siguran sistem za ovakav način plaćanja. Na ovoj stranici je potrebno da unesete sledeće podatke: 
              Broj kartice, Datum isteka i CVC2/CVV2 kod, koje možete pročitati sa vaše kartice.
            </p>
          </div>

          {/* Security Section */}
          <div className="bg-gradient-to-r from-green-900/20 to-blue-900/20 rounded-lg p-6 mb-8 border border-green-500/20">
            <div className="flex items-center mb-4">
              <Lock className="w-6 h-6 text-green-400 mr-3" />
              <h3 className="text-xl font-semibold">Maksimalna sigurnost</h3>
            </div>
            <div className="space-y-4 text-slate-300">
              <p>
                Prilikom unošenja podataka o platnoj kartici, poverljive informacije se prenose putem 
                javne mreže u zaštićenoj (kriptovanoj) formi upotrebom <strong>SSL protokola</strong> i 
                <strong> PKI sistema</strong>, kao trenutno najsavremenije kriptografske tehnologije.
              </p>
              <p>
                Sigurnost podataka prilikom kupovine, garantuje procesor platnih kartica, 
                <strong className="text-orange-500"> AIK banka</strong>, pa se tako kompletni proces 
                naplate obavlja na stranicama banke.
              </p>
              <div className="bg-slate-800 rounded-lg p-4 border-l-4 border-green-500">
                <p className="font-semibold text-green-400">
                  Niti jednog trenutka podaci o platnoj kartici nisu dostupni našem sistemu.
                </p>
              </div>
            </div>
          </div>

          {/* Important Info */}
          <div className="bg-slate-700 rounded-lg p-6 mb-8">
            <div className="flex items-center mb-4">
              <AlertCircle className="w-6 h-6 text-orange-500 mr-3" />
              <h3 className="text-xl font-semibold">Važne informacije</h3>
            </div>
            <div className="space-y-3 text-slate-300">
              <p>
                Unos i provera podataka isključivo se obavljaju između korisnika kartice i banke, 
                a Internet trgovac nema uvid u podatke koji se razmenjuju.
              </p>
              <p>
                Plaćanje nije moguće u stranoj valuti, već isključivo u dinarima (RSD). 
                Plaćanje je moguće platnim karticama domaćih banaka: Visa, MasterCard i Dina.
              </p>
            </div>
          </div>

          {/* Conditions */}
          <div className="bg-orange-900/20 rounded-lg p-6 border border-orange-500/30">
            <h3 className="text-xl font-semibold mb-4 text-orange-400">Uslovi za online plaćanje</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <p className="text-slate-300">
                  Isporuka robe je moguća samo na teritoriji Republike Srbije, na adresi navedenoj u porudžbini.
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <p className="text-slate-300">
                  Samo vlasnik platne kartice može izvršiti plaćanje.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Message */}
        <div className="text-center bg-gradient-to-r from-orange-600 to-orange-500 rounded-xl p-8">
          <h3 className="text-2xl font-bold mb-2">Želimo vam uspešnu kupovinu</h3>
          <p className="text-orange-100 text-lg">
            <strong>Vaš Tehnotrade</strong>
          </p>
        </div>
      </main>

     
    </div>
  );
};

export default PlacanjePlatnimKarticama;