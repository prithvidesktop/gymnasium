/* ============================================================
   FLEXPASS — GYMS & STUDIOS DATA
   ============================================================ */
window.FP = window.FP || {};
FP.data = FP.data || {};

FP.data.gyms = [
  {
    id: 'gym_001',
    name: 'Iron Temple Fitness',
    type: 'gym',
    types: ['Gym', 'CrossFit'],
    address: 'Indiranagar, Bangalore',
    city: 'Bangalore',
    lat: 12.9784,
    lng: 77.6408,
    distance: 0.8,
    rating: 4.8,
    reviewCount: 312,
    pricePerSession: 199,
    tier: 'pro',  /* basic | pro | elite */
    amenities: ['AC', 'Locker Room', 'Parking', 'Showers', 'Smoothie Bar'],
    activityTypes: ['Weight Training', 'CrossFit', 'Cardio'],
    timings: { weekday: '5:00 AM - 11:00 PM', weekend: '6:00 AM - 10:00 PM' },
    capacity: 60,
    currentOccupancy: 23,
    emoji: '🏋️',
    image: null,
    description: 'State-of-the-art equipment with certified trainers. The most well-equipped gym in Indiranagar with global-standard machines.',
    reviews: [
      { name: 'Arjun S.', rating: 5, comment: 'Best gym in Bangalore! Equipment is top-notch and trainers are very helpful.', date: '2 days ago' },
      { name: 'Priya M.', rating: 5, comment: 'Love the vibe here. Clean, spacious, and great music.', date: '1 week ago' },
      { name: 'Rohit K.', rating: 4, comment: 'Great facilities. Sometimes gets crowded in evenings.', date: '2 weeks ago' }
    ],
    tags: ['Powerlifting', 'CrossFit', 'Certified Trainers'],
    featured: true
  },
  {
    id: 'gym_002',
    name: 'Serenity Yoga Studio',
    type: 'yoga',
    types: ['Yoga', 'Meditation'],
    address: 'Koramangala, Bangalore',
    city: 'Bangalore',
    lat: 12.9352,
    lng: 77.6244,
    distance: 1.4,
    rating: 4.9,
    reviewCount: 189,
    pricePerSession: 249,
    tier: 'pro',
    amenities: ['AC', 'Mats Provided', 'Shower', 'Tea Corner'],
    activityTypes: ['Hatha Yoga', 'Vinyasa', 'Meditation', 'Pranayama'],
    timings: { weekday: '6:00 AM - 9:00 PM', weekend: '7:00 AM - 7:00 PM' },
    capacity: 20,
    currentOccupancy: 8,
    emoji: '🧘',
    image: null,
    description: 'A peaceful refuge in the heart of the city. 10+ certified yoga instructors, all yoga styles, monthly immunity workshops.',
    reviews: [
      { name: 'Deepa R.', rating: 5, comment: 'The instructors are so calming and professional. Truly a healing space.', date: '3 days ago' },
      { name: 'Anika T.', rating: 5, comment: 'Best yoga studio Bangalore has. The morning sessions are magical!', date: '5 days ago' }
    ],
    tags: ['Hatha', 'Vinyasa', 'Meditation'],
    featured: true
  },
  {
    id: 'gym_003',
    name: 'AquaFit Swimming Club',
    type: 'swimming',
    types: ['Swimming'],
    address: 'Powai, Mumbai',
    city: 'Mumbai',
    lat: 19.1291,
    lng: 72.9087,
    distance: 2.1,
    rating: 4.6,
    reviewCount: 98,
    pricePerSession: 299,
    tier: 'elite',
    amenities: ['Olympic Pool', 'Changing Room', 'Towels', 'Lifeguard', 'Parking'],
    activityTypes: ['Open Swim', 'Coaching', 'Kids Classes', 'Water Aerobics'],
    timings: { weekday: '5:30 AM - 9:00 PM', weekend: '6:00 AM - 8:00 PM' },
    capacity: 30,
    currentOccupancy: 12,
    emoji: '🏊',
    image: null,
    description: 'Olympic-size heated pool. FINA certified coaches for competitive swimming and recreation.',
    reviews: [
      { name: 'Kavya N.', rating: 5, comment: 'Beautiful pool and excellent coaching staff. My kids love it!', date: '1 week ago' }
    ],
    tags: ['Olympic Pool', 'FINA Certified', 'Kids Programs']
  },
  {
    id: 'gym_004',
    name: 'FightClub MMA',
    type: 'martial_arts',
    types: ['Martial Arts', 'MMA'],
    address: 'Hauz Khas, Delhi',
    city: 'Delhi',
    lat: 28.5494,
    lng: 77.1989,
    distance: 1.2,
    rating: 4.7,
    reviewCount: 204,
    pricePerSession: 349,
    tier: 'elite',
    amenities: ['AC', 'Boxing Ring', 'Mats', 'Showers', 'Gear Shop'],
    activityTypes: ['MMA', 'Boxing', 'Muay Thai', 'BJJ', 'Kickboxing'],
    timings: { weekday: '6:00 AM - 10:00 PM', weekend: '7:00 AM - 9:00 PM' },
    capacity: 25,
    currentOccupancy: 18,
    emoji: '🥊',
    image: null,
    description: 'Delhi\'s premier combat sports academy. Train with national-level athletes and certified coaches.',
    reviews: [
      { name: 'Varun D.', rating: 5, comment: 'Incredible place to train. The coaches really push you to your limits.', date: '4 days ago' },
      { name: 'Sanya G.', rating: 4, comment: 'Great for boxing and BJJ. Very welcoming to beginners.', date: '1 week ago' }
    ],
    tags: ['MMA', 'Boxing', 'Muay Thai', 'BJJ']
  },
  {
    id: 'gym_005',
    name: 'StepUp Dance Academy',
    type: 'dance',
    types: ['Dance'],
    address: 'Andheri West, Mumbai',
    city: 'Mumbai',
    lat: 19.1341,
    lng: 72.8271,
    distance: 0.6,
    rating: 4.5,
    reviewCount: 156,
    pricePerSession: 199,
    tier: 'basic',
    amenities: ['AC', 'Sound System', 'Mirrors', 'Changing Room'],
    activityTypes: ['Bollywood', 'Hip Hop', 'Salsa', 'Contemporary', 'Zumba'],
    timings: { weekday: '7:00 AM - 9:00 PM', weekend: '8:00 AM - 8:00 PM' },
    capacity: 30,
    currentOccupancy: 15,
    emoji: '💃',
    image: null,
    description: 'Mumbai\'s most energetic dance studio with 15+ styles taught by professional choreographers.',
    reviews: [
      { name: 'Ishaan A.', rating: 5, comment: 'So much fun! The Bollywood class is amazing. Highly recommend.', date: '2 days ago' }
    ],
    tags: ['Bollywood', 'Hip Hop', 'Zumba'],
    featured: true
  },
  {
    id: 'gym_006',
    name: 'Cult.Run Track',
    type: 'gym',
    types: ['Gym', 'Running'],
    address: 'Banjara Hills, Hyderabad',
    city: 'Hyderabad',
    lat: 17.4149,
    lng: 78.4476,
    distance: 3.2,
    rating: 4.4,
    reviewCount: 87,
    pricePerSession: 149,
    tier: 'basic',
    amenities: ['Parking', 'Locker', 'Trainer'],
    activityTypes: ['Running', 'HIIT', 'Strength', 'Stretching'],
    timings: { weekday: '5:00 AM - 10:00 PM', weekend: '5:00 AM - 9:00 PM' },
    capacity: 50,
    currentOccupancy: 22,
    emoji: '🏃',
    image: null,
    description: 'Community running track with professional coaching programs and interval training.',
    reviews: [
      { name: 'Mihir P.', rating: 4, comment: 'Good track facility and the coaches are knowledgeable.', date: '1 week ago' }
    ],
    tags: ['Running', 'HIIT', 'Interval Training']
  },
  {
    id: 'gym_007',
    name: 'FlexZone Crossfit',
    type: 'gym',
    types: ['Gym', 'CrossFit', 'HIIT'],
    address: 'Jubilee Hills, Hyderabad',
    city: 'Hyderabad',
    lat: 17.4269,
    lng: 78.4068,
    distance: 1.7,
    rating: 4.7,
    reviewCount: 234,
    pricePerSession: 299,
    tier: 'pro',
    amenities: ['AC', 'CrossFit Rig', 'Locker Room', 'Protein Bar'],
    activityTypes: ['CrossFit', 'Olympic Lifting', 'HIIT', 'Functional Fitness'],
    timings: { weekday: '5:30 AM - 9:30 PM', weekend: '6:00 AM - 8:00 PM' },
    capacity: 20,
    currentOccupancy: 9,
    emoji: '⚡',
    image: null,
    description: 'Certified CrossFit Box with Level 2 coaches. Home to multiple state-level champions.',
    reviews: [
      { name: 'Neha L.', rating: 5, comment: 'The community here is amazing! Every WOD is a new challenge.', date: '3 days ago' }
    ],
    tags: ['CrossFit', 'Olympic Lifting', 'Community']
  },
  {
    id: 'gym_008',
    name: 'Zen Zen Pilates',
    type: 'pilates',
    types: ['Pilates', 'Yoga'],
    address: 'Nungambakkam, Chennai',
    city: 'Chennai',
    lat: 13.0604,
    lng: 80.2496,
    distance: 0.5,
    rating: 4.6,
    reviewCount: 112,
    pricePerSession: 349,
    tier: 'elite',
    amenities: ['AC', 'Reformer Machines', 'Shower', 'Aromatherapy'],
    activityTypes: ['Reformer Pilates', 'Mat Pilates', 'Yin Yoga', 'Barre'],
    timings: { weekday: '7:00 AM - 8:00 PM', weekend: '8:00 AM - 6:00 PM' },
    capacity: 12,
    currentOccupancy: 4,
    emoji: '🌸',
    image: null,
    description: 'Premium boutique Pilates studio with imported Reformer machines and expert instructors.',
    reviews: [
      { name: 'Meera S.', rating: 5, comment: 'Life-changing studio. The pilates reformer classes are extraordinary!', date: '5 days ago' }
    ],
    tags: ['Reformer Pilates', 'Barre', 'Premium']
  },
  {
    id: 'gym_009',
    name: 'PowerHouse Gym',
    type: 'gym',
    types: ['Gym'],
    address: 'Whitefield, Bangalore',
    city: 'Bangalore',
    lat: 12.9698,
    lng: 77.7499,
    distance: 4.5,
    rating: 4.3,
    reviewCount: 178,
    pricePerSession: 149,
    tier: 'basic',
    amenities: ['Parking', 'Lockers', 'Trainer on Duty'],
    activityTypes: ['Weight Training', 'Cardio', 'Group Classes'],
    timings: { weekday: '5:30 AM - 10:30 PM', weekend: '6:00 AM - 9:00 PM' },
    capacity: 80,
    currentOccupancy: 35,
    emoji: '💪',
    image: null,
    description: 'Whitefield\'s top budget-friendly gym with all essential equipment and certified personal trainers.',
    reviews: [
      { name: 'Vishal R.', rating: 4, comment: 'Good value for money. Equipment is well-maintained.', date: '1 week ago' }
    ],
    tags: ['Budget Friendly', 'Weight Training', 'Cardio']
  },
  {
    id: 'gym_010',
    name: 'TennisHub Academy',
    type: 'sports',
    types: ['Sports', 'Tennis'],
    address: 'DLF Phase 2, Gurgaon',
    city: 'Gurgaon',
    lat: 28.4949,
    lng: 77.0904,
    distance: 2.8,
    rating: 4.5,
    reviewCount: 67,
    pricePerSession: 449,
    tier: 'elite',
    amenities: ['4 Courts', 'Ball Machine', 'Coaching', 'Cafeteria', 'Parking'],
    activityTypes: ['Tennis', 'Badminton', 'Squash'],
    timings: { weekday: '6:00 AM - 10:00 PM', weekend: '5:00 AM - 10:00 PM' },
    capacity: 40,
    currentOccupancy: 16,
    emoji: '🎾',
    image: null,
    description: 'Professional tennis academy with ATP-certified coaches and floodlit courts.',
    reviews: [
      { name: 'Rekha K.', rating: 5, comment: 'Outstanding coaching. My kids have improved dramatically in just 2 months!', date: '2 days ago' }
    ],
    tags: ['ATP Certified', 'Coaching', 'Sports']
  },
  {
    id: 'gym_011',
    name: 'SportsFit Arena',
    type: 'sports',
    types: ['Gym', 'Sports', 'CrossFit'],
    address: 'Sector 18, Noida',
    city: 'Noida',
    lat: 28.5708,
    lng: 77.3219,
    distance: 1.9,
    rating: 4.4,
    reviewCount: 143,
    pricePerSession: 199,
    tier: 'pro',
    amenities: ['AC', 'Sports Ground', 'Gym', 'Shower', 'Coaching'],
    activityTypes: ['Basketball', 'Football', 'Cricket', 'Gym', 'HIIT'],
    timings: { weekday: '5:00 AM - 11:00 PM', weekend: '5:00 AM - 10:00 PM' },
    capacity: 100,
    currentOccupancy: 45,
    emoji: '🏀',
    image: null,
    description: 'Multi-sport complex with indoor courts, full gym, and expert coaching.',
    reviews: [
      { name: 'Amit B.', rating: 4, comment: 'Great facilities for both gym and sports. Love the basketball court!', date: '3 days ago' }
    ],
    tags: ['Basketball', 'Multi-Sport', 'Indoor Courts']
  },
  {
    id: 'gym_012',
    name: 'Wellness By Nature',
    type: 'wellness',
    types: ['Wellness', 'Meditation', 'Yoga'],
    address: 'HSR Layout, Bangalore',
    city: 'Bangalore',
    lat: 12.9121,
    lng: 77.6446,
    distance: 2.3,
    rating: 4.8,
    reviewCount: 91,
    pricePerSession: 399,
    tier: 'elite',
    amenities: ['AC', 'Sauna', 'Steam Room', 'Spa', 'Organic Cafe'],
    activityTypes: ['Meditation', 'Sound Healing', 'Yoga Nidra', 'Spa Treatments'],
    timings: { weekday: '7:00 AM - 9:00 PM', weekend: '8:00 AM - 7:00 PM' },
    capacity: 15,
    currentOccupancy: 6,
    emoji: '🌿',
    image: null,
    description: 'A holistic wellness retreat in the city. Experience healing, relaxation, and mindful movement.',
    reviews: [
      { name: 'Sunita P.', rating: 5, comment: 'Pure luxury and relaxation. The sound healing sessions are transformative.', date: '6 days ago' }
    ],
    tags: ['Wellness', 'Spa', 'Holistic'],
    featured: true
  },
  {
    id: 'gym_013',
    name: 'Agility Sports Complex',
    type: 'sports',
    types: ['Sports', 'Gym'],
    address: 'Wakad, Pune',
    city: 'Pune',
    lat: 18.5974,
    lng: 73.7617,
    distance: 3.0,
    rating: 4.3,
    reviewCount: 77,
    pricePerSession: 179,
    tier: 'basic',
    amenities: ['Parking', 'Locker Room', 'Sports Court', 'Cafeteria'],
    activityTypes: ['Badminton', 'Table Tennis', 'Box Cricket', 'Gym'],
    timings: { weekday: '6:00 AM - 10:00 PM', weekend: '6:00 AM - 10:00 PM' },
    capacity: 70,
    currentOccupancy: 30,
    emoji: '🏸',
    image: null,
    description: 'Budget-friendly sports complex with multiple court options and modern gym equipment.',
    reviews: [
      { name: 'Rahul D.', rating: 4, comment: 'Great place for badminton. Clean courts and affordable pricing.', date: '2 weeks ago' }
    ],
    tags: ['Badminton', 'Multi-Sport', 'Budget']
  },
  {
    id: 'gym_014',
    name: 'Cardio Central',
    type: 'gym',
    types: ['Gym', 'Cardio', 'HIIT'],
    address: 'Saket, Delhi',
    city: 'Delhi',
    lat: 28.5245,
    lng: 77.2066,
    distance: 1.1,
    rating: 4.5,
    reviewCount: 200,
    pricePerSession: 249,
    tier: 'pro',
    amenities: ['AC', 'Treadmills', 'Cycles', 'Ellipticals', 'Shower'],
    activityTypes: ['Cardio', 'HIIT', 'Spinning', 'Aerobics'],
    timings: { weekday: '5:30 AM - 10:30 PM', weekend: '6:00 AM - 9:00 PM' },
    capacity: 40,
    currentOccupancy: 19,
    emoji: '🚴',
    image: null,
    description: 'Cardio-focused gym with 200+ cardio machines and high-energy group classes.',
    reviews: [
      { name: 'Naina J.', rating: 5, comment: 'The spinning class is insane! Great instructors and amazing energy.', date: '4 days ago' }
    ],
    tags: ['Cardio', 'Spinning', 'HIIT']
  },
  {
    id: 'gym_015',
    name: 'Asana Yoga Retreat',
    type: 'yoga',
    types: ['Yoga', 'Wellness'],
    address: 'Koregaon Park, Pune',
    city: 'Pune',
    lat: 18.5364,
    lng: 73.8957,
    distance: 0.9,
    rating: 4.9,
    reviewCount: 145,
    pricePerSession: 299,
    tier: 'pro',
    amenities: ['AC', 'Props Provided', 'Herbal Teas', 'Meditation Room'],
    activityTypes: ['Ashtanga Yoga', 'Power Yoga', 'Iyengar', 'Kundalini'],
    timings: { weekday: '6:00 AM - 8:00 PM', weekend: '7:00 AM - 6:00 PM' },
    capacity: 18,
    currentOccupancy: 7,
    emoji: '☯️',
    image: null,
    description: 'Authentic yoga school with Mysore-trained teachers. Deep, traditional practice in a serene environment.',
    reviews: [
      { name: 'Ananya R.', rating: 5, comment: 'Incredible depth of teaching here. A true yoga experience, not just exercise.', date: '1 week ago' }
    ],
    tags: ['Ashtanga', 'Traditional', 'Authentic']
  },
  {
    id: 'gym_016',
    name: 'BodyCraft Studio',
    type: 'gym',
    types: ['Gym', 'Pilates'],
    address: 'Richmond Town, Bangalore',
    city: 'Bangalore',
    lat: 12.9652,
    lng: 77.6048,
    distance: 1.6,
    rating: 4.6,
    reviewCount: 267,
    pricePerSession: 279,
    tier: 'pro',
    amenities: ['AC', 'Premium Equipment', 'Locker', 'Nutritionist', 'Café'],
    activityTypes: ['Strength Training', 'Functional Fitness', 'Group Classes', 'PT'],
    timings: { weekday: '5:00 AM - 11:00 PM', weekend: '6:00 AM - 10:00 PM' },
    capacity: 55,
    currentOccupancy: 28,
    emoji: '🎯',
    image: null,
    description: 'Premium boutique gym with expert trainers, nutrition counseling, and a holistic approach to fitness.',
    reviews: [
      { name: 'Rahul M.', rating: 5, comment: 'Premium experience. The trainers are incredibly knowledgeable!', date: '2 days ago' }
    ],
    tags: ['Premium', 'Certified Trainers', 'Nutrition'],
    featured: true
  },
  {
    id: 'gym_017',
    name: 'Kinetic Boxing Club',
    type: 'martial_arts',
    types: ['Boxing', 'Fitness'],
    address: 'Bandra West, Mumbai',
    city: 'Mumbai',
    lat: 19.0544,
    lng: 72.8314,
    distance: 1.0,
    rating: 4.7,
    reviewCount: 134,
    pricePerSession: 399,
    tier: 'elite',
    amenities: ['AC', 'Boxing Bags', 'Ring', 'Gloves', 'Shower'],
    activityTypes: ['Boxing', 'Kickboxing', 'Cardio Boxing', 'Strength'],
    timings: { weekday: '6:00 AM - 9:30 PM', weekend: '7:00 AM - 8:00 PM' },
    capacity: 20,
    currentOccupancy: 11,
    emoji: '🥋',
    image: null,
    description: 'Celebrity-favorite boxing gym in Bandra. Train like a champion with ex-national boxers as coaches.',
    reviews: [
      { name: 'Tariq H.', rating: 5, comment: 'The energy here is unmatched. Coaches are world-class.', date: '1 day ago' }
    ],
    tags: ['Boxing', 'Celebrity Gym', 'Elite']
  },
  {
    id: 'gym_018',
    name: 'SpinCity Cycling Studio',
    type: 'gym',
    types: ['Cycling', 'Cardio'],
    address: 'Connaught Place, Delhi',
    city: 'Delhi',
    lat: 28.6315,
    lng: 77.2167,
    distance: 0.4,
    rating: 4.6,
    reviewCount: 188,
    pricePerSession: 349,
    tier: 'pro',
    amenities: ['AC', 'Peloton Bikes', 'Dark Room', 'Towels', 'Showers'],
    activityTypes: ['Indoor Cycling', 'Rhythm Riding', 'Power Cycling'],
    timings: { weekday: '6:00 AM - 10:00 PM', weekend: '7:00 AM - 8:00 PM' },
    capacity: 25,
    currentOccupancy: 20,
    emoji: '🚵',
    image: null,
    description: 'Delhi\'s first immersive indoor cycling studio with live DJ sets, light shows, and celebrity instructors.',
    reviews: [
      { name: 'Kiran S.', rating: 5, comment: 'Like a party on a bike! Amazing energy and incredible music. Addictive!', date: '3 days ago' }
    ],
    tags: ['Indoor Cycling', 'Immersive', 'DJ Sets']
  },
  {
    id: 'gym_019',
    name: 'BackBone Physiotherapy',
    type: 'wellness',
    types: ['Physiotherapy', 'Wellness'],
    address: 'Anna Nagar, Chennai',
    city: 'Chennai',
    lat: 13.0878,
    lng: 80.2101,
    distance: 1.8,
    rating: 4.7,
    reviewCount: 75,
    pricePerSession: 599,
    tier: 'elite',
    amenities: ['AC', 'Sports Massage', 'Ultrasound Therapy', 'Consultation', 'Parking'],
    activityTypes: ['Physiotherapy', 'Sports Rehab', 'Posture Correction', 'Dry Needling'],
    timings: { weekday: '8:00 AM - 7:00 PM', weekend: '9:00 AM - 5:00 PM' },
    capacity: 10,
    currentOccupancy: 4,
    emoji: '💆',
    image: null,
    description: 'Sports medicine and rehabilitation center with AIIMS-trained physiotherapists.',
    reviews: [
      { name: 'Dr. Sanjay K.', rating: 5, comment: 'Excellent treatment. Recovered from my knee injury in 3 weeks!', date: '2 weeks ago' }
    ],
    tags: ['Physiotherapy', 'Rehab', 'Sports Medicine']
  },
  {
    id: 'gym_020',
    name: 'ElevateGym',
    type: 'gym',
    types: ['Gym', 'CrossFit', 'HIIT'],
    address: 'Linking Road, Mumbai',
    city: 'Mumbai',
    lat: 19.0600,
    lng: 72.8348,
    distance: 0.7,
    rating: 4.5,
    reviewCount: 321,
    pricePerSession: 229,
    tier: 'pro',
    amenities: ['AC', 'CrossFit', 'PT', 'Showers', 'Supplements Shop'],
    activityTypes: ['CrossFit', 'Weight Training', 'HIIT', 'Group Classes'],
    timings: { weekday: '5:00 AM - 11:00 PM', weekend: '6:00 AM - 10:00 PM' },
    capacity: 70,
    currentOccupancy: 40,
    emoji: '🔥',
    image: null,
    description: 'Mumbai\'s favorite big-box gym. Massive equipment selection and 30+ weekly classes.',
    reviews: [
      { name: 'Pooja V.', rating: 5, comment: 'My home away from home. Best gym equipment selection in Mumbai!', date: '3 days ago' }
    ],
    tags: ['CrossFit', 'Large Gym', 'Popular'],
    featured: true
  }
];

