import artworkMask from "@/assets/artwork-mask.jpg";
import artworkBronze from "@/assets/artwork-bronze.jpg";
import artworkTextile from "@/assets/artwork-textile.jpg";
import image1 from "@/assets/1.png";
import image2 from "@/assets/2.png";
import image3 from "@/assets/3.png";
import image4 from "@/assets/4.png";
import image5 from "@/assets/5.png";
import imageA from "@/assets/imageA.jpg";
import imageB from "@/assets/imageBwebp.webp";
import imageC from "@/assets/imageC.jpeg";
import imageD from "@/assets/imageD.jpeg";

export interface Collection {
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
  period: {
    fr: string;
    en: string;
    wo: string;
  };
  region: {
    fr: string;
    en: string;
    wo: string;
  };
  numberOfPieces: number;
  highlights: string[];
  image: string;
  gallery: string;
}

export const collections: Collection[] = [
  {
    id: "sculptures-traditionnelles",
    name: {
      fr: "Sculptures Traditionnelles Africaines",
      en: "Traditional African Sculptures",
      wo: "Sculptures Tradisyonel Africaines"
    },
    description: {
      fr: "Collection de sculptures en bois aux proportions élancées et stylisées, caractéristiques de l'esthétique africaine traditionnelle. Ces œuvres témoignent du savoir-faire ancestral des sculpteurs et de leur maîtrise des techniques de travail du bois.",
      en: "Collection of wooden sculptures with slender and stylized proportions, characteristic of traditional African aesthetics. These works testify to the ancestral know-how of sculptors and their mastery of woodworking techniques.",
      wo: "Collection bu sculptures yu bois bu am proportions yu ndaw ak stylisées, caractéristiques bu esthétique africaine tradisyonel. Liggéey yii dañu wone savoir-faire ancestral bu sculpteurs ak seen maîtrise bu techniques bu liggéey bu bois."
    },
    period: {
      fr: "XVIIIe - XXe siècle",
      en: "18th - 20th Century",
      wo: "18e - 20e siècle"
    },
    region: {
      fr: "Afrique de l'Ouest",
      en: "West Africa",
      wo: "Africa de l'Ouest"
    },
    numberOfPieces: 25,
    highlights: [
      "Sculpture traditionnelle aux proportions élancées",
      "Figure humaine stylisée",
      "Sculpture rituelle de fertilité",
      "Figure d'ancêtre",
      "Sculpture de divinité",
      "Statuette de protection",
      "Sculpture de danseur"
    ],
    image: imageA,
    gallery: "Salle des Traditions"
  },
  {
    id: "patrimoine-immatériel",
    name: {
      fr: "Patrimoine Immatériel Africain",
      en: "African Intangible Heritage",
      wo: "Patrimoine Immatériel Africain"
    },
    description: {
      fr: "Collection dédiée au patrimoine immatériel africain, incluant les cérémonies, rituels, chants, danses et traditions orales. Cette collection montre comment les objets matériels s'inscrivent dans un contexte culturel plus large et témoigne de l'importance des pratiques culturelles vivantes.",
      en: "Collection dedicated to African intangible heritage, including ceremonies, rituals, songs, dances and oral traditions. This collection shows how material objects fit into a broader cultural context and testifies to the importance of living cultural practices.",
      wo: "Collection bu jëkk ngir patrimoine immatériel africain, ak ceremonies, rituels, chants, danses ak traditions orales. Bii collection dafa wone ni objets matériels dañu nekk ci contexte culturel bu gën a rëy te dafa wone importance bu pratiques culturelles yu dëgg."
    },
    period: {
      fr: "Tradition vivante",
      en: "Living tradition",
      wo: "Tradition bu dëgg"
    },
    region: {
      fr: "Afrique",
      en: "Africa",
      wo: "Africa"
    },
    numberOfPieces: 45,
    highlights: [
      "Cérémonies d'initiation",
      "Rituels de fertilité",
      "Danses traditionnelles",
      "Chants ancestraux",
      "Cérémonies de mariage",
      "Rituels funéraires",
      "Traditions orales",
      "Pratiques spirituelles"
    ],
    image: imageC,
    gallery: "Salle du Patrimoine Immatériel"
  },
  {
    id: "art-monumental",
    name: {
      fr: "Art Monumental Contemporain",
      en: "Contemporary Monumental Art",
      wo: "Art Monumental Contemporain"
    },
    description: {
      fr: "Collection d'œuvres monumentales contemporaines qui illustrent l'évolution de l'art africain vers des formats plus grands et plus ambitieux. Ces sculptures témoignent de la capacité des artistes africains à créer des œuvres de grande envergure.",
      en: "Collection of contemporary monumental works that illustrate the evolution of African art towards larger and more ambitious formats. These sculptures testify to the ability of African artists to create large-scale works.",
      wo: "Collection bu liggéey monumentales contemporaines yu wone évolution bu art africain ci formats yu gën a rëy ak yu gën a ambitieux. Sculptures yii dañu wone capacité bu artistes africains ngir def liggéey yu gën a rëy."
    },
    period: {
      fr: "1990 - Aujourd'hui",
      en: "1990 - Today",
      wo: "1990 - Tey"
    },
    region: {
      fr: "Afrique de l'Ouest",
      en: "West Africa",
      wo: "Africa de l'Ouest"
    },
    numberOfPieces: 12,
    highlights: [
      "Sculptures monumentales verticales",
      "Installations contemporaines",
      "Œuvres d'art public",
      "Sculptures abstraites",
      "Monuments commémoratifs",
      "Installations immersives",
      "Art environnemental"
    ],
    image: imageD,
    gallery: "Hall principal"
  },
  {
    id: "galerie-muséale",
    name: {
      fr: "Galerie Muséale Professionnelle",
      en: "Professional Museum Gallery",
      wo: "Galerie Muséale Professionnelle"
    },
    description: {
      fr: "Collection présentant l'évolution de la muséographie africaine avec des techniques d'éclairage professionnel et de mise en scène. Cette collection témoigne de la reconnaissance internationale de l'art africain et de son importance dans les institutions culturelles modernes.",
      en: "Collection presenting the evolution of African museography with professional lighting and staging techniques. This collection testifies to the international recognition of African art and its importance in modern cultural institutions.",
      wo: "Collection bu wone évolution bu muséographie africaine ak techniques bu éclairage professionnel ak mise en scène. Bii collection dafa wone reconnaissance internationale bu art africain ak sa importance ci institutions culturelles modernes."
    },
    period: {
      fr: "Exposition permanente",
      en: "Permanent exhibition",
      wo: "Exposition permanente"
    },
    region: {
      fr: "Musée des Civilisations Noires",
      en: "Museum of Black Civilizations",
      wo: "Musée yu Civilisations Noires"
    },
    numberOfPieces: 8,
    highlights: [
      "Éclairage muséal professionnel",
      "Vitrines d'exposition",
      "Socles et supports",
      "Panneaux informatifs",
      "Techniques de conservation",
      "Mise en scène artistique",
      "Présentation interactive"
    ],
    image: imageB,
    gallery: "Galerie principale"
  },
  {
    id: "masques-traditionnels",
    name: {
      fr: "Masques Traditionnels",
      en: "Traditional Masks",
      wo: "Masque yu Tradisyonel"
    },
    description: {
      fr: "Une collection exceptionnelle de masques cérémoniels provenant de différentes ethnies du Sénégal et d'Afrique de l'Ouest. Ces masques témoignent de la richesse spirituelle et artistique des traditions africaines.",
      en: "An exceptional collection of ceremonial masks from different ethnic groups in Senegal and West Africa. These masks testify to the spiritual and artistic richness of African traditions.",
      wo: "Collection exceptionnelle bu masque cérémoniels yu jóge ci ethnies yu wuute yu Senegaal ak Africa de l'Ouest. Masque yii dañu wone richesse spirituelle ak artistique bu traditions africaines."
    },
    period: {
      fr: "XVIIe - XXe siècle",
      en: "17th - 20th Century",
      wo: "17e - 20e siècle"
    },
    region: {
      fr: "Sénégal, Mali, Guinée",
      en: "Senegal, Mali, Guinea",
      wo: "Senegaal, Mali, Guinée"
    },
    numberOfPieces: 45,
    highlights: [
      "Masque cérémoniel Wolof du Royaume du Cayor",
      "Masque de danse Mandingue du Mali",
      "Masque d'initiation Peul du Fouta-Toro",
      "Masque de fertilité Sérère du Sine-Saloum",
      "Masque Kanaga Dogon du Mali",
      "Masque de divination Bambara",
      "Masque de guerre Mossi du Burkina Faso"
    ],
    image: artworkMask,
    gallery: "Salle des Traditions"
  },
  {
    id: "sculptures-bronze",
    name: {
      fr: "Sculptures en Bronze",
      en: "Bronze Sculptures",
      wo: "Sculptures yu Bronze"
    },
    description: {
      fr: "Collection de sculptures en bronze témoignant de la maîtrise technique des artisans africains. Ces œuvres représentent des figures royales, des divinités et des scènes de la vie quotidienne.",
      en: "Collection of bronze sculptures demonstrating the technical mastery of African artisans. These works represent royal figures, deities and scenes from daily life.",
      wo: "Collection bu sculptures yu bronze yu wone maîtrise technique bu artisans africains. Liggéey yii dañu wone figures royales, divinités ak scènes yu dundu bu ñëw."
    },
    period: {
      fr: "XVe - XIXe siècle",
      en: "15th - 19th Century",
      wo: "15e - 19e siècle"
    },
    region: {
      fr: "Royaumes du Sénégal",
      en: "Senegalese Kingdoms",
      wo: "Réewu yu Senegaal"
    },
    numberOfPieces: 32,
    highlights: [
      "Sculpture royale Djolof du XVIe siècle",
      "Figure de divinité Wolof du Cayor",
      "Groupe familial Sérère du Sine-Saloum",
      "Chasseur Mandingue du Mali",
      "Reine de Saba en bronze",
      "Griot avec sa kora",
      "Femme enceinte symbolisant la fertilité"
    ],
    image: artworkBronze,
    gallery: "Salle Royale"
  },
  {
    id: "textiles-ceremoniels",
    name: {
      fr: "Textiles Cérémoniels",
      en: "Ceremonial Textiles",
      wo: "Textile yu Cérémoniel"
    },
    description: {
      fr: "Collection de textiles aux motifs complexes et aux couleurs vives, utilisés lors des cérémonies importantes. Chaque pièce raconte une histoire et porte une signification symbolique profonde.",
      en: "Collection of textiles with complex patterns and vibrant colors, used during important ceremonies. Each piece tells a story and carries deep symbolic meaning.",
      wo: "Collection bu textile yu am motifs yu complex ak couleurs yu bari, yu jëkk ci ceremonies yu important. Benn benn pièce dafa wone histoire ak dafa am signification symbolique bu rëy."
    },
    period: {
      fr: "XVIIIe - XXe siècle",
      en: "18th - 20th Century",
      wo: "18e - 20e siècle"
    },
    region: {
      fr: "Sénégal, Mali, Burkina Faso",
      en: "Senegal, Mali, Burkina Faso",
      wo: "Senegaal, Mali, Burkina Faso"
    },
    numberOfPieces: 28,
    highlights: [
      "Tissu cérémoniel Sérère du Sine-Saloum",
      "Voile de mariage Wolof du Cayor",
      "Tapis de prière Peul du Fouta-Toro",
      "Étoffe royale Mandingue du Mali",
      "Boubou de cérémonie Toucouleur",
      "Tissu de deuil Sérère",
      "Étoffe de danse Diola de Casamance"
    ],
    image: artworkTextile,
    gallery: "Salle des Textiles"
  },
  {
    id: "art-contemporain",
    name: {
      fr: "Art Contemporain Africain",
      en: "Contemporary African Art",
      wo: "Art Contemporain Africain"
    },
    description: {
      fr: "Collection d'œuvres contemporaines d'artistes africains qui réinterprètent les traditions ancestrales avec des techniques modernes. Ces créations témoignent de la vitalité de l'art africain aujourd'hui.",
      en: "Collection of contemporary works by African artists who reinterpret ancestral traditions with modern techniques. These creations testify to the vitality of African art today.",
      wo: "Collection bu liggéey contemporaines ci artistes africains yu reinterpret traditions ancestrales ak techniques modernes. Créations yii dañu wone vitalité bu art africain tey."
    },
    period: {
      fr: "1990 - Aujourd'hui",
      en: "1990 - Today",
      wo: "1990 - Tey"
    },
    region: {
      fr: "Afrique de l'Ouest",
      en: "West Africa",
      wo: "Africa de l'Ouest"
    },
    numberOfPieces: 67,
    highlights: [
      "Statue de la Renaissance Africaine - Ousmane Sow",
      "Métamorphose - Soly Cissé",
      "Mémoire - Viyé Diba",
      "Identité Moderne - Fatou Kandé Senghor",
      "The Saga of the Baobab - Édouard Duval-Carrié",
      "Renaissance - Ousmane Sow",
      "Dialogue des Cultures - Soly Cissé",
      "Mémoire Collective - Viyé Diba"
    ],
    image: image5,
    gallery: "Salle Contemporaine"
  },
  {
    id: "art-ethnographique",
    name: {
      fr: "Art Ethnographique IFAN",
      en: "IFAN Ethnographic Art",
      wo: "Art Ethnographique IFAN"
    },
    description: {
      fr: "Collection exceptionnelle de l'Institut Fondamental d'Afrique Noire (IFAN) comprenant près de 10 000 pièces d'art provenant de plus de vingt pays africains. Cette collection témoigne de la richesse et de la diversité des cultures africaines à travers les âges.",
      en: "Exceptional collection of the Institut Fondamental d'Afrique Noire (IFAN) comprising nearly 10,000 art pieces from more than twenty African countries. This collection testifies to the richness and diversity of African cultures through the ages.",
      wo: "Collection exceptionnelle bu Institut Fondamental d'Afrique Noire (IFAN) bu am 10 000 pièces bu art yu jóge ci plus de vingt pays africains. Bii collection dafa wone richesse ak diversité bu cultures africaines ci âges yu wene."
    },
    period: {
      fr: "XIXe - XXe siècle",
      en: "19th - 20th Century",
      wo: "19e - 20e siècle"
    },
    region: {
      fr: "Afrique de l'Ouest et Centrale",
      en: "West and Central Africa",
      wo: "Africa de l'Ouest ak Centrale"
    },
    numberOfPieces: 150,
    highlights: [
      "Masques rituels du Mali",
      "Sculptures en bois du Cameroun",
      "Textiles cérémoniels du Nigeria",
      "Instruments de musique traditionnels",
      "Objets de divination",
      "Parures et bijoux royaux",
      "Outils agricoles anciens",
      "Poteries archéologiques"
    ],
    image: image1,
    gallery: "Salle IFAN"
  },
  {
    id: "patrimoine-feminin",
    name: {
      fr: "Patrimoine Féminin Sénégalais",
      en: "Senegalese Women's Heritage",
      wo: "Patrimoine Féminin Sénégalais"
    },
    description: {
      fr: "Collection dédiée au patrimoine culturel des femmes sénégalaises, mettant en valeur leur rôle dans la société, leur artisanat, et leur contribution à la transmission des traditions. Cette collection honore les femmes sénégalaises à travers l'histoire.",
      en: "Collection dedicated to the cultural heritage of Senegalese women, highlighting their role in society, their craftsmanship, and their contribution to the transmission of traditions. This collection honors Senegalese women throughout history.",
      wo: "Collection bu jëkk ngir patrimoine culturel bu jigéen yu Senegaal, dafa wone seen rôle ci société, seen artisanat, ak seen contribution ci transmission bu traditions. Bii collection dafa jëkk ci jigéen yu Senegaal ci biir histoire."
    },
    period: {
      fr: "XVIIIe - XXIe siècle",
      en: "18th - 21st Century",
      wo: "18e - 21e siècle"
    },
    region: {
      fr: "Sénégal",
      en: "Senegal",
      wo: "Senegaal"
    },
    numberOfPieces: 89,
    highlights: [
      "Bijoux traditionnels Wolof",
      "Vêtements de cérémonie Sérère",
      "Poteries féminines Peul",
      "Tissus de mariage Toucouleur",
      "Coiffures traditionnelles",
      "Instruments de cuisine anciens",
      "Objets de beauté ancestraux",
      "Textiles de deuil"
    ],
    image: image2,
    gallery: "Salle du Patrimoine Féminin"
  },
  {
    id: "sculptures-traditionnelles",
    name: {
      fr: "Sculptures Traditionnelles Africaines",
      en: "Traditional African Sculptures",
      wo: "Sculptures Tradisyonel Africaines"
    },
    description: {
      fr: "Collection de sculptures en bois aux proportions élancées et stylisées, caractéristiques de l'esthétique africaine traditionnelle. Ces œuvres témoignent du savoir-faire ancestral des sculpteurs et de leur maîtrise des techniques de travail du bois.",
      en: "Collection of wooden sculptures with slender and stylized proportions, characteristic of traditional African aesthetics. These works testify to the ancestral know-how of sculptors and their mastery of woodworking techniques.",
      wo: "Collection bu sculptures yu bois bu am proportions yu ndaw ak stylisées, caractéristiques bu esthétique africaine tradisyonel. Liggéey yii dañu wone savoir-faire ancestral bu sculpteurs ak seen maîtrise bu techniques bu liggéey bu bois."
    },
    period: {
      fr: "XVIIIe - XXe siècle",
      en: "18th - 20th Century",
      wo: "18e - 20e siècle"
    },
    region: {
      fr: "Afrique de l'Ouest",
      en: "West Africa",
      wo: "Africa de l'Ouest"
    },
    numberOfPieces: 25,
    highlights: [
      "Sculpture traditionnelle aux proportions élancées",
      "Figure humaine stylisée",
      "Sculpture rituelle de fertilité",
      "Figure d'ancêtre",
      "Sculpture de divinité",
      "Statuette de protection",
      "Sculpture de danseur"
    ],
    image: imageA,
    gallery: "Salle des Traditions"
  },
  {
    id: "patrimoine-immatériel",
    name: {
      fr: "Patrimoine Immatériel Africain",
      en: "African Intangible Heritage",
      wo: "Patrimoine Immatériel Africain"
    },
    description: {
      fr: "Collection dédiée au patrimoine immatériel africain, incluant les cérémonies, rituels, chants, danses et traditions orales. Cette collection montre comment les objets matériels s'inscrivent dans un contexte culturel plus large et témoigne de l'importance des pratiques culturelles vivantes.",
      en: "Collection dedicated to African intangible heritage, including ceremonies, rituals, songs, dances and oral traditions. This collection shows how material objects fit into a broader cultural context and testifies to the importance of living cultural practices.",
      wo: "Collection bu jëkk ngir patrimoine immatériel africain, ak ceremonies, rituels, chants, danses ak traditions orales. Bii collection dafa wone ni objets matériels dañu nekk ci contexte culturel bu gën a rëy te dafa wone importance bu pratiques culturelles yu dëgg."
    },
    period: {
      fr: "Tradition vivante",
      en: "Living tradition",
      wo: "Tradition bu dëgg"
    },
    region: {
      fr: "Afrique",
      en: "Africa",
      wo: "Africa"
    },
    numberOfPieces: 45,
    highlights: [
      "Cérémonies d'initiation",
      "Rituels de fertilité",
      "Danses traditionnelles",
      "Chants ancestraux",
      "Cérémonies de mariage",
      "Rituels funéraires",
      "Traditions orales",
      "Pratiques spirituelles"
    ],
    image: imageC,
    gallery: "Salle du Patrimoine Immatériel"
  },
  {
    id: "art-monumental",
    name: {
      fr: "Art Monumental Contemporain",
      en: "Contemporary Monumental Art",
      wo: "Art Monumental Contemporain"
    },
    description: {
      fr: "Collection d'œuvres monumentales contemporaines qui illustrent l'évolution de l'art africain vers des formats plus grands et plus ambitieux. Ces sculptures témoignent de la capacité des artistes africains à créer des œuvres de grande envergure.",
      en: "Collection of contemporary monumental works that illustrate the evolution of African art towards larger and more ambitious formats. These sculptures testify to the ability of African artists to create large-scale works.",
      wo: "Collection bu liggéey monumentales contemporaines yu wone évolution bu art africain ci formats yu gën a rëy ak yu gën a ambitieux. Sculptures yii dañu wone capacité bu artistes africains ngir def liggéey yu gën a rëy."
    },
    period: {
      fr: "1990 - Aujourd'hui",
      en: "1990 - Today",
      wo: "1990 - Tey"
    },
    region: {
      fr: "Afrique de l'Ouest",
      en: "West Africa",
      wo: "Africa de l'Ouest"
    },
    numberOfPieces: 12,
    highlights: [
      "Sculptures monumentales verticales",
      "Installations contemporaines",
      "Œuvres d'art public",
      "Sculptures abstraites",
      "Monuments commémoratifs",
      "Installations immersives",
      "Art environnemental"
    ],
    image: imageD,
    gallery: "Hall principal"
  }
];
