import React from 'react';
import { Truck, Clock, MapPin, Phone, Mail, ArrowLeft, CheckCircle, AlertTriangle, CreditCard, Package, Shield, Calendar } from 'lucide-react';

const UsloviIsporuke = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
    

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Title Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-orange-500 rounded-full mb-6">
            <Truck size={40} className="text-white" />
          </div>
          <h1 className="text-4xl font-bold text-orange-500 mb-4">Uslovi isporuke</h1>
          <p className="text-slate-300 text-lg max-w-4xl mx-auto">
            Proizvodi kupljeni preko naše internet prodavnice <strong className="text-orange-400">tehnotrade.rs</strong> isporučuju se na teritoriji cele Republike Srbije, u svim mestima gde je moguća isporuka putem kurirskih službi.
          </p>
        </div>

        {/* Delivery Coverage */}
        <div className="bg-slate-800 rounded-lg p-6 mb-8 border border-slate-700">
          <h3 className="text-xl font-semibold text-orange-500 mb-4 flex items-center">
            <MapPin className="mr-2" size={20} />
            Pokrivenost isporuke
          </h3>
          <div className="space-y-4 text-slate-300">
            <p>
              Internet prodavnica <strong className="text-orange-400">tehnotrade.rs</strong> zadržava pravo da zaključi ugovor sa različitim kurirskim službama uz uslov da kvalitet usluge isporuke ostane zadovoljavajući i ispuni sve uobičajene standarde.
            </p>
            <div className="bg-orange-500/20 border border-orange-500/30 rounded-lg p-4">
              <div className="flex items-start">
                <MapPin className="text-orange-500 mr-3 mt-1 flex-shrink-0" size={18} />
                <p className="text-orange-200">
                  <strong>Beograd:</strong> Ukoliko ste iz Beograda, zavisno od Vaše lokacije, isporuku možete očekivati našim dostavnim vozilima već narednog dana zavisno od stanja lagera. U slučaju zauzetosti naših vozila, postoji mogućnost slanja pošiljki kurirskom službom i za grad Beograd.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Delivery Time */}
        <div className="bg-slate-800 rounded-lg p-6 mb-8 border border-slate-700">
          <h3 className="text-xl font-semibold text-orange-500 mb-4 flex items-center">
            <Clock className="mr-2" size={20} />
            Rok isporuke
          </h3>
          <div className="space-y-4 text-slate-300">
            <p>
              Od trenutka kada na svoju email adresu dobijete potvrdu porudžbine, isporuka Vaše robe će biti izvršena najkasnije u roku od <strong className="text-orange-400">tri dana</strong>.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-slate-700/50 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <CheckCircle className="text-green-500 mr-2" size={18} />
                  <span className="font-semibold text-orange-400">Beograd - Express</span>
                </div>
                <p className="text-sm">
                  Ukoliko robu koju ste poručili imamo na stanju, a vi ste iz Beograda, u najvećem broju slučajeva svoju pošiljku možete očekivati već <strong>sledećeg dana</strong>.
                </p>
              </div>
              <div className="bg-slate-700/50 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <Calendar className="text-orange-500 mr-2" size={18} />
                  <span className="font-semibold text-orange-400">Ostala mesta</span>
                </div>
                <p className="text-sm">
                  Isporuka se vrši u roku od <strong>maksimalno 3 dana</strong> od potvrde porudžbine putem kurirskih službi.
                </p>
              </div>
            </div>
            <div className="bg-orange-500/20 border border-orange-500/30 rounded-lg p-4">
              <div className="flex items-start">
                <AlertTriangle className="text-orange-500 mr-3 mt-1 flex-shrink-0" size={18} />
                <div>
                  <p className="text-orange-200 mb-2">
                    Internet prodavnica <strong>tehnotrade.rs</strong> zadržava pravo da promeni ugovoreni termin isporuke usled okolnosti koje su naknadno nastupile.
                  </p>
                  <p className="text-orange-200 text-sm">
                    Usluga isporuke se ne vrši nedeljom i praznicima, kao ni ostalim neradnim danima.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Delivery Process */}
        <div className="bg-slate-800 rounded-lg p-6 mb-8 border border-slate-700">
          <h3 className="text-xl font-semibold text-orange-500 mb-4 flex items-center">
            <Package className="mr-2" size={20} />
            Postupak isporuke
          </h3>
          <div className="space-y-4">
            <div className="bg-slate-700/30 rounded-lg p-4">
              <h4 className="font-semibold text-orange-400 mb-2 flex items-center">
                <Phone className="mr-2" size={16} />
                Potvrda termina
              </h4>
              <p className="text-slate-300 text-sm">
                Kako bi se potvrdio termin isporuke, naš vozač ili kurir će telefonski stupiti u kontakt sa kupcem najmanje <strong className="text-orange-400">pola sata pre planiranog termina isporuke</strong>.
              </p>
            </div>

            <div className="bg-slate-700/30 rounded-lg p-4">
              <h4 className="font-semibold text-orange-400 mb-2 flex items-center">
                <Shield className="mr-2" size={16} />
                Uslovi preuzimanja
              </h4>
              <ul className="text-slate-300 text-sm space-y-2">
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2 mt-1">•</span>
                  <span>Osoba koja prima pošiljku mora imati <strong className="text-orange-400">važeću ličnu kartu</strong></span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2 mt-1">•</span>
                  <span>Primalac mora biti <strong className="text-orange-400">stariji od 18 godina</strong></span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2 mt-1">•</span>
                  <span>Ukoliko uslovi nisu ispunjeni, pošiljka se vraća u prostorije firme <strong className="text-orange-400">Tehnotrade Solutions d.o.o.</strong></span>
                </li>
              </ul>
            </div>

            <div className="bg-slate-700/30 rounded-lg p-4">
              <h4 className="font-semibold text-orange-400 mb-2 flex items-center">
                <CheckCircle className="mr-2" size={16} />
                Preuzimanje pošiljke
              </h4>
              <div className="text-slate-300 text-sm space-y-2">
                <p>Prilikom isporuke kupac je u obavezi da:</p>
                <ul className="space-y-1 pl-4">
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-2 mt-1">•</span>
                    <span>Proveri ispravnost porudžbine</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-2 mt-1">•</span>
                    <span>Proveri da li se sve poručeno nalazi u paketu</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-2 mt-1">•</span>
                    <span>Potpiše potvrdu o preuzimanju robe (dostavnicu)</span>
                  </li>
                </ul>
                <p className="mt-2">
                  <strong className="text-orange-400">Napomena:</strong> Ako kupac odbije da potpiše potvrdu o preuzimanju, pošiljka će se smatrati odbijenom.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Damaged Package */}
        <div className="bg-red-900/30 border border-red-500/30 rounded-lg p-6 mb-8">
          <h3 className="text-xl font-semibold text-red-400 mb-4 flex items-center">
            <AlertTriangle className="mr-2" size={20} />
            Oštećena pošiljka
          </h3>
          <div className="text-red-200 space-y-3">
            <p>
              Pri prijemu pošiljke, molimo Vas da u prisustvu kurira ili našeg vozača proverite ispravnost paketa.
            </p>
            <p>
              Ukoliko na njemu ima vidljivih oštećenja ili lomova, <strong>ne biste trebali da preuzimate pošiljku</strong> i dobro bi bilo da nas odmah pozovete:
            </p>
            <div className="bg-red-500/20 rounded-lg p-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center">
                  <Phone className="mr-2 text-red-400" size={18} />
                  <a href="tel:+38164039022" className="text-red-300 hover:text-red-200 font-semibold">
                    064 0390 223
                  </a>
                </div>
                <div className="flex items-center">
                  <Mail className="mr-2 text-red-400" size={18} />
                  <a href="mailto:contact@tehnotrade.rs" className="text-red-300 hover:text-red-200 font-semibold">
                    contact@tehnotrade.rs
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Failed Delivery */}
        <div className="bg-slate-800 rounded-lg p-6 mb-8 border border-slate-700">
          <h3 className="text-xl font-semibold text-orange-500 mb-4 flex items-center">
            <AlertTriangle className="mr-2" size={20} />
            Neuspešna isporuka
          </h3>
          <div className="space-y-4 text-slate-300">
            <p>
              Ako iz bilo kog razloga kupac nije bio dostupan u ugovorenom terminu na adresi navedenoj u porudžbini ili na broju telefona koji je naveden, internet prodavnica <strong className="text-orange-400">tehnotrade.rs</strong> ne preuzima odgovornost za neispunjavanje ugovorenog termina isporuke.
            </p>
            <div className="bg-slate-700/50 rounded-lg p-4">
              <p className="text-sm">
                Ukoliko isporuka porudžbine ne uspe iz prvog pokušaja, kurirska služba ili naš vozač će pokušati da dogovore novi termin za isporuku koji će odgovarati obema stranama.
              </p>
            </div>
          </div>
        </div>

        {/* Delivery Costs */}
        <div className="bg-slate-800 rounded-lg p-6 mb-8 border border-slate-700">
          <h3 className="text-xl font-semibold text-orange-500 mb-4 flex items-center">
            <CreditCard className="mr-2" size={20} />
            Cena isporuke
          </h3>
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-orange-500/20 border border-orange-500/30 rounded-lg p-4">
                <h4 className="font-semibold text-orange-400 mb-2 flex items-center">
                  <MapPin className="mr-2" size={16} />
                  Beograd
                </h4>
                <p className="text-orange-200 text-sm">
                  Isporuku u većini slučajeva vrše naša vozila, po cenama istaknutim na sajtu.
                </p>
              </div>
              <div className="bg-slate-700/50 rounded-lg p-4">
                <h4 className="font-semibold text-slate-300 mb-2 flex items-center">
                  <Truck className="mr-2" size={16} />
                  Kurirska služba
                </h4>
                <p className="text-slate-300 text-sm">
                  Bilo da je Beograd ili ostatak Srbije u pitanju, isporuka se naplaćuje po zvaničnim cenama kurirske službe.
                </p>
              </div>
            </div>
            
            <div className="bg-slate-700/30 rounded-lg p-4">
              <p className="text-slate-300 mb-3">
                Sa našim ljubaznim osobljem možete stupiti u kontakt, kako biste tačno znali koliko će vaša isporuka koštati:
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center">
                  <Phone className="mr-2 text-orange-500" size={18} />
                  <a href="tel:+38164039022" className="text-orange-400 hover:text-orange-300 font-semibold">
                    +381 64 0390223
                  </a>
                </div>
                <div className="flex items-center">
                  <Mail className="mr-2 text-orange-500" size={18} />
                  <a href="mailto:contact@tehnotrade.rs" className="text-orange-400 hover:text-orange-300 font-semibold">
                    contact@tehnotrade.rs
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Agreement Notice */}
        <div className="bg-orange-500/20 border border-orange-500/30 rounded-lg p-6 mb-8">
          <div className="flex items-start">
            <CheckCircle className="text-orange-500 mr-3 mt-1 flex-shrink-0" size={20} />
            <div>
              <p className="text-orange-200 font-semibold mb-2">Saglasnost sa uslovima</p>
              <p className="text-orange-200 text-sm">
                <strong>Napomena:</strong> Potvrdom porudžbine, odnosno, klikom na dugme „Naručite", smatraće se da ste saglasni sa uslovima isporuke.
              </p>
            </div>
          </div>
        </div>

        {/* Signature */}
        <div className="text-center">
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

export default UsloviIsporuke;