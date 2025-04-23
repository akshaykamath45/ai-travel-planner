export const getTravelerIcon = (travelers) => {
  if (!travelers) return '🚶';
  const count = parseInt(travelers);
  if (count === 1) return '🚶';
  if (count === 2) return '💑';
  if (count >= 3 && count <= 5) return '👨‍👩‍👧‍👦';
  if (count > 5) return '🤝';
  return '🚶';
};

export const getBudgetIcon = (budget) => {
  if (!budget) return '💰';
  switch (budget.toLowerCase()) {
    case 'cheap':
      return '💵';
    case 'moderate':
      return '💰';
    case 'luxury':
      return '💸';
    default:
      return '💰';
  }
};

export const getTravelTagIcon = (tag) => {
  if (!tag) return '🎯';
  const iconMap = {
    'beaches': '🏖️',
    'mountains': '⛰️',
    'cultural': '🏛️',
    'adventure': '🏃‍♂️',
    'relaxation': '🧘‍♀️',
    'food & dining': '🍽️',
    'historical': '🏺',
    'nature': '🌲'
  };
  return iconMap[tag.toLowerCase()] || '🎯';
};