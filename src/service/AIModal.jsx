import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GOOGLE_AI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const chatSession = model.startChat({
  generationConfig,
  // safetySettings: Adjust safety settings
  // See https://ai.google.dev/gemini-api/docs/safety-settings
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Generate Travel Plan for Location: Las Vegas, for 3 days for Couple with a cheap budget, Give me a Hotels option list with HotelName, Hotel address, price, hotel image url, geo coordinates, rating, description and suggest itinerary with PlaceName, place Details, place image Url,geo coordinates, rating, ticket pricing, Time Travel each of the location for 3 days with each day plan with best time to visit in JSON format",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n{\n  "hotel_options": [\n    {\n      "hotel_name": "The D Las Vegas",\n      "hotel_address": "301 Fremont Street, Las Vegas, NV 89101",\n      "price": "$50-$100/night",\n      "hotel_image_url": "https://www.thedlev.com/media/images/hero-images/the-d-hotel-las-vegas-hero.jpg",\n      "geo_coordinates": "36.1694, -115.1423",\n      "rating": 4.0,\n      "description": "A budget-friendly hotel located in the heart of Fremont Street, offering a casino, dining options, and a lively atmosphere."\n    },\n    {\n      "hotel_name": "Circus Circus Hotel & Casino",\n      "hotel_address": "2880 Las Vegas Blvd S, Las Vegas, NV 89109",\n      "price": "$40-$80/night",\n      "hotel_image_url": "https://www.circuscircus.com/content/dam/caesars/circus-circus/hero-images/Circus-Circus-Hero-Image.jpg",\n      "geo_coordinates": "36.1208, -115.1737",\n      "rating": 3.5,\n      "description": "A classic Las Vegas hotel with a carnival theme, featuring a casino, circus acts, and budget-friendly accommodations."\n    },\n    {\n      "hotel_name": "Golden Nugget Las Vegas",\n      "hotel_address": "129 E Fremont St, Las Vegas, NV 89101",\n      "price": "$70-$150/night",\n      "hotel_image_url": "https://www.goldennugget.com/images/hero-images/gn-lv-hero-mobile.jpg",\n      "geo_coordinates": "36.1679, -115.1417",\n      "rating": 4.5,\n      "description": "A luxurious hotel with a casino, multiple restaurants, a pool, and a shark tank."\n    },\n    {\n      "hotel_name": "The Strat Hotel, Casino & SkyPod",\n      "hotel_address": "2000 Las Vegas Blvd S, Las Vegas, NV 89104",\n      "price": "$60-$120/night",\n      "hotel_image_url": "https://www.thestrat.com/content/dam/caesars/the-strat/hero-images/Strat-Hero-Image.jpg",\n      "geo_coordinates": "36.1555, -115.1486",\n      "rating": 3.8,\n      "description": "A towering hotel with a casino, dining options, and an observation deck with panoramic views of the city."\n    }\n  ],\n  "itinerary": [\n    {\n      "day": 1,\n      "title": "Fremont Street Experience",\n      "description": "Experience the vibrant energy of Fremont Street with its iconic canopy of lights, street performers, and casinos.",\n      "places": [\n        {\n          "place_name": "Fremont Street Experience",\n          "place_details": "A pedestrian-friendly street with a canopy of lights, live music, and street performers.",\n          "place_image_url": "https://www.fremontstreetexperience.com/media/images/header-images/freemont-street-experience-canopy-4.jpg",\n          "geo_coordinates": "36.1692, -115.1428",\n          "rating": 4.5,\n          "ticket_pricing": "Free",\n          "time_to_spend": "2-3 hours",\n          "best_time_to_visit": "Evening for the full light show experience"\n        },\n        {\n          "place_name": "The D Las Vegas Casino",\n          "place_details": "A casino offering a variety of table games and slot machines.",\n          "place_image_url": "https://www.thedlev.com/media/images/casino-images/the-d-casino.jpg",\n          "geo_coordinates": "36.1694, -115.1423",\n          "rating": 4.0,\n          "ticket_pricing": "N/A",\n          "time_to_spend": "1-2 hours"\n        }\n      ]\n    },\n    {\n      "day": 2,\n      "title": "Las Vegas Strip",\n      "description": "Explore the iconic Las Vegas Strip with its extravagant hotels, casinos, and entertainment.",\n      "places": [\n        {\n          "place_name": "Bellagio Fountains",\n          "place_details": "A choreographed water and light show synchronized to music.",\n          "place_image_url": "https://www.bellagio.com/content/dam/mgmresorts/bellagio/images/bellagio-fountains-hero.jpg",\n          "geo_coordinates": "36.1184, -115.1732",\n          "rating": 4.8,\n          "ticket_pricing": "Free",\n          "time_to_spend": "1 hour",\n          "best_time_to_visit": "Evening for the most spectacular shows"\n        },\n        {\n          "place_name": "The Venetian and The Palazzo",\n          "place_details": "Luxury hotels with a Venetian-inspired setting, featuring canals, gondolas, and shopping.",\n          "place_image_url": "https://www.venetian.com/content/dam/mgmresorts/venetian-palazzo/hero-images/Venetian-Palazzo-Hero-Image.jpg",\n          "geo_coordinates": "36.1135, -115.1722",\n          "rating": 4.5,\n          "ticket_pricing": "N/A",\n          "time_to_spend": "2-3 hours"\n        },\n        {\n          "place_name": "High Roller Observation Wheel",\n          "place_details": "A giant Ferris wheel offering panoramic views of the city.",\n          "place_image_url": "https://www.caesars.com/content/dam/caesars/linq/hero-images/High-Roller-Hero-Image.jpg",\n          "geo_coordinates": "36.1193, -115.1711",\n          "rating": 4.2,\n          "ticket_pricing": "$30-$40",\n          "time_to_spend": "1 hour",\n          "best_time_to_visit": "Evening for city lights"\n        }\n      ]\n    },\n    {\n      "day": 3,\n      "title": "Red Rock Canyon National Conservation Area",\n      "description": "Escape the city bustle and explore the scenic Red Rock Canyon National Conservation Area.",\n      "places": [\n        {\n          "place_name": "Red Rock Canyon National Conservation Area",\n          "place_details": "A scenic desert landscape with red sandstone cliffs, hiking trails, and rock climbing opportunities.",\n          "place_image_url": "https://www.nps.gov/redr/learn/photosmultimedia/photogallery.htm",\n          "geo_coordinates": "36.0803, -115.2676",\n          "rating": 4.8,\n          "ticket_pricing": "$15 per vehicle",\n          "time_to_spend": "4-5 hours",\n          "best_time_to_visit": "Morning or late afternoon to avoid the midday heat"\n        }\n      ]\n    }\n  ]\n}\n```\n\n**Please note:**\n\n* This is a suggested itinerary and can be customized based on your preferences.\n* Prices for hotels and attractions are approximate and may vary depending on the season and availability.\n* It\'s recommended to book accommodations and attractions in advance, especially during peak season.\n* Make sure to check the opening hours and ticket prices of attractions before your visit.\n* You can find more affordable dining options in the downtown area and off the Strip.\n* Las Vegas can be a very hot city, so be sure to drink plenty of water and wear sunscreen.\n* Consider purchasing a Las Vegas Entertainment Pass if you plan to visit multiple attractions.\n',
        },
      ],
    },
  ],
});
