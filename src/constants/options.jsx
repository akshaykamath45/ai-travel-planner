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
    people: "5 to 10 People",
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

export const TravelTags = [
  {
    id: 1,
    title: "Beaches",
    icon: "🏖️",
  },
  {
    id: 2,
    title: "Mountains",
    icon: "⛰️",
  },
  {
    id: 3,
    title: "Cultural",
    icon: "🏛️",
  },
  {
    id: 4,
    title: "Adventure",
    icon: "🏃‍♂️",
  },
  {
    id: 5,
    title: "Relaxation",
    icon: "🧘‍♀️",
  },
  {
    id: 6,
    title: "Food & Dining",
    icon: "🍽️",
  },
  {
    id: 7,
    title: "Historical",
    icon: "🏺",
  },
  {
    id: 8,
    title: "Nature",
    icon: "🌲",
  }
];

export const AI_PROMPT = `
Generate a detailed travel plan for the following criteria:

- **Location:** {location}  
- **Duration:** {noOfDays} days  
- **Travelers:** {travelers}  
- **Budget Category:** {budget}
- **Budget Per Person:** {perPersonBudget} USD 
- **Travel Preferences:** {travelTags}

Please provide the result in the following JSON format:

{
  "tripSummary": "<A beautifully crafted summary of the entire trip, highlighting unique local experiences and hidden gems>",
  "hotelOptions": [
    {
      "hotelName": "<Hotel Name>",
      "address": "<Hotel Address>",
      "price": "<Price> per night",
      "hotelImageURL": "<Hotel Image URL>",
      "description": "<Hotel Description>",
      "geoCoordinates": {
        "latitude": <Latitude>,
        "longitude": <Longitude>
      },
      "rating": <Rating>
    }
  ],
  "itinerary": [
    {
      "day": <Day Number>,
      "dayPlan": [
        {
          "placeName": "<Place Name>",
          "placeDetails": "<Place Details>",
          "placeImageURL": "<Place Image URL>",
          "geoCoordinates": {
            "latitude": <Latitude>,
            "longitude": <Longitude>
          },
          "ticketPricing": "<Ticket Pricing>",
          "timeTravel": "<Time Travel>",
          "bestTimeToVisit": "<Best Time To Visit>"
        }
      ]
    }
  ]
}



Focus on creating an authentic travel experience that includes:
1. Local hidden gems and off-the-beaten-path attractions
2. Unique cultural experiences specific to the region
3. Local food specialties and dining recommendations
4. A mix of popular attractions and lesser-known spots
5. Activities that match the selected travel preferences: {travelTags}

Consider the preferences of {travelers} and balance the itinerary according to the selected travel tags. Ensure the recommendations stay within the {budget} budget category and {perPersonBudget} per person budget constraint.

Note: The itinerary array MUST contain exactly {noOfDays} elements, with sequential day numbers from 1 to {noOfDays}.`;
