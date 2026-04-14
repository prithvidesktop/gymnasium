/* ============================================================
   FLEXPASS — WORKOUTS & WELLNESS DATA
   ============================================================ */
window.FP = window.FP || {};
FP.data = FP.data || {};

/* ---- Workout Plans (by goal) ---- */
FP.data.workoutPlans = {
  weight_loss: {
    title: 'Fat Burning Power Plan',
    subtitle: '6-week progressive program',
    emoji: '🔥',
    schedule: [
      {
        day: 'MON',
        dayFull: 'Monday',
        focus: 'HIIT Cardio',
        duration: 45,
        calories: 420,
        exercises: [
          { name: 'Jumping Jacks', sets: '3 × 60 sec', emoji: '🏃', type: 'cardio' },
          { name: 'Burpees', sets: '4 × 15 reps', emoji: '⚡', type: 'cardio' },
          { name: 'Mountain Climbers', sets: '3 × 45 sec', emoji: '🧗', type: 'cardio' },
          { name: 'High Knees', sets: '4 × 30 sec', emoji: '🦵', type: 'cardio' },
          { name: 'Jump Rope', sets: '5 min', emoji: '⭕', type: 'cardio' },
        ]
      },
      {
        day: 'TUE',
        dayFull: 'Tuesday',
        focus: 'Upper Body',
        duration: 50,
        calories: 310,
        exercises: [
          { name: 'Push-Ups', sets: '4 × 20 reps', emoji: '💪', type: 'strength' },
          { name: 'Dumbbell Rows', sets: '3 × 15 reps', emoji: '🏋️', type: 'strength' },
          { name: 'Shoulder Press', sets: '3 × 12 reps', emoji: '🔝', type: 'strength' },
          { name: 'Tricep Dips', sets: '3 × 15 reps', emoji: '⬇️', type: 'strength' },
          { name: 'Plank', sets: '3 × 60 sec', emoji: '🧱', type: 'core' },
        ]
      },
      {
        day: 'WED',
        dayFull: 'Wednesday',
        focus: 'Active Recovery & Yoga',
        duration: 35,
        calories: 150,
        exercises: [
          { name: 'Sun Salutation', sets: '5 rounds', emoji: '🌞', type: 'yoga' },
          { name: 'Hip Flexor Stretch', sets: '3 × 30 sec/side', emoji: '🤸', type: 'stretch' },
          { name: 'Child\'s Pose', sets: '2 × 60 sec', emoji: '🙏', type: 'yoga' },
          { name: 'Foam Rolling', sets: '10 min', emoji: '🔵', type: 'recovery' },
        ]
      },
      {
        day: 'THU',
        dayFull: 'Thursday',
        focus: 'Lower Body',
        duration: 55,
        calories: 380,
        exercises: [
          { name: 'Squats', sets: '4 × 20 reps', emoji: '🦵', type: 'strength' },
          { name: 'Lunges', sets: '3 × 15 reps/side', emoji: '🚶', type: 'strength' },
          { name: 'Deadlifts', sets: '3 × 12 reps', emoji: '🏋️', type: 'strength' },
          { name: 'Calf Raises', sets: '4 × 25 reps', emoji: '⬆️', type: 'strength' },
          { name: 'Glute Bridges', sets: '3 × 20 reps', emoji: '🌉', type: 'strength' },
        ]
      },
      {
        day: 'FRI',
        dayFull: 'Friday',
        focus: 'HIIT + Core',
        duration: 45,
        calories: 400,
        exercises: [
          { name: 'Tabata Intervals', sets: '8 rounds × 20 sec', emoji: '⏱️', type: 'cardio' },
          { name: 'Russian Twists', sets: '3 × 20 reps', emoji: '🌀', type: 'core' },
          { name: 'Leg Raises', sets: '3 × 15 reps', emoji: '⬆️', type: 'core' },
          { name: 'Bicycle Crunches', sets: '3 × 25 reps', emoji: '🚲', type: 'core' },
          { name: 'V-Ups', sets: '3 × 12 reps', emoji: '✌️', type: 'core' },
        ]
      },
      {
        day: 'SAT',
        dayFull: 'Saturday',
        focus: 'Cardio Endurance',
        duration: 60,
        calories: 450,
        exercises: [
          { name: '5K Run', sets: '35-40 min', emoji: '🏃', type: 'cardio' },
          { name: 'Cycling', sets: '20 min', emoji: '🚴', type: 'cardio' },
          { name: 'Rowing', sets: '10 min', emoji: '🚣', type: 'cardio' },
        ]
      },
      {
        day: 'SUN',
        dayFull: 'Sunday',
        focus: '🛌 Rest & Recovery',
        duration: 30,
        calories: 80,
        exercises: [
          { name: 'Light Walk', sets: '20 min', emoji: '🚶', type: 'active' },
          { name: 'Full Body Stretch', sets: '10 min', emoji: '🤸', type: 'stretch' },
        ]
      }
    ]
  },
  muscle_gain: {
    title: 'Muscle Builder Program',
    subtitle: '8-week hypertrophy plan',
    emoji: '💪',
    schedule: [
      {
        day: 'MON',
        dayFull: 'Monday',
        focus: 'Chest & Triceps',
        duration: 65,
        calories: 320,
        exercises: [
          { name: 'Bench Press', sets: '4 × 10 reps', emoji: '🏋️', type: 'strength' },
          { name: 'Incline DB Press', sets: '3 × 12 reps', emoji: '📐', type: 'strength' },
          { name: 'Cable Flyes', sets: '3 × 15 reps', emoji: '🦋', type: 'strength' },
          { name: 'Tricep Pulldowns', sets: '4 × 12 reps', emoji: '⬇️', type: 'strength' },
          { name: 'Dips', sets: '3 × failure', emoji: '⬇️', type: 'strength' },
        ]
      },
      {
        day: 'TUE',
        dayFull: 'Tuesday',
        focus: 'Back & Biceps',
        duration: 65,
        calories: 330,
        exercises: [
          { name: 'Pull-Ups', sets: '4 × 8 reps', emoji: '⬆️', type: 'strength' },
          { name: 'Barbell Rows', sets: '4 × 10 reps', emoji: '🏋️', type: 'strength' },
          { name: 'Lat Pulldowns', sets: '3 × 12 reps', emoji: '⬇️', type: 'strength' },
          { name: 'Barbell Curls', sets: '3 × 12 reps', emoji: '💪', type: 'strength' },
          { name: 'Hammer Curls', sets: '3 × 15 reps', emoji: '🔨', type: 'strength' },
        ]
      },
      { day: 'WED', dayFull: 'Wednesday', focus: '🛌 Rest', duration: 0, calories: 0, exercises: [] },
      {
        day: 'THU',
        dayFull: 'Thursday',
        focus: 'Shoulders',
        duration: 60,
        calories: 280,
        exercises: [
          { name: 'Overhead Press', sets: '4 × 10 reps', emoji: '🔝', type: 'strength' },
          { name: 'Lateral Raises', sets: '4 × 15 reps', emoji: '↔️', type: 'strength' },
          { name: 'Front Raises', sets: '3 × 12 reps', emoji: '⬆️', type: 'strength' },
          { name: 'Face Pulls', sets: '3 × 20 reps', emoji: '🎯', type: 'strength' },
          { name: 'Shrugs', sets: '4 × 15 reps', emoji: '🤷', type: 'strength' },
        ]
      },
      {
        day: 'FRI',
        dayFull: 'Friday',
        focus: 'Legs',
        duration: 70,
        calories: 420,
        exercises: [
          { name: 'Squats', sets: '4 × 8 reps', emoji: '🦵', type: 'strength' },
          { name: 'Leg Press', sets: '4 × 12 reps', emoji: '⬇️', type: 'strength' },
          { name: 'Romanian Deadlift', sets: '3 × 10 reps', emoji: '🏋️', type: 'strength' },
          { name: 'Leg Curls', sets: '3 × 15 reps', emoji: '🦵', type: 'strength' },
          { name: 'Leg Extensions', sets: '3 × 15 reps', emoji: '⬆️', type: 'strength' },
        ]
      },
      {
        day: 'SAT',
        dayFull: 'Saturday',
        focus: 'Full Body + Cardio',
        duration: 50,
        calories: 350,
        exercises: [
          { name: 'Deadlifts', sets: '3 × 5 reps (heavy)', emoji: '🏋️', type: 'strength' },
          { name: 'Pull-Ups', sets: '3 × max', emoji: '⬆️', type: 'strength' },
          { name: 'Treadmill', sets: '20 min', emoji: '🏃', type: 'cardio' },
        ]
      },
      { day: 'SUN', dayFull: 'Sunday', focus: '🛌 Rest & Recovery', duration: 30, calories: 0, exercises: [
        { name: 'Yoga & Stretching', sets: '30 min', emoji: '🧘', type: 'recovery' }
      ]}
    ]
  },
  flexibility: {
    title: 'Flexibility & Mobility Plan',
    subtitle: '4-week stretch & strengthen',
    emoji: '🤸',
    schedule: [
      { day: 'MON', dayFull: 'Monday', focus: 'Full Body Stretch', duration: 40, calories: 120, exercises: [
        { name: 'Sun Salutation', sets: '8 rounds', emoji: '🌞', type: 'yoga' },
        { name: 'Pigeon Pose', sets: '3 × 60 sec', emoji: '🕊️', type: 'stretch' },
        { name: 'Downward Dog', sets: '5 × 30 sec', emoji: '🐕', type: 'yoga' },
        { name: 'Seated Forward Fold', sets: '3 × 60 sec', emoji: '🙆', type: 'stretch' },
      ]},
      { day: 'TUE', dayFull: 'Tuesday', focus: 'Hip Mobility', duration: 35, calories: 100, exercises: [
        { name: 'Hip Circles', sets: '3 × 30 sec', emoji: '⭕', type: 'mobility' },
        { name: '90/90 Stretch', sets: '3 × 60 sec/side', emoji: '🔄', type: 'stretch' },
        { name: 'Lizard Pose', sets: '3 × 45 sec/side', emoji: '🦎', type: 'yoga' },
      ]},
      { day: 'WED', dayFull: 'Wednesday', focus: 'Upper Body Mobility', duration: 30, calories: 90, exercises: [
        { name: 'Chest Opener', sets: '3 × 30 sec', emoji: '🔓', type: 'stretch' },
        { name: 'Thread the Needle', sets: '2 × 30 sec/side', emoji: '🧵', type: 'yoga' },
        { name: 'Shoulder Circles', sets: '3 × 20 reps', emoji: '🔄', type: 'mobility' },
      ]},
      { day: 'THU', dayFull: 'Thursday', focus: 'Spine & Core', duration: 40, calories: 110, exercises: [
        { name: 'Cat-Cow', sets: '3 × 10 reps', emoji: '🐱', type: 'mobility' },
        { name: 'Seated Twist', sets: '3 × 45 sec/side', emoji: '🌀', type: 'yoga' },
        { name: 'Bridge Pose', sets: '3 × 30 sec', emoji: '🌉', type: 'yoga' },
      ]},
      { day: 'FRI', dayFull: 'Friday', focus: 'Yoga Flow', duration: 60, calories: 180, exercises: [
        { name: 'Vinyasa Flow', sets: '45 min class', emoji: '🌊', type: 'yoga' },
        { name: 'Savasana', sets: '10 min', emoji: '😌', type: 'meditation' },
      ]},
      { day: 'SAT', dayFull: 'Saturday', focus: 'Deep Stretch', duration: 45, calories: 130, exercises: [
        { name: 'Yin Yoga', sets: '35 min', emoji: '☯️', type: 'yoga' },
        { name: 'Progressive Relaxation', sets: '10 min', emoji: '🌙', type: 'meditation' },
      ]},
      { day: 'SUN', dayFull: 'Sunday', focus: '🛌 Rest', duration: 20, calories: 50, exercises: [
        { name: 'Morning stretches', sets: '10 min', emoji: '🌅', type: 'stretch' },
      ]}
    ]
  }
};

