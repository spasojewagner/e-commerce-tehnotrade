import React, { useState } from 'react';
import { FileText, Shield, Clock, AlertTriangle, Phone, Mail, CheckCircle, Info, Calendar, Scale, MessageSquare } from 'lucide-react';

const Reklamacije = () => {
  const [activeTab, setActiveTab] = useState('osnovne-info');

  return (
    <div className="min-h-screen bg-slate-900 text-white">
  

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Title Section */}
        <div className="text-center mb-12">
          <FileText className="w-16 h-16 text-orange-500 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4">Reklamacije</h1>
          <p className="text-slate-400 text-lg">Saobraznost, garancija i vaša prava kao potrošač</p>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 bg-slate-800 p-2 rounded-xl">
            {[
              { id: 'osnovne-info', label: 'Osnovne informacije', icon: Info },
              { id: 'prava-potrosaca', label: 'Prava potrošača', icon: Scale },
              { id: 'postupak', label: 'Postupak reklamacije', icon: MessageSquare },
              { id: 'odustanak', label: 'Odustanak od ugovora', icon: Calendar },
              { id: 'kontakt', label: 'Kontakt', icon: Phone }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  activeTab === tab.id 
                    ? 'bg-orange-500 text-white' 
                    : 'text-slate-300 hover:text-white hover:bg-slate-700'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="min-h-[500px]">
          {/* Osnovne informacije */}
          {activeTab === 'osnovne-info' && (
            <div className="space-y-8">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                  <FileText className="w-8 h-8 text-orange-500 mb-4" />
                  <h3 className="text-xl font-semibold mb-3">Reklamacija</h3>
                  <p className="text-slate-300">
                    Zahtev kupca radi ostvarivanja njegovih prava u slučaju nesaobraznosti proizvoda.
                  </p>
                </div>

                <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                  <Shield className="w-8 h-8 text-blue-400 mb-4" />
                  <h3 className="text-xl font-semibold mb-3">Saobraznost</h3>
                  <p className="text-slate-300">
                    Zakonska kategorija, traje <strong className="text-orange-500">2 godine</strong>. 
                    Odgovornost da roba bude u skladu sa uobičajenim radom.
                  </p>
                </div>

                <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                  <CheckCircle className="w-8 h-8 text-green-400 mb-4" />
                  <h3 className="text-xl font-semibold mb-3">Garancija</h3>
                  <p className="text-slate-300">
                    Voljni korak trgovca koji nudi posebne pogodnosti veće od zakonski predviđenih.
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-orange-900/20 to-orange-800/20 rounded-xl p-8 border border-orange-500/30">
                <h3 className="text-2xl font-semibold mb-4 text-orange-400">Važno</h3>
                <p className="text-slate-300 text-lg leading-relaxed">
                  Sve informacije su u skladu sa <strong>Zakonom o zaštiti potrošača</strong> 
                  („Službeni glasnik RS", br. 88/2021). Vaša prava su zakonom zaštićena i mi ih u potpunosti poštujemo.
                </p>
              </div>
            </div>
          )}

          {/* Prava potrošača */}
          {activeTab === 'prava-potrosaca' && (
            <div className="space-y-8">
              <div className="bg-slate-800 rounded-xl p-8 border border-slate-700">
                <h3 className="text-2xl font-semibold mb-6 text-orange-500">Zahtev za otklanjanje nesaobraznosti (Član 51.)</h3>
                
                <div className="space-y-6">
                  <div className="bg-slate-700 rounded-lg p-6">
                    <h4 className="text-lg font-semibold mb-3 text-green-400">Vaša osnovna prava:</h4>
                    <ul className="space-y-2 text-slate-300">
                      <li className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                        <span>Zahtevanje otklanjanja nesaobraznosti bez naknade</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                        <span>Opravka ili zamena robe</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                        <span>Odgovarajuće umanjenje cene</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                        <span>Raskid ugovora</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-blue-900/20 rounded-lg p-6 border border-blue-500/30">
                    <h4 className="text-lg font-semibold mb-3 text-blue-400">Posebna prava u roku od 6 meseci:</h4>
                    <p className="text-slate-300 mb-3">
                      Ako se nesaobraznost pojavi u roku od <strong>6 meseci</strong> od kupovine:
                    </p>
                    <ul className="space-y-2 text-slate-300">
                      <li>• Možete birati između zamene, umanjenja cene ili raskida ugovora</li>
                      <li>• Opravka je moguća samo uz vašu izričitu saglasnost</li>
                      <li>• Pretpostavlja se da je nesaobraznost postojala od početka</li>
                    </ul>
                  </div>

                  <div className="bg-slate-700 rounded-lg p-6">
                    <h4 className="text-lg font-semibold mb-3 text-orange-400">Troškovi:</h4>
                    <p className="text-slate-300">
                      <strong>Sve troškove</strong> (rad, materijal, preuzimanje, isporuka) 
                      potrebne da roba postane saobrazna <strong className="text-green-400">snosi prodavac</strong>.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800 rounded-xl p-8 border border-slate-700">
                <h3 className="text-2xl font-semibold mb-6 text-orange-500">Rokovi i teret dokazivanja (Član 52.)</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-orange-900/20 rounded-lg p-6 border border-orange-500/30">
                    <Clock className="w-8 h-8 text-orange-400 mb-3" />
                    <h4 className="text-lg font-semibold mb-3 text-orange-400">Osnovni rok</h4>
                    <p className="text-slate-300">
                      Prodavac je odgovoran za nesaobraznost u roku od <strong>2 godine</strong> od kupovine.
                    </p>
                  </div>

                  <div className="bg-green-900/20 rounded-lg p-6 border border-green-500/30">
                    <Scale className="w-8 h-8 text-green-400 mb-3" />
                    <h4 className="text-lg font-semibold mb-3 text-green-400">Teret dokazivanja</h4>
                    <p className="text-slate-300">
                      U prva <strong>6 meseci</strong> prodavac mora da dokaže da nesaobraznost nije postojala.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800 rounded-xl p-8 border border-slate-700">
                <h3 className="text-2xl font-semibold mb-6 text-orange-500">Garancija (Član 53.)</h3>
                
                <div className="space-y-4 text-slate-300">
                  <p>
                    Garancija je <strong>pravno obavezujuća izjava</strong> davaoca garancije u vezi sa robom.
                  </p>
                  
                  <div className="bg-slate-700 rounded-lg p-6">
                    <h4 className="text-lg font-semibold mb-3 text-blue-400">Garantni list mora sadržavati:</h4>
                    <ul className="space-y-1">
                      <li>• Vaša prava prema zakonu</li>
                      <li>• Podatke o davaocu garancije</li>
                      <li>• Datum predaje robe</li>
                      <li>• Identifikaciju robe (model, tip, serijski broj)</li>
                      <li>• Sadržinu garancije i uslove</li>
                      <li>• Trajanje garantnog roka</li>
                    </ul>
                  </div>

                  <div className="bg-green-900/20 rounded-lg p-4 border border-green-500/30">
                    <p className="text-green-400 font-semibold">
                      Važno: Garancija ne isključuje i ne utiče na vaša zakonska prava!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Postupak reklamacije */}
          {activeTab === 'postupak' && (
            <div className="space-y-8">
              <div className="bg-slate-800 rounded-xl p-8 border border-slate-700">
                <h3 className="text-2xl font-semibold mb-6 text-orange-500">Kako podneti reklamaciju (Član 55.)</h3>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-lg font-semibold mb-4 text-blue-400">Načini podnošenja:</h4>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3 p-3 bg-slate-700 rounded-lg">
                        <MessageSquare className="w-5 h-5 text-green-400" />
                        <span className="text-slate-300">Usmeno na prodajnom mestu</span>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-slate-700 rounded-lg">
                        <Phone className="w-5 h-5 text-green-400" />
                        <span className="text-slate-300">Telefonom</span>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-slate-700 rounded-lg">
                        <Mail className="w-5 h-5 text-green-400" />
                        <span className="text-slate-300">Pisanim putem</span>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-slate-700 rounded-lg">
                        <FileText className="w-5 h-5 text-green-400" />
                        <span className="text-slate-300">Elektronskim putem</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold mb-4 text-blue-400">Potrebni dokumenti:</h4>
                    <div className="bg-slate-700 rounded-lg p-4">
                      <ul className="space-y-2 text-slate-300">
                        <li>• Račun ili dokaz o kupovini</li>
                        <li>• Kopija računa ili slip</li>
                        <li>• Opis problema/nesaobraznosti</li>
                        <li>• Garantni list (ako postoji)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800 rounded-xl p-8 border border-slate-700">
                <h3 className="text-2xl font-semibold mb-6 text-orange-500">Proces rešavanja reklamacije</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">1</div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-green-400 mb-2">Prijem reklamacije</h4>
                      <p className="text-slate-300">
                        Dobijate <strong>potvrdu o prijemu</strong> sa brojem reklamacije odmah.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">2</div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-blue-400 mb-2">Odgovor prodavca</h4>
                      <p className="text-slate-300">
                        Odgovaramo u roku od <strong>8 dana</strong> sa odlukom o prihvatanju reklamacije.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">3</div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-purple-400 mb-2">Vaše izjašnjenje</h4>
                      <p className="text-slate-300">
                        Imate <strong>3 dana</strong> da se izjasnite o našem predlogu rešavanja.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">4</div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-green-400 mb-2">Rešavanje</h4>
                      <p className="text-slate-300">
                        Reklamacija se rešava u roku od <strong>15 dana</strong> (30 dana za tehničku robu).
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-green-900/20 rounded-xl p-6 border border-green-500/30">
                <AlertTriangle className="w-8 h-8 text-green-400 mb-4" />
                <h4 className="text-lg font-semibold mb-3 text-green-400">Važna napomena</h4>
                <p className="text-slate-300">
                  <strong>Nemogućnost dostave ambalaže</strong> ne može biti razlog za odbijanje reklamacije 
                  ili otklanjanja nesaobraznosti.
                </p>
              </div>

              <div className="bg-slate-800 rounded-xl p-8 border border-slate-700">
                <h3 className="text-2xl font-semibold mb-6 text-orange-500">Nakon isteka zakonskog roka</h3>
                <div className="space-y-4 text-slate-300">
                  <p>
                    Nakon 2 godine, kupac je <strong>sam odgovoran</strong> za slanje robe na servis 
                    i snosi sve troškove.
                  </p>
                  <p>
                    Uvoznici i proizvođači imaju obavezu da obezbede rezervne delove i servis 
                    <strong className="text-orange-400"> 7-10 godina</strong> nakon prestanka proizvodnje.
                  </p>
                  <div className="bg-blue-900/20 rounded-lg p-4 border border-blue-500/30">
                    <p className="text-blue-400">
                      <strong>Tehnotrade</strong> će vam pomoći oko informacija o servisima 
                      i nakon isteka zakonskog perioda!
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800 rounded-xl p-8 border border-slate-700">
                <h3 className="text-2xl font-semibold mb-6 text-orange-500">Ostali razlozi reklamacija</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-blue-400">Možete se žaliti na:</h4>
                    <ul className="space-y-2 text-slate-300">
                      <li>• Probleme sa isporukom</li>
                      <li>• Neprofesionalan odnos zaposlenih</li>
                      <li>• Pogrešno obračunatu cenu</li>
                      <li>• Robu bez uputstva</li>
                    </ul>
                  </div>
                  <div className="bg-orange-900/20 rounded-lg p-4 border border-orange-500/30">
                    <p className="text-orange-400 text-sm">
                      <strong>Napomena:</strong> Za probleme sa kurirskim servisom ne možemo 
                      snositi odgovornost ukoliko nisu izazvani našim direktnim angažovanjem.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Odustanak od ugovora */}
          {activeTab === 'odustanak' && (
            <div className="space-y-8">
              <div className="bg-slate-800 rounded-xl p-8 border border-slate-700">
                <h3 className="text-2xl font-semibold mb-6 text-orange-500">Pravo na odustanak (Član 27.)</h3>
                
                <div className="bg-gradient-to-r from-green-900/20 to-blue-900/20 rounded-lg p-8 border border-green-500/20 mb-8">
                  <div className="flex items-start space-x-4">
                    <Calendar className="w-12 h-12 text-green-400 flex-shrink-0" />
                    <div>
                      <h4 className="text-2xl font-bold text-green-400 mb-3">14 dana</h4>
                      <p className="text-slate-300 text-lg">
                        Imate pravo da odustanete od ugovora zaključenog na daljinu 
                        <strong className="text-orange-400"> bez navođenja razloga</strong>!
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-lg font-semibold mb-4 text-blue-400">Kako odustati:</h4>
                    <div className="space-y-3">
                      <div className="bg-slate-700 rounded-lg p-4">
                        <p className="text-slate-300">
                          Možete koristiti <strong>propisani obrazac</strong> ili dati izjavu 
                          na bilo koji nedvosmislen način.
                        </p>
                      </div>
                      <div className="bg-slate-700 rounded-lg p-4">
                        <p className="text-slate-300">
                          Izjava je <strong>blagovremena</strong> ako je poslata u roku od 14 dana.
                        </p>
                      </div>
                      <div className="bg-slate-700 rounded-lg p-4">
                        <p className="text-slate-300">
                          <strong>Pravno dejstvo</strong> nastupa od dana slanja trgovcu.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold mb-4 text-blue-400">Vaši troškovi:</h4>
                    <div className="space-y-3">
                      <div className="bg-green-900/20 rounded-lg p-4 border border-green-500/30">
                        <CheckCircle className="w-6 h-6 text-green-400 mb-2" />
                        <p className="text-slate-300">
                          <strong className="text-green-400">Bez dodatnih troškova</strong> 
                          - osim troškova vraćanja robe
                        </p>
                      </div>
                      <div className="bg-orange-900/20 rounded-lg p-4 border border-orange-500/30">
                        <AlertTriangle className="w-6 h-6 text-orange-400 mb-2" />
                        <p className="text-slate-300">
                          Vi snosite samo <strong className="text-orange-400">troškove vraćanja</strong> proizvoda
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800 rounded-xl p-8 border border-slate-700">
                <h3 className="text-2xl font-semibold mb-6 text-orange-500">Elektronski obrazac</h3>
                <div className="bg-blue-900/20 rounded-lg p-6 border border-blue-500/30">
                  <p className="text-slate-300 mb-4">
                    Ako vam omogućimo da elektronski popunite i pošaljete obrazac za odustanak, 
                    dužni smo da vas o prijemu obrasca <strong className="text-blue-400">bez odlaganja obavestimo</strong>.
                  </p>
                  <div className="bg-slate-700 rounded-lg p-4">
                    <p className="text-slate-300">
                      <strong>Teret dokazivanja</strong> da ste postupili u skladu sa propisima 
                      radi ostvarivanja prava na odustanak je <strong className="text-orange-400">na vama</strong>.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-orange-900/20 to-red-900/20 rounded-xl p-8 border border-orange-500/30">
                <h4 className="text-xl font-semibold mb-4 text-orange-400">Napomena</h4>
                <p className="text-slate-300 text-lg">
                  Protekom rokova iz člana 28. Zakona o zaštiti potrošača 
                  <strong className="text-red-400"> prestaje pravo</strong> na odustanak od ugovora.
                </p>
              </div>
            </div>
          )}

          {/* Kontakt */}
          {activeTab === 'kontakt' && (
            <div className="space-y-8">
              <div className="bg-gradient-to-r from-orange-600 to-orange-500 rounded-xl p-8 text-center">
                <h3 className="text-3xl font-bold mb-4">Kontaktirajte nas</h3>
                <p className="text-orange-100 text-lg">
                  U svakom trenutku možete porazgovarati sa našim operaterima i na najbezbolniji način rešiti nastali problem.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-slate-800 rounded-xl p-8 border border-slate-700">
                  <Phone className="w-12 h-12 text-green-400 mb-6" />
                  <h4 className="text-2xl font-semibold mb-4">Telefon</h4>
                  <div className="space-y-3">
                    <a 
                      href="tel:+381640390223" 
                      className="flex items-center space-x-3 p-4 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors"
                    >
                      <Phone className="w-6 h-6 text-green-400" />
                      <span className="text-xl font-mono">+381 64 0390 223</span>
                    </a>
                    <p className="text-slate-400 text-sm">
                      Pozovite nas radnim danima od 8:00 do 17:00
                    </p>
                  </div>
                </div>

                <div className="bg-slate-800 rounded-xl p-8 border border-slate-700">
                  <Mail className="w-12 h-12 text-blue-400 mb-6" />
                  <h4 className="text-2xl font-semibold mb-4">Email</h4>
                  <div className="space-y-3">
                    <a 
                      href="mailto:contact@tehnotrade.rs" 
                      className="flex items-center space-x-3 p-4 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors"
                    >
                      <Mail className="w-6 h-6 text-blue-400" />
                      <span className="text-xl">contact@tehnotrade.rs</span>
                    </a>
                    <p className="text-slate-400 text-sm">
                      Pošaljite nam detaljno pitanje i odgovorićemo u najkraćem roku
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800 rounded-xl p-8 border border-slate-700">
                <h4 className="text-2xl font-semibold mb-6 text-orange-500">Zašto kontaktirati Tehnotrade?</h4>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-6 h-6 text-green-400 mt-1 flex-shrink-0" />
                      <div>
                        <h5 className="font-semibold text-green-400">Brza rešenja</h5>
                        <p className="text-slate-300">Nastojimo da rešimo svaki problem na najbezbolniji način</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-6 h-6 text-green-400 mt-1 flex-shrink-0" />
                      <div>
                        <h5 className="font-semibold text-green-400">Stručno osoblje</h5>
                        <p className="text-slate-300">Naši operateri su posebno obučeni za rešavanje reklamacija</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-6 h-6 text-green-400 mt-1 flex-shrink-0" />
                      <div>
                        <h5 className="font-semibold text-green-400">Praćenje statusa</h5>
                        <p className="text-slate-300">Možete pratiti status svoje reklamacije u realnom vremenu</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-6 h-6 text-green-400 mt-1 flex-shrink-0" />
                      <div>
                        <h5 className="font-semibold text-green-400">Personalizovana pomoć</h5>
                        <p className="text-slate-300">Svakom kupcu pristupamo individualno</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-6 h-6 text-green-400 mt-1 flex-shrink-0" />
                      <div>
                        <h5 className="font-semibold text-green-400">Sve informacije na jednom mestu</h5>
                        <p className="text-slate-300">Pružamo sve potrebne podatke i instrukcije</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-6 h-6 text-green-400 mt-1 flex-shrink-0" />
                      <div>
                        <h5 className="font-semibold text-green-400">Besplatna podrška</h5>
                        <p className="text-slate-300">Sve usluge podrške su uključene u cenu proizvoda</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800 rounded-xl p-8 border border-slate-700">
                <h4 className="text-2xl font-semibold mb-6 text-orange-500">Radno vreme</h4>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-semibold text-blue-400 mb-3">Podrška za reklamacije:</h5>
                    <div className="bg-slate-700 rounded-lg p-4">
                      <ul className="space-y-2 text-slate-300">
                        <li>Ponedeljak - Petak: 8:00 - 17:00</li>
                        <li>Subota: 9:00 - 13:00</li>
                        <li>Nedelja: zatvoreno</li>
                      </ul>
                    </div>
                  </div>
                  <div>
                    <h5 className="font-semibold text-blue-400 mb-3">Hitni slučajevi:</h5>
                    <div className="bg-orange-900/20 rounded-lg p-4 border border-orange-500/30">
                      <p className="text-orange-400">
                        Za hitne slučajeve tokom vikenda kontaktirajte nas putem emaila. Odgovorićemo u roku od 24 časa.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-800 border-t border-slate-700 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-slate-400">
            © {new Date().getFullYear()} Tehnotrade. Sva prava zadržana.
          </p>
          <p className="text-slate-500 text-sm mt-2">
            Ova stranica je informativnog karaktera i ne zamenjuje pravno savetovanje.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Reklamacije;