/* ============================================================
   GYM HELPERS
   ============================================================ */
FP.data.getGymById = function(id) {
  return FP.data.gyms.find(g => g.id === id) || null;
};

FP.data.getGymsByCity = function(city) {
  return FP.data.gyms.filter(g => g.city.toLowerCase() === city.toLowerCase());
};

FP.data.getGymsByType = function(type) {
  if (!type || type === 'all') return FP.data.gyms;
  return FP.data.gyms.filter(g => g.type === type);
};

FP.data.getFeaturedGyms = function() {
  return FP.data.gyms.filter(g => g.featured);
};

FP.data.getNearbyGyms = function(limit = 10) {
  return [...FP.data.gyms].sort((a, b) => a.distance - b.distance).slice(0, limit);
};

FP.data.filterGyms = function({ type, tier, sortBy, search }) {
  let result = [...FP.data.gyms];
  if (type && type !== 'all') result = result.filter(g => g.type === type);
  if (tier) result = result.filter(g => g.tier === tier);
  if (search) {
    const q = search.toLowerCase();
    result = result.filter(g =>
      g.name.toLowerCase().includes(q) ||
      g.address.toLowerCase().includes(q) ||
      g.activityTypes.some(a => a.toLowerCase().includes(q))
    );
  }
  if (sortBy === 'distance') result.sort((a, b) => a.distance - b.distance);
  else if (sortBy === 'rating') result.sort((a, b) => b.rating - a.rating);
  else if (sortBy === 'price') result.sort((a, b) => a.pricePerSession - b.pricePerSession);
  return result;
};

