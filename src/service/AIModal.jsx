// Generate Travel Plan for Location : Las Vegas, for 3 Days for Couple with a Cheap budget,Give me a Hotels options list with
// HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place
// Details, Place Image Url, Geo Coordinates, ticket Pricing,rating, Time travel each of the location for 3 days with each day plan with best
// time to visit in JSON format.

import { GoogleGenerativeAI } from "@google/generative-ai";
const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const chatSession = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Generate a detailed travel plan for the following criteria:\n\nLocation: Las Vegas\nDuration: 3 days\nTravelers: A couple\nBudget: Cheap\nProvide the output in JSON format with the following details:\n\nHotels Options:\n\nHotel Name\nAddress\nPrice (per night)\nImage URL\nGeo Coordinates (latitude and longitude)\nRating\nDescription\nDaily Itinerary (for 3 days):\n\nDay-wise Plan: Include a schedule for each day.\nPlaces to Visit:\nName of the Place\nDescription of the place\nImage URL of the place\nGeo Coordinates (latitude and longitude)\nTicket Pricing (if applicable)\nTravel Time: Time to travel between locations.\nBest Visiting Time: Ideal time to visit each location.\nEnsure that the itinerary balances exploration with relaxation. Consider the preferences of a couple and the cheap budget constraint while selecting hotels, activities, and attractions.\n\n\n\nnote: give the result in json format",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n{\n  "tripDetails": {\n    "location": "Las Vegas, Nevada",\n    "duration": "3 days",\n    "travelers": "Couple",\n    "budget": "Cheap"\n  },\n  "hotels": [\n    {\n      "hotelName": "Circus Circus Hotel & Casino",\n      "address": "2880 S Las Vegas Blvd, Las Vegas, NV 89109",\n      "pricePerNight": 40, \n      "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/CircusCircusLasVegas.jpg/1280px-CircusCircusLasVegas.jpg",\n      "geoCoordinates": {\n        "latitude": 36.1215,\n        "longitude": -115.1734\n      },\n      "rating": 3.5,\n      "description": "A classic Vegas hotel with affordable rooms, a circus act, and a midway.  It\'s not luxurious, but it\'s centrally located and offers good value for budget travelers."\n    },\n    {\n      "hotelName": "Westgate Las Vegas Resort & Casino",\n      "address": "3000 Paradise Rd, Las Vegas, NV 89109",\n      "pricePerNight": 50,\n      "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Westgate_Las_Vegas_Resort_%26_Casino.jpg/1280px-Westgate_Las_Vegas_Resort_%26_Casino.jpg",\n      "geoCoordinates": {\n        "latitude": 36.1292,\n        "longitude": -115.1462\n      },\n      "rating": 3.8,\n      "description": "Offers a good balance of price and amenities.  It\'s a bit further from the Strip but offers more spacious rooms than some budget options."\n    }\n\n  ],\n  "itinerary": {\n    "day1": {\n      "plan": "Exploring the Strip (Free Activities)",\n      "placesToVisit": [\n        {\n          "name": "Bellagio Fountains",\n          "description": "Free, mesmerizing water show with music and lights.",\n          "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Bellagio_Fountains_Night.jpg/1280px-Bellagio_Fountains_Night.jpg",\n          "geoCoordinates": {\n            "latitude": 36.1146,\n            "longitude": -115.1729\n          },\n          "ticketPricing": "Free",\n          "travelTime": "5-10 mins walk (between most Strip locations)",\n          "bestVisitingTime": "Evening for the light show"\n        },\n        {\n          "name": "Fremont Street Experience",\n          "description": "Free light and sound show under a canopy of LED lights in Downtown Las Vegas.",\n          "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Fremont_Street_Experience_Las_Vegas.jpg/1280px-Fremont_Street_Experience_Las_Vegas.jpg",\n          "geoCoordinates": {\n            "latitude": 36.1699,\n            "longitude": -115.1404\n          },\n          "ticketPricing": "Free",\n          "travelTime": "20-30 mins by taxi or rideshare",\n          "bestVisitingTime": "Evening"\n\n        },\n        {\n          "name": "The LINQ Promenade",\n          "description": "Outdoor shopping and dining area with the High Roller observation wheel (paid attraction). Stroll and enjoy the atmosphere.",\n          "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/The_LINQ_Promenade.jpg/1280px-The_LINQ_Promenade.jpg",\n          "geoCoordinates": {\n            "latitude": 36.1244,\n            "longitude": -115.1716\n          },\n          "ticketPricing": "Free to walk around",\n          "travelTime": "5-10 mins walk",\n          "bestVisitingTime": "Anytime"\n        }\n      ]\n    },\n    "day2": {\n      "plan": "Red Rock Canyon National Conservation Area & Pool Time",\n      "placesToVisit": [\n        {\n          "name": "Red Rock Canyon National Conservation Area",\n          "description": "Stunning desert landscape with hiking trails (some free, some with fees).",\n          "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Red_Rock_Canyon_National_Conservation_Area.jpg/1280px-Red_Rock_Canyon_National_Conservation_Area.jpg",\n          "geoCoordinates": {\n            "latitude": 36.1800,\n            "longitude": -115.5400\n          },\n          "ticketPricing": "Entrance fee applies (check NPS website)",\n          "travelTime": "30-45 mins by car",\n          "bestVisitingTime": "Morning or late afternoon to avoid intense heat"\n        }\n      ],\n      "relaxation": "Afternoon: Relaxing by the hotel pool"\n    },\n    "day3": {\n      "plan": "Downtown exploration and affordable eats",\n      "placesToVisit": [\n        {\n          "name": "Arts District",\n          "description": "Explore street art, galleries, and unique shops.",\n          "imageUrl": "https://www.visitslc.com/sites/default/files/styles/slideshow_image/public/2022-03/SLC_ArtsDistrict_01.jpg?itok=eO6E5f2a",\n          "geoCoordinates": {\n              "latitude": 36.15,\n              "longitude": -115.14\n          },\n          "ticketPricing": "Free",\n          "travelTime": "Taxi/Ride share from Strip",\n          "bestVisitingTime": "Anytime"\n        },\n        {\n            "name": "Eat at a local, affordable eatery",\n            "description": "Explore downtown for cheap and cheerful eats.",\n            "imageUrl": "Placeholder Image URL",\n            "geoCoordinates": {\n              "latitude": "Variable",\n              "longitude": "Variable"\n            },\n            "ticketPricing": "Budget-friendly options",\n            "travelTime": "5-10 mins walk",\n            "bestVisitingTime": "Lunch or Dinner"\n        }\n      ]\n    }\n  }\n}\n```\n\n**Note:** Image URLs are placeholders in some cases. You\'ll need to replace them with actual image URLs.  Hotel prices are estimates and can vary greatly depending on the season and availability.  Always check for the most up-to-date pricing before booking.  The Red Rock Canyon entrance fee needs to be verified on the National Park Service website.  Transportation times are estimates and may vary depending on traffic.\n',
        },
      ],
    },
  ],
});
