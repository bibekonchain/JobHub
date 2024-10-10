import React, { useEffect, useState } from "react"; // Import React and necessary hooks
import Navbar from "../shared/Navbar"; // Import the Navbar component
import { Input } from "../ui/input"; // Import the Input component for search
import { Button } from "../ui/button"; // Import the Button component for actions
import CompaniesTable from "./CompaniesTable"; // Import the table component for displaying companies
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import useGetAllCompanies from "@/hooks/useGetAllCompanies"; // Custom hook to fetch all companies
import { useDispatch } from "react-redux"; // Import useDispatch to interact with Redux store
import { setSearchCompanyByText } from "@/redux/companySlice"; // Action to set search filter for companies

const Companies = () => {
  useGetAllCompanies(); // Fetch all companies when component mounts
  const [input, setInput] = useState(""); // State to hold the input value for search
  const navigate = useNavigate(); // Initialize navigation
  const dispatch = useDispatch(); // Initialize dispatch to update Redux state

  // Effect to dispatch search input to the Redux store
  useEffect(() => {
    dispatch(setSearchCompanyByText(input)); // Dispatch the search text whenever it changes
  }, [input]); // Dependency array includes input, effect runs when input changes

  return (
    <div>
      <Navbar /> {/* Render the Navbar component */}
      <div className="max-w-6xl mx-auto my-10">
        {" "}
        {/* Main container for the Companies page */}
        <div className="flex items-center justify-between my-5">
          {" "}
          {/* Container for input and button */}
          <Input
            className="w-fit" // Apply width styling
            placeholder="Filter by name" // Placeholder for the input field
            onChange={(e) => setInput(e.target.value)} // Update state on input change
          />
          <Button onClick={() => navigate("/admin/companies/create")}>
            New Company
          </Button>{" "}
          {/* Button to navigate to create company page */}
        </div>
        <CompaniesTable /> {/* Render the CompaniesTable component */}
      </div>
    </div>
  );
};

export default Companies; // Export the Companies component