/* ---- Diet Plans ---- */
FP.data.dietPlans = {
  weight_loss: {
    title: 'Calorie Deficit Plan',
    calories: 1800,
    protein: 140,
    carbs: 180,
    fats: 60,
    meals: [
      { time: '7:00 AM', label: 'Breakfast', emoji: '🌅', items: ['Oats with banana & seeds', 'Green tea', '2 boiled eggs'], kcal: 380 },
      { time: '10:30 AM', label: 'Mid-Morning', emoji: '☀️', items: ['Apple', '10 almonds', '1 cup buttermilk'], kcal: 180 },
      { time: '1:00 PM', label: 'Lunch', emoji: '🍱', items: ['2 chapatis', 'Dal', 'Sabzi', 'Salad', 'Curd'], kcal: 520 },
      { time: '4:00 PM', label: 'Evening Snack', emoji: '🌤️', items: ['Sprouts chaat', 'Coconut water'], kcal: 160 },
      { time: '7:30 PM', label: 'Dinner', emoji: '🌙', items: ['Grilled chicken/paneer', 'Quinoa', 'Stir-fried veggies'], kcal: 480 },
      { time: '9:30 PM', label: 'Night', emoji: '🌟', items: ['1 cup warm milk with turmeric'], kcal: 80 },
    ]
  },
  muscle_gain: {
    title: 'Muscle Building Diet',
    calories: 2800,
    protein: 200,
    carbs: 320,
    fats: 75,
    meals: [
      { time: '6:30 AM', label: 'Pre-Workout', emoji: '⚡', items: ['Banana', 'Peanut butter toast', 'Black coffee'], kcal: 380 },
      { time: '9:00 AM', label: 'Post-Workout', emoji: '💪', items: ['Whey protein shake', '3 egg whites + 1 whole egg', 'Brown rice'], kcal: 560 },
      { time: '12:30 PM', label: 'Lunch', emoji: '🍱', items: ['3 chapatis', 'Chicken curry', 'Rajma', 'Salad', 'Curd'], kcal: 720 },
      { time: '4:00 PM', label: 'Snack', emoji: '🌤️', items: ['Cottage cheese', 'Fruits', 'Nuts & seeds mix'], kcal: 300 },
      { time: '8:00 PM', label: 'Dinner', emoji: '🌙', items: ['Grilled fish/paneer', 'Sweet potato', 'Steamed broccoli'], kcal: 620 },
      { time: '10:00 PM', label: 'Before Sleep', emoji: '🌛', items: ['Casein protein or Greek yogurt'], kcal: 220 },
    ]
  },
  flexibility: {
    title: 'Anti-Inflammatory Diet',
    calories: 2000,
    protein: 110,
    carbs: 250,
    fats: 70,
    meals: [
      { time: '7:30 AM', label: 'Breakfast', emoji: '🌅', items: ['Smoothie bowl', 'Chia seeds', 'Fresh berries', 'Flaxseeds'], kcal: 350 },
      { time: '11:00 AM', label: 'Snack', emoji: '☀️', items: ['Handful of walnuts', 'Herbal tea', 'Dates'], kcal: 200 },
      { time: '1:30 PM', label: 'Lunch', emoji: '🍱', items: ['Quinoa salad', 'Grilled tofu/chicken', 'Turmeric lentil soup'], kcal: 550 },
      { time: '4:30 PM', label: 'Snack', emoji: '🌤️', items: ['Banana', 'Almond butter', 'Green juice'], kcal: 220 },
      { time: '7:30 PM', label: 'Dinner', emoji: '🌙', items: ['Dal khichdi', 'Ghee', 'Steamed veggies', 'Raita'], kcal: 560 },
      { time: '9:00 PM', label: 'Night', emoji: '🌙', items: ['Golden milk (turmeric latte)'], kcal: 120 },
    ]
  }
};

