import heroMuseum from "@/assets/hero-museum.jpg";
import artworkMask from "@/assets/artwork-mask.jpg";
import artworkBronze from "@/assets/artwork-bronze.jpg";
import artworkTextile from "@/assets/artwork-textile.jpg";
import image1 from "@/assets/1.png";
import image2 from "@/assets/2.png";
import image3 from "@/assets/3.png";
import image4 from "@/assets/4.png";
import image5 from "@/assets/5.png";

export interface MuseumInfo {
  id: string;
  name: {
    fr: string;
    en: string;
    wo: string;
  };
  description: {
    fr: string;
    en: string;
    wo: string;
  };
  address: {
    fr: string;
    en: string;
    wo: string;
  };
  contact: {
    phone: string;
    email: string;
    website: string;
  };
  hours: {
    fr: string;
    en: string;
    wo: string;
  };
  admission: {
    fr: string;
    en: string;
    wo: string;
  };
  history: {
    fr: string;
    en: string;
    wo: string;
  };
  mission: {
    fr: string;
    en: string;
    wo: string;
  };
  collections: {
    fr: string;
    en: string;
    wo: string;
  };
  facilities: string[];
  images: {
    exterior: string;
    interior: string;
    gallery: string;
    auditorium: string;
  };
  socialMedia: {
    facebook: string;
    instagram: string;
    twitter: string;
  };
}

export const museumInfo: MuseumInfo = {
  id: "mcn-dakar",
  name: {
    fr: "Musée des Civilisations Noires",
    en: "Museum of Black Civilizations",
    wo: "Musée yu Noirs"
  },
  description: {
    fr: "Le Musée des Civilisations Noires est un espace culturel majeur dédié à la préservation, la valorisation et la célébration du patrimoine africain et des civilisations noires du monde entier. Inauguré en 2018, il constitue un symbole fort de la renaissance culturelle africaine.",
    en: "The Museum of Black Civilizations is a major cultural space dedicated to preserving, promoting and celebrating African heritage and black civilizations worldwide. Inaugurated in 2018, it represents a strong symbol of African cultural renaissance.",
    wo: "Musée yu Noirs dafa nekk espace culturel bu bari bu jëkk ci préservation, valorisation ak célébration bu patrimoine africain ak civilisations noires ci aduna bu leer. Inauguré ci 2018, dafa nekk symbole bu gërë bu renaissance culturelle africaine."
  },
  address: {
    fr: "Avenue Léopold Sédar Senghor, Dakar, Sénégal",
    en: "Avenue Léopold Sédar Senghor, Dakar, Senegal",
    wo: "Avenue Léopold Sédar Senghor, Dakar, Senegaal"
  },
  contact: {
    phone: "+221 33 825 98 00",
    email: "info@mcn.sn",
    website: "www.mcn.sn"
  },
  hours: {
    fr: "Mardi - Dimanche: 9h00 - 19h00 (Fermé le lundi)",
    en: "Tuesday - Sunday: 9:00 AM - 7:00 PM (Closed on Monday)",
    wo: "Talaata - Dimanche: 9h00 - 19h00 (Ubbu ci Alaltu)"
  },
  admission: {
    fr: "Adultes: 2000 FCFA | Étudiants: 1000 FCFA | Enfants: Gratuit",
    en: "Adults: 2000 FCFA | Students: 1000 FCFA | Children: Free",
    wo: "Mag ñi: 2000 FCFA | Jàngalekat yi: 1000 FCFA | Xale yi: Bàyyi"
  },
  history: {
    fr: "Le Musée des Civilisations Noires a été inauguré le 6 décembre 2018 par le Président Macky Sall. L'idée de ce musée a été initialement proposée par Léopold Sédar Senghor lors du premier Festival mondial des arts nègres en 1966. Sa construction, financée par la Chine à hauteur de 34 millions de dollars, s'étend sur 15 000 mètres carrés, dont 5 000 dédiés aux expositions. L'architecture s'inspire des cases à impluvium de Casamance et des ruines du Grand Zimbabwe. Le musée a été reconnu par le magazine Time comme l'un des 100 lieux phares à visiter dans le monde.",
    en: "The Museum of Black Civilizations was inaugurated on December 6, 2018 by President Macky Sall. The idea for this museum was initially proposed by Léopold Sédar Senghor during the first World Festival of Black Arts in 1966. Its construction, financed by China to the tune of 34 million dollars, extends over 15,000 square meters, with 5,000 dedicated to exhibitions. The architecture is inspired by Casamance impluvium houses and the ruins of Great Zimbabwe. The museum has been recognized by Time magazine as one of the 100 must-visit places in the world.",
    wo: "Musée yu Civilisations Noires dañu ko inauguré ci 6 décembre 2018 ci Boroom Réew Macky Sall. Xalaat bu bii musée dañu ko jëkk ci Léopold Sédar Senghor ci premier Festival mondial des arts nègres ci 1966. Construction bi, financée ci Chine ci 34 millions de dollars, dafa nekk ci 15 000 mètres carrés, ak 5 000 ngir expositions. Architecture bi dafa inspire ci cases à impluvium yu Casamance ak ruines yu Grand Zimbabwe. Musée bi dañu ko jëkk ci magazine Time ni beneen ci 100 bérab yu jëkk ngir seet ci aduna."
  },
  mission: {
    fr: "Notre mission est de préserver, valoriser et diffuser le patrimoine culturel africain et des civilisations noires. Nous nous engageons à promouvoir la diversité culturelle, l'éducation et la recherche, tout en favorisant le dialogue interculturel et la compréhension mutuelle.",
    en: "Our mission is to preserve, promote and disseminate African cultural heritage and black civilizations. We are committed to promoting cultural diversity, education and research, while fostering intercultural dialogue and mutual understanding.",
    wo: "Seen mission mooy préservation, valorisation ak diffusion bu patrimoine culturel africain ak civilisations noires. Dañu jëkk ci promotion diversité culturelle, éducation ak recherche, te dañu jëkk ci dialogue interculturel ak xam-xam bu wuute."
  },
  collections: {
    fr: "Le musée abrite des collections exceptionnelles comprenant des masques traditionnels, des sculptures en bronze, des textiles cérémoniels, des objets archéologiques, des œuvres d'art contemporain et des expositions temporaires sur les cultures africaines et diasporiques.",
    en: "The museum houses exceptional collections including traditional masks, bronze sculptures, ceremonial textiles, archaeological objects, contemporary artworks and temporary exhibitions on African and diasporic cultures.",
    wo: "Musée bi dafa am collections exceptionnelles yu am masques tradisyonel, sculptures yu bronze, textiles cérémoniels, objets archéologiques, liggéey yu art contemporain ak expositions temporaires ci cultures africaines ak diasporiques."
  },
  facilities: [
    "Salles d'exposition permanentes",
    "Salles d'exposition temporaires", 
    "Auditorium de 500 places",
    "Bibliothèque spécialisée",
    "Centre de recherche",
    "Boutique de souvenirs",
    "Restaurant",
    "Parking gratuit",
    "Accès handicapés",
    "WiFi gratuit"
  ],
  images: {
    exterior: heroMuseum,
    interior: image1, 
    gallery: image2,
    auditorium: image3
  },
  socialMedia: {
    facebook: "https://facebook.com/museedescivilisationsnoires",
    instagram: "https://instagram.com/mcn_dakar",
    twitter: "https://twitter.com/mcn_dakar"
  }
};
