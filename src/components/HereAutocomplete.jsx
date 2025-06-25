import React, { useState } from "react";
import axios from "axios";

const HereAutocomplete = ({ selectProps }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const handleInputChange = async (e) => {
    const inputValue = e.target.value;
    setQuery(inputValue);

    if (inputValue.length > 2) {
      try {
        const response = await axios.get(
          `https://autocomplete.search.hereapi.com/v1/autocomplete`,
          {
            params: {
              apiKey: import.meta.env.VITE_HEREMAPS_AUTO_API_KEY, // Access environment variable
              q: inputValue,
              limit: 5,
            },
          }
        );

        const formattedSuggestions = response.data.items.map((item) => {
          const city = item.address.city || "";
          const country = item.address.countryName || "";
          return {
            ...item,
            title: `${city}, ${country}`,
          };
        });

        setSuggestions(formattedSuggestions);
      } catch (error) {
        console.error("Error fetching autocomplete suggestions:", error);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion.title); // Update input field with selected suggestion
    setSuggestions([]); // Clear suggestions

    if (selectProps && selectProps.onChange) {
      selectProps.onChange({
        title: suggestion.title,
        placeId: suggestion.id, // Use `id` or the appropriate field for place ID
      });
    }
  };

  return (
    <div className="relative w-full">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Select a location..."
        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      />
      {suggestions.length > 0 && (
        <ul className="absolute top-full left-0 w-full max-h-60 overflow-y-auto bg-background border border-input mt-1 rounded-md shadow-lg z-10">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="px-3 py-2 cursor-pointer text-sm hover:bg-muted-foreground"
            >
              {suggestion.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HereAutocomplete;
