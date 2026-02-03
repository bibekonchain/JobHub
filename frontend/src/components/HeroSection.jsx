import React, { useState } from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    if (!query.trim()) return; // Prevent empty searches
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <section className="text-center px-4 sm:px-6 lg:px-20 py-16 bg-gradient-to-b from-white to-gray-100">
      {/* Badge */}
      <span className="inline-block mb-4 px-5 py-2 rounded-full bg-[#EDE7FF] text-[#6A38C2] font-semibold text-sm shadow-md">
        No. 1 Job Hunt Website
      </span>

      {/* Heading */}
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-gray-900 mb-6">
        Search, Apply & <br />
        <span className="text-[#6A38C2]">Get Your Dream Jobs</span>
      </h1>

      {/* Subtitle */}
      <p className="text-gray-600 text-base sm:text-lg md:text-xl mb-10 max-w-2xl mx-auto">
        Discover your perfect opportunity. Browse thousands of jobs, apply instantly, and take the next step in your career.
      </p>

      {/* Search Box */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-[500px] mx-auto">
        <div className="flex flex-1 items-center bg-white rounded-full shadow-lg border border-gray-200 px-4 py-2 transition-shadow focus-within:shadow-xl">
          <input
            type="text"
            placeholder="Find your dream jobs"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 outline-none border-none text-gray-800 placeholder-gray-400 text-sm sm:text-base"
            onKeyDown={(e) => e.key === "Enter" && searchJobHandler()} // Enter key triggers search
          />
        </div>
        <Button
          onClick={searchJobHandler}
          className="flex items-center justify-center bg-[#6A38C2] hover:bg-[#5a2fb5] transition-colors duration-300 px-6 py-3 rounded-full shadow-md hover:shadow-lg"
        >
          <Search className="h-5 w-5 text-white" />
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;
