import image1 from "@/assets/1.png";
import image2 from "@/assets/2.png";
import image3 from "@/assets/3.png";
import image4 from "@/assets/4.png";
import image5 from "@/assets/5.png";

export interface OtherMuseum {
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
  image: string;
  socialMedia: {
    facebook: string;
    instagram: string;
    twitter: string;
  };
}

export const otherMuseums: OtherMuseum[] = [
  {
    id: "theodore-monod",
    name: {
      fr: "Musée Théodore Monod d'Art Africain",
      en: "Théodore Monod Museum of African Art",
      wo: "Musée Théodore Monod bu Art Africain"
    },
    description: {
      fr: "Situé au cœur de Dakar, le Musée Théodore Monod d'Art Africain (anciennement IFAN) abrite une collection de près de 10 000 pièces d'art provenant de plus de vingt pays africains. Les objets exposés couvrent une vaste période, incluant des pièces datant du XIXe siècle.",
      en: "Located in the heart of Dakar, the Théodore Monod Museum of African Art (formerly IFAN) houses a collection of nearly 10,000 art pieces from more than twenty African countries. The exhibited objects cover a vast period, including pieces dating from the 19th century.",
      wo: "Nekk ci xol bu Dakar, Musée Théodore Monod bu Art Africain (jëkk IFAN) dafa am collection bu 10 000 pièces bu art yu jóge ci plus de vingt pays africains. Objets yu wone dañu couvrir période bu rëy, ak pièces yu date ci 19e siècle."
    },
    address: {
      fr: "Place Soweto, Dakar, Sénégal",
      en: "Place Soweto, Dakar, Senegal",
      wo: "Place Soweto, Dakar, Senegaal"
    },
    contact: {
      phone: "+221 33 825 98 22",
      email: "info@ifan.sn",
      website: "www.ifan.sn"
    },
    hours: {
      fr: "Mardi - Dimanche: 9h00 - 17h00 (Fermé le lundi et jours fériés)",
      en: "Tuesday - Sunday: 9:00 AM - 5:00 PM (Closed Monday and holidays)",
      wo: "Talaata - Dimanche: 9h00 - 17h00 (Ubbu ci Alaltu ak jours fériés)"
    },
    admission: {
      fr: "Adultes non-résidents: 5000 FCFA | Adultes résidents: 2000 FCFA | Enfants: 1000 FCFA",
      en: "Non-resident adults: 5000 FCFA | Resident adults: 2000 FCFA | Children: 1000 FCFA",
      wo: "Mag yu gëstu: 5000 FCFA | Mag yu dëkk: 2000 FCFA | Xale yi: 1000 FCFA"
    },
    history: {
      fr: "Le musée est installé dans un bâtiment construit entre 1931 et 1932, initialement destiné à l'Administrateur de la Circonscription de Dakar, avant d'être affecté à l'Institut Fondamental d'Afrique Noire (IFAN) en 1966. Il a été renommé en l'honneur de Théodore Monod, naturaliste et explorateur français.",
      en: "The museum is housed in a building constructed between 1931 and 1932, initially intended for the Administrator of the Dakar District, before being assigned to the Institut Fondamental d'Afrique Noire (IFAN) in 1966. It was renamed in honor of Théodore Monod, French naturalist and explorer.",
      wo: "Musée bi dafa nekk ci bâtiment bu def ci 1931 ak 1932, jëkk ngir Administrateur bu Circonscription bu Dakar, te dafa affecté ci Institut Fondamental d'Afrique Noire (IFAN) ci 1966. Dañu ko renommer ci honor bu Théodore Monod, naturaliste ak explorateur français."
    },
    mission: {
      fr: "Préserver et valoriser le patrimoine artistique africain, promouvoir la recherche en sciences humaines et sociales, et contribuer à la diffusion de la culture africaine.",
      en: "Preserve and promote African artistic heritage, promote research in human and social sciences, and contribute to the dissemination of African culture.",
      wo: "Préservation ak valorisation bu patrimoine artistique africain, promotion recherche ci sciences humaines ak sociales, ak contribution ci diffusion bu culture africaine."
    },
    collections: {
      fr: "Collections d'art traditionnel africain, objets ethnographiques, masques, sculptures, textiles, instruments de musique, et artefacts archéologiques provenant de toute l'Afrique de l'Ouest.",
      en: "Collections of traditional African art, ethnographic objects, masks, sculptures, textiles, musical instruments, and archaeological artifacts from throughout West Africa.",
      wo: "Collections bu art tradisyonel africain, objets ethnographiques, masques, sculptures, textiles, instruments bu musique, ak artefacts archéologiques yu jóge ci Africa de l'Ouest bu leer."
    },
    facilities: [
      "Salles d'exposition permanentes",
      "Bibliothèque spécialisée",
      "Centre de recherche",
      "Auditorium",
      "Boutique de souvenirs",
      "Parking"
    ],
    image: image1,
    socialMedia: {
      facebook: "https://facebook.com/museetheodoremond",
      instagram: "https://instagram.com/ifan_dakar",
      twitter: "https://twitter.com/ifan_dakar"
    }
  },
  {
    id: "musee-femme",
    name: {
      fr: "Musée de la Femme Henriette-Bathily",
      en: "Henriette-Bathily Women's Museum",
      wo: "Musée bu Jigéen Henriette-Bathily"
    },
    description: {
      fr: "Fondé en 1994 par Annette Mbaye d'Erneville, le Musée de la Femme Henriette-Bathily est dédié aux femmes sénégalaises et à leur histoire. Initialement situé sur l'île de Gorée, il a été transféré en 2015 à Dakar, sur la corniche Ouest.",
      en: "Founded in 1994 by Annette Mbaye d'Erneville, the Henriette-Bathily Women's Museum is dedicated to Senegalese women and their history. Initially located on Gorée Island, it was transferred in 2015 to Dakar, on the West Corniche.",
      wo: "Def ci 1994 ci Annette Mbaye d'Erneville, Musée bu Jigéen Henriette-Bathily dafa jëkk ngir jigéen yu Senegaal ak seen histoire. Jëkk dafa nekk ci île de Gorée, dañu ko transféré ci 2015 ci Dakar, ci corniche Ouest."
    },
    address: {
      fr: "Place du Souvenir africain et de la Diaspora, Corniche Ouest, Dakar",
      en: "Place du Souvenir africain et de la Diaspora, West Corniche, Dakar",
      wo: "Place du Souvenir africain ak de la Diaspora, Corniche Ouest, Dakar"
    },
    contact: {
      phone: "+221 33 825 98 33",
      email: "info@museefemme.sn",
      website: "www.museefemme.sn"
    },
    hours: {
      fr: "Mardi - Samedi: 10h00 - 12h00 et 15h00 - 17h30",
      en: "Tuesday - Saturday: 10:00 AM - 12:00 PM and 3:00 PM - 5:30 PM",
      wo: "Talaata - Aseer: 10h00 - 12h00 ak 15h00 - 17h30"
    },
    admission: {
      fr: "Adultes: 2000 FCFA | Étudiants et forces de l'ordre: 1000 FCFA | Enfants -12 ans: 500 FCFA",
      en: "Adults: 2000 FCFA | Students and law enforcement: 1000 FCFA | Children under 12: 500 FCFA",
      wo: "Mag ñi: 2000 FCFA | Jàngalekat ak forces de l'ordre: 1000 FCFA | Xale -12 ans: 500 FCFA"
    },
    history: {
      fr: "Créé en 1994 sur l'île de Gorée et transféré à Dakar en 2015, le musée rend hommage à Henriette-Bathily, pionnière de l'émancipation féminine au Sénégal. Il est situé dans une des coupoles de la Place du Souvenir africain et de la Diaspora.",
      en: "Created in 1994 on Gorée Island and transferred to Dakar in 2015, the museum pays tribute to Henriette-Bathily, pioneer of women's emancipation in Senegal. It is located in one of the domes of the Place du Souvenir africain et de la Diaspora.",
      wo: "Def ci 1994 ci île de Gorée ak transféré ci Dakar ci 2015, musée bi dafa jëkk ci Henriette-Bathily, pionnière bu émancipation féminine ci Senegaal. Dafa nekk ci beneen ci coupoles yu Place du Souvenir africain ak de la Diaspora."
    },
    mission: {
      fr: "Promouvoir l'émancipation des femmes sénégalaises, préserver leur patrimoine culturel, et organiser des ateliers et formations pour l'autonomisation féminine.",
      en: "Promote the emancipation of Senegalese women, preserve their cultural heritage, and organize workshops and training for women's empowerment.",
      wo: "Promotion émancipation bu jigéen yu Senegaal, préservation seen patrimoine culturel, ak organisation ateliers ak formations ngir autonomisation féminine."
    },
    collections: {
      fr: "Objets traditionnels, œuvres d'art, artisanat, vêtements et bijoux témoignant de l'histoire et de la culture des femmes sénégalaises à travers les âges.",
      en: "Traditional objects, artworks, crafts, clothing and jewelry testifying to the history and culture of Senegalese women through the ages.",
      wo: "Objets tradisyonel, liggéey yu art, artisanat, vêtements ak bijoux yu wone histoire ak culture bu jigéen yu Senegaal ci âges yu wene."
    },
    facilities: [
      "Salles d'exposition",
      "Ateliers de formation",
      "Bibliothèque spécialisée",
      "Espace de conférences",
      "Boutique artisanale"
    ],
    image: image2,
    socialMedia: {
      facebook: "https://facebook.com/museefemmehenriettebathily",
      instagram: "https://instagram.com/museefemme_sn",
      twitter: "https://twitter.com/museefemme_sn"
    }
  },
  {
    id: "musee-senghor",
    name: {
      fr: "Musée Léopold Sédar Senghor",
      en: "Léopold Sédar Senghor Museum",
      wo: "Musée Léopold Sédar Senghor"
    },
    description: {
      fr: "Situé dans la maison de l'ancien président sénégalais Léopold Sédar Senghor, sur la corniche ouest de Dakar. Après son décès en 2001, la maison a été réhabilitée et aménagée en musée en son honneur, inauguré le 30 novembre 2014.",
      en: "Located in the house of former Senegalese president Léopold Sédar Senghor, on the west corniche of Dakar. After his death in 2001, the house was rehabilitated and converted into a museum in his honor, inaugurated on November 30, 2014.",
      wo: "Nekk ci kër bu boroom bu jëkk bu Senegaal Léopold Sédar Senghor, ci corniche ouest bu Dakar. Ci kanam sa deces ci 2001, kër bi dañu ko réhabilité ak aménagé ni musée ci honor bi, inauguré ci 30 novembre 2014."
    },
    address: {
      fr: "Fann Résidence, Corniche Ouest, Dakar",
      en: "Fann Residence, West Corniche, Dakar",
      wo: "Fann Résidence, Corniche Ouest, Dakar"
    },
    contact: {
      phone: "+221 33 825 98 44",
      email: "info@museesenghor.sn",
      website: "www.museesenghor.sn"
    },
    hours: {
      fr: "Mardi - Samedi: 10h00 - 12h00 et 15h00 - 17h30",
      en: "Tuesday - Saturday: 10:00 AM - 12:00 PM and 3:00 PM - 5:30 PM",
      wo: "Talaata - Aseer: 10h00 - 12h00 ak 15h00 - 17h30"
    },
    admission: {
      fr: "Adultes: 2000 FCFA | Étudiants et forces de l'ordre: 1000 FCFA | Enfants -12 ans: 500 FCFA",
      en: "Adults: 2000 FCFA | Students and law enforcement: 1000 FCFA | Children under 12: 500 FCFA",
      wo: "Mag ñi: 2000 FCFA | Jàngalekat ak forces de l'ordre: 1000 FCFA | Xale -12 ans: 500 FCFA"
    },
    history: {
      fr: "La maison a été construite en 1978 sur un terrain d'environ 8 000 m². Rachetée par l'État du Sénégal, elle a été réhabilitée et transformée en musée, inauguré le 30 novembre 2014 lors du XVe sommet de la Francophonie.",
      en: "The house was built in 1978 on a plot of approximately 8,000 m². Purchased by the State of Senegal, it was rehabilitated and transformed into a museum, inaugurated on November 30, 2014 during the XV Francophonie Summit.",
      wo: "Kër bi dañu ko def ci 1978 ci terrain bu 8 000 m². Rachetée ci État bu Senegaal, dañu ko réhabilité ak transformé ni musée, inauguré ci 30 novembre 2014 ci XVe sommet bu Francophonie."
    },
    mission: {
      fr: "Préserver la mémoire et l'héritage intellectuel de Léopold Sédar Senghor, poète, philosophe et homme d'État, et promouvoir la francophonie et la négritude.",
      en: "Preserve the memory and intellectual heritage of Léopold Sédar Senghor, poet, philosopher and statesman, and promote Francophonie and Negritude.",
      wo: "Préservation mémoire ak héritage intellectuel bu Léopold Sédar Senghor, poète, philosophe ak boroom réew, ak promotion francophonie ak négritude."
    },
    collections: {
      fr: "Objets personnels, manuscrits, correspondances, œuvres d'art, bibliothèque personnelle, et documents retraçant la vie et l'œuvre du premier président du Sénégal.",
      en: "Personal objects, manuscripts, correspondence, artworks, personal library, and documents tracing the life and work of Senegal's first president.",
      wo: "Objets personnels, manuscrits, correspondances, liggéey yu art, bibliothèque personnelle, ak documents yu wone dundu ak liggéey bu boroom bu jëkk bu Senegaal."
    },
    facilities: [
      "Salles d'exposition",
      "Bibliothèque personnelle",
      "Salle de conférences",
      "Jardin mémorial",
      "Boutique de souvenirs"
    ],
    image: image3,
    socialMedia: {
      facebook: "https://facebook.com/museesenghor",
      instagram: "https://instagram.com/museesenghor_sn",
      twitter: "https://twitter.com/museesenghor_sn"
    }
  },
  {
    id: "musee-boribana",
    name: {
      fr: "Musée Boribana",
      en: "Boribana Museum",
      wo: "Musée Boribana"
    },
    description: {
      fr: "Fondé en 1998 à Dakar, le Musée Boribana est consacré à l'art contemporain africain et sert également de résidence pour les artistes. Le bâtiment, en forme de piano à queue, a été acquis par l'État du Sénégal en 2014.",
      en: "Founded in 1998 in Dakar, the Boribana Museum is dedicated to contemporary African art and also serves as an artist residency. The building, shaped like a grand piano, was acquired by the State of Senegal in 2014.",
      wo: "Def ci 1998 ci Dakar, Musée Boribana dafa jëkk ngir art contemporain africain te dafa nekk ni résidence ngir artistes. Bâtiment bi, ci forme bu piano à queue, dañu ko acquis ci État bu Senegaal ci 2014."
    },
    address: {
      fr: "Rue de la République, Dakar, Sénégal",
      en: "Rue de la République, Dakar, Senegal",
      wo: "Rue de la République, Dakar, Senegaal"
    },
    contact: {
      phone: "+221 33 825 98 55",
      email: "info@museeboribana.sn",
      website: "www.museeboribana.sn"
    },
    hours: {
      fr: "Mardi - Dimanche: 10h00 - 18h00",
      en: "Tuesday - Sunday: 10:00 AM - 6:00 PM",
      wo: "Talaata - Dimanche: 10h00 - 18h00"
    },
    admission: {
      fr: "Adultes: 3000 FCFA | Étudiants: 1500 FCFA | Enfants: Gratuit",
      en: "Adults: 3000 FCFA | Students: 1500 FCFA | Children: Free",
      wo: "Mag ñi: 3000 FCFA | Jàngalekat yi: 1500 FCFA | Xale yi: Bàyyi"
    },
    history: {
      fr: "Créé par des collectionneurs privés en 1998, le musée a été acquis par l'État du Sénégal en 2014 dans le cadre de sa politique de développement culturel. Il comprend une grande salle d'exposition, une bibliothèque, des studios pour les artistes et un espace de projection de films.",
      en: "Created by private collectors in 1998, the museum was acquired by the State of Senegal in 2014 as part of its cultural development policy. It includes a large exhibition hall, a library, studios for artists and a film projection space.",
      wo: "Def ci collectionneurs privés ci 1998, musée bi dañu ko acquis ci État bu Senegaal ci 2014 ci cadre bu sa politique bu développement culturel. Dafa am grande salle d'exposition, bibliothèque, studios ngir artistes ak espace bu projection yu films."
    },
    mission: {
      fr: "Promouvoir l'art contemporain africain, soutenir les artistes émergents, et créer un espace de dialogue entre les cultures africaines et internationales.",
      en: "Promote contemporary African art, support emerging artists, and create a space for dialogue between African and international cultures.",
      wo: "Promotion art contemporain africain, soutien artistes émergents, ak création espace bu dialogue ci biir cultures africaines ak internationales."
    },
    collections: {
      fr: "Œuvres d'art contemporain d'artistes africains et internationaux, installations, peintures, sculptures, photographies et vidéos d'art.",
      en: "Contemporary artworks by African and international artists, installations, paintings, sculptures, photographs and video art.",
      wo: "Liggéey yu art contemporain ci artistes africains ak internationaux, installations, peintures, sculptures, photographies ak vidéos d'art."
    },
    facilities: [
      "Grande salle d'exposition",
      "Bibliothèque spécialisée",
      "Studios d'artistes",
      "Espace de projection",
      "Café culturel",
      "Boutique d'art"
    ],
    image: image4,
    socialMedia: {
      facebook: "https://facebook.com/museeboribana",
      instagram: "https://instagram.com/museeboribana_sn",
      twitter: "https://twitter.com/museeboribana_sn"
    }
  },
  {
    id: "musee-goree",
    name: {
      fr: "Musée historique du Sénégal à Gorée",
      en: "Historical Museum of Senegal in Gorée",
      wo: "Musée historique bu Senegaal ci Gorée"
    },
    description: {
      fr: "Situé sur l'île de Gorée, le Musée historique du Sénégal est aménagé dans le Fort d'Estrées, une citadelle construite entre 1852 et 1856. Le musée abrite plus de 500 objets, cartes et documents retraçant l'histoire du Sénégal.",
      en: "Located on Gorée Island, the Historical Museum of Senegal is housed in Fort d'Estrées, a citadel built between 1852 and 1856. The museum houses more than 500 objects, maps and documents tracing Senegal's history.",
      wo: "Nekk ci île de Gorée, Musée historique bu Senegaal dafa aménagé ci Fort d'Estrées, citadelle bu def ci 1852 ak 1856. Musée bi dafa am plus de 500 objets, cartes ak documents yu wone histoire bu Senegaal."
    },
    address: {
      fr: "Fort d'Estrées, Île de Gorée, Dakar",
      en: "Fort d'Estrées, Gorée Island, Dakar",
      wo: "Fort d'Estrées, Île de Gorée, Dakar"
    },
    contact: {
      phone: "+221 33 825 98 66",
      email: "info@museegoree.sn",
      website: "www.museegoree.sn"
    },
    hours: {
      fr: "Tous les jours: 9h00 - 18h00",
      en: "Every day: 9:00 AM - 6:00 PM",
      wo: "Benn benn fan: 9h00 - 18h00"
    },
    admission: {
      fr: "Adultes: 1000 FCFA | Enfants: 500 FCFA",
      en: "Adults: 1000 FCFA | Children: 500 FCFA",
      wo: "Mag ñi: 1000 FCFA | Xale yi: 500 FCFA"
    },
    history: {
      fr: "Le Fort d'Estrées a été construit par les Français entre 1852 et 1856 pour protéger l'île de Gorée. Transformé en musée, il présente l'histoire du Sénégal depuis la préhistoire jusqu'à l'époque contemporaine, avec des salles dédiées à la cartographie, au Paléolithique et au Néolithique.",
      en: "Fort d'Estrées was built by the French between 1852 and 1856 to protect Gorée Island. Transformed into a museum, it presents Senegal's history from prehistory to contemporary times, with rooms dedicated to cartography, Paleolithic and Neolithic periods.",
      wo: "Fort d'Estrées dañu ko def ci Français ci 1852 ak 1856 ngir protéger île de Gorée. Transformé ni musée, dafa wone histoire bu Senegaal ci préhistoire ba ci époque contemporaine, ak salles yu jëkk ci cartographie, Paléolithique ak Néolithique."
    },
    mission: {
      fr: "Préserver et transmettre l'histoire du Sénégal, éduquer les générations futures sur le patrimoine national, et commémorer les périodes importantes de l'histoire sénégalaise.",
      en: "Preserve and transmit Senegal's history, educate future generations about national heritage, and commemorate important periods in Senegalese history.",
      wo: "Préservation ak transmission histoire bu Senegaal, éducation générations futures ci patrimoine national, ak commémoration périodes importantes yu histoire sénégalaise."
    },
    collections: {
      fr: "Outils microlithiques du Tiemassassien, objets du Néolithique, artefacts liés à la traite négrière, cartes historiques, documents d'archives, et objets témoignant de l'histoire coloniale et post-coloniale.",
      en: "Microlithic tools from Tiemassassien, Neolithic objects, artifacts related to the slave trade, historical maps, archival documents, and objects testifying to colonial and post-colonial history.",
      wo: "Outils microlithiques yu Tiemassassien, objets yu Néolithique, artefacts yu am ci traite négrière, cartes historiques, documents d'archives, ak objets yu wone histoire coloniale ak post-coloniale."
    },
    facilities: [
      "13 salles thématiques",
      "Salle de cartographie",
      "Salle Paléolithique",
      "Salle Néolithique",
      "Salle de la traite négrière",
      "Salle coloniale",
      "Salle post-coloniale",
      "Bibliothèque historique"
    ],
    image: image5,
    socialMedia: {
      facebook: "https://facebook.com/museegoree",
      instagram: "https://instagram.com/museegoree_sn",
      twitter: "https://twitter.com/museegoree_sn"
    }
  }
];
