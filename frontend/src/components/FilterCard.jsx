import React, { useEffect, useState } from "react"; // Import React and hooks
import { RadioGroup, RadioGroupItem } from "./ui/radio-group"; // Import RadioGroup components
import { Label } from "./ui/label"; // Import Label component
import { useDispatch } from "react-redux"; // Import useDispatch from Redux
import { setSearchedQuery } from "@/redux/jobSlice"; // Import action to set the searched query

// Define filter data for jobs
const fitlerData = [
  {
    fitlerType: "Location", // Type of filter
    array: ["Kathmandu", "Hetuda", "Butwal", "Bharatpur", "Pokhara"], // Options for Location
  },
  {
    fitlerType: "Industry", // Type of filter
    array: ["Frontend Developer", "Backend Developer", "FullStack Developer"], // Options for Industry
  },
  // {
  //   fitlerType: "Salary", // Type of filter
  //   array: ["0-40k", "42-1lakh", "1lakh to 5lakh"], // Options for Salary
  // },
];

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState(""); // State to hold selected value
  const dispatch = useDispatch(); // Get dispatch function

  // Handler for changing selected value
  const changeHandler = (value) => {
    setSelectedValue(value); // Update state with selected value
  };

  // Effect to dispatch the selected query whenever it changes
  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue)); // Dispatch the searched query
  }, [selectedValue]);

  return (
    <div className="w-full bg-white p-3 rounded-md">
      {" "}
      {/* Card container */}
      <h1 className="font-bold text-lg">Filter Jobs</h1> {/* Title */}
      <hr className="mt-3" /> {/* Separator line */}
      <RadioGroup value={selectedValue} onValueChange={changeHandler}>
        {" "}
        {/* RadioGroup for filters */}
        {fitlerData.map((data, index) => (
          <div key={index}>
            {" "}
            {/* Ensure to set a unique key for the outer div */}
            <h1 className="font-bold text-lg">{data.fitlerType}</h1>{" "}
            {/* Filter type title */}
            {data.array.map((item, idx) => {
              const itemId = `id${index}-${idx}`; // Unique ID for each radio button
              return (
                <div key={itemId} className="flex items-center space-x-2 my-2">
                  {" "}
                  {/* Container for each radio item */}
                  <RadioGroupItem value={item} id={itemId} />{" "}
                  {/* Radio button */}
                  <Label htmlFor={itemId}>{item}</Label>{" "}
                  {/* Label for radio button */}
                </div>
              );
            })}
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default FilterCard; // Export the FilterCard component
