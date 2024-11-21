export const SelectTravelersList = [
  {
    id: 1,
    title: "Just Me",
    desc: "A sole traveler in exploration",
    icon: "🚶",
    people: "Solo traveler (1 person)",
  },
  {
    id: 2,
    title: "A Couple",
    desc: "Two travelers in tandem",
    icon: "💑",
    people: "2 People",
  },
  {
    id: 3,
    title: "Family",
    desc: "A group of fun loving adv",
    icon: "👨‍👩‍👧‍👦",
    people: "3 to 5 people",
  },
  {
    id: 4,
    title: "Friends",
    desc: "Adventure with Your Crew",
    icon: "🤝",
    no: "5 to 10 People",
  },
];

export const SelectBudgetOptions = [
  {
    id: 1,
    title: "Cheap",
    desc: "Stay conscious of costs",
    icon: "💵",
  },
  {
    id: 2,
    title: "Moderate",
    desc: "Keep cost on the average side",
    icon: "💰",
  },
  {
    id: 3,
    title: "Luxury",
    desc: "Dont worry about cost",
    icon: "💸",
  },
];

export const AI_PROMPT = `
Generate a detailed travel plan for the following criteria:

- **Location:** {location}  
- **Duration:** {noOfDays} days  
- **Travelers:** {travelers}  
- **Budget:** {budget}  

Provide the output in JSON format with the following details:

1. **Hotels Options:**  
   - Hotel Name  
   - Address  
   - Price (per night)  
   - Image URL  
   - Geo Coordinates (latitude and longitude)  
   - Rating  
   - Description  

2. **Daily Itinerary (for {noOfDays} days):**  
   - **Day-wise Plan:** Include a detailed schedule for each day.  
   - **Places to Visit:**  
     - Name of the Place  
     - Description of the place  
     - Image URL of the place  
     - Geo Coordinates (latitude and longitude)  
     - Ticket Pricing (if applicable)  
   - **Travel Time:** Time to travel between locations.  
   - **Best Visiting Time:** Ideal time to visit each location.  

Ensure that the itinerary balances exploration with relaxation. Consider the preferences of {travelers} and the {budget} budget constraint while selecting hotels, activities, and attractions.
`;
