export const categories = [
  { title: 'THE PALMS', points: '100', off: '30%', category: 'Loyalty' },
  { title: 'Tranquilisle', points: '200', off: '20%', category: 'Loyalty' },
  { title: 'Beauty & Wellness', points: '150', off: '15%', category: 'Beauty & Wellness' },
  { title: 'Clothing & Accessories', points: '150', off: '15%', category: 'Clothing' },
  { title: 'Dining', points: '100', off: '40%', category: 'Dining' },
  { title: 'Eco Store', points: '80', off: '10%', category: 'Sustainability' },
  { title: 'Green Cafe', points: '120', off: '12%', category: 'Dining' },
  { title: 'Plant Shop', points: '90', off: '30%', category: 'Gardening' },
];

export const membershipLevels = [
  { name: 'SILVER', active: false },
  { name: 'GOLD', active: false },
  { name: 'PLATINUM', active: true },
  { name: 'DIAMOND', active: false },
];

export const pointsData = {
  currentPoints: 3000,
  targetPoints: 4000,
  get progress() {
    return (this.currentPoints / this.targetPoints) * 100;
  }
};