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
  },

  /* ── G001–G015: Partner Network Gyms ─────────────────────── */
  {
    id: 'G001', name: 'Iron Pulse Fitness', type: 'gym',
    types: ['Gym', 'Strength'],
    address: 'MP Nagar, Bhopal', city: 'Bhopal',
    lat: 23.2365, lng: 77.4116, distance: 1.2, rating: 4.5, reviewCount: 134,
    pricePerSession: 179, tier: 'pro',
    amenities: ['AC', 'Locker Room', 'Parking', 'Protein Bar'],
    activityTypes: ['Weight Training', 'Cardio', 'HIIT'],
    timings: { weekday: '5:30 AM - 10:30 PM', weekend: '6:00 AM - 9:00 PM' },
    capacity: 60, currentOccupancy: 29, emoji: '⚡',
    image: null,
    description: 'Bhopal\'s premier strength-training facility in the heart of MP Nagar with expert certified coaches.',
    reviews: [{ name: 'Aarav S.', rating: 5, comment: 'Best gym in Bhopal. Great coaches and amazing equipment!', date: '3 days ago' }],
    tags: ['Strength', 'HIIT', 'Certified Trainers']
  },
  {
    id: 'G002', name: 'FitZone Studio', type: 'gym',
    types: ['Gym', 'Zumba', 'Aerobics'],
    address: 'Vijay Nagar, Indore', city: 'Indore',
    lat: 22.7534, lng: 75.8937, distance: 0.9, rating: 4.3, reviewCount: 88,
    pricePerSession: 129, tier: 'basic',
    amenities: ['AC', 'Mirrors', 'Sound System', 'Locker'],
    activityTypes: ['Zumba', 'Aerobics', 'Weight Training', 'Cardio'],
    timings: { weekday: '6:00 AM - 9:00 PM', weekend: '7:00 AM - 8:00 PM' },
    capacity: 45, currentOccupancy: 18, emoji: '🏃',
    image: null,
    description: 'Energetic studio gym in Vijay Nagar with high-energy group classes and modern equipment.',
    reviews: [{ name: 'Priya V.', rating: 4, comment: 'Love the Zumba classes here! Great atmosphere.', date: '1 week ago' }],
    tags: ['Zumba', 'Group Classes', 'Budget']
  },
  {
    id: 'G003', name: 'Urban Muscle Hub', type: 'gym',
    types: ['Gym', 'CrossFit', 'Powerlifting'],
    address: 'Saket, Delhi', city: 'Delhi',
    lat: 28.5245, lng: 77.2066, distance: 1.1, rating: 4.8, reviewCount: 312,
    pricePerSession: 349, tier: 'elite',
    amenities: ['AC', 'Olympic Rig', 'Showers', 'Nutritionist', 'Recovery Room'],
    activityTypes: ['Powerlifting', 'CrossFit', 'Strength', 'HIIT'],
    timings: { weekday: '5:00 AM - 11:00 PM', weekend: '5:00 AM - 10:00 PM' },
    capacity: 50, currentOccupancy: 34, emoji: '🦾',
    image: null,
    description: 'Elite training facility in South Delhi with world-class powerlifting setup and nutrition support.',
    reviews: [{ name: 'Rohan G.', rating: 5, comment: 'Absolutely premium. Worth every rupee!', date: '2 days ago' }],
    tags: ['Powerlifting', 'Elite', 'Olympic Lifting'], featured: true
  },
  {
    id: 'G004', name: 'FlexFit Gym', type: 'gym',
    types: ['Gym', 'Cardio', 'HIIT'],
    address: 'Andheri West, Mumbai', city: 'Mumbai',
    lat: 19.1341, lng: 72.8271, distance: 0.8, rating: 4.6, reviewCount: 245,
    pricePerSession: 249, tier: 'pro',
    amenities: ['AC', 'Locker', 'Shower', 'Smoothie Bar', 'Parking'],
    activityTypes: ['Weight Training', 'Cardio', 'HIIT', 'Group Classes'],
    timings: { weekday: '5:30 AM - 11:00 PM', weekend: '6:00 AM - 10:00 PM' },
    capacity: 65, currentOccupancy: 38, emoji: '💪',
    image: null,
    description: 'Andheri\'s go-to gym with state-of-the-art equipment and high-energy group fitness classes.',
    reviews: [{ name: 'Ananya S.', rating: 5, comment: 'The best gym in Andheri. Super clean and well organised.', date: '4 days ago' }],
    tags: ['HIIT', 'Group Classes', 'Popular']
  },
  {
    id: 'G005', name: 'PowerHouse Fitness', type: 'gym',
    types: ['Gym', 'Strength'],
    address: 'Wakad, Pune', city: 'Pune',
    lat: 18.5974, lng: 73.7617, distance: 1.4, rating: 4.2, reviewCount: 67,
    pricePerSession: 119, tier: 'basic',
    amenities: ['Parking', 'Locker', 'Trainer on Duty'],
    activityTypes: ['Weight Training', 'Cardio', 'Stretching'],
    timings: { weekday: '5:30 AM - 10:30 PM', weekend: '6:00 AM - 9:00 PM' },
    capacity: 55, currentOccupancy: 20, emoji: '🏋️',
    image: null,
    description: 'Affordable yet well-equipped gym in Wakad for all fitness levels.',
    reviews: [{ name: 'Kunal M.', rating: 4, comment: 'Great value for money. Machines are always available.', date: '2 weeks ago' }],
    tags: ['Budget', 'Strength', 'Beginner Friendly']
  },
  {
    id: 'G006', name: 'Zen Yoga Studio', type: 'yoga',
    types: ['Yoga', 'Meditation', 'Wellness'],
    address: 'Whitefield, Bangalore', city: 'Bangalore',
    lat: 12.9698, lng: 77.7499, distance: 2.1, rating: 4.9, reviewCount: 198,
    pricePerSession: 299, tier: 'elite',
    amenities: ['AC', 'Mats & Props', 'Herbal Tea', 'Meditation Pods', 'Showers'],
    activityTypes: ['Hatha Yoga', 'Vinyasa', 'Kundalini', 'Meditation', 'Pranayama'],
    timings: { weekday: '6:00 AM - 8:00 PM', weekend: '7:00 AM - 6:00 PM' },
    capacity: 20, currentOccupancy: 8, emoji: '🧘',
    image: null,
    description: 'Whitefield\'s most serene yoga retreat with Mysore-trained instructors and private meditation pods.',
    reviews: [{ name: 'Sneha I.', rating: 5, comment: 'Absolute peace and tranquility. The kundalini class changed my life.', date: '5 days ago' }],
    tags: ['Kundalini', 'Meditation', 'Premium'], featured: true
  },
  {
    id: 'G007', name: 'Beast Mode Gym', type: 'gym',
    types: ['Gym', 'CrossFit', 'MMA'],
    address: 'Kolar Road, Bhopal', city: 'Bhopal',
    lat: 23.1765, lng: 77.4522, distance: 2.8, rating: 4.5, reviewCount: 112,
    pricePerSession: 199, tier: 'pro',
    amenities: ['AC', 'CrossFit Rig', 'Boxing Bags', 'Locker Room'],
    activityTypes: ['CrossFit', 'MMA', 'Strength', 'Conditioning'],
    timings: { weekday: '5:00 AM - 10:30 PM', weekend: '5:30 AM - 9:00 PM' },
    capacity: 40, currentOccupancy: 22, emoji: '🥊',
    image: null,
    description: 'Bhopal\'s toughest gym. Where champions are built — CrossFit, MMA, and heavy lifting.',
    reviews: [{ name: 'Rahul Y.', rating: 5, comment: 'Intense! Exactly what I needed to push my limits.', date: '1 week ago' }],
    tags: ['CrossFit', 'MMA', 'Intense Training']
  },
  {
    id: 'G008', name: 'Core Fitness Club', type: 'gym',
    types: ['Gym', 'Pilates', 'Cardio'],
    address: 'Malviya Nagar, Jaipur', city: 'Jaipur',
    lat: 26.8521, lng: 75.8078, distance: 1.0, rating: 4.1, reviewCount: 54,
    pricePerSession: 109, tier: 'basic',
    amenities: ['AC', 'Locker', 'Trainer'],
    activityTypes: ['Cardio', 'Core Training', 'Pilates', 'Zumba'],
    timings: { weekday: '6:00 AM - 9:30 PM', weekend: '7:00 AM - 8:00 PM' },
    capacity: 40, currentOccupancy: 14, emoji: '🌀',
    image: null,
    description: 'Jaipur\'s friendly community gym with affordable plans and group fitness classes.',
    reviews: [{ name: 'Neha J.', rating: 4, comment: 'Friendly staff. Clean and great for beginners.', date: '3 weeks ago' }],
    tags: ['Beginner Friendly', 'Pilates', 'Affordable']
  },
  {
    id: 'G009', name: 'Titan Gym', type: 'gym',
    types: ['Gym', 'Strength', 'Powerlifting'],
    address: 'Sector 17, Chandigarh', city: 'Chandigarh',
    lat: 30.7414, lng: 76.7682, distance: 0.5, rating: 4.8, reviewCount: 189,
    pricePerSession: 299, tier: 'elite',
    amenities: ['AC', 'Olympic Weights', 'Showers', 'Cafeteria', 'Parking'],
    activityTypes: ['Powerlifting', 'Bodybuilding', 'Strength', 'HIIT'],
    timings: { weekday: '5:00 AM - 11:00 PM', weekend: '5:00 AM - 10:00 PM' },
    capacity: 60, currentOccupancy: 41, emoji: '🏆',
    image: null,
    description: 'Chandigarh\'s most decorated gym. Home to IPL athletes and national-level bodybuilders.',
    reviews: [{ name: 'Aditya K.', rating: 5, comment: 'The best gym in Chandigarh. Period.', date: '2 days ago' }],
    tags: ['Powerlifting', 'Bodybuilding', 'Elite'], featured: true
  },
  {
    id: 'G010', name: 'FitHub Arena', type: 'gym',
    types: ['Gym', 'Cardio', 'Sports'],
    address: 'Model Town, Ludhiana', city: 'Ludhiana',
    lat: 30.9010, lng: 75.8573, distance: 1.3, rating: 4.5, reviewCount: 97,
    pricePerSession: 199, tier: 'pro',
    amenities: ['AC', 'Sports Ground', 'Gym', 'Locker', 'Protein Bar'],
    activityTypes: ['Weight Training', 'Cardio', 'Basketball', 'HIIT'],
    timings: { weekday: '5:30 AM - 10:30 PM', weekend: '6:00 AM - 9:00 PM' },
    capacity: 70, currentOccupancy: 35, emoji: '🏟️',
    image: null,
    description: 'Ludhiana\'s largest multi-activity fitness hub with gym, sports courts, and group classes.',
    reviews: [{ name: 'Simran K.', rating: 5, comment: 'Love that I can do gym AND sports here. Amazing value!', date: '1 week ago' }],
    tags: ['Multi-Sport', 'Pro Plan', 'Large Facility']
  },
  {
    id: 'G011', name: 'Muscle Factory', type: 'gym',
    types: ['Gym', 'Bodybuilding'],
    address: 'Satellite, Ahmedabad', city: 'Ahmedabad',
    lat: 23.0258, lng: 72.5090, distance: 1.7, rating: 4.2, reviewCount: 73,
    pricePerSession: 129, tier: 'basic',
    amenities: ['AC', 'Locker', 'Trainer', 'Parking'],
    activityTypes: ['Bodybuilding', 'Weight Training', 'Cardio'],
    timings: { weekday: '5:30 AM - 10:30 PM', weekend: '6:00 AM - 9:00 PM' },
    capacity: 55, currentOccupancy: 21, emoji: '💪',
    image: null,
    description: 'Ahmedabad\'s bodybuilding-focused gym with expert trainers and a strong community.',
    reviews: [{ name: 'Vikram D.', rating: 4, comment: 'Great for bodybuilding. Coaches know their stuff.', date: '2 weeks ago' }],
    tags: ['Bodybuilding', 'Strength', 'Budget']
  },
  {
    id: 'G012', name: 'Elite Fitness Pro', type: 'gym',
    types: ['Gym', 'Wellness', 'Functional'],
    address: 'Arera Colony, Bhopal', city: 'Bhopal',
    lat: 23.2189, lng: 77.4304, distance: 0.7, rating: 4.8, reviewCount: 167,
    pricePerSession: 349, tier: 'elite',
    amenities: ['AC', 'Premium Equipment', 'Sauna', 'Nutritionist', 'Recovery Zone'],
    activityTypes: ['Functional Fitness', 'Strength', 'Group PT', 'Wellness'],
    timings: { weekday: '5:00 AM - 11:00 PM', weekend: '5:30 AM - 10:00 PM' },
    capacity: 45, currentOccupancy: 30, emoji: '🎯',
    image: null,
    description: 'Bhopal\'s most premium gym — elite equipment, nutrition counseling, and personalized training programs.',
    reviews: [{ name: 'Pooja C.', rating: 5, comment: 'Worth every penny. The personalized training plans are exceptional!', date: '3 days ago' }],
    tags: ['Premium', 'Personalized Training', 'Nutrition'], featured: true
  },
  {
    id: 'G013', name: 'Sweat & Burn', type: 'gym',
    types: ['Gym', 'HIIT', 'CrossFit'],
    address: 'Banjara Hills, Hyderabad', city: 'Hyderabad',
    lat: 17.4149, lng: 78.4476, distance: 1.5, rating: 4.5, reviewCount: 143,
    pricePerSession: 199, tier: 'pro',
    amenities: ['AC', 'CrossFit Rig', 'Battle Ropes', 'Shower', 'Supplements'],
    activityTypes: ['HIIT', 'CrossFit', 'Strength', 'Conditioning'],
    timings: { weekday: '5:30 AM - 10:30 PM', weekend: '6:00 AM - 9:00 PM' },
    capacity: 35, currentOccupancy: 19, emoji: '🔥',
    image: null,
    description: 'High-intensity training hub in Banjara Hills — where every session is a challenge.',
    reviews: [{ name: 'Aman K.', rating: 5, comment: 'Grueling workouts with amazing coaches. Lost 8 kgs in 2 months!', date: '5 days ago' }],
    tags: ['HIIT', 'CrossFit', 'Weight Loss']
  },
  {
    id: 'G014', name: 'Alpha Fitness Club', type: 'gym',
    types: ['Gym', 'Cardio', 'Yoga'],
    address: 'Kakkanad, Kochi', city: 'Kochi',
    lat: 10.0159, lng: 76.2987, distance: 2.4, rating: 4.0, reviewCount: 45,
    pricePerSession: 99, tier: 'basic',
    amenities: ['AC', 'Locker', 'Trainer', 'Yoga Space'],
    activityTypes: ['Weight Training', 'Cardio', 'Yoga', 'Stretching'],
    timings: { weekday: '6:00 AM - 9:00 PM', weekend: '7:00 AM - 7:00 PM' },
    capacity: 40, currentOccupancy: 12, emoji: '⭐',
    image: null,
    description: 'Kochi\'s friendly neighborhood gym with affordable plans and a welcoming community.',
    reviews: [{ name: 'Kavya N.', rating: 4, comment: 'Good for beginners. Staff is very helpful and encouraging.', date: '1 month ago' }],
    tags: ['Beginner Friendly', 'Yoga', 'Affordable']
  },
  {
    id: 'G015', name: 'Grind Fitness', type: 'gym',
    types: ['Gym', 'Strength', 'HIIT'],
    address: 'Gomti Nagar, Lucknow', city: 'Lucknow',
    lat: 26.8627, lng: 80.9976, distance: 1.0, rating: 4.6, reviewCount: 128,
    pricePerSession: 229, tier: 'elite',
    amenities: ['AC', 'Olympic Weights', 'Cardio Zone', 'Shower', 'Locker'],
    activityTypes: ['Strength', 'HIIT', 'Bodybuilding', 'Cardio'],
    timings: { weekday: '5:00 AM - 11:00 PM', weekend: '5:30 AM - 10:00 PM' },
    capacity: 50, currentOccupancy: 28, emoji: '💥',
    image: null,
    description: 'Lucknow\'s elite gym in Gomti Nagar — premium equipment and results-driven training programs.',
    reviews: [{ name: 'Sarthak M.', rating: 5, comment: 'Best gym in Lucknow by far. Love the energy here!', date: '4 days ago' }],
    tags: ['Strength', 'Elite', 'Bodybuilding']
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

/* ============================================================
   MEMBERS DATASET  (G001–G015 network)
   ============================================================ */
FP.data.members = [
  { id:'M001', gymId:'G001', gymName:'Iron Pulse Fitness',  name:'Aarav Sharma',    city:'Bhopal',      area:'MP Nagar',       plan:'pro',   checkInsMonth:18, joinDate:'2025-11-10' },
  { id:'M002', gymId:'G002', gymName:'FitZone Studio',      name:'Priya Verma',     city:'Indore',      area:'Vijay Nagar',    plan:'basic', checkInsMonth:12, joinDate:'2025-12-03' },
  { id:'M003', gymId:'G003', gymName:'Urban Muscle Hub',    name:'Rohan Gupta',     city:'Delhi',       area:'Saket',          plan:'elite', checkInsMonth:25, joinDate:'2025-10-22' },
  { id:'M004', gymId:'G004', gymName:'FlexFit Gym',         name:'Ananya Singh',    city:'Mumbai',      area:'Andheri West',   plan:'pro',   checkInsMonth:20, joinDate:'2025-09-15' },
  { id:'M005', gymId:'G005', gymName:'PowerHouse Fitness',  name:'Kunal Mehta',     city:'Pune',        area:'Wakad',          plan:'basic', checkInsMonth:10, joinDate:'2026-01-07' },
  { id:'M006', gymId:'G006', gymName:'Zen Yoga Studio',     name:'Sneha Iyer',      city:'Bangalore',   area:'Whitefield',     plan:'elite', checkInsMonth:22, joinDate:'2025-08-19' },
  { id:'M007', gymId:'G007', gymName:'Beast Mode Gym',      name:'Rahul Yadav',     city:'Bhopal',      area:'Kolar Road',     plan:'pro',   checkInsMonth:17, joinDate:'2025-11-30' },
  { id:'M008', gymId:'G008', gymName:'Core Fitness Club',   name:'Neha Jain',       city:'Jaipur',      area:'Malviya Nagar',  plan:'basic', checkInsMonth:9,  joinDate:'2026-02-14' },
  { id:'M009', gymId:'G009', gymName:'Titan Gym',           name:'Aditya Kapoor',   city:'Chandigarh',  area:'Sector 17',      plan:'elite', checkInsMonth:26, joinDate:'2025-07-05' },
  { id:'M010', gymId:'G010', gymName:'FitHub Arena',        name:'Simran Kaur',     city:'Ludhiana',    area:'Model Town',     plan:'pro',   checkInsMonth:19, joinDate:'2025-10-11' },
  { id:'M011', gymId:'G011', gymName:'Muscle Factory',      name:'Vikram Desai',    city:'Ahmedabad',   area:'Satellite',      plan:'basic', checkInsMonth:11, joinDate:'2026-01-28' },
  { id:'M012', gymId:'G012', gymName:'Elite Fitness Pro',   name:'Pooja Choudhary', city:'Bhopal',      area:'Arera Colony',   plan:'elite', checkInsMonth:24, joinDate:'2025-09-02' },
  { id:'M013', gymId:'G013', gymName:'Sweat & Burn',        name:'Aman Khan',       city:'Hyderabad',   area:'Banjara Hills',  plan:'pro',   checkInsMonth:16, joinDate:'2025-12-17' },
  { id:'M014', gymId:'G014', gymName:'Alpha Fitness Club',  name:'Kavya Nair',      city:'Kochi',       area:'Kakkanad',       plan:'basic', checkInsMonth:8,  joinDate:'2026-03-01' },
  { id:'M015', gymId:'G015', gymName:'Grind Fitness',       name:'Sarthak Mishra',  city:'Lucknow',     area:'Gomti Nagar',    plan:'elite', checkInsMonth:21, joinDate:'2025-11-25' },
];

/* Members helpers */
FP.data.getMembersByPlan = function(plan) {
  return FP.data.members.filter(m => m.plan === plan);
};

FP.data.getMembersByCity = function(city) {
  return FP.data.members.filter(m => m.city.toLowerCase() === city.toLowerCase());
};

FP.data.getMemberLeaderboard = function() {
  return [...FP.data.members].sort((a, b) => b.checkInsMonth - a.checkInsMonth);
};

FP.data.getMemberStats = function() {
  const total   = FP.data.members.length;
  const elite   = FP.data.members.filter(m => m.plan === 'elite').length;
  const pro     = FP.data.members.filter(m => m.plan === 'pro').length;
  const basic   = FP.data.members.filter(m => m.plan === 'basic').length;
  const totalCI = FP.data.members.reduce((s, m) => s + m.checkInsMonth, 0);
  const avgCI   = (totalCI / total).toFixed(1);
  const cities  = [...new Set(FP.data.members.map(m => m.city))];
  return { total, elite, pro, basic, totalCheckIns: totalCI, avgCheckIns: avgCI, cities: cities.length };
};
