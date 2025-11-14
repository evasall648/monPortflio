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
import facadeMuseum from "@/assets/facade.jpeg";
import hallMuseum from "@/assets/grandhall.jpeg";
import galleryMuseum from "@/assets/oeuvreancienne.jpeg";
import expositionMuseum from "@/assets/celebrationartistique.jpeg";

export interface MCNArtwork {
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
  origin: {
    fr: string;
    en: string;
    wo: string;
  };
  materials: {
    fr: string;
    en: string;
    wo: string;
  };
  dimensions: {
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
  culturalSignificance: {
    fr: string;
    en: string;
    wo: string;
  };
  qrCode: string;
  location: {
    floor: string;
    room: string;
    position: string;
  };
  curator: {
    fr: string;
    en: string;
    wo: string;
  };
  acquisition: {
    fr: string;
    en: string;
    wo: string;
  };
  relatedArtworks: string[];
  tags: string[];
}

export const mcnArtworks: MCNArtwork[] = [
  // Image A - Sculpture traditionnelle
  {
    id: "mcn-sculpture-traditionnelle-001",
    title: {
      fr: "Sculpture Traditionnelle Africaine",
      en: "Traditional African Sculpture",
      wo: "Sculpture Tradisyonel Africaine"
    },
    description: {
      fr: "Cette sculpture en bois aux proportions longues et élancées représente une figure humaine stylisée, caractéristique de l'esthétique africaine traditionnelle. L'œuvre témoigne du savoir-faire ancestral des sculpteurs africains et de leur maîtrise des techniques de travail du bois. Les proportions allongées et la stylisation géométrique reflètent les canons esthétiques traditionnels.",
      en: "This wooden sculpture with long and slender proportions represents a stylized human figure, characteristic of traditional African aesthetics. The work testifies to the ancestral know-how of African sculptors and their mastery of woodworking techniques. The elongated proportions and geometric stylization reflect traditional aesthetic canons.",
      wo: "Bii sculpture bu bois bu am proportions yu rëy ak yu ndaw dafa wone figure humaine bu stylisée, caractéristique bu esthétique africaine tradisyonel. Liggéey bi dafa wone savoir-faire ancestral bu sculpteurs africains ak seen maîtrise bu techniques bu liggéey bu bois. Proportions yu allongées ak stylisation géométrique dañu wone canons esthétiques tradisyonel."
    },
    period: {
      fr: "XIXe siècle",
      en: "19th Century",
      wo: "19e siècle"
    },
    culture: {
      fr: "Traditionnel Africain",
      en: "Traditional African",
      wo: "Tradisyonel Africain"
    },
    origin: {
      fr: "Afrique de l'Ouest",
      en: "West Africa",
      wo: "Africa de l'Ouest"
    },
    materials: {
      fr: "Bois dur, pigments naturels, cire d'abeille",
      en: "Hardwood, natural pigments, beeswax",
      wo: "Bois dur, pigments naturels, cire d'abeille"
    },
    dimensions: {
      fr: "120 cm × 25 cm × 20 cm",
      en: "120 cm × 25 cm × 20 cm",
      wo: "120 cm × 25 cm × 20 cm"
    },
    image: imageA,
    hasAudio: true,
    audioUrl: "/src/assets/audio/sculpture-traditionnelle-001-fr.mp3",
    historicalContext: {
      fr: "Les sculptures africaines traditionnelles étaient créées par des artisans spécialisés qui maîtrisaient les techniques de sculpture sur bois. Ces œuvres servaient souvent d'objets rituels, de supports de communication avec les esprits, ou d'éléments décoratifs dans les maisons et les lieux de culte. La stylisation géométrique permettait de transcender la représentation réaliste pour atteindre une dimension spirituelle.",
      en: "Traditional African sculptures were created by specialized artisans who mastered wood carving techniques. These works often served as ritual objects, supports for communication with spirits, or decorative elements in homes and places of worship. Geometric stylization allowed transcending realistic representation to reach a spiritual dimension.",
      wo: "Sculptures africaines tradisyonel dañu def ci artisans spécialisés yu xam techniques bu sculpture ci bois. Liggéey yii dañu jëkk ni objets rituels, supports ngir communication ak esprits, walla éléments décoratifs ci kër ak bérab yu jëkk. Stylisation géométrique dafa jagle transcend représentation réaliste ngir am dimension spirituelle."
    },
    culturalSignificance: {
      fr: "Cette sculpture symbolise la relation entre l'homme et le spirituel dans les cultures africaines traditionnelles. Elle représente l'idéal de beauté et d'harmonie, tout en servant de médiateur entre le monde visible et invisible. L'œuvre témoigne de la richesse artistique et spirituelle de l'Afrique.",
      en: "This sculpture symbolizes the relationship between man and the spiritual in traditional African cultures. It represents the ideal of beauty and harmony, while serving as a mediator between the visible and invisible world. The work testifies to the artistic and spiritual richness of Africa.",
      wo: "Bii sculpture dafa mel ni relation ci biir góor ak spirituel ci cultures africaines tradisyonel. Dafa wone idéal bu beauté ak harmonie, te dafa nekk médiateur ci biir aduna bu gisoo ak bii gis-gis. Liggéey bi dafa wone richesse artistique ak spirituelle bu Africa."
    },
    qrCode: "MCN-SCULPTURE-TRAD-001",
    location: {
      floor: "1er étage",
      room: "Salle des Traditions",
      position: "Vitrine E-1"
    },
    curator: {
      fr: "Dr. Fatou Diagne, Conservatrice",
      en: "Dr. Fatou Diagne, Curator",
      wo: "Dr. Fatou Diagne, Conservatrice"
    },
    acquisition: {
      fr: "Collection privée, acquis en 2019",
      en: "Private collection, acquired in 2019",
      wo: "Collection privée, acquis ci 2019"
    },
    relatedArtworks: ["mcn-mask-001", "mcn-bronze-001"],
    tags: ["sculpture", "bois", "traditionnel", "spiritualité", "esthétique"]
  },
  // Image B - Galerie détaillée
  {
    id: "mcn-galerie-detaille-001",
    title: {
      fr: "Galerie d'Exposition - Sculpture Détaillée",
      en: "Exhibition Gallery - Detailed Sculpture",
      wo: "Galerie bu Exposition - Sculpture bu Detail"
    },
    description: {
      fr: "Cette galerie présente une sculpture noire très détaillée au premier plan, entourée d'autres œuvres et de panneaux d'exposition. L'éclairage maîtrisé met en valeur les formes et les textures de l'œuvre, révélant la finesse du travail de l'artisan. Cette présentation muséale témoigne de l'importance accordée à la mise en valeur du patrimoine artistique africain.",
      en: "This gallery presents a very detailed black sculpture in the foreground, surrounded by other works and exhibition panels. The controlled lighting highlights the forms and textures of the work, revealing the finesse of the artisan's work. This museum presentation testifies to the importance given to the enhancement of African artistic heritage.",
      wo: "Bii galerie dafa wone sculpture noire bu detail bu rëy ci premier plan, entourée ci liggéey yu wene ak panneaux d'exposition. Éclairage bu maîtrisé dafa wone formes ak textures bu liggéey bi, dafa wone finesse bu liggéey bu artisan. Bii présentation muséale dafa wone importance bu jëkk ci mise en valeur bu patrimoine artistique africain."
    },
    period: {
      fr: "Exposition permanente",
      en: "Permanent exhibition",
      wo: "Exposition permanente"
    },
    culture: {
      fr: "Présentation Muséale",
      en: "Museum Presentation",
      wo: "Présentation Muséale"
    },
    origin: {
      fr: "Musée des Civilisations Noires, Dakar",
      en: "Museum of Black Civilizations, Dakar",
      wo: "Musée yu Civilisations Noires, Dakar"
    },
    materials: {
      fr: "Éclairage muséal, vitrines, socles",
      en: "Museum lighting, showcases, pedestals",
      wo: "Éclairage muséal, vitrines, socles"
    },
    dimensions: {
      fr: "Espace d'exposition",
      en: "Exhibition space",
      wo: "Espace bu exposition"
    },
    image: imageB,
    hasAudio: true,
    audioUrl: "/src/assets/audio/galerie-detaille-001-fr.mp3",
    historicalContext: {
      fr: "Cette galerie illustre l'évolution de la muséographie africaine et la reconnaissance internationale de l'art africain. L'éclairage professionnel et la mise en scène témoignent de l'importance accordée à la préservation et à la valorisation du patrimoine artistique africain dans les institutions culturelles modernes.",
      en: "This gallery illustrates the evolution of African museography and the international recognition of African art. Professional lighting and staging testify to the importance given to the preservation and enhancement of African artistic heritage in modern cultural institutions.",
      wo: "Bii galerie dafa wone évolution bu muséographie africaine ak reconnaissance internationale bu art africain. Éclairage professionnel ak mise en scène dañu wone importance bu jëkk ci préservation ak valorisation bu patrimoine artistique africain ci institutions culturelles modernes."
    },
    culturalSignificance: {
      fr: "Cette présentation muséale symbolise la reconnaissance de l'art africain comme patrimoine universel. Elle démontre que l'art africain mérite la même attention et le même respect que les autres formes d'art mondial, contribuant ainsi à la décolonisation des regards sur l'Afrique.",
      en: "This museum presentation symbolizes the recognition of African art as universal heritage. It demonstrates that African art deserves the same attention and respect as other forms of world art, thus contributing to the decolonization of views on Africa.",
      wo: "Bii présentation muséale dafa mel ni reconnaissance bu art africain ni patrimoine universel. Dafa wone ni art africain mérite même attention ak même respect ni formes yu wene yu art mondial, dafa contribution ci décolonisation bu seet ci Africa."
    },
    qrCode: "MCN-GALERIE-001",
    location: {
      floor: "1er étage",
      room: "Galerie principale",
      position: "Espace d'exposition"
    },
    curator: {
      fr: "Équipe de conservation MCN",
      en: "MCN Conservation Team",
      wo: "Équipe bu conservation MCN"
    },
    acquisition: {
      fr: "Installation permanente, 2018",
      en: "Permanent installation, 2018",
      wo: "Installation permanente, 2018"
    },
    relatedArtworks: ["mcn-sculpture-traditionnelle-001"],
    tags: ["galerie", "muséographie", "éclairage", "patrimoine", "reconnaissance"]
  },
  // Image C - Contexte culturel
  {
    id: "mcn-contexte-culturel-001",
    title: {
      fr: "Contexte Culturel et Rituels",
      en: "Cultural Context and Rituals",
      wo: "Contexte Culturel ak Rituels"
    },
    description: {
      fr: "Cette exposition présente des œuvres dans leur contexte culturel d'origine, avec un grand panneau photographique montrant une foule lors d'une cérémonie ou d'un rituel africain. Au sol, des sculptures et objets rituels témoignent de l'importance du patrimoine immatériel (chants, danses, cérémonies) qui accompagne les objets matériels.",
      en: "This exhibition presents works in their original cultural context, with a large photographic panel showing a crowd during an African ceremony or ritual. On the floor, sculptures and ritual objects testify to the importance of intangible heritage (songs, dances, ceremonies) that accompanies material objects.",
      wo: "Bii exposition dafa wone liggéey ci seen contexte culturel d'origine, ak grand panneau photographique bu wone foule ci ceremony walla ritual africain. Ci suuf, sculptures ak objets rituels dañu wone importance bu patrimoine immatériel (chants, danses, ceremonies) yu accompagne objets matériels."
    },
    period: {
      fr: "Exposition thématique",
      en: "Thematic exhibition",
      wo: "Exposition thématique"
    },
    culture: {
      fr: "Patrimoine Immatériel Africain",
      en: "African Intangible Heritage",
      wo: "Patrimoine Immatériel Africain"
    },
    origin: {
      fr: "Communautés africaines",
      en: "African communities",
      wo: "Communautés africaines"
    },
    materials: {
      fr: "Photographies, objets rituels, sculptures",
      en: "Photographs, ritual objects, sculptures",
      wo: "Photographies, objets rituels, sculptures"
    },
    dimensions: {
      fr: "Installation immersive",
      en: "Immersive installation",
      wo: "Installation immersive"
    },
    image: imageC,
    hasAudio: true,
    audioUrl: "/src/assets/audio/contexte-culturel-001-fr.mp3",
    historicalContext: {
      fr: "Cette exposition met en lumière l'importance du patrimoine immatériel africain, souvent négligé dans les musées traditionnels. Elle montre comment les objets matériels s'inscrivent dans un contexte culturel plus large, incluant les cérémonies, les danses, les chants et les rituels qui leur donnent leur véritable signification.",
      en: "This exhibition highlights the importance of African intangible heritage, often neglected in traditional museums. It shows how material objects fit into a broader cultural context, including ceremonies, dances, songs and rituals that give them their true meaning.",
      wo: "Bii exposition dafa wone importance bu patrimoine immatériel africain, yu souvent négligé ci musées tradisyonel. Dafa wone ni objets matériels dañu nekk ci contexte culturel bu gën a rëy, ak ceremonies, danses, chants ak rituels yu joxe seen signification bu dëgg."
    },
    culturalSignificance: {
      fr: "Cette approche révolutionne la muséographie en montrant que l'art africain ne peut être compris qu'à travers son contexte culturel complet. Elle valorise le patrimoine immatériel et contribue à la préservation des traditions orales et des pratiques culturelles vivantes.",
      en: "This approach revolutionizes museography by showing that African art can only be understood through its complete cultural context. It enhances intangible heritage and contributes to the preservation of oral traditions and living cultural practices.",
      wo: "Bii approche dafa révolutionner muséographie ci wone ni art africain man na ñu ko xam ci kanam contexte culturel bu leer. Dafa valoriser patrimoine immatériel ak contribution ci préservation bu traditions orales ak pratiques culturelles yu dëgg."
    },
    qrCode: "MCN-CONTEXTE-001",
    location: {
      floor: "2e étage",
      room: "Salle du Patrimoine Immatériel",
      position: "Installation centrale"
    },
    curator: {
      fr: "Dr. Aminata Traoré, Ethnologue",
      en: "Dr. Aminata Traoré, Ethnologist",
      wo: "Dr. Aminata Traoré, Ethnologue"
    },
    acquisition: {
      fr: "Partenariat avec communautés locales, 2020",
      en: "Partnership with local communities, 2020",
      wo: "Partenariat ak communautés locales, 2020"
    },
    relatedArtworks: ["mcn-sculpture-traditionnelle-001"],
    tags: ["patrimoine", "immatériel", "rituel", "communauté", "tradition"]
  },
  // Image D - Sculptures monumentales
  {
    id: "mcn-sculptures-monumentales-001",
    title: {
      fr: "Sculptures Monumentales",
      en: "Monumental Sculptures",
      wo: "Sculptures Monumentales"
    },
    description: {
      fr: "Ces deux grandes sculptures verticales, imposantes et relativement abstraites, trônent dans l'espace lumineux et ouvert du musée. Elles représentent l'architecture intérieure du musée et la dimension monumentale des œuvres africaines. Ces sculptures témoignent de la capacité de l'art africain à créer des œuvres de grande envergure.",
      en: "These two large vertical sculptures, imposing and relatively abstract, stand in the bright and open space of the museum. They represent the interior architecture of the museum and the monumental dimension of African works. These sculptures testify to the ability of African art to create large-scale works.",
      wo: "Sculptures yu ñaar yu gërë yu vertical, yu imposantes ak relativement abstraites, dañu nekk ci espace bu lumineux ak ouvert bu musée. Dañu wone architecture intérieure bu musée ak dimension monumentale bu liggéey yu africaines. Sculptures yii dañu wone capacité bu art africain ngir def liggéey yu gën a rëy."
    },
    period: {
      fr: "Contemporain",
      en: "Contemporary",
      wo: "Contemporain"
    },
    culture: {
      fr: "Art Contemporain Africain",
      en: "Contemporary African Art",
      wo: "Art Contemporain Africain"
    },
    origin: {
      fr: "Afrique de l'Ouest",
      en: "West Africa",
      wo: "Africa de l'Ouest"
    },
    materials: {
      fr: "Bronze, acier, béton, techniques mixtes",
      en: "Bronze, steel, concrete, mixed techniques",
      wo: "Bronze, acier, béton, techniques mixtes"
    },
    dimensions: {
      fr: "Sculptures monumentales (3-4 mètres)",
      en: "Monumental sculptures (3-4 meters)",
      wo: "Sculptures monumentales (3-4 mètres)"
    },
    image: imageD,
    hasAudio: true,
    audioUrl: "/src/assets/audio/sculptures-monumentales-001-fr.mp3",
    historicalContext: {
      fr: "Ces sculptures monumentales illustrent l'évolution de l'art africain vers des formats plus grands et plus ambitieux. Elles témoignent de la capacité des artistes africains contemporains à créer des œuvres qui rivalisent avec les plus grandes créations mondiales, tout en conservant leur identité culturelle unique.",
      en: "These monumental sculptures illustrate the evolution of African art towards larger and more ambitious formats. They testify to the ability of contemporary African artists to create works that rival the greatest world creations, while preserving their unique cultural identity.",
      wo: "Sculptures monumentales yii dañu wone évolution bu art africain ci formats yu gën a rëy ak yu gën a ambitieux. Dañu wone capacité bu artistes africains contemporains ngir def liggéey yu rivaliser ak créations yu gën a gërë yu aduna, te dañu préservation ci identité culturelle unique."
    },
    culturalSignificance: {
      fr: "Ces œuvres monumentales symbolisent l'ambition de l'art africain contemporain et sa capacité à s'exprimer à grande échelle. Elles démontrent que l'art africain peut être à la fois traditionnel et moderne, local et universel, contribuant ainsi à la reconnaissance internationale de la créativité africaine.",
      en: "These monumental works symbolize the ambition of contemporary African art and its ability to express itself on a large scale. They demonstrate that African art can be both traditional and modern, local and universal, thus contributing to the international recognition of African creativity.",
      wo: "Liggéey monumentales yii dañu mel ni ambition bu art africain contemporain ak sa capacité ngir wone ci échelle bu rëy. Dañu wone ni art africain man na ñu ko nekk ni tradisyonel ak moderne, local ak universel, dafa contribution ci reconnaissance internationale bu créativité africaine."
    },
    qrCode: "MCN-MONUMENTAL-001",
    location: {
      floor: "Rez-de-chaussée",
      room: "Hall principal",
      position: "Espace central"
    },
    curator: {
      fr: "Dr. Ousmane Sow, Sculpteur",
      en: "Dr. Ousmane Sow, Sculptor",
      wo: "Dr. Ousmane Sow, Sculpteur"
    },
    acquisition: {
      fr: "Commande spéciale pour l'ouverture du MCN, 2018",
      en: "Special commission for MCN opening, 2018",
      wo: "Commande spéciale ngir uverture bu MCN, 2018"
    },
    relatedArtworks: ["mcn-baobab-001", "mcn-renaissance-001"],
    tags: ["monumental", "contemporain", "architecture", "ambition", "universel"]
  },
  {
    id: "mcn-mask-001",
    title: {
      fr: "Masque Cérémoniel Wolof",
      en: "Wolof Ceremonial Mask",
      wo: "Masque Cérémoniel bu Wolof"
    },
    description: {
      fr: "Ce masque cérémoniel wolof en bois sculpté représente une figure spirituelle importante dans les rites d'initiation. Les motifs géométriques complexes symbolisent la sagesse ancestrale et la connexion avec le monde invisible. Le masque était porté lors des cérémonies de passage à l'âge adulte et des célébrations importantes de la communauté.",
      en: "This Wolof ceremonial wooden mask represents an important spiritual figure in initiation rites. The complex geometric patterns symbolize ancestral wisdom and connection with the invisible world. The mask was worn during rites of passage to adulthood and important community celebrations.",
      wo: "Bii masque cérémoniel bu Wolof bu sculpted bu bois dafa mel ni figure spirituelle bu important ci rites d'initiation. Motifs géométriques yu complex dañu mel ni sagesse ancestrale ak connexion ak aduna bu gis-gis. Masque bi dañu koy set ci rites de passage ci mag ak celebrations yu important yu communauté."
    },
    period: {
      fr: "XVIIIe siècle",
      en: "18th Century",
      wo: "18e siècle"
    },
    culture: {
      fr: "Wolof",
      en: "Wolof",
      wo: "Wolof"
    },
    origin: {
      fr: "Royaume du Cayor, Sénégal",
      en: "Kingdom of Cayor, Senegal",
      wo: "Réewum Cayor, Senegaal"
    },
    materials: {
      fr: "Bois de fromager, pigments naturels, fibres végétales",
      en: "Ceiba wood, natural pigments, plant fibers",
      wo: "Bois bu fromager, pigments naturels, fibres végétales"
    },
    dimensions: {
      fr: "45 cm × 28 cm × 15 cm",
      en: "45 cm × 28 cm × 15 cm",
      wo: "45 cm × 28 cm × 15 cm"
    },
    image: artworkMask,
    hasAudio: true,
    audioUrl: "/src/assets/audio/mask-001-fr.mp3",
    historicalContext: {
      fr: "Les masques wolof étaient des objets sacrés utilisés dans les cérémonies d'initiation des jeunes hommes. Ils incarnent les esprits ancestraux et servent de médiateurs entre le monde visible et invisible. Le Royaume du Cayor, fondé au XIVe siècle, était l'un des plus puissants empires wolof du Sénégal précolonial, s'étendant de la Gambie au fleuve Sénégal. Ces masques étaient portés par les griots et les prêtres lors des cérémonies de circoncision et des rites de passage.",
      en: "Wolof masks were sacred objects used in young men's initiation ceremonies. They embody ancestral spirits and serve as mediators between the visible and invisible world. The Kingdom of Cayor, founded in the 14th century, was one of the most powerful Wolof empires in pre-colonial Senegal, extending from Gambia to the Senegal River. These masks were worn by griots and priests during circumcision ceremonies and rites of passage.",
      wo: "Masque yu Wolof dañu nekk objets sacrés yu jëkk ci ceremonies d'initiation yu góor yu ndaw. Dañu mel ni esprits ancestraux te dañu joxe médiation ci biir aduna bu gisoo ak bii gis-gis. Réewum Cayor, def ci 14e siècle, dafa nekk ni beneen ci empire yu gërë yu Wolof ci Senegaal bu jëkk colonial, dafa nekk ci Gambie ba ci fleuve Sénégal. Masque yii dañu koy set ci griots ak prêtres ci ceremonies de circoncision ak rites de passage."
    },
    culturalSignificance: {
      fr: "Ce masque représente l'importance de la tradition orale et de la transmission des connaissances dans la société wolof. Il symbolise la continuité culturelle et le respect des ancêtres, valeurs fondamentales de la civilisation wolof.",
      en: "This mask represents the importance of oral tradition and knowledge transmission in Wolof society. It symbolizes cultural continuity and respect for ancestors, fundamental values of Wolof civilization.",
      wo: "Bii masque dafa wone ni importance bu tradition orale ak transmission bu xam-xam ci société wolof. Dafa mel ni continuité culturelle ak respect ci jabari, valeurs fondamentales bu civilisation wolof."
    },
    qrCode: "MCN-MASK-001",
    location: {
      floor: "1er étage",
      room: "Salle des Traditions",
      position: "Vitrine A-3"
    },
    curator: {
      fr: "Dr. Aminata Sow, Conservatrice en chef",
      en: "Dr. Aminata Sow, Chief Curator",
      wo: "Dr. Aminata Sow, Conservatrice bu jëkk"
    },
    acquisition: {
      fr: "Donation de la famille Diop, 2019",
      en: "Donation from the Diop family, 2019",
      wo: "Donation ci famille Diop, 2019"
    },
    relatedArtworks: ["mcn-bronze-001", "mcn-textile-001"],
    tags: ["masque", "wolof", "cérémonie", "bois", "spiritualité"]
  },
  {
    id: "mcn-bronze-001",
    title: {
      fr: "Sculpture Royale en Bronze",
      en: "Royal Bronze Sculpture",
      wo: "Sculpture Royale bu Bronze"
    },
    description: {
      fr: "Cette sculpture en bronze représente un roi sénégalais dans sa tenue de cérémonie complète. Le travail détaillé du métal témoigne du savoir-faire exceptionnel des artisans de l'époque. La posture majestueuse et les détails ornementaux reflètent le pouvoir et la dignité royale.",
      en: "This bronze sculpture depicts a Senegalese king in full ceremonial attire. The detailed metalwork demonstrates the exceptional craftsmanship of artisans of the era. The majestic posture and ornamental details reflect royal power and dignity.",
      wo: "Bii sculpture bu bronze dafa wone ni boroom bu Senegaal ci sunukaay bu ceremony bu leer. Liggéey bu detail bu metal dafa wone ni savoir-faire exceptionnel bu artisans yu waxtu. Posture bu majestueux ak details yu ornamental dañu wone pouvoir royal ak dignité."
    },
    period: {
      fr: "XVIe siècle",
      en: "16th Century",
      wo: "16e siècle"
    },
    culture: {
      fr: "Royaume du Djolof",
      en: "Djolof Kingdom",
      wo: "Réewum Djolof"
    },
    origin: {
      fr: "Djolof, Sénégal",
      en: "Djolof, Senegal",
      wo: "Djolof, Senegaal"
    },
    materials: {
      fr: "Bronze, cuivre, alliages métalliques",
      en: "Bronze, copper, metal alloys",
      wo: "Bronze, cuivre, alliages métalliques"
    },
    dimensions: {
      fr: "62 cm × 35 cm × 25 cm",
      en: "62 cm × 35 cm × 25 cm",
      wo: "62 cm × 35 cm × 25 cm"
    },
    image: artworkBronze,
    hasAudio: true,
    audioUrl: "/src/assets/audio/bronze-001-fr.mp3",
    historicalContext: {
      fr: "Le Royaume du Djolof était l'un des plus puissants empires d'Afrique de l'Ouest. Ses artisans maîtrisaient l'art de la fonte du bronze, technique importée puis perfectionnée localement. Cette sculpture témoigne de la richesse et du raffinement de la cour royale djolof.",
      en: "The Djolof Kingdom was one of the most powerful empires in West Africa. Its artisans mastered the art of bronze casting, a technique imported and then perfected locally. This sculpture testifies to the wealth and refinement of the Djolof royal court.",
      wo: "Réewum Djolof dafa nekk ni beneen ci empire yu gërë yu Africa de l'Ouest. Artisans yu nekk dañu xam liggéey fonte bu bronze, technique bu importé te perfectionnée ci biir réew. Bii sculpture dafa wone ni richesse ak raffinement bu cour royal djolof."
    },
    culturalSignificance: {
      fr: "Cette sculpture symbolise l'autorité royale et la continuité dynastique dans la société djolof. Elle représente l'idéal du souverain juste et puissant, garant de l'ordre social et de la prospérité du royaume.",
      en: "This sculpture symbolizes royal authority and dynastic continuity in Djolof society. It represents the ideal of the just and powerful sovereign, guarantor of social order and kingdom prosperity.",
      wo: "Bii sculpture dafa mel ni autorité royal ak continuité dynastique ci société djolof. Dafa wone idéal bu souverain bu just ak gërë, garant bu ordre social ak prospérité bu réew."
    },
    qrCode: "MCN-BRONZE-001",
    location: {
      floor: "1er étage",
      room: "Salle Royale",
      position: "Piédestal central"
    },
    curator: {
      fr: "Dr. Cheikh Mbacké, Conservateur",
      en: "Dr. Cheikh Mbacké, Curator",
      wo: "Dr. Cheikh Mbacké, Conservateur"
    },
    acquisition: {
      fr: "Fouilles archéologiques, site de Ndiadiane Ndiaye, 2018",
      en: "Archaeological excavations, Ndiadiane Ndiaye site, 2018",
      wo: "Fouilles archéologiques, site Ndiadiane Ndiaye, 2018"
    },
    relatedArtworks: ["mcn-mask-001", "mcn-textile-001"],
    tags: ["bronze", "royal", "djolof", "sculpture", "pouvoir"]
  },
  {
    id: "mcn-textile-001",
    title: {
      fr: "Textile Cérémoniel Sérère",
      en: "Serer Ceremonial Textile",
      wo: "Textile Cérémoniel bu Seereer"
    },
    description: {
      fr: "Ce textile aux motifs géométriques complexes était réservé aux cérémonies royales et religieuses. Chaque couleur et motif a une signification symbolique profonde liée aux traditions ancestrales sérères. Le tissage complexe témoigne du savoir-faire exceptionnel des tisserands de l'époque.",
      en: "This textile with complex geometric patterns was reserved for royal and religious ceremonies. Each color and pattern has deep symbolic meaning linked to Serer ancestral traditions. The complex weaving demonstrates the exceptional skill of weavers of the era.",
      wo: "Bii textile bu am motifs géométriques yu complex dañu ko jagle ceremonies yu royal ak religieuses. Benn benn couleur ak motif am na signification symbolique bu rëy ci traditions ancestrales yu Seereer. Tissage bu complex dafa wone ni savoir-faire exceptionnel bu tisserands yu waxtu."
    },
    period: {
      fr: "XIXe siècle",
      en: "19th Century",
      wo: "19e siècle"
    },
    culture: {
      fr: "Sérère",
      en: "Serer",
      wo: "Seereer"
    },
    origin: {
      fr: "Sine-Saloum, Sénégal",
      en: "Sine-Saloum, Senegal",
      wo: "Sine-Saloum, Senegaal"
    },
    materials: {
      fr: "Coton, fibres de baobab, teintures végétales",
      en: "Cotton, baobab fibers, plant dyes",
      wo: "Coton, fibres bu baobab, teintures végétales"
    },
    dimensions: {
      fr: "180 cm × 120 cm",
      en: "180 cm × 120 cm",
      wo: "180 cm × 120 cm"
    },
    image: artworkTextile,
    hasAudio: true,
    audioUrl: "/src/assets/audio/textile-001-fr.mp3",
    historicalContext: {
      fr: "Les textiles sérères sont réputés pour leur qualité et leurs motifs distinctifs. Ils jouaient un rôle important dans les échanges commerciaux et les alliances entre royaumes. Ce textile témoigne de la richesse culturelle et de l'importance du commerce dans la région du Sine-Saloum.",
      en: "Serer textiles are renowned for their quality and distinctive patterns. They played an important role in trade and alliances between kingdoms. This textile testifies to the cultural richness and importance of trade in the Sine-Saloum region.",
      wo: "Textile yu Seereer dañu bari ak seen qualité ak motifs yu distinctifs. Dañu am rôle bu important ci commerce ak alliances ci biir réewu. Bii textile dafa wone ni richesse culturelle ak importance bu commerce ci région Sine-Saloum."
    },
    culturalSignificance: {
      fr: "Ce textile représente l'importance de l'artisanat féminin dans la société sérère. Il symbolise la transmission des savoirs ancestraux et le rôle des femmes comme gardiennes de la tradition culturelle.",
      en: "This textile represents the importance of women's craftsmanship in Serer society. It symbolizes the transmission of ancestral knowledge and the role of women as guardians of cultural tradition.",
      wo: "Bii textile dafa wone ni importance bu artisanat féminin ci société seereer. Dafa mel ni transmission bu xam-xam ancestral ak rôle bu jigéen yi ni gardiennes bu tradition culturelle."
    },
    qrCode: "MCN-TEXTILE-001",
    location: {
      floor: "2e étage",
      room: "Salle des Textiles",
      position: "Vitrine B-7"
    },
    curator: {
      fr: "Dr. Fatou Sarr, Conservatrice",
      en: "Dr. Fatou Sarr, Curator",
      wo: "Dr. Fatou Sarr, Conservatrice"
    },
    acquisition: {
      fr: "Collection privée, acquis en 2020",
      en: "Private collection, acquired in 2020",
      wo: "Collection privée, acquis ci 2020"
    },
    relatedArtworks: ["mcn-mask-001", "mcn-bronze-001"],
    tags: ["textile", "sérère", "cérémonie", "tissage", "femme"]
  },
  {
    id: "mcn-sabre-001",
    title: {
      fr: "Sabre d'El Hadj Omar Tall",
      en: "Saber of El Hadj Omar Tall",
      wo: "Sabre bu El Hadj Omar Tall"
    },
    description: {
      fr: "Ce sabre historique appartient à El Hadj Omar Tall, figure emblématique de la résistance africaine au XIXe siècle. L'arme, finement ciselée, témoigne du savoir-faire des artisans de l'époque et de l'importance des armes dans la culture ouest-africaine.",
      en: "This historical saber belonged to El Hadj Omar Tall, an emblematic figure of African resistance in the 19th century. The finely chiseled weapon testifies to the craftsmanship of the era's artisans and the importance of weapons in West African culture.",
      wo: "Bii sabre historique dafa nekk ci El Hadj Omar Tall, figure emblématique bu résistance africaine ci 19e siècle. Arme bi, bu finement ciselée, dafa wone ni savoir-faire bu artisans yu waxtu ak importance bu armes ci culture ouest-africaine."
    },
    period: {
      fr: "XIXe siècle",
      en: "19th Century",
      wo: "19e siècle"
    },
    culture: {
      fr: "Toucouleur",
      en: "Toucouleur",
      wo: "Toucouleur"
    },
    origin: {
      fr: "Fouta-Toro, Sénégal",
      en: "Fouta-Toro, Senegal",
      wo: "Fouta-Toro, Senegaal"
    },
    materials: {
      fr: "Acier damassé, cuir, or, pierres précieuses",
      en: "Damascus steel, leather, gold, precious stones",
      wo: "Acier damassé, cuir, or, pierres précieuses"
    },
    dimensions: {
      fr: "95 cm × 8 cm × 2 cm",
      en: "95 cm × 8 cm × 2 cm",
      wo: "95 cm × 8 cm × 2 cm"
    },
    image: image1,
    hasAudio: true,
    audioUrl: "/src/assets/audio/sabre-001-fr.mp3",
    historicalContext: {
      fr: "El Hadj Omar Tall était un chef religieux et militaire qui a mené la résistance contre la colonisation française. Son sabre symbolise la lutte pour l'indépendance et la préservation de l'identité africaine face à l'oppression coloniale.",
      en: "El Hadj Omar Tall was a religious and military leader who led resistance against French colonization. His saber symbolizes the struggle for independence and preservation of African identity in the face of colonial oppression.",
      wo: "El Hadj Omar Tall dafa nekk ni chef religieux ak militaire bu jëkk résistance ci colonisation française. Sa sabre dafa mel ni lutte ngir indépendance ak préservation bu identité africaine ci kanam oppression coloniale."
    },
    culturalSignificance: {
      fr: "Ce sabre représente la résistance et la fierté africaine. Il symbolise la lutte contre l'oppression et la détermination des peuples africains à préserver leur liberté et leur dignité.",
      en: "This saber represents African resistance and pride. It symbolizes the struggle against oppression and the determination of African peoples to preserve their freedom and dignity.",
      wo: "Bii sabre dafa wone ni résistance ak fierté africaine. Dafa mel ni lutte ci kanam oppression ak détermination bu ñi ci Africa ngir préservation bu seen liberté ak dignité."
    },
    qrCode: "MCN-SABRE-001",
    location: {
      floor: "1er étage",
      room: "Salle de la Résistance",
      position: "Vitrine C-1"
    },
    curator: {
      fr: "Dr. Mamadou Diouf, Historien",
      en: "Dr. Mamadou Diouf, Historian",
      wo: "Dr. Mamadou Diouf, Historien"
    },
    acquisition: {
      fr: "Restauration en cours, retour prévu en 2025",
      en: "Under restoration, expected return in 2025",
      wo: "Restauration ci biir, retour bu am ci 2025"
    },
    relatedArtworks: ["mcn-bronze-001"],
    tags: ["sabre", "résistance", "El Hadj Omar", "histoire", "liberté"]
  },
  {
    id: "mcn-baobab-001",
    title: {
      fr: "The Saga of the Baobab",
      en: "The Saga of the Baobab",
      wo: "Saga bu Baobab"
    },
    description: {
      fr: "Cette installation monumentale de 12 mètres de hauteur en acier corten représente la force et la résilience africaine. L'œuvre d'Edouard Duval-Carrié symbolise l'enracinement profond de la culture africaine et sa capacité à résister aux épreuves du temps.",
      en: "This monumental 12-meter high installation in corten steel represents African strength and resilience. Edouard Duval-Carrié's work symbolizes the deep rooting of African culture and its ability to withstand the trials of time.",
      wo: "Bii installation monumentale bu 12 mètres bu hauteur ci acier corten dafa wone ni force ak résilience africaine. Liggéey bu Edouard Duval-Carrié dafa mel ni enracinement bu rëy bu culture africaine ak sa capacité ngir résister ci épreuves bu waxtu."
    },
    period: {
      fr: "2020",
      en: "2020",
      wo: "2020"
    },
    culture: {
      fr: "Contemporain",
      en: "Contemporary",
      wo: "Contemporain"
    },
    origin: {
      fr: "Dakar, Sénégal",
      en: "Dakar, Senegal",
      wo: "Dakar, Senegaal"
    },
    materials: {
      fr: "Acier corten, béton armé, pigments",
      en: "Corten steel, reinforced concrete, pigments",
      wo: "Acier corten, béton armé, pigments"
    },
    dimensions: {
      fr: "1200 cm × 800 cm × 600 cm",
      en: "1200 cm × 800 cm × 600 cm",
      wo: "1200 cm × 800 cm × 600 cm"
    },
    image: image2,
    hasAudio: true,
    audioUrl: "/src/assets/audio/baobab-001-fr.mp3",
    historicalContext: {
      fr: "Cette œuvre a été créée pour commémorer l'ouverture du Musée des Civilisations Noires. Elle représente l'Afrique comme un baobab millénaire, symbole de force, de sagesse et de continuité à travers les âges.",
      en: "This work was created to commemorate the opening of the Museum of Black Civilizations. It represents Africa as a thousand-year-old baobab, symbol of strength, wisdom and continuity through the ages.",
      wo: "Bii liggéey dañu ko def ngir commémorer uverture bu Musée des Civilisations Noires. Dafa wone ni Africa ni baobab bu millénaire, symbole bu force, sagesse ak continuité ci biir âges."
    },
    culturalSignificance: {
      fr: "Le baobab est l'arbre sacré de l'Afrique, symbole de vie, de sagesse et de protection. Cette sculpture monumentale honore cette tradition millénaire et célèbre la force de la culture africaine.",
      en: "The baobab is Africa's sacred tree, symbol of life, wisdom and protection. This monumental sculpture honors this thousand-year-old tradition and celebrates the strength of African culture.",
      wo: "Baobab dafa nekk ni garab bu sacré bu Africa, symbole bu vie, sagesse ak protection. Bii sculpture monumentale dafa jëkk ci tradition bu millénaire te dafa célébrer force bu culture africaine."
    },
    qrCode: "MCN-BAOBAB-001",
    location: {
      floor: "Rez-de-chaussée",
      room: "Hall d'entrée",
      position: "Centre du hall"
    },
    curator: {
      fr: "Dr. Hamady Bocoum, Directeur du MCN",
      en: "Dr. Hamady Bocoum, MCN Director",
      wo: "Dr. Hamady Bocoum, Directeur bu MCN"
    },
    acquisition: {
      fr: "Commande spéciale pour l'ouverture du MCN, 2018",
      en: "Special commission for MCN opening, 2018",
      wo: "Commande spéciale ngir uverture bu MCN, 2018"
    },
    relatedArtworks: [],
    tags: ["baobab", "monumental", "Edouard Duval-Carrié", "force", "sagesse"]
  },
  {
    id: "mcn-picasso-001",
    title: {
      fr: "Exposition Picasso à Dakar",
      en: "Picasso Exhibition in Dakar",
      wo: "Exposition Picasso ci Dakar"
    },
    description: {
      fr: "Cette exposition exceptionnelle présente 30 œuvres de Pablo Picasso, mettant en lumière l'influence de l'art africain sur le génie espagnol. L'exposition révèle le dialogue fascinant entre l'art traditionnel africain et l'art moderne européen.",
      en: "This exceptional exhibition presents 30 works by Pablo Picasso, highlighting the influence of African art on the Spanish genius. The exhibition reveals the fascinating dialogue between traditional African art and modern European art.",
      wo: "Bii exposition exceptionnelle dafa wone 30 liggéey yu Pablo Picasso, dafa wone ni influence bu art africain ci génie espagnol. Exposition bi dafa wone dialogue bu fascinant ci biir art tradisyonel africain ak art moderne européen."
    },
    period: {
      fr: "2022",
      en: "2022",
      wo: "2022"
    },
    culture: {
      fr: "Exposition temporaire",
      en: "Temporary exhibition",
      wo: "Exposition temporaire"
    },
    origin: {
      fr: "Musée Picasso, Paris / MCN, Dakar",
      en: "Picasso Museum, Paris / MCN, Dakar",
      wo: "Musée Picasso, Paris / MCN, Dakar"
    },
    materials: {
      fr: "Huile sur toile, techniques mixtes",
      en: "Oil on canvas, mixed techniques",
      wo: "Huile ci toile, techniques mixtes"
    },
    dimensions: {
      fr: "Dimensions variables",
      en: "Variable dimensions",
      wo: "Dimensions variables"
    },
    image: image3,
    hasAudio: true,
    audioUrl: "/src/assets/audio/picasso-001-fr.mp3",
    historicalContext: {
      fr: "Cette exposition historique marque le retour de Picasso en Afrique, continent qui a tant influencé son œuvre. Elle célèbre le dialogue entre les cultures et l'universalité de l'art.",
      en: "This historic exhibition marks Picasso's return to Africa, the continent that so influenced his work. It celebrates the dialogue between cultures and the universality of art.",
      wo: "Bii exposition historique dafa mel ni retour bu Picasso ci Africa, continent bu am influence bu rëy ci sa liggéey. Dafa célébrer dialogue ci biir cultures ak universalité bu art."
    },
    culturalSignificance: {
      fr: "Cette exposition symbolise la reconnaissance de l'influence africaine sur l'art mondial. Elle démontre que l'art africain n'est pas seulement un objet d'étude mais une source d'inspiration majeure pour l'art contemporain.",
      en: "This exhibition symbolizes the recognition of African influence on world art. It demonstrates that African art is not just an object of study but a major source of inspiration for contemporary art.",
      wo: "Bii exposition dafa mel ni reconnaissance bu influence africaine ci art mondial. Dafa wone ni art africain duñu ko nekk ni objet d'étude waaye source bu inspiration bu jëkk ngir art contemporain."
    },
    qrCode: "MCN-PICASSO-001",
    location: {
      floor: "2e étage",
      room: "Salle d'exposition temporaire",
      position: "Galerie principale"
    },
    curator: {
      fr: "Dr. Sophie Chauveau, Conservatrice",
      en: "Dr. Sophie Chauveau, Curator",
      wo: "Dr. Sophie Chauveau, Conservatrice"
    },
    acquisition: {
      fr: "Partenariat avec le Musée Picasso, Paris",
      en: "Partnership with Picasso Museum, Paris",
      wo: "Partenariat ak Musée Picasso, Paris"
    },
    relatedArtworks: ["mcn-baobab-001"],
    tags: ["picasso", "exposition", "dialogue", "influence", "mondial"]
  },
  {
    id: "mcn-leonardo-001",
    title: {
      fr: "Opera Omnia Leonardo",
      en: "Opera Omnia Leonardo",
      wo: "Opera Omnia Leonardo"
    },
    description: {
      fr: "Cette exposition numérique présente 17 chefs-d'œuvre de Léonard de Vinci en reproduction haute définition. Grâce à la technologie de pointe, les visiteurs peuvent découvrir les détails les plus fins des œuvres du génie italien dans une expérience immersive unique.",
      en: "This digital exhibition presents 17 masterpieces by Leonardo da Vinci in high-definition reproduction. Thanks to cutting-edge technology, visitors can discover the finest details of the Italian genius's works in a unique immersive experience.",
      wo: "Bii exposition numérique dafa wone 17 chefs-d'œuvre yu Léonard de Vinci ci reproduction haute définition. Ci kanam technologie de pointe, visiteurs dañu man a gis details yu plus fins yu liggéey yu génie italien ci expérience immersive bu unique."
    },
    period: {
      fr: "2021-2022",
      en: "2021-2022",
      wo: "2021-2022"
    },
    culture: {
      fr: "Exposition numérique",
      en: "Digital exhibition",
      wo: "Exposition numérique"
    },
    origin: {
      fr: "Italie / MCN, Dakar",
      en: "Italy / MCN, Dakar",
      wo: "Italie / MCN, Dakar"
    },
    materials: {
      fr: "Technologie numérique, projections HD",
      en: "Digital technology, HD projections",
      wo: "Technologie numérique, projections HD"
    },
    dimensions: {
      fr: "Écrans géants, projections immersives",
      en: "Giant screens, immersive projections",
      wo: "Écrans géants, projections immersives"
    },
    image: image4,
    hasAudio: true,
    audioUrl: "/src/assets/audio/leonardo-001-fr.mp3",
    historicalContext: {
      fr: "Cette exposition révolutionnaire utilise les technologies les plus avancées pour rendre accessible l'art de la Renaissance. Elle démontre que l'art universel peut être partagé et apprécié par tous, indépendamment des frontières géographiques.",
      en: "This revolutionary exhibition uses the most advanced technologies to make Renaissance art accessible. It demonstrates that universal art can be shared and appreciated by all, regardless of geographical boundaries.",
      wo: "Bii exposition révolutionnaire dafa jëkk ci technologies yu plus avancées ngir def art bu Renaissance accessible. Dafa wone ni art universel man na ñu ko partager ak apprécier ci ñépp, ci kanam frontières géographiques."
    },
    culturalSignificance: {
      fr: "Cette exposition symbolise l'universalité de l'art et la capacité de la technologie à rapprocher les cultures. Elle démontre que l'art transcende les frontières et unit l'humanité dans une expérience commune de beauté et de créativité.",
      en: "This exhibition symbolizes the universality of art and technology's ability to bring cultures together. It demonstrates that art transcends boundaries and unites humanity in a common experience of beauty and creativity.",
      wo: "Bii exposition dafa mel ni universalité bu art ak capacité bu technologie ngir rapprocher cultures. Dafa wone ni art transcend frontières te dafa unir humanité ci expérience commune bu beauté ak créativité."
    },
    qrCode: "MCN-LEONARDO-001",
    location: {
      floor: "3e étage",
      room: "Salle numérique",
      position: "Espace immersif"
    },
    curator: {
      fr: "Dr. Maria Rossi, Conservatrice numérique",
      en: "Dr. Maria Rossi, Digital Curator",
      wo: "Dr. Maria Rossi, Conservatrice numérique"
    },
    acquisition: {
      fr: "Partenariat avec Opera Omnia, Italie",
      en: "Partnership with Opera Omnia, Italy",
      wo: "Partenariat ak Opera Omnia, Italie"
    },
    relatedArtworks: ["mcn-picasso-001"],
    tags: ["léonard", "numérique", "renaissance", "technologie", "universel"]
  },
  {
    id: "mcn-contemporary-002",
    title: {
      fr: "Identité Moderne",
      en: "Modern Identity",
      wo: "Identité Moderne"
    },
    description: {
      fr: "Cette œuvre contemporaine explore la question de l'identité africaine dans le monde moderne. L'artiste sénégalais Soly Cissé mêle techniques traditionnelles et modernes pour créer une vision unique de l'Afrique contemporaine, entre tradition et modernité.",
      en: "This contemporary work explores the question of African identity in the modern world. Senegalese artist Soly Cissé blends traditional and modern techniques to create a unique vision of contemporary Africa, between tradition and modernity.",
      wo: "Bii liggéey contemporain dafa seet ci question bu identité africaine ci aduna bu moderne. Artist bu Senegaal Soly Cissé dafa mel techniques tradisyonel ak modernes ngir def vision unique bu Africa contemporaine, ci biir tradition ak modernité."
    },
    period: {
      fr: "2023",
      en: "2023",
      wo: "2023"
    },
    culture: {
      fr: "Contemporain",
      en: "Contemporary",
      wo: "Contemporain"
    },
    origin: {
      fr: "Dakar, Sénégal",
      en: "Dakar, Senegal",
      wo: "Dakar, Senegaal"
    },
    materials: {
      fr: "Acrylique, collage, techniques mixtes",
      en: "Acrylic, collage, mixed techniques",
      wo: "Acrylique, collage, techniques mixtes"
    },
    dimensions: {
      fr: "150 cm × 200 cm",
      en: "150 cm × 200 cm",
      wo: "150 cm × 200 cm"
    },
    image: image5,
    hasAudio: true,
    audioUrl: "/src/assets/audio/identite-001-fr.mp3",
    historicalContext: {
      fr: "Cette œuvre s'inscrit dans le mouvement de l'art contemporain africain qui questionne l'identité et la place de l'Afrique dans le monde globalisé. Elle reflète les défis et les opportunités de l'Afrique moderne.",
      en: "This work is part of the contemporary African art movement that questions identity and Africa's place in the globalized world. It reflects the challenges and opportunities of modern Africa.",
      wo: "Bii liggéey dafa nekk ci mouvement bu art contemporain africain bu seet ci identité ak place bu Africa ci aduna bu globalisé. Dafa wone défis ak opportunités yu Africa moderne."
    },
    culturalSignificance: {
      fr: "Cette œuvre représente la complexité de l'identité africaine contemporaine. Elle symbolise la capacité de l'Afrique à s'adapter au monde moderne tout en préservant ses valeurs traditionnelles et sa créativité unique.",
      en: "This work represents the complexity of contemporary African identity. It symbolizes Africa's ability to adapt to the modern world while preserving its traditional values and unique creativity.",
      wo: "Bii liggéey dafa wone ni complexité bu identité africaine contemporaine. Dafa mel ni capacité bu Africa ngir s'adapter ci aduna bu moderne te dafa préservation ci seen valeurs tradisyonel ak créativité unique."
    },
    qrCode: "MCN-IDENTITE-001",
    location: {
      floor: "2e étage",
      room: "Salle contemporaine",
      position: "Mur principal"
    },
    curator: {
      fr: "Dr. Aïcha Diallo, Conservatrice",
      en: "Dr. Aïcha Diallo, Curator",
      wo: "Dr. Aïcha Diallo, Conservatrice"
    },
    acquisition: {
      fr: "Achat direct à l'artiste, 2023",
      en: "Direct purchase from artist, 2023",
      wo: "Achat direct ci artiste, 2023"
    },
    relatedArtworks: [],
    tags: ["contemporain", "identité", "Soly Cissé", "moderne", "tradition"]
  },
  // Façade du Musée - Vue extérieure moderne
  {
    id: "facade-museum-001",
    title: {
      fr: "Façade du Musée des Civilisations Noires",
      en: "Museum of Black Civilizations Facade",
      wo: "Façade bu Musée yu Civilisations Noires"
    },
    description: {
      fr: "Vue panoramique du bâtiment principal du Musée des Civilisations Noires à Dakar. Sa façade circulaire en béton clair présente des lignes architecturales inspirées des cases à impluvium du Sénégal et des symboles africains traditionnels. Cette architecture moderne rend hommage à l'Afrique ancestrale tout en reflétant la renaissance culturelle du continent.",
      en: "Panoramic view of the main building of the Museum of Black Civilizations in Dakar. Its circular concrete facade features architectural lines inspired by Senegalese impluvium houses and traditional African symbols. This modern architecture pays homage to ancestral Africa while reflecting the continent's cultural renaissance.",
      wo: "Seet panoramique bu bâtiment principal bu Musée yu Civilisations Noires ci Dakar. Seen façade circulaire ci béton clair dafa wone lignes architecturales yu inspire ci cases à impluvium yu Senegaal ak symboles africains tradisyonel. Bii architecture moderne dafa jëkk ci Africa ancestral te dafa wone renaissance culturelle bu continent."
    },
    period: {
      fr: "2018",
      en: "2018",
      wo: "2018"
    },
    culture: {
      fr: "Architecture Moderne Africaine",
      en: "Modern African Architecture",
      wo: "Architecture Moderne Africaine"
    },
    origin: {
      fr: "Dakar, Sénégal",
      en: "Dakar, Senegal",
      wo: "Dakar, Senegaal"
    },
    materials: {
      fr: "Béton, verre, métal",
      en: "Concrete, glass, metal",
      wo: "Béton, verre, métal"
    },
    dimensions: {
      fr: "Bâtiment complet",
      en: "Complete building",
      wo: "Bâtiment bu leer"
    },
    image: facadeMuseum,
    hasAudio: true,
    audioUrl: "/src/assets/audio/facade-museum-001-fr.mp3",
    historicalContext: {
      fr: "Le Musée des Civilisations Noires a été inauguré en 2018 à Dakar. Conçu par l'architecte Pierre Goudiaby Atepa, il symbolise la renaissance culturelle africaine et le dialogue entre tradition et modernité. L'architecture s'inspire des cases à impluvium traditionnelles du Sénégal.",
      en: "The Museum of Black Civilizations was inaugurated in 2018 in Dakar. Designed by architect Pierre Goudiaby Atepa, it symbolizes African cultural renaissance and dialogue between tradition and modernity. The architecture is inspired by traditional Senegalese impluvium houses.",
      wo: "Musée yu Civilisations Noires dafa inauguré ci 2018 ci Dakar. Def ci architecte Pierre Goudiaby Atepa, dafa mel ni renaissance culturelle africaine ak dialogue ci biir tradition ak modernité. Architecture bi dafa inspire ci cases à impluvium tradisyonel yu Senegaal."
    },
    culturalSignificance: {
      fr: "Cette architecture fusionne tradition et modernité, symbole du dialogue entre passé, présent et futur africain. Elle représente l'ambition du Sénégal et de l'Afrique de valoriser leur patrimoine culturel sur la scène internationale.",
      en: "This architecture fuses tradition and modernity, symbol of dialogue between African past, present and future. It represents Senegal's and Africa's ambition to valorize their cultural heritage on the international stage.",
      wo: "Bii architecture dafa fusionner tradition ak modernité, symbole bu dialogue ci biir gannaaw, tey ak kanam bu Africa. Dafa wone ambition bu Senegaal ak Africa ngir valoriser seen patrimoine culturel ci scène internationale."
    },
    qrCode: "MCN-FACADE-001",
    location: {
      floor: "Extérieur",
      room: "Façade principale",
      position: "Entrée du musée"
    },
    curator: {
      fr: "Pierre Goudiaby Atepa, Architecte",
      en: "Pierre Goudiaby Atepa, Architect",
      wo: "Pierre Goudiaby Atepa, Architecte"
    },
    acquisition: {
      fr: "Construction du musée, 2018",
      en: "Museum construction, 2018",
      wo: "Construction bu musée, 2018"
    },
    relatedArtworks: [],
    tags: ["architecture", "moderne", "tradition", "Dakar", "civilisations"]
  },
  // Hall du Musée - Grand hall lumineux
  {
    id: "hall-museum-001",
    title: {
      fr: "Le Grand Hall - The Saga of the Baobab",
      en: "The Grand Hall - The Saga of the Baobab",
      wo: "Hall bu Gërëy - The Saga of the Baobab"
    },
    description: {
      fr: "Le grand hall d'entrée du musée, baigné de lumière naturelle, présente un espace circulaire majestueux. On distingue 'The Saga of the Baobab', une sculpture monumentale de l'artiste Édouard Duval-Carrié, occupant le centre du hall. Cette œuvre symbolise la force, la mémoire et la sagesse de l'Afrique, le baobab étant un arbre sacré dans de nombreuses cultures africaines.",
      en: "The museum's grand entrance hall, bathed in natural light, features a majestic circular space. 'The Saga of the Baobab', a monumental sculpture by artist Édouard Duval-Carrié, occupies the center of the hall. This work symbolizes the strength, memory and wisdom of Africa, the baobab being a sacred tree in many African cultures.",
      wo: "Hall bu jëkk bu musée, baigné ci lumière naturelle, dafa wone espace circulaire majestueux. 'The Saga of the Baobab', sculpture monumentale bu artiste Édouard Duval-Carrié, dafa nekk ci center bu hall. Bii liggéey dafa mel ni force, mémoire ak sagesse bu Africa, baobab dafa nekk garab bu sacred ci cultures yu bari yu africaines."
    },
    period: {
      fr: "2018",
      en: "2018",
      wo: "2018"
    },
    culture: {
      fr: "Art Contemporain Haïtien-Africain",
      en: "Contemporary Haitian-African Art",
      wo: "Art Contemporain Haïtien-Africain"
    },
    origin: {
      fr: "Dakar, Sénégal",
      en: "Dakar, Senegal",
      wo: "Dakar, Senegaal"
    },
    materials: {
      fr: "Bronze, métal, techniques mixtes",
      en: "Bronze, metal, mixed techniques",
      wo: "Bronze, métal, techniques mixtes"
    },
    dimensions: {
      fr: "Sculpture monumentale",
      en: "Monumental sculpture",
      wo: "Sculpture monumentale"
    },
    image: hallMuseum,
    hasAudio: true,
    audioUrl: "/src/assets/audio/hall-museum-001-fr.mp3",
    historicalContext: {
      fr: "Édouard Duval-Carrié, artiste haïtien contemporain, a créé cette œuvre monumentale spécialement pour le Musée des Civilisations Noires. Le baobab, arbre de vie et mémoire des civilisations, trône au cœur du musée comme gardien du patrimoine africain.",
      en: "Édouard Duval-Carrié, contemporary Haitian artist, created this monumental work specifically for the Museum of Black Civilizations. The baobab, tree of life and memory of civilizations, stands at the heart of the museum as guardian of African heritage.",
      wo: "Édouard Duval-Carrié, artiste haïtien contemporain, def na bii liggéey monumentale spécialement ngir Musée yu Civilisations Noires. Baobab, garab bu vie ak mémoire yu civilisations, dafa nekk ci xol bu musée ni gardien bu patrimoine africain."
    },
    culturalSignificance: {
      fr: "Le baobab, arbre de vie et mémoire des civilisations, trône au cœur du musée comme gardien du patrimoine africain. Cette sculpture symbolise la continuité entre les civilisations africaines passées et présentes.",
      en: "The baobab, tree of life and memory of civilizations, stands at the heart of the museum as guardian of African heritage. This sculpture symbolizes continuity between past and present African civilizations.",
      wo: "Baobab, garab bu vie ak mémoire yu civilisations, dafa nekk ci xol bu musée ni gardien bu patrimoine africain. Bii sculpture dafa mel ni continuité ci biir civilisations africaines yu gannaaw ak yu tey."
    },
    qrCode: "MCN-HALL-001",
    location: {
      floor: "Rez-de-chaussée",
      room: "Hall principal",
      position: "Centre du hall"
    },
    curator: {
      fr: "Édouard Duval-Carrié, Artiste",
      en: "Édouard Duval-Carrié, Artist",
      wo: "Édouard Duval-Carrié, Artiste"
    },
    acquisition: {
      fr: "Commande spéciale pour l'inauguration, 2018",
      en: "Special commission for inauguration, 2018",
      wo: "Commande spéciale ngir inauguration, 2018"
    },
    relatedArtworks: [],
    tags: ["sculpture", "baobab", "Édouard Duval-Carrié", "monumental", "symbolique"]
  },
  // Galerie d'exposition - Œuvres anciennes et contemporaines
  {
    id: "gallery-museum-001",
    title: {
      fr: "Galerie d'Exposition - Dialogue des Époques",
      en: "Exhibition Gallery - Dialogue of Eras",
      wo: "Galerie bu Exposition - Dialogue yu Époques"
    },
    description: {
      fr: "Une salle d'exposition présentant un mélange d'objets anciens (masques, sculptures, textiles) et d'art contemporain. Les murs sont sobres, les vitrines éclairées mettent en valeur les œuvres issues de différentes régions d'Afrique. Chaque objet est accompagné de panneaux explicatifs et QR codes permettant aux visiteurs d'accéder à plus d'informations via le numérique.",
      en: "An exhibition hall presenting a mix of ancient objects (masks, sculptures, textiles) and contemporary art. The walls are sober, illuminated showcases highlight works from different regions of Africa. Each object is accompanied by explanatory panels and QR codes allowing visitors to access more information digitally.",
      wo: "Salle bu exposition bu wone mélange yu objets yu gannaaw (masques, sculptures, textiles) ak art contemporain. Mur yi dañu sobres, vitrines yu éclairées dañu wone liggéey yu jëkk ci régions yu wene yu Africa. Benn benn objet am na panneaux explicatifs ak QR codes yu jagle visiteurs ngir am plus d'informations ci numérique."
    },
    period: {
      fr: "Collections variées",
      en: "Various collections",
      wo: "Collections yu wene"
    },
    culture: {
      fr: "Patrimoine Africain Multirégional",
      en: "Multi-regional African Heritage",
      wo: "Patrimoine Africain Multirégional"
    },
    origin: {
      fr: "Diverses régions d'Afrique",
      en: "Various regions of Africa",
      wo: "Régions yu wene yu Africa"
    },
    materials: {
      fr: "Bois, bronze, textile, techniques variées",
      en: "Wood, bronze, textile, various techniques",
      wo: "Bois, bronze, textile, techniques yu wene"
    },
    dimensions: {
      fr: "Collections variées",
      en: "Various collections",
      wo: "Collections yu wene"
    },
    image: galleryMuseum,
    hasAudio: true,
    audioUrl: "/src/assets/audio/gallery-museum-001-fr.mp3",
    historicalContext: {
      fr: "Cette galerie illustre la richesse et la diversité du patrimoine africain à travers les âges. Elle présente un voyage à travers les époques, de l'Afrique précoloniale aux créations modernes, dans un dialogue constant entre tradition et innovation.",
      en: "This gallery illustrates the richness and diversity of African heritage through the ages. It presents a journey through eras, from pre-colonial Africa to modern creations, in constant dialogue between tradition and innovation.",
      wo: "Bii galerie dafa wone richesse ak diversité bu patrimoine africain ci âges yu wene. Dafa wone voyage ci biir époques, ci Africa précoloniale ba ci créations modernes, ci dialogue constant ci biir tradition ak innovation."
    },
    culturalSignificance: {
      fr: "Un voyage à travers les époques, de l'Afrique précoloniale aux créations modernes, dans un dialogue constant entre tradition et innovation. Cette approche met en valeur la continuité culturelle africaine.",
      en: "A journey through eras, from pre-colonial Africa to modern creations, in constant dialogue between tradition and innovation. This approach highlights African cultural continuity.",
      wo: "Voyage ci biir époques, ci Africa précoloniale ba ci créations modernes, ci dialogue constant ci biir tradition ak innovation. Bii approche dafa wone continuité culturelle africaine."
    },
    qrCode: "MCN-GALLERY-001",
    location: {
      floor: "1er étage",
      room: "Galerie principale",
      position: "Salle d'exposition"
    },
    curator: {
      fr: "Équipe de conservation MCN",
      en: "MCN Conservation Team",
      wo: "Équipe bu conservation MCN"
    },
    acquisition: {
      fr: "Collections permanentes du musée",
      en: "Museum permanent collections",
      wo: "Collections permanentes bu musée"
    },
    relatedArtworks: [],
    tags: ["galerie", "exposition", "patrimoine", "tradition", "contemporain"]
  },
  // Espace d'exposition temporaire - Célébration artistique
  {
    id: "exposition-museum-001",
    title: {
      fr: "Espace d'Exposition Temporaire - Célébration Artistique",
      en: "Temporary Exhibition Space - Artistic Celebration",
      wo: "Espace bu Exposition Temporaire - Célébration Artistique"
    },
    description: {
      fr: "Un espace dédié aux expositions temporaires du musée. On y voit des visiteurs contemplant des œuvres contemporaines et interactives. Ce lieu accueille régulièrement des événements comme 'Picasso à Dakar' ou 'Opera Omnia Leonardo', mettant en valeur le dialogue entre les arts africains et mondiaux.",
      en: "A space dedicated to the museum's temporary exhibitions. Visitors can be seen contemplating contemporary and interactive works. This place regularly hosts events like 'Picasso in Dakar' or 'Opera Omnia Leonardo', highlighting the dialogue between African and world arts.",
      wo: "Espace bu jëkk ngir expositions temporaires bu musée. Visiteurs dañu gis ci contemplation yu œuvres contemporaines ak interactives. Bii bérab dafa jëkk régulièrement événements ni 'Picasso ci Dakar' walla 'Opera Omnia Leonardo', dafa wone dialogue ci biir arts africains ak mondiaux."
    },
    period: {
      fr: "Expositions temporaires",
      en: "Temporary exhibitions",
      wo: "Expositions temporaires"
    },
    culture: {
      fr: "Art International et Africain",
      en: "International and African Art",
      wo: "Art International ak Africain"
    },
    origin: {
      fr: "Collaborations internationales",
      en: "International collaborations",
      wo: "Collaborations internationales"
    },
    materials: {
      fr: "Techniques variées et interactives",
      en: "Various and interactive techniques",
      wo: "Techniques yu wene ak interactives"
    },
    dimensions: {
      fr: "Espace modulable",
      en: "Modular space",
      wo: "Espace modulable"
    },
    image: expositionMuseum,
    hasAudio: true,
    audioUrl: "/src/assets/audio/exposition-museum-001-fr.mp3",
    historicalContext: {
      fr: "Un lieu vivant qui accueille des expositions temporaires internationales, invitant le monde à redécouvrir l'Afrique par l'art et la modernité. Ces expositions renforcent le dialogue culturel entre l'Afrique et le reste du monde.",
      en: "A living place that hosts international temporary exhibitions, inviting the world to rediscover Africa through art and modernity. These exhibitions strengthen cultural dialogue between Africa and the rest of the world.",
      wo: "Bérab bu dëgg bu jëkk expositions temporaires internationales, dafa woo aduna ngir gis Africa ci art ak modernité. Expositions yii dañu gën a gën dialogue culturel ci biir Africa ak reste bu aduna."
    },
    culturalSignificance: {
      fr: "Un lieu vivant qui accueille des expositions temporaires internationales, invitant le monde à redécouvrir l'Afrique par l'art et la modernité. Cette approche positionne l'Afrique comme acteur majeur de la scène artistique mondiale.",
      en: "A living place that hosts international temporary exhibitions, inviting the world to rediscover Africa through art and modernity. This approach positions Africa as a major player on the world artistic scene.",
      wo: "Bérab bu dëgg bu jëkk expositions temporaires internationales, dafa woo aduna ngir gis Africa ci art ak modernité. Bii approche dafa positionner Africa ni acteur majeur ci scène artistique mondiale."
    },
    qrCode: "MCN-EXPOSITION-001",
    location: {
      floor: "2e étage",
      room: "Espace temporaire",
      position: "Salle modulable"
    },
    curator: {
      fr: "Équipe de programmation MCN",
      en: "MCN Programming Team",
      wo: "Équipe bu programmation MCN"
    },
    acquisition: {
      fr: "Expositions temporaires",
      en: "Temporary exhibitions",
      wo: "Expositions temporaires"
    },
    relatedArtworks: [],
    tags: ["exposition", "temporaire", "international", "dialogue", "moderne"]
  },
  // Nouvelle œuvre: Statue de la Renaissance Africaine
  {
    id: "mcn-renaissance-001",
    title: {
      fr: "Statue de la Renaissance Africaine",
      en: "African Renaissance Monument",
      wo: "Statue bu Renaissance Africaine"
    },
    description: {
      fr: "Cette monumentale statue de bronze de 52 mètres de hauteur, œuvre du sculpteur sénégalais Ousmane Sow, représente une famille africaine regardant vers l'océan Atlantique. Elle symbolise l'émergence de l'Afrique moderne et sa détermination à prendre son destin en main. La statue, inaugurée en 2010, est devenue un symbole emblématique du Sénégal et de l'Afrique.",
      en: "This monumental bronze statue of 52 meters in height, work of Senegalese sculptor Ousmane Sow, represents an African family looking towards the Atlantic Ocean. It symbolizes the emergence of modern Africa and its determination to take control of its destiny. The statue, inaugurated in 2010, has become an emblematic symbol of Senegal and Africa.",
      wo: "Bii statue monumentale bu bronze bu 52 mètres bu hauteur, liggéey bu sculpteur bu Senegaal Ousmane Sow, dafa wone famille africaine bu seet ci Océan Atlantique. Dafa mel ni émergence bu Africa moderne ak sa détermination ngir am seen destin ci seen loxo. Statue bi, inauguré ci 2010, dafa nekk symbole emblématique bu Senegaal ak Africa."
    },
    period: {
      fr: "2010",
      en: "2010",
      wo: "2010"
    },
    culture: {
      fr: "Contemporain Sénégalais",
      en: "Contemporary Senegalese",
      wo: "Contemporain Sénégalais"
    },
    origin: {
      fr: "Dakar, Sénégal",
      en: "Dakar, Senegal",
      wo: "Dakar, Senegaal"
    },
    materials: {
      fr: "Bronze, acier, béton armé",
      en: "Bronze, steel, reinforced concrete",
      wo: "Bronze, acier, béton armé"
    },
    dimensions: {
      fr: "5200 cm × 1800 cm × 1200 cm",
      en: "5200 cm × 1800 cm × 1200 cm",
      wo: "5200 cm × 1800 cm × 1200 cm"
    },
    image: image1,
    hasAudio: true,
    audioUrl: "/src/assets/audio/renaissance-001-fr.mp3",
    historicalContext: {
      fr: "Commandée par le président Abdoulaye Wade, cette statue controversée a coûté 27 millions de dollars et a été financée en partie par la Corée du Nord. Elle représente l'ambition du Sénégal de devenir un leader culturel et économique en Afrique. La statue fait face à l'océan, symbolisant l'ouverture de l'Afrique au monde.",
      en: "Commissioned by President Abdoulaye Wade, this controversial statue cost 27 million dollars and was partially financed by North Korea. It represents Senegal's ambition to become a cultural and economic leader in Africa. The statue faces the ocean, symbolizing Africa's openness to the world.",
      wo: "Commandée ci Boroom Réew Abdoulaye Wade, bii statue controversée dafa am coût bu 27 millions de dollars te dafa financée ci partie ci Corée du Nord. Dafa wone ambition bu Senegaal ngir nekk leader culturel ak économique ci Africa. Statue bi dafa seet ci ocean, dafa mel ni uverture bu Africa ci aduna."
    },
    culturalSignificance: {
      fr: "Cette statue symbolise la renaissance africaine et l'aspiration du continent à retrouver sa place dans le monde. Elle représente l'unité familiale africaine et la transmission des valeurs entre générations. Malgré les controverses, elle est devenue un symbole de fierté nationale.",
      en: "This statue symbolizes African renaissance and the continent's aspiration to regain its place in the world. It represents African family unity and the transmission of values between generations. Despite controversies, it has become a symbol of national pride.",
      wo: "Bii statue dafa mel ni renaissance africaine ak aspiration bu continent ngir am sa place ci aduna. Dafa wone unité familiale africaine ak transmission bu valeurs ci biir générations. Ci kanam controverses, dafa nekk symbole bu fierté nationale."
    },
    qrCode: "MCN-RENAISSANCE-001",
    location: {
      floor: "Extérieur",
      room: "Collines des Mamelles",
      position: "Sommet de la colline"
    },
    curator: {
      fr: "Ousmane Sow, Sculpteur",
      en: "Ousmane Sow, Sculptor",
      wo: "Ousmane Sow, Sculpteur"
    },
    acquisition: {
      fr: "Commande présidentielle, 2010",
      en: "Presidential commission, 2010",
      wo: "Commande présidentielle, 2010"
    },
    relatedArtworks: ["mcn-baobab-001"],
    tags: ["renaissance", "monumental", "Ousmane Sow", "famille", "ambition"]
  },
  // Nouvelle œuvre: Masque Dogon
  {
    id: "mcn-dogon-001",
    title: {
      fr: "Masque Kanaga Dogon",
      en: "Dogon Kanaga Mask",
      wo: "Masque Kanaga bu Dogon"
    },
    description: {
      fr: "Ce masque cérémoniel dogon en bois sculpté représente l'oiseau mythique Kanaga, symbole de la création et de l'équilibre cosmique. Les motifs géométriques complexes évoquent les mythes de création dogon et la relation entre le ciel et la terre. Ce masque était utilisé lors des cérémonies de funérailles et des rites de passage.",
      en: "This Dogon ceremonial wooden mask represents the mythical Kanaga bird, symbol of creation and cosmic balance. The complex geometric patterns evoke Dogon creation myths and the relationship between sky and earth. This mask was used during funeral ceremonies and rites of passage.",
      wo: "Bii masque cérémoniel bu Dogon bu bois sculpté dafa wone oiseau mythique Kanaga, symbole bu création ak équilibre cosmique. Motifs géométriques yu complex dañu wone mythes de création dogon ak relation ci biir asamaan ak suuf. Bii masque dañu koy jëkk ci ceremonies de funérailles ak rites de passage."
    },
    period: {
      fr: "XIXe siècle",
      en: "19th Century",
      wo: "19e siècle"
    },
    culture: {
      fr: "Dogon",
      en: "Dogon",
      wo: "Dogon"
    },
    origin: {
      fr: "Pays Dogon, Mali",
      en: "Dogon Country, Mali",
      wo: "Pays Dogon, Mali"
    },
    materials: {
      fr: "Bois de baobab, pigments naturels, fibres végétales",
      en: "Baobab wood, natural pigments, plant fibers",
      wo: "Bois bu baobab, pigments naturels, fibres végétales"
    },
    dimensions: {
      fr: "85 cm × 45 cm × 20 cm",
      en: "85 cm × 45 cm × 20 cm",
      wo: "85 cm × 45 cm × 20 cm"
    },
    image: image2,
    hasAudio: true,
    audioUrl: "/src/assets/audio/dogon-001-fr.mp3",
    historicalContext: {
      fr: "Les Dogon du Mali sont réputés pour leur cosmologie complexe et leurs masques cérémoniels. Le masque Kanaga représente l'oiseau mythique qui aurait créé l'univers selon leurs croyances. Ces masques étaient portés lors des cérémonies de funérailles pour accompagner l'âme des défunts vers l'au-delà.",
      en: "The Dogon of Mali are renowned for their complex cosmology and ceremonial masks. The Kanaga mask represents the mythical bird that would have created the universe according to their beliefs. These masks were worn during funeral ceremonies to accompany the souls of the deceased to the afterlife.",
      wo: "Dogon yu Mali dañu bari ak seen cosmologie complex ak masque cérémoniels. Masque Kanaga dafa wone oiseau mythique bu def na universe ci seen croyances. Masque yii dañu koy set ci ceremonies de funérailles ngir accompagner âme yu défunts ba ci au-delà."
    },
    culturalSignificance: {
      fr: "Ce masque symbolise l'équilibre entre le ciel et la terre, l'homme et l'univers. Il représente la sagesse ancestrale dogon et leur compréhension profonde des mystères cosmiques. Il témoigne de la richesse spirituelle et philosophique de la culture dogon.",
      en: "This mask symbolizes the balance between sky and earth, man and universe. It represents Dogon ancestral wisdom and their deep understanding of cosmic mysteries. It testifies to the spiritual and philosophical richness of Dogon culture.",
      wo: "Bii masque dafa mel ni équilibre ci biir asamaan ak suuf, góor ak universe. Dafa wone sagesse ancestrale dogon ak seen compréhension bu rëy yu mystères cosmiques. Dafa wone richesse spirituelle ak philosophique bu culture dogon."
    },
    qrCode: "MCN-DOGON-001",
    location: {
      floor: "1er étage",
      room: "Salle des Traditions",
      position: "Vitrine D-2"
    },
    curator: {
      fr: "Dr. Amadou Hampâté Bâ, Ethnologue",
      en: "Dr. Amadou Hampâté Bâ, Ethnologist",
      wo: "Dr. Amadou Hampâté Bâ, Ethnologue"
    },
    acquisition: {
      fr: "Mission ethnographique, 1985",
      en: "Ethnographic mission, 1985",
      wo: "Mission ethnographique, 1985"
    },
    relatedArtworks: ["mcn-mask-001"],
    tags: ["dogon", "kanaga", "cosmologie", "mythe", "cérémonie"]
  },
  // Image A - Sculpture traditionnelle
  {
    id: "mcn-sculpture-traditionnelle-001",
    title: {
      fr: "Sculpture Traditionnelle Africaine",
      en: "Traditional African Sculpture",
      wo: "Sculpture Tradisyonel Africaine"
    },
    description: {
      fr: "Cette sculpture en bois aux proportions longues et élancées représente une figure humaine stylisée, caractéristique de l'esthétique africaine traditionnelle. L'œuvre témoigne du savoir-faire ancestral des sculpteurs africains et de leur maîtrise des techniques de travail du bois. Les proportions allongées et la stylisation géométrique reflètent les canons esthétiques traditionnels.",
      en: "This wooden sculpture with long and slender proportions represents a stylized human figure, characteristic of traditional African aesthetics. The work testifies to the ancestral know-how of African sculptors and their mastery of woodworking techniques. The elongated proportions and geometric stylization reflect traditional aesthetic canons.",
      wo: "Bii sculpture bu bois bu am proportions yu rëy ak yu ndaw dafa wone figure humaine bu stylisée, caractéristique bu esthétique africaine tradisyonel. Liggéey bi dafa wone savoir-faire ancestral bu sculpteurs africains ak seen maîtrise bu techniques bu liggéey bu bois. Proportions yu allongées ak stylisation géométrique dañu wone canons esthétiques tradisyonel."
    },
    period: {
      fr: "XIXe siècle",
      en: "19th Century",
      wo: "19e siècle"
    },
    culture: {
      fr: "Traditionnel Africain",
      en: "Traditional African",
      wo: "Tradisyonel Africain"
    },
    origin: {
      fr: "Afrique de l'Ouest",
      en: "West Africa",
      wo: "Africa de l'Ouest"
    },
    materials: {
      fr: "Bois dur, pigments naturels, cire d'abeille",
      en: "Hardwood, natural pigments, beeswax",
      wo: "Bois dur, pigments naturels, cire d'abeille"
    },
    dimensions: {
      fr: "120 cm × 25 cm × 20 cm",
      en: "120 cm × 25 cm × 20 cm",
      wo: "120 cm × 25 cm × 20 cm"
    },
    image: imageA,
    hasAudio: true,
    audioUrl: "/src/assets/audio/sculpture-traditionnelle-001-fr.mp3",
    historicalContext: {
      fr: "Les sculptures africaines traditionnelles étaient créées par des artisans spécialisés qui maîtrisaient les techniques de sculpture sur bois. Ces œuvres servaient souvent d'objets rituels, de supports de communication avec les esprits, ou d'éléments décoratifs dans les maisons et les lieux de culte. La stylisation géométrique permettait de transcender la représentation réaliste pour atteindre une dimension spirituelle.",
      en: "Traditional African sculptures were created by specialized artisans who mastered wood carving techniques. These works often served as ritual objects, supports for communication with spirits, or decorative elements in homes and places of worship. Geometric stylization allowed transcending realistic representation to reach a spiritual dimension.",
      wo: "Sculptures africaines tradisyonel dañu def ci artisans spécialisés yu xam techniques bu sculpture ci bois. Liggéey yii dañu jëkk ni objets rituels, supports ngir communication ak esprits, walla éléments décoratifs ci kër ak bérab yu jëkk. Stylisation géométrique dafa jagle transcend représentation réaliste ngir am dimension spirituelle."
    },
    culturalSignificance: {
      fr: "Cette sculpture symbolise la relation entre l'homme et le spirituel dans les cultures africaines traditionnelles. Elle représente l'idéal de beauté et d'harmonie, tout en servant de médiateur entre le monde visible et invisible. L'œuvre témoigne de la richesse artistique et spirituelle de l'Afrique.",
      en: "This sculpture symbolizes the relationship between man and the spiritual in traditional African cultures. It represents the ideal of beauty and harmony, while serving as a mediator between the visible and invisible world. The work testifies to the artistic and spiritual richness of Africa.",
      wo: "Bii sculpture dafa mel ni relation ci biir góor ak spirituel ci cultures africaines tradisyonel. Dafa wone idéal bu beauté ak harmonie, te dafa nekk médiateur ci biir aduna bu gisoo ak bii gis-gis. Liggéey bi dafa wone richesse artistique ak spirituelle bu Africa."
    },
    qrCode: "MCN-SCULPTURE-TRAD-001",
    location: {
      floor: "1er étage",
      room: "Salle des Traditions",
      position: "Vitrine E-1"
    },
    curator: {
      fr: "Dr. Fatou Diagne, Conservatrice",
      en: "Dr. Fatou Diagne, Curator",
      wo: "Dr. Fatou Diagne, Conservatrice"
    },
    acquisition: {
      fr: "Collection privée, acquis en 2019",
      en: "Private collection, acquired in 2019",
      wo: "Collection privée, acquis ci 2019"
    },
    relatedArtworks: ["mcn-mask-001", "mcn-bronze-001"],
    tags: ["sculpture", "bois", "traditionnel", "spiritualité", "esthétique"]
  },
  // Image B - Galerie détaillée
  {
    id: "mcn-galerie-detaille-001",
    title: {
      fr: "Galerie d'Exposition - Sculpture Détaillée",
      en: "Exhibition Gallery - Detailed Sculpture",
      wo: "Galerie bu Exposition - Sculpture bu Detail"
    },
    description: {
      fr: "Cette galerie présente une sculpture noire très détaillée au premier plan, entourée d'autres œuvres et de panneaux d'exposition. L'éclairage maîtrisé met en valeur les formes et les textures de l'œuvre, révélant la finesse du travail de l'artisan. Cette présentation muséale témoigne de l'importance accordée à la mise en valeur du patrimoine artistique africain.",
      en: "This gallery presents a very detailed black sculpture in the foreground, surrounded by other works and exhibition panels. The controlled lighting highlights the forms and textures of the work, revealing the finesse of the artisan's work. This museum presentation testifies to the importance given to the enhancement of African artistic heritage.",
      wo: "Bii galerie dafa wone sculpture noire bu detail bu rëy ci premier plan, entourée ci liggéey yu wene ak panneaux d'exposition. Éclairage bu maîtrisé dafa wone formes ak textures bu liggéey bi, dafa wone finesse bu liggéey bu artisan. Bii présentation muséale dafa wone importance bu jëkk ci mise en valeur bu patrimoine artistique africain."
    },
    period: {
      fr: "Exposition permanente",
      en: "Permanent exhibition",
      wo: "Exposition permanente"
    },
    culture: {
      fr: "Présentation Muséale",
      en: "Museum Presentation",
      wo: "Présentation Muséale"
    },
    origin: {
      fr: "Musée des Civilisations Noires, Dakar",
      en: "Museum of Black Civilizations, Dakar",
      wo: "Musée yu Civilisations Noires, Dakar"
    },
    materials: {
      fr: "Éclairage muséal, vitrines, socles",
      en: "Museum lighting, showcases, pedestals",
      wo: "Éclairage muséal, vitrines, socles"
    },
    dimensions: {
      fr: "Espace d'exposition",
      en: "Exhibition space",
      wo: "Espace bu exposition"
    },
    image: imageB,
    hasAudio: true,
    audioUrl: "/src/assets/audio/galerie-detaille-001-fr.mp3",
    historicalContext: {
      fr: "Cette galerie illustre l'évolution de la muséographie africaine et la reconnaissance internationale de l'art africain. L'éclairage professionnel et la mise en scène témoignent de l'importance accordée à la préservation et à la valorisation du patrimoine artistique africain dans les institutions culturelles modernes.",
      en: "This gallery illustrates the evolution of African museography and the international recognition of African art. Professional lighting and staging testify to the importance given to the preservation and enhancement of African artistic heritage in modern cultural institutions.",
      wo: "Bii galerie dafa wone évolution bu muséographie africaine ak reconnaissance internationale bu art africain. Éclairage professionnel ak mise en scène dañu wone importance bu jëkk ci préservation ak valorisation bu patrimoine artistique africain ci institutions culturelles modernes."
    },
    culturalSignificance: {
      fr: "Cette présentation muséale symbolise la reconnaissance de l'art africain comme patrimoine universel. Elle démontre que l'art africain mérite la même attention et le même respect que les autres formes d'art mondial, contribuant ainsi à la décolonisation des regards sur l'Afrique.",
      en: "This museum presentation symbolizes the recognition of African art as universal heritage. It demonstrates that African art deserves the same attention and respect as other forms of world art, thus contributing to the decolonization of views on Africa.",
      wo: "Bii présentation muséale dafa mel ni reconnaissance bu art africain ni patrimoine universel. Dafa wone ni art africain mérite même attention ak même respect ni formes yu wene yu art mondial, dafa contribution ci décolonisation bu seet ci Africa."
    },
    qrCode: "MCN-GALERIE-001",
    location: {
      floor: "1er étage",
      room: "Galerie principale",
      position: "Espace d'exposition"
    },
    curator: {
      fr: "Équipe de conservation MCN",
      en: "MCN Conservation Team",
      wo: "Équipe bu conservation MCN"
    },
    acquisition: {
      fr: "Installation permanente, 2018",
      en: "Permanent installation, 2018",
      wo: "Installation permanente, 2018"
    },
    relatedArtworks: ["mcn-sculpture-traditionnelle-001"],
    tags: ["galerie", "muséographie", "éclairage", "patrimoine", "reconnaissance"]
  },
  // Image C - Contexte culturel
  {
    id: "mcn-contexte-culturel-001",
    title: {
      fr: "Contexte Culturel et Rituels",
      en: "Cultural Context and Rituals",
      wo: "Contexte Culturel ak Rituels"
    },
    description: {
      fr: "Cette exposition présente des œuvres dans leur contexte culturel d'origine, avec un grand panneau photographique montrant une foule lors d'une cérémonie ou d'un rituel africain. Au sol, des sculptures et objets rituels témoignent de l'importance du patrimoine immatériel (chants, danses, cérémonies) qui accompagne les objets matériels.",
      en: "This exhibition presents works in their original cultural context, with a large photographic panel showing a crowd during an African ceremony or ritual. On the floor, sculptures and ritual objects testify to the importance of intangible heritage (songs, dances, ceremonies) that accompanies material objects.",
      wo: "Bii exposition dafa wone liggéey ci seen contexte culturel d'origine, ak grand panneau photographique bu wone foule ci ceremony walla ritual africain. Ci suuf, sculptures ak objets rituels dañu wone importance bu patrimoine immatériel (chants, danses, ceremonies) yu accompagne objets matériels."
    },
    period: {
      fr: "Exposition thématique",
      en: "Thematic exhibition",
      wo: "Exposition thématique"
    },
    culture: {
      fr: "Patrimoine Immatériel Africain",
      en: "African Intangible Heritage",
      wo: "Patrimoine Immatériel Africain"
    },
    origin: {
      fr: "Communautés africaines",
      en: "African communities",
      wo: "Communautés africaines"
    },
    materials: {
      fr: "Photographies, objets rituels, sculptures",
      en: "Photographs, ritual objects, sculptures",
      wo: "Photographies, objets rituels, sculptures"
    },
    dimensions: {
      fr: "Installation immersive",
      en: "Immersive installation",
      wo: "Installation immersive"
    },
    image: imageC,
    hasAudio: true,
    audioUrl: "/src/assets/audio/contexte-culturel-001-fr.mp3",
    historicalContext: {
      fr: "Cette exposition met en lumière l'importance du patrimoine immatériel africain, souvent négligé dans les musées traditionnels. Elle montre comment les objets matériels s'inscrivent dans un contexte culturel plus large, incluant les cérémonies, les danses, les chants et les rituels qui leur donnent leur véritable signification.",
      en: "This exhibition highlights the importance of African intangible heritage, often neglected in traditional museums. It shows how material objects fit into a broader cultural context, including ceremonies, dances, songs and rituals that give them their true meaning.",
      wo: "Bii exposition dafa wone importance bu patrimoine immatériel africain, yu souvent négligé ci musées tradisyonel. Dafa wone ni objets matériels dañu nekk ci contexte culturel bu gën a rëy, ak ceremonies, danses, chants ak rituels yu joxe seen signification bu dëgg."
    },
    culturalSignificance: {
      fr: "Cette approche révolutionne la muséographie en montrant que l'art africain ne peut être compris qu'à travers son contexte culturel complet. Elle valorise le patrimoine immatériel et contribue à la préservation des traditions orales et des pratiques culturelles vivantes.",
      en: "This approach revolutionizes museography by showing that African art can only be understood through its complete cultural context. It enhances intangible heritage and contributes to the preservation of oral traditions and living cultural practices.",
      wo: "Bii approche dafa révolutionner muséographie ci wone ni art africain man na ñu ko xam ci kanam contexte culturel bu leer. Dafa valoriser patrimoine immatériel ak contribution ci préservation bu traditions orales ak pratiques culturelles yu dëgg."
    },
    qrCode: "MCN-CONTEXTE-001",
    location: {
      floor: "2e étage",
      room: "Salle du Patrimoine Immatériel",
      position: "Installation centrale"
    },
    curator: {
      fr: "Dr. Aminata Traoré, Ethnologue",
      en: "Dr. Aminata Traoré, Ethnologist",
      wo: "Dr. Aminata Traoré, Ethnologue"
    },
    acquisition: {
      fr: "Partenariat avec communautés locales, 2020",
      en: "Partnership with local communities, 2020",
      wo: "Partenariat ak communautés locales, 2020"
    },
    relatedArtworks: ["mcn-sculpture-traditionnelle-001"],
    tags: ["patrimoine", "immatériel", "rituel", "communauté", "tradition"]
  },
  // Image D - Sculptures monumentales
  {
    id: "mcn-sculptures-monumentales-001",
    title: {
      fr: "Sculptures Monumentales",
      en: "Monumental Sculptures",
      wo: "Sculptures Monumentales"
    },
    description: {
      fr: "Ces deux grandes sculptures verticales, imposantes et relativement abstraites, trônent dans l'espace lumineux et ouvert du musée. Elles représentent l'architecture intérieure du musée et la dimension monumentale des œuvres africaines. Ces sculptures témoignent de la capacité de l'art africain à créer des œuvres de grande envergure.",
      en: "These two large vertical sculptures, imposing and relatively abstract, stand in the bright and open space of the museum. They represent the interior architecture of the museum and the monumental dimension of African works. These sculptures testify to the ability of African art to create large-scale works.",
      wo: "Sculptures yu ñaar yu gërë yu vertical, yu imposantes ak relativement abstraites, dañu nekk ci espace bu lumineux ak ouvert bu musée. Dañu wone architecture intérieure bu musée ak dimension monumentale bu liggéey yu africaines. Sculptures yii dañu wone capacité bu art africain ngir def liggéey yu gën a rëy."
    },
    period: {
      fr: "Contemporain",
      en: "Contemporary",
      wo: "Contemporain"
    },
    culture: {
      fr: "Art Contemporain Africain",
      en: "Contemporary African Art",
      wo: "Art Contemporain Africain"
    },
    origin: {
      fr: "Afrique de l'Ouest",
      en: "West Africa",
      wo: "Africa de l'Ouest"
    },
    materials: {
      fr: "Bronze, acier, béton, techniques mixtes",
      en: "Bronze, steel, concrete, mixed techniques",
      wo: "Bronze, acier, béton, techniques mixtes"
    },
    dimensions: {
      fr: "Sculptures monumentales (3-4 mètres)",
      en: "Monumental sculptures (3-4 meters)",
      wo: "Sculptures monumentales (3-4 mètres)"
    },
    image: imageD,
    hasAudio: true,
    audioUrl: "/src/assets/audio/sculptures-monumentales-001-fr.mp3",
    historicalContext: {
      fr: "Ces sculptures monumentales illustrent l'évolution de l'art africain vers des formats plus grands et plus ambitieux. Elles témoignent de la capacité des artistes africains contemporains à créer des œuvres qui rivalisent avec les plus grandes créations mondiales, tout en conservant leur identité culturelle unique.",
      en: "These monumental sculptures illustrate the evolution of African art towards larger and more ambitious formats. They testify to the ability of contemporary African artists to create works that rival the greatest world creations, while preserving their unique cultural identity.",
      wo: "Sculptures monumentales yii dañu wone évolution bu art africain ci formats yu gën a rëy ak yu gën a ambitieux. Dañu wone capacité bu artistes africains contemporains ngir def liggéey yu rivaliser ak créations yu gën a gërë yu aduna, te dañu préservation ci identité culturelle unique."
    },
    culturalSignificance: {
      fr: "Ces œuvres monumentales symbolisent l'ambition de l'art africain contemporain et sa capacité à s'exprimer à grande échelle. Elles démontrent que l'art africain peut être à la fois traditionnel et moderne, local et universel, contribuant ainsi à la reconnaissance internationale de la créativité africaine.",
      en: "These monumental works symbolize the ambition of contemporary African art and its ability to express itself on a large scale. They demonstrate that African art can be both traditional and modern, local and universal, thus contributing to the international recognition of African creativity.",
      wo: "Liggéey monumentales yii dañu mel ni ambition bu art africain contemporain ak sa capacité ngir wone ci échelle bu rëy. Dañu wone ni art africain man na ñu ko nekk ni tradisyonel ak moderne, local ak universel, dafa contribution ci reconnaissance internationale bu créativité africaine."
    },
    qrCode: "MCN-MONUMENTAL-001",
    location: {
      floor: "Rez-de-chaussée",
      room: "Hall principal",
      position: "Espace central"
    },
    curator: {
      fr: "Dr. Ousmane Sow, Sculpteur",
      en: "Dr. Ousmane Sow, Sculptor",
      wo: "Dr. Ousmane Sow, Sculpteur"
    },
    acquisition: {
      fr: "Commande spéciale pour l'ouverture du MCN, 2018",
      en: "Special commission for MCN opening, 2018",
      wo: "Commande spéciale ngir uverture bu MCN, 2018"
    },
    relatedArtworks: ["mcn-baobab-001", "mcn-renaissance-001"],
    tags: ["monumental", "contemporain", "architecture", "ambition", "universel"]
  }
];
