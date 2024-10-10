import React, { useState } from "react"; // Import React and useState hook
import { Button } from "./ui/button"; // Import Button component
import { Search } from "lucide-react"; // Import Search icon from lucide-react
import { useDispatch } from "react-redux"; // Import useDispatch from Redux
import { setSearchedQuery } from "@/redux/jobSlice"; // Import action to set the searched query
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

const HeroSection = () => {
  const [query, setQuery] = useState(""); // State to hold the search query
  const dispatch = useDispatch(); // Get dispatch function
  const navigate = useNavigate(); // Get navigate function for routing

  // Handler for search job action
  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query)); // Dispatch the searched query
    navigate("/browse"); // Navigate to the browse page
  };

  return (
    <div className="text-center">
      {" "}
      {/* Centered container */}
      <div className="flex flex-col gap-5 my-10">
        {" "}
        {/* Flex container for vertical alignment */}
        <span className="mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#6A38C2] font-medium">
          No. 1 Job Hunt Website
        </span>
        <h1 className="text-5xl font-bold">
          Search, Apply & <br />
          Get Your <span className="text-[#6A38C2]">Dream Jobs</span>
        </h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
          aspernatur temporibus nihil tempora dolor!
        </p>
        <div className="flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto">
          {" "}
          {/* Search input container */}
          <input
            type="text"
            placeholder="Find your dream jobs" // Placeholder for the input
            onChange={(e) => setQuery(e.target.value)} // Update query state on input change
            className="outline-none border-none w-full" // Style for input
          />
          <Button
            onClick={searchJobHandler}
            className="rounded-r-full bg-[#6A38C2]"
          >
            {" "}
            {/* Search button */}
            <Search className="h-5 w-5" /> {/* Search icon */}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection; // Export the HeroSection component