FP.data.getWorkoutPlan = function(goals = []) {
  const goal = goals[0] || 'weight_loss';
  return FP.data.workoutPlans[goal] || FP.data.workoutPlans.weight_loss;
};

FP.data.getDietPlan = function(goals = []) {
  const goal = goals[0] || 'weight_loss';
  return FP.data.dietPlans[goal] || FP.data.dietPlans.weight_loss;
};

/* Weekly activity data (for chart) */
FP.data.weeklyActivity = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  calories: [420, 310, 150, 380, 400, 450, 80],
  sessions: [1, 1, 0, 1, 1, 1, 0],
  steps: [8200, 6500, 4200, 9100, 7800, 12000, 3000],
};

/* Wellness tips */
FP.data.wellnessTips = [
  { tip: 'Drink 3-4 litres of water daily for optimal performance.', emoji: '💧' },
  { tip: 'Sleep 7-9 hours. Recovery is where the gains are made.', emoji: '😴' },
  { tip: 'Protein within 30 minutes post-workout boosts muscle repair.', emoji: '🥚' },
  { tip: 'A 5-minute warm-up reduces injury risk by 40%.', emoji: '🔥' },
  { tip: 'Consistency beats intensity. Show up every day.', emoji: '📅' },
  { tip: 'Mindful eating can help you consume 20% fewer calories.', emoji: '🧠' },
  { tip: 'Zone 2 cardio 3x/week doubles fat oxidation.', emoji: '❤️' },
];

FP.data.getDailyTip = function() {
  const idx = new Date().getDay();
  return FP.data.wellnessTips[idx] || FP.data.wellnessTips[0];
};
