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

Please provide the result in the following JSON format:

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
            "ticketPricing": "<Ticket Pricing >",
            "timeTravel": "<Time Travel>",
            "bestTimeToVisit": "<Best Time To Visit>"
          }
        ]
      }
    ]  

Ensure that the itinerary balances exploration with relaxation. Consider the preferences of {travelers} and the {budget} budget constraint while selecting hotels, activities, and attractions.
`;
