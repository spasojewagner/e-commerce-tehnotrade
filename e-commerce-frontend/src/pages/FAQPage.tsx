import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Phone, Mail, HelpCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

interface OpenItems {
  [key: number]: boolean;
}

const FAQPage: React.FC = () => {
  const [openItems, setOpenItems] = useState<OpenItems>({});

  const toggleItem = (index: number): void => {
    setOpenItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const faqData: FAQItem[] = [
    {
      question: "Kako da poručim proizvod online?",
      answer: "Kada pronađete željeni proizvod, kliknite na dugme Dodaj u korpu. Sa desne strane će se pojaviti vaš Cart sa opcijama Pregled korpe i Plaćanje. Uvek možete nastaviti sa kupovinom, ali ukoliko je privodite kraju, idite na stranicu Plaćanje i uz unos osnovnih podataka i izbor načina plaćanja vaša kupovina je pri kraju. Ostalo je samo da potvrdite na dugme Naručite.",
    },
    {
      question: "Kako mogu da se upoznam sa uslovima korišćenja sajta?",
      answer: "Sve stranice vezane za uslove korišćenja sajta možete pronaći pri dnu svake od stranica sajta."
    },
    {
      question: "Da li mogu da rezervišem uređaj pre kupovine?",
      answer: "Pre kupovine nije moguće izvršiti rezervaciju uređaja online, kao ni putem telefona."
    },
    {
      question: "Kako da pronađem proizvod koji mi je potreban?",
      answer: "Tehnotrade čini sve da svojim korisnicima olakša korišćenje naše online prodavnice. Imate kategorizaciju na više mesta na sajtu, filtere na nekim od kategorija, imate listu svih brendova ukoliko želite na taj način da dođete do željenog proizvoda. U svakom trenutku možete u polje za pretragu ukucati ključnu reč proizvoda koji tražite."
    },
    {
      question: "Šta je Moj nalog?",
      answer: "Registracijom kreirate svoj nalog za kupovinu u tehnotrade.rs online prodavnici. Registracija podrazumeva popunjavanje formulara sa osnovnim kontakt podacima koji služe za potvrdu i slanje porudžbine. Prilikom registracije, koja nije obavezna, birate i lozinku koju ćete koristiti za pristup svom nalogu. Privatnost podataka je zagarantovana. Savet: Registrovanje je korisno jer će vam omogućiti čuvanje podataka za naredne kupovine, dobijanje informacija o promocijama i vestima, kao i dodavanje vaših omiljenih proizvoda u listu želja."
    },
    {
      question: "Kako mogu da platim porudžbinu?",
      answer: "Svoju porudžbinu možete platiti kuriru ili našem vozaču u kešu prilikom preuzimanja pošiljke. Druga opcija je svojom platnom karticom: Dina, Visa ili Mastercard."
    },
    {
      question: "Da li je moguće platiti čekovima ukoliko proizvod poručim online?",
      answer: "Čekovi nisu opcija za kupovinu na tehnotrade.rs online prodavnici."
    },
    {
      question: "Greškom sam poručio proizvod. Da li mogu da otkažem porudžbinu?",
      answer: "Porudžbinu možete da otkažete. Najbolje bi bilo u što kraćem roku."
    },
    {
      question: "Šta je korpa?",
      answer: "Korpa je deo internet prodavnice koji vam omogućava da kupujete po istom principu kao što to činite u klasičnoj prodavnici. Korpa služi da izaberete proizvode koje želite da kupite. Ukoliko želite da kupite neki proizvod, klikom na dugme DODAJ U KORPU, proizvod će biti dodat u korpu, a vi možete neometano nastaviti da pretražujete, razgledate i dodajete ostale željene proizvode. Dodavanje proizvoda u korpu vas ne obavezuje da te proizvode i kupite. Klikom na simbol korpe za đubre možete jednostavno ukloniti proizvod iz korpe."
    },
    {
      question: "Kako da proverim da li mi je porudžbina poslata?",
      answer: "Po prijemu vaše porudžbine, bićete obavešteni emailom. O slanju porudžbine bićete obavešteni putem telefona. U svakom slučaju, sve informacije možete dobiti pozivom na telefon: +381 64 0390223 ili na email: contact@tehnotrade.rs"
    },
    {
      question: "Za koje vreme ću dobiti naručene proizvode?",
      answer: "Ukoliko ste iz Beograda, u najvećem broju slučajeva isporuka se vrši narednog radnog dana, zavisno od stanja lagera. Za ostatak Republike Srbije, rok za isporuku je 3-5 radnih dana."
    },
    {
      question: "Kako mogu da reklamiram proizvod?",
      answer: "Pogledajte našu stranicu o Reklamacijama."
    },
    {
      question: "Koji je broj telefona kontakt servisa?",
      answer: "Sve informacije možete dobiti pozivom broja +381640390223 u periodu 08h-14h ili na email: contact@tehnotrade.rs"
    },
    {
      question: "Da li je moguće definisati tačno vreme dostave?",
      answer: "Tačno vreme isporuke je teško definisati, naročito za centralne beogradske opštine. Bilo da se vrši isporuka našim vozilima ili kurirskim službama, vozač je u obavezi da vas pozove putem telefona i obavesti o svom dolasku."
    },
    {
      question: "Da li prilikom isporuke postoji mogućnost iznošenja starih aparata?",
      answer: "Ova mogućnost ne postoji. Bilo da se isporuka vrši našim vozilima ili kurirskom službom, vozač je u obavezi da vam paket isporuči na navedenu adresu. Unošenje paketa u kuće ili zgrade nije obaveza vozača."
    },
    {
      question: "Šta je Ugovor o prodaji na daljinu?",
      answer: "Ugovor o prodaji na daljinu je dokument koji potvrđuje prodaju putem interneta. Zaključuje se između kupca i prodavca i svaki kupac dobija ugovor na navedenu email adresu."
    }
  ];

  return (
    <main className="flex-1 bg-gray-900 text-white min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 bg-orange-500/20 rounded-full text-orange-400 text-sm font-medium mb-6">
            <HelpCircle className="w-4 h-4 mr-2" />
            BRZA POMOĆ I ODGOVORI
          </div>
          <h1 className="text-6xl lg:text-8xl font-black mb-6 bg-gradient-to-r from-white via-orange-200 to-orange-400 bg-clip-text text-transparent leading-tight">
            ČESTA<br />PITANJA
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Drago nam je da vam pomognemo kako biste svoju kupovinu obavili što efikasnije i sigurnije
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="space-y-4">
            {faqData.map((item, index) => (
              <div
                key={index}
                className="bg-gray-800/30 rounded-2xl border border-gray-700/50 hover:border-orange-500/50 transition-all duration-300 overflow-hidden"
              >
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-800/20 transition-colors"
                >
                  <h3 className="text-lg font-bold text-white pr-4">
                    {item.question}
                  </h3>
                  <div className="flex-shrink-0">
                    {openItems[index] ? (
                      <ChevronUp className="w-6 h-6 text-orange-400" />
                    ) : (
                      <ChevronDown className="w-6 h-6 text-orange-400" />
                    )}
                  </div>
                </button>
                
                {openItems[index] && (
                  <div className="px-6 pb-6">
                    <div className="h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent mb-4"></div>
                    <p className="text-gray-300 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-gray-900/50 to-black/50">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-black mb-8">
            POTREBNA VAM JE <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">DODATNA POMOĆ?</span>
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Naš tim je tu da vam pomogne! Kontaktirajte nas bilo kada.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <a 
              href="tel:+381640390223"
              className="group p-6 bg-gray-800/30 rounded-2xl border border-gray-700/50 hover:border-orange-500/50 transition-all duration-300 cursor-pointer hover:transform hover:scale-105"
            >
              <Phone className="w-8 h-8 mx-auto mb-4 text-orange-400 group-hover:scale-110 transition-transform" />
              <h3 className="font-bold text-lg mb-2 group-hover:text-orange-400 transition-colors">Pozovite nas</h3>
              <p className="text-orange-400 font-mono text-lg">+381 64 0390223</p>
              <p className="text-sm text-gray-400 mt-2">Radnim danima 08h-14h</p>
            </a>
            
            <a 
              href="mailto:contact@tehnotrade.rs"
              className="group p-6 bg-gray-800/30 rounded-2xl border border-gray-700/50 hover:border-orange-500/50 transition-all duration-300 cursor-pointer hover:transform hover:scale-105"
            >
              <Mail className="w-8 h-8 mx-auto mb-4 text-orange-400 group-hover:scale-110 transition-transform" />
              <h3 className="font-bold text-lg mb-2 group-hover:text-orange-400 transition-colors">Pošaljite email</h3>
              <p className="text-orange-400 font-mono">contact@tehnotrade.rs</p>
              <p className="text-sm text-gray-400 mt-2">Odgovaramo u roku od 24h</p>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default FAQPage;