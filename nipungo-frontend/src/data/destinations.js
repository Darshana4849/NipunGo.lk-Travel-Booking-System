export const destinations = [
  {
    id: 1,
    slug: 'sigiriya',
    name: 'Sigiriya',
    province: 'Central Province',
    tagline: 'The Eighth Wonder of the World',
    description:
      'Sigiriya, also known as Lion Rock, is an ancient rock fortress rising dramatically 200 meters above the surrounding jungle. Built by King Kashyapa in the 5th century AD, this UNESCO World Heritage Site features remarkable frescoes, mirror walls, and stunning panoramic views that will leave you breathless.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80',
      'https://images.unsplash.com/photo-1559494007-9f5847c49d94?w=800&q=80',
      'https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?w=800&q=80',
    ],
    rating: 4.9,
    reviewCount: 2847,
    category: 'Heritage',
    highlights: [
      'UNESCO World Heritage Site',
      'Ancient rock fortress from 5th century',
      'Stunning 360° panoramic views',
      'Remarkable cave frescoes',
      'Mirror Wall with ancient graffiti',
    ],
    attractions: [
      { name: 'Rock Summit', description: 'Climb 1,200 steps to the magnificent summit with breathtaking views.' },
      { name: 'Sigiriya Frescoes', description: 'Marvel at ancient paintings of celestial maidens carved into the rock face.' },
      { name: 'Water Gardens', description: 'Explore the sophisticated ancient water garden system at the base.' },
      { name: 'Lion\'s Paw Entrance', description: 'Walk through the iconic giant lion-paw gateway carved from the rock.' },
      { name: 'Museum', description: 'Discover artifacts and the history of King Kashyapa\'s reign.' },
    ],
    bestTime: 'December to April',
    duration: '1–2 days',
    difficulty: 'Moderate',
    entryFee: 'USD 30 (foreigners)',
    coordinates: { lat: 7.9570, lng: 80.7603 },
    featured: true,
    popular: true,
  },
  {
    id: 2,
    slug: 'ella',
    name: 'Ella',
    province: 'Uva Province',
    tagline: 'Heaven in the Hills',
    description:
      'Ella is a small town nestled in the verdant highlands of Sri Lanka, famous for its misty mountains, lush tea plantations, stunning waterfalls, and the iconic Nine Arch Bridge. It\'s the perfect destination for hikers, nature lovers, and anyone seeking a peaceful escape from the hustle of city life.',
    image: 'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&q=80',
      'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=800&q=80',
      'https://images.unsplash.com/photo-1591478734733-c30b3f88e9a6?w=800&q=80',
    ],
    rating: 4.8,
    reviewCount: 3201,
    category: 'Nature',
    highlights: [
      'Famous Nine Arch Bridge',
      'Little Adam\'s Peak hike',
      'Ravana Falls waterfall',
      'Spectacular train journeys',
      'Tea plantation tours',
    ],
    attractions: [
      { name: 'Nine Arch Bridge', description: 'Photograph the iconic colonial-era railway bridge spanning a lush valley.' },
      { name: 'Little Adam\'s Peak', description: 'Hike to this easily accessible peak for panoramic highland views.' },
      { name: 'Ravana Falls', description: 'Visit the famous 25-meter wide cascade with mythological significance.' },
      { name: 'Ella Rock', description: 'Take on this challenging trek for incredible views over the Ella Gap.' },
      { name: 'Tea Plantations', description: 'Tour working tea estates and learn the art of Ceylon tea production.' },
    ],
    bestTime: 'December to March, July to September',
    duration: '2–4 days',
    difficulty: 'Easy to Moderate',
    entryFee: 'Free (individual attractions may charge)',
    coordinates: { lat: 6.8667, lng: 81.0466 },
    featured: true,
    popular: true,
  },
  {
    id: 3,
    slug: 'nuwara-eliya',
    name: 'Nuwara Eliya',
    province: 'Central Province',
    tagline: 'Little England of Sri Lanka',
    description:
      'Perched at 1,868 meters above sea level, Nuwara Eliya is Sri Lanka\'s highest city, offering a cool climate and stunning colonial architecture that earned it the nickname "Little England." Surrounded by manicured tea estates, scenic waterfalls, and a serene lake, it\'s the ultimate highland retreat.',
    image: 'https://images.unsplash.com/photo-1609766934878-b540dea56f3c?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=800&q=80',
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&q=80',
      'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80',
    ],
    rating: 4.7,
    reviewCount: 1923,
    category: 'Hill Country',
    highlights: [
      'Pedro Tea Estate tour',
      'Gregory Lake boating',
      'Victoria Park gardens',
      'Horton Plains day trip',
      'Colonial architecture',
    ],
    attractions: [
      { name: 'Pedro Tea Estate', description: 'Tour one of the oldest and most famous tea factories in the highlands.' },
      { name: 'Gregory Lake', description: 'Enjoy boating, cycling, and picnics by this beautiful man-made lake.' },
      { name: 'Hakgala Botanical Garden', description: 'Stroll through 28 acres of stunning gardens at 1,745m altitude.' },
      { name: 'Horton Plains', description: 'Day trip to UNESCO site with dramatic World\'s End cliff and Baker\'s Falls.' },
      { name: 'Victoria Park', description: 'A colonial-era park perfect for morning walks and bird watching.' },
    ],
    bestTime: 'January to April',
    duration: '2–3 days',
    difficulty: 'Easy',
    entryFee: 'Free (Horton Plains: USD 15)',
    coordinates: { lat: 6.9497, lng: 80.7891 },
    featured: false,
    popular: true,
  },
  {
    id: 4,
    slug: 'kandy',
    name: 'Kandy',
    province: 'Central Province',
    tagline: 'The Cultural Capital of Sri Lanka',
    description:
      'Kandy, the last royal capital of Sri Lanka, is a city of profound cultural and spiritual significance. Home to the sacred Temple of the Tooth Relic, a UNESCO World Heritage Site, and surrounded by mountains and the scenic Kandy Lake, it remains the heartbeat of traditional Kandyan culture, arts, and crafts.',
    image: 'https://images.unsplash.com/photo-1566559532949-f82d6e0e6b3c?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&q=80',
      'https://images.unsplash.com/photo-1602600632349-7775a1695516?w=800&q=80',
      'https://images.unsplash.com/photo-1596475756523-6e8b21d2cac6?w=800&q=80',
    ],
    rating: 4.8,
    reviewCount: 4102,
    category: 'Culture',
    highlights: [
      'Temple of the Sacred Tooth Relic',
      'Kandy Esala Perahera festival',
      'Royal Botanical Gardens',
      'Traditional Kandyan dance shows',
      'Kandy Lake walks',
    ],
    attractions: [
      { name: 'Temple of the Tooth', description: 'Visit Sri Lanka\'s most sacred Buddhist temple housing the relic of Buddha\'s tooth.' },
      { name: 'Royal Botanical Gardens', description: 'Explore 147 acres of exquisite gardens at Peradeniya with 4,000+ plant species.' },
      { name: 'Kandy Lake', description: 'Walk the scenic pathway around the serene lake in the heart of the city.' },
      { name: 'Kandy Cultural Show', description: 'Watch mesmerizing traditional Kandyan dance and drumming performances.' },
      { name: 'Udawattekele Forest', description: 'Trek through a cool forest sanctuary right in the middle of Kandy city.' },
    ],
    bestTime: 'December to April',
    duration: '2–3 days',
    difficulty: 'Easy',
    entryFee: 'Temple: LKR 3,000; Gardens: USD 15',
    coordinates: { lat: 7.2906, lng: 80.6337 },
    featured: true,
    popular: true,
  },
  {
    id: 5,
    slug: 'mirissa',
    name: 'Mirissa',
    province: 'Southern Province',
    tagline: 'Tropical Beach Paradise',
    description:
      'Mirissa is Sri Lanka\'s premier beach destination — a crescent-shaped bay fringed with coconut palms and turquoise waves. Famous for world-class whale watching, vibrant surf breaks, fresh seafood, and spectacular sunsets, Mirissa perfectly blends tropical relaxation with adventure.',
    image: 'https://images.unsplash.com/photo-1602002418082-a4443978a11c?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
      'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&q=80',
      'https://images.unsplash.com/photo-1473186578172-c141e6798cf4?w=800&q=80',
    ],
    rating: 4.7,
    reviewCount: 2651,
    category: 'Beach',
    highlights: [
      'Blue whale watching tours',
      'Surfing and water sports',
      'Secret Beach hideaway',
      'Coconut Hill sunset views',
      'Fresh seafood restaurants',
    ],
    attractions: [
      { name: 'Whale Watching', description: 'Spot blue and sperm whales on morning boat tours from November to April.' },
      { name: 'Mirissa Beach', description: 'Swim, surf, or simply relax on this picturesque golden sand beach.' },
      { name: 'Secret Beach', description: 'Discover a secluded rock-pool beach accessed by a short coastal trail.' },
      { name: 'Coconut Hill', description: 'Hike to the hilltop for Instagram-famous panoramic sunset views.' },
      { name: 'Parrot Rock', description: 'Wade across to this small rocky islet with a great vantage point.' },
    ],
    bestTime: 'November to April',
    duration: '3–5 days',
    difficulty: 'Easy',
    entryFee: 'Free (whale watching: USD 30-40)',
    coordinates: { lat: 5.9456, lng: 80.4588 },
    featured: true,
    popular: true,
  },
  {
    id: 6,
    slug: 'galle',
    name: 'Galle',
    province: 'Southern Province',
    tagline: 'Historic Charm Meets Coastal Elegance',
    description:
      'Galle is a city where centuries of history meet contemporary cool. The Galle Fort, a UNESCO World Heritage Site built by the Portuguese and expanded by the Dutch, is home to atmospheric cobblestone streets, boutique hotels, art galleries, and some of the finest restaurants in Sri Lanka, all surrounded by imposing ramparts overlooking the Indian Ocean.',
    image: 'https://images.unsplash.com/photo-1567766338168-4a28de7af72f?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1562961840-3f3f73e40bc6?w=800&q=80',
      'https://images.unsplash.com/photo-1571443672427-0dd6be65a5d6?w=800&q=80',
      'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=800&q=80',
    ],
    rating: 4.8,
    reviewCount: 3456,
    category: 'Heritage',
    highlights: [
      'UNESCO Galle Fort',
      'Dutch colonial architecture',
      'Lighthouse and rampart walks',
      'Boutique shopping and galleries',
      'Sunset over Indian Ocean',
    ],
    attractions: [
      { name: 'Galle Fort', description: 'Wander cobblestone streets inside this perfectly preserved 17th-century fort.' },
      { name: 'Lighthouse', description: 'Visit Sri Lanka\'s oldest lighthouse with ocean views from the ramparts.' },
      { name: 'Dutch Reformed Church', description: 'Explore the historic 1755 church with original gravestones on the floor.' },
      { name: 'National Maritime Museum', description: 'Learn about Sri Lanka\'s naval history in a colonial-era warehouse.' },
      { name: 'Unawatuna Beach', description: 'Relax at the beautiful beach just 3km from the fort.' },
    ],
    bestTime: 'December to April',
    duration: '2–3 days',
    difficulty: 'Easy',
    entryFee: 'Free',
    coordinates: { lat: 6.0535, lng: 80.2210 },
    featured: false,
    popular: true,
  },
  {
    id: 7,
    slug: 'yala',
    name: 'Yala',
    province: 'Southern Province',
    tagline: 'Sri Lanka\'s Premier Wildlife Safari',
    description:
      'Yala National Park is Sri Lanka\'s most visited national park and one of the best places in the world to spot leopards in the wild. Spanning over 979 square kilometers of dry-zone forest, scrub, grassland, and coastal lagoons, Yala is home to an incredible diversity of wildlife including elephants, sloth bears, crocodiles, and over 200 bird species.',
    image: 'https://images.unsplash.com/photo-1561553873-e8491a564fd0?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1572027102157-4ec01e5ca24f?w=800&q=80',
      'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80',
      'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80',
    ],
    rating: 4.9,
    reviewCount: 1876,
    category: 'Wildlife',
    highlights: [
      'Highest leopard density in world',
      'Elephant herds at waterholes',
      'Endemic bird species',
      'Sloth bear sightings',
      'Coastal lagoon landscapes',
    ],
    attractions: [
      { name: 'Leopard Safari', description: 'Yala has the highest density of leopards in the world — spot them at dawn.' },
      { name: 'Elephant Watching', description: 'Witness large elephant herds at watering holes in the dry season.' },
      { name: 'Bird Watching', description: 'Spot 215+ bird species including painted storks and peacocks.' },
      { name: 'Crocodile Pools', description: 'See large mugger crocodiles basking in the park\'s many lagoons.' },
      { name: 'Sithulpawwa Temple', description: 'Visit an ancient rock temple sanctuary within the park\'s borders.' },
    ],
    bestTime: 'February to July',
    duration: '2–3 days',
    difficulty: 'Easy (Safari)',
    entryFee: 'USD 40 + vehicle + tracker fees',
    coordinates: { lat: 6.3728, lng: 81.5226 },
    featured: true,
    popular: true,
  },
  {
    id: 8,
    slug: 'arugam-bay',
    name: 'Arugam Bay',
    province: 'Eastern Province',
    tagline: 'Surfer\'s Paradise on the East Coast',
    description:
      'Arugam Bay is Sri Lanka\'s east coast gem and a world-renowned surfing destination. With its legendary point break, laid-back vibe, stunning lagoons, and incredible wildlife in nearby Kumana National Park, A-Bay (as locals call it) is the perfect blend of adventure, nature, and relaxation that draws visitors from around the globe.',
    image: 'https://images.unsplash.com/photo-1531722569936-825d4ebd4fa5?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1530053969600-caed2596d242?w=800&q=80',
      'https://images.unsplash.com/photo-1455729552865-3658a5d39692?w=800&q=80',
      'https://images.unsplash.com/photo-1514477917009-389c76a86b68?w=800&q=80',
    ],
    rating: 4.7,
    reviewCount: 1432,
    category: 'Beach',
    highlights: [
      'World-class surfing point break',
      'Lagoon boat safaris',
      'Kumana National Park',
      'Elephant Point beach',
      'Pottuvil Lagoon sunsets',
    ],
    attractions: [
      { name: 'Main Point Break', description: 'Surf one of Asia\'s top-rated right-hand point breaks from May to October.' },
      { name: 'Pottuvil Lagoon', description: 'Kayak or boat through the lagoon\'s mangroves and spot crocodiles and birds.' },
      { name: 'Kumana National Park', description: 'Visit this remote national park with elephants, leopards, and vast bird colonies.' },
      { name: 'Elephant Point', description: 'Watch wild elephants walking on the beach at this spectacular sandbar.' },
      { name: 'Whiskey Point', description: 'Explore this quieter surfing spot with a more relaxed atmosphere.' },
    ],
    bestTime: 'May to October',
    duration: '3–7 days',
    difficulty: 'Easy',
    entryFee: 'Free (surfing lessons extra)',
    coordinates: { lat: 6.8452, lng: 81.8358 },
    featured: false,
    popular: true,
  },
];

export const getDestinationById = (id) =>
  destinations.find((d) => d.id === parseInt(id) || d.slug === id);

export const getFeaturedDestinations = () =>
  destinations.filter((d) => d.featured);

export const getPopularDestinations = () =>
  destinations.filter((d) => d.popular);

export const getDestinationsByCategory = (category) =>
  destinations.filter((d) => d.category === category);

export const searchDestinations = (query) => {
  const q = query.toLowerCase();
  return destinations.filter(
    (d) =>
      d.name.toLowerCase().includes(q) ||
      d.province.toLowerCase().includes(q) ||
      d.category.toLowerCase().includes(q) ||
      d.tagline.toLowerCase().includes(q)
  );
};

export const categories = ['All', 'Heritage', 'Nature', 'Beach', 'Wildlife', 'Culture', 'Hill Country'];

export default destinations;
