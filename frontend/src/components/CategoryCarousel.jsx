import React from "react"; // Import React
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel"; // Import Carousel components
import { Button } from "./ui/button"; // Import Button component
import { useDispatch } from "react-redux"; // Import useDispatch hook from Redux
import { useNavigate } from "react-router-dom"; // Import useNavigate hook for navigation
import { setSearchedQuery } from "@/redux/jobSlice"; // Import action to set the searched query

// Define the job categories
const category = [
  "Frontend Developer",
  "Backend Developer",
  "Data Science",
  "Graphic Designer",
  "FullStack Developer",
];

const CategoryCarousel = () => {
  const dispatch = useDispatch(); // Get dispatch function
  const navigate = useNavigate(); // Get navigate function

  // Handler for searching jobs based on category
  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query)); // Dispatch the searched query
    navigate("/browse"); // Navigate to the browse page
  };

  return (
    <div>
      <Carousel className="w-full max-w-xl mx-auto my-20">
        {" "}
        {/* Carousel container */}
        <CarouselContent>
          {category.map((cat, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              {" "}
              {/* Each category item */}
              <Button
                onClick={() => searchJobHandler(cat)}
                variant="outline"
                className="rounded-full"
              >
                {cat} {/* Display category name */}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious /> {/* Button to navigate to the previous item */}
        <CarouselNext /> {/* Button to navigate to the next item */}
      </Carousel>
    </div>
  );
};

export default CategoryCarousel; // Export the CategoryCarousel component
