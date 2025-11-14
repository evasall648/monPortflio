import artworkMask from "@/assets/artwork-mask.jpg";
import artworkBronze from "@/assets/artwork-bronze.jpg";
import artworkTextile from "@/assets/artwork-textile.jpg";
import image1 from "@/assets/1.png";
import image2 from "@/assets/2.png";
import image3 from "@/assets/3.png";
import image4 from "@/assets/4.png";
import image5 from "@/assets/5.png";

export interface Artwork {
  id: string;
  title: {
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
  culture: {
    fr: string;
    en: string;
    wo: string;
  };
  image: string;
  hasAudio: boolean;
  audioUrl?: string;
  historicalContext: {
    fr: string;
    en: string;
    wo: string;
  };
}

export const artworks: Artwork[] = [
  {
    id: "mask-001",
    title: {
      fr: "Masque Traditionnel Sénégalais",
      en: "Traditional Senegalese Mask",
      wo: "Masque bu Tradisyonel bu Senegaal",
    },
    description: {
      fr: "Ce masque en bois sculpté représente une figure spirituelle importante dans les cérémonies traditionnelles. Les motifs géométriques symbolisent la sagesse et la connexion avec les ancêtres.",
      en: "This carved wooden mask represents an important spiritual figure in traditional ceremonies. The geometric patterns symbolize wisdom and connection with ancestors.",
      wo: "Bii masque bu sculpted bu bois dafa mel ni figure spirituelle bu important ci ceremonies yu tradisyonel. Motifs géométriques yi dañu mel ni sagesse ak connexion ak jabari.",
    },
    period: {
      fr: "XVIIIe siècle",
      en: "18th Century",
      wo: "18e siècle",
    },
    culture: {
      fr: "Wolof",
      en: "Wolof",
      wo: "Wolof",
    },
    image: artworkMask,
    hasAudio: true,
    historicalContext: {
      fr: "Les masques wolof étaient portés lors des cérémonies d'initiation et des célébrations importantes. Ils incarnent les esprits ancestraux et servent de médiateurs entre le monde visible et invisible.",
      en: "Wolof masks were worn during initiation ceremonies and important celebrations. They embody ancestral spirits and serve as mediators between the visible and invisible world.",
      wo: "Masque yu Wolof dañu koy set ci ceremonies d'initiation ak celebrations yu important. Dañu mel ni esprits ancestraux te dañu joxe médiation ci biir aduna bu gisoo ak bii gis-gisoo.",
    },
  },
  {
    id: "bronze-001",
    title: {
      fr: "Sculpture Royale en Bronze",
      en: "Royal Bronze Sculpture",
      wo: "Sculpture Royale bu Bronze",
    },
    description: {
      fr: "Cette sculpture en bronze représente un roi sénégalais dans sa tenue de cérémonie. Le travail détaillé du métal témoigne du savoir-faire exceptionnel des artisans de l'époque.",
      en: "This bronze sculpture depicts a Senegalese king in ceremonial attire. The detailed metalwork demonstrates the exceptional craftsmanship of artisans of the era.",
      wo: "Bii sculpture bu bronze dafa wone ni boroom bu Senegaal ci sa sunukaay bu ceremony. Liggéey bu detail bu metal dafa wone ni savoir-faire exceptionnel bu artisans yu waxtu.",
    },
    period: {
      fr: "XVIe siècle",
      en: "16th Century",
      wo: "16e siècle",
    },
    culture: {
      fr: "Royaume du Djolof",
      en: "Djolof Kingdom",
      wo: "Réewum Djolof",
    },
    image: artworkBronze,
    hasAudio: true,
    historicalContext: {
      fr: "Le Royaume du Djolof était l'un des plus puissants empires d'Afrique de l'Ouest. Ses artisans maîtrisaient l'art de la fonte du bronze, technique importée puis perfectionnée localement.",
      en: "The Djolof Kingdom was one of the most powerful empires in West Africa. Its artisans mastered the art of bronze casting, a technique imported and then perfected locally.",
      wo: "Réewum Djolof dafa nekk ni beneen ci empire yu gërë yu Africa de l'Ouest. Artisans yu nekk dañu xam liggéey fonte bu bronze, technique bu importé te perfectionnée ci biir réew.",
    },
  },
  {
    id: "textile-001",
    title: {
      fr: "Textile Cérémoniel",
      en: "Ceremonial Textile",
      wo: "Textile Cérémoniel",
    },
    description: {
      fr: "Ce textile aux motifs géométriques complexes était réservé aux cérémonies royales. Chaque couleur et motif a une signification symbolique profonde liée aux traditions ancestrales.",
      en: "This textile with complex geometric patterns was reserved for royal ceremonies. Each color and pattern has deep symbolic meaning linked to ancestral traditions.",
      wo: "Bii textile bu am motifs géométriques yu complex dañu ko jagle seen ceremonies yu royal. Benn benn couleur ak motif am na signification symbolique bu rëy ci traditions ancestrales.",
    },
    period: {
      fr: "XIXe siècle",
      en: "19th Century",
      wo: "19e siècle",
    },
    culture: {
      fr: "Sérère",
      en: "Serer",
      wo: "Seereer",
    },
    image: artworkTextile,
    hasAudio: true,
    historicalContext: {
      fr: "Les textiles sérères sont réputés pour leur qualité et leurs motifs distinctifs. Ils jouaient un rôle important dans les échanges commerciaux et les alliances entre royaumes.",
      en: "Serer textiles are renowned for their quality and distinctive patterns. They played an important role in trade and alliances between kingdoms.",
      wo: "Textile yu Seereer dañu bari ak seen qualité ak motifs yu distinctifs. Dañu am rôle bu important ci échanges commerciales ak alliances ci biir réewu.",
    },
  },
  {
    id: "sabre-001",
    title: {
      fr: "Sabre d'El Hadj Omar Tall",
      en: "Saber of El Hadj Omar Tall",
      wo: "Sabre bu El Hadj Omar Tall",
    },
    description: {
      fr: "Ce sabre historique appartient à El Hadj Omar Tall, figure emblématique de la résistance africaine au XIXe siècle. L'arme, finement ciselée, témoigne du savoir-faire des artisans de l'époque et de l'importance des armes dans la culture ouest-africaine.",
      en: "This historical saber belonged to El Hadj Omar Tall, an emblematic figure of African resistance in the 19th century. The finely chiseled weapon testifies to the craftsmanship of the era's artisans and the importance of weapons in West African culture.",
      wo: "Bii sabre historique dafa nekk ci El Hadj Omar Tall, figure emblématique bu résistance africaine ci 19e siècle. Arme bi, bu finement ciselée, dafa wone ni savoir-faire bu artisans yu waxtu ak importance bu armes ci culture ouest-africaine.",
    },
    period: {
      fr: "XIXe siècle",
      en: "19th Century",
      wo: "19e siècle",
    },
    culture: {
      fr: "Toucouleur",
      en: "Toucouleur",
      wo: "Toucouleur",
    },
    image: image1,
    hasAudio: true,
    historicalContext: {
      fr: "El Hadj Omar Tall était un chef religieux et militaire qui a mené la résistance contre la colonisation française. Son sabre symbolise la lutte pour l'indépendance et la préservation de l'identité africaine face à l'oppression coloniale.",
      en: "El Hadj Omar Tall was a religious and military leader who led resistance against French colonization. His saber symbolizes the struggle for independence and preservation of African identity in the face of colonial oppression.",
      wo: "El Hadj Omar Tall dafa nekk ni chef religieux ak militaire bu jëkk résistance ci colonisation française. Sa sabre dafa mel ni lutte ngir indépendance ak préservation bu identité africaine ci kanam oppression coloniale.",
    },
  },
  {
    id: "baobab-001",
    title: {
      fr: "The Saga of the Baobab",
      en: "The Saga of the Baobab",
      wo: "Saga bu Baobab",
    },
    description: {
      fr: "Cette installation monumentale de 12 mètres de hauteur en acier corten représente la force et la résilience africaine. L'œuvre d'Edouard Duval-Carrié symbolise l'enracinement profond de la culture africaine et sa capacité à résister aux épreuves du temps.",
      en: "This monumental 12-meter high installation in corten steel represents African strength and resilience. Edouard Duval-Carrié's work symbolizes the deep rooting of African culture and its ability to withstand the trials of time.",
      wo: "Bii installation monumentale bu 12 mètres bu hauteur ci acier corten dafa wone ni force ak résilience africaine. Liggéey bu Edouard Duval-Carrié dafa mel ni enracinement bu rëy bu culture africaine ak sa capacité ngir résister ci épreuves bu waxtu.",
    },
    period: {
      fr: "2020",
      en: "2020",
      wo: "2020",
    },
    culture: {
      fr: "Contemporain",
      en: "Contemporary",
      wo: "Contemporain",
    },
    image: image2,
    hasAudio: true,
    historicalContext: {
      fr: "Cette œuvre a été créée pour commémorer l'ouverture du Musée des Civilisations Noires. Elle représente l'Afrique comme un baobab millénaire, symbole de force, de sagesse et de continuité à travers les âges.",
      en: "This work was created to commemorate the opening of the Museum of Black Civilizations. It represents Africa as a thousand-year-old baobab, symbol of strength, wisdom and continuity through the ages.",
      wo: "Bii liggéey dañu ko def ngir commémorer uverture bu Musée des Civilisations Noires. Dafa wone ni Africa ni baobab bu millénaire, symbole bu force, sagesse ak continuité ci biir âges.",
    },
  },
  {
    id: "picasso-001",
    title: {
      fr: "Exposition Picasso à Dakar",
      en: "Picasso Exhibition in Dakar",
      wo: "Exposition Picasso ci Dakar",
    },
    description: {
      fr: "Cette exposition exceptionnelle présente 30 œuvres de Pablo Picasso, mettant en lumière l'influence de l'art africain sur le génie espagnol. L'exposition révèle le dialogue fascinant entre l'art traditionnel africain et l'art moderne européen.",
      en: "This exceptional exhibition presents 30 works by Pablo Picasso, highlighting the influence of African art on the Spanish genius. The exhibition reveals the fascinating dialogue between traditional African art and modern European art.",
      wo: "Bii exposition exceptionnelle dafa wone 30 liggéey yu Pablo Picasso, dafa wone ni influence bu art africain ci génie espagnol. Exposition bi dafa wone dialogue bu fascinant ci biir art tradisyonel africain ak art moderne européen.",
    },
    period: {
      fr: "2022",
      en: "2022",
      wo: "2022",
    },
    culture: {
      fr: "Exposition temporaire",
      en: "Temporary exhibition",
      wo: "Exposition temporaire",
    },
    image: image3,
    hasAudio: true,
    historicalContext: {
      fr: "Cette exposition historique marque le retour de Picasso en Afrique, continent qui a tant influencé son œuvre. Elle célèbre le dialogue entre les cultures et l'universalité de l'art.",
      en: "This historic exhibition marks Picasso's return to Africa, the continent that so influenced his work. It celebrates the dialogue between cultures and the universality of art.",
      wo: "Bii exposition historique dafa mel ni retour bu Picasso ci Africa, continent bu am influence bu rëy ci sa liggéey. Dafa célébrer dialogue ci biir cultures ak universalité bu art.",
    },
  },
  {
    id: "leonardo-001",
    title: {
      fr: "Opera Omnia Leonardo",
      en: "Opera Omnia Leonardo",
      wo: "Opera Omnia Leonardo",
    },
    description: {
      fr: "Cette exposition numérique présente 17 chefs-d'œuvre de Léonard de Vinci en reproduction haute définition. Grâce à la technologie de pointe, les visiteurs peuvent découvrir les détails les plus fins des œuvres du génie italien dans une expérience immersive unique.",
      en: "This digital exhibition presents 17 masterpieces by Leonardo da Vinci in high-definition reproduction. Thanks to cutting-edge technology, visitors can discover the finest details of the Italian genius's works in a unique immersive experience.",
      wo: "Bii exposition numérique dafa wone 17 chefs-d'œuvre yu Léonard de Vinci ci reproduction haute définition. Ci kanam technologie de pointe, visiteurs dañu man a gis details yu plus fins yu liggéey yu génie italien ci expérience immersive bu unique.",
    },
    period: {
      fr: "2021-2022",
      en: "2021-2022",
      wo: "2021-2022",
    },
    culture: {
      fr: "Exposition numérique",
      en: "Digital exhibition",
      wo: "Exposition numérique",
    },
    image: image4,
    hasAudio: true,
    historicalContext: {
      fr: "Cette exposition révolutionnaire utilise les technologies les plus avancées pour rendre accessible l'art de la Renaissance. Elle démontre que l'art universel peut être partagé et apprécié par tous, indépendamment des frontières géographiques.",
      en: "This revolutionary exhibition uses the most advanced technologies to make Renaissance art accessible. It demonstrates that universal art can be shared and appreciated by all, regardless of geographical boundaries.",
      wo: "Bii exposition révolutionnaire dafa jëkk ci technologies yu plus avancées ngir def art bu Renaissance accessible. Dafa wone ni art universel man na ñu ko partager ak apprécier ci ñépp, ci kanam frontières géographiques.",
    },
  },
  {
    id: "identite-001",
    title: {
      fr: "Identité Moderne",
      en: "Modern Identity",
      wo: "Identité Moderne",
    },
    description: {
      fr: "Cette œuvre contemporaine explore la question de l'identité africaine dans le monde moderne. L'artiste sénégalais Soly Cissé mêle techniques traditionnelles et modernes pour créer une vision unique de l'Afrique contemporaine, entre tradition et modernité.",
      en: "This contemporary work explores the question of African identity in the modern world. Senegalese artist Soly Cissé blends traditional and modern techniques to create a unique vision of contemporary Africa, between tradition and modernity.",
      wo: "Bii liggéey contemporain dafa seet ci question bu identité africaine ci aduna bu moderne. Artist bu Senegaal Soly Cissé dafa mel techniques tradisyonel ak modernes ngir def vision unique bu Africa contemporaine, ci biir tradition ak modernité.",
    },
    period: {
      fr: "2023",
      en: "2023",
      wo: "2023",
    },
    culture: {
      fr: "Contemporain",
      en: "Contemporary",
      wo: "Contemporain",
    },
    image: image5,
    hasAudio: true,
    historicalContext: {
      fr: "Cette œuvre s'inscrit dans le mouvement de l'art contemporain africain qui questionne l'identité et la place de l'Afrique dans le monde globalisé. Elle reflète les défis et les opportunités de l'Afrique moderne.",
      en: "This work is part of the contemporary African art movement that questions identity and Africa's place in the globalized world. It reflects the challenges and opportunities of modern Africa.",
      wo: "Bii liggéey dafa nekk ci mouvement bu art contemporain africain bu seet ci identité ak place bu Africa ci aduna bu globalisé. Dafa wone défis ak opportunités yu Africa moderne.",
    },
  },
];
