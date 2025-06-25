export const SelectTravelesList = [
  {
    id: 1,
    title: "Just Me",
    desc: "A sole traveles in exploration",
    icon: "✈️",
    people: "1",
  },
  {
    id: 2,
    title: "Romantic Retreat",
    desc: "Whisk away your special someone on a dreamy getaway for two.",
    icon: "💑",
    people: "2 People",
  },
  {
    id: 3,
    title: "Family Voyage",
    desc: "Embark on an un- forgettable adventure with your loved ones.",
    icon: "🏖️",
    people: "4 to 5 People",
  },
  {
    id: 4,
    title: "Friends' Escape",
    desc: "Create lasting memories with your closest friends on an epic journey.",
    icon: "🌍",
    people: "6 to 10 people",
  },
];

export const SelectBudgetoption = [
  {
    id: 1,
    title: "Cheap",
    desc: "See the world on a tight budget.",
    icon: "🛏️",
  },
  {
    id: 2,
    title: "Moderate",
    desc: "Enjoy a comfortable trip that balances cost and experience.",
    icon: "🏨",
  },
  {
    id: 3,
    title: "High",
    desc: "Indulge in the finest experiences with no expense spared.",
    icon: "🏰",
  },
];

export const AI_PROMPT =
  "Generate Travel Plan for Location: {location}, for {totalDays} days for {traveler} with a {budget} budget, Give me a Hotels option list with HotelName, Hotel address, price, hotel image url, geo coordinates, rating, description and suggest itinerary with PlaceName, place Details, place image Url,geo coordinates, rating, ticket pricing, Time Travel each of the location for {totalDays} days with each day plan with best time to visit in JSON format";