/* Activity types for filter */
FP.data.activityTypes = [
  { id: 'all', label: 'All', emoji: '✨' },
  { id: 'gym', label: 'Gym', emoji: '🏋️' },
  { id: 'yoga', label: 'Yoga', emoji: '🧘' },
  { id: 'swimming', label: 'Swimming', emoji: '🏊' },
  { id: 'martial_arts', label: 'Martial Arts', emoji: '🥊' },
  { id: 'dance', label: 'Dance', emoji: '💃' },
  { id: 'sports', label: 'Sports', emoji: '🏀' },
  { id: 'wellness', label: 'Wellness', emoji: '🌿' },
  { id: 'pilates', label: 'Pilates', emoji: '🌸' },
];

/* Generate time slots */
FP.data.generateSlots = function(date) {
  const slots = [];
  const bookedSlots = [2, 4, 7, 9, 11]; // simulate some booked
  const disabledSlots = [0, 1]; // past slots
  const times = [
    '5:30 AM', '6:00 AM', '6:30 AM', '7:00 AM', '7:30 AM',
    '8:00 AM', '8:30 AM', '9:00 AM', '10:00 AM', '11:00 AM',
    '12:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '4:30 PM',
    '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM',
    '7:30 PM', '8:00 PM'
  ];
  times.forEach((t, i) => {
    slots.push({
      time: t,
      available: !bookedSlots.includes(i),
      disabled: disabledSlots.includes(i)
    });
  });
  return slots;
};
