import React, { useState } from "react"; // Import React and useState hook
import Navbar from "../shared/Navbar"; // Import the Navbar component
import { Label } from "../ui/label"; // Import Label component for input labels
import { Input } from "../ui/input"; // Import Input component for user input
import { Button } from "../ui/button"; // Import Button component for actions
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import axios from "axios"; // Import axios for making HTTP requests
import { COMPANY_API_END_POINT } from "@/utils/constant"; // Import API endpoint constant
import { toast } from "sonner"; // Import toast for notifications
import { useDispatch } from "react-redux"; // Import useDispatch to dispatch actions
import { setSingleCompany } from "@/redux/companySlice"; // Import Redux action to set single company

const CompanyCreate = () => {
  const navigate = useNavigate(); // Initialize navigate for routing
  const [companyName, setCompanyName] = useState(); // State to hold the company name input
  const dispatch = useDispatch(); // Initialize dispatch to send actions to the Redux store

  // Function to register a new company
  const registerNewCompany = async () => {
    try {
      // Send POST request to register the new company
      const res = await axios.post(
        `${COMPANY_API_END_POINT}/register`,
        { companyName },
        {
          headers: {
            "Content-Type": "application/json", // Set content type to JSON
          },
          withCredentials: true, // Include credentials in the request
        }
      );
      // Check if the registration was successful
      if (res?.data?.success) {
        dispatch(setSingleCompany(res.data.company)); // Dispatch action to set the company in Redux
        toast.success(res.data.message); // Show success message
        const companyId = res?.data?.company?._id; // Get the newly created company's ID
        navigate(`/admin/companies/${companyId}`); // Navigate to the company details page
      }
    } catch (error) {
      console.log(error); // Log any errors to the console
    }
  };

  return (
    <div>
      <Navbar /> {/* Render the Navbar component */}
      <div className="max-w-4xl mx-auto">
        <div className="my-10">
          <h1 className="font-bold text-2xl">Your Company Name</h1>{" "}
          {/* Heading for the company name section */}
          <p className="text-gray-500">
            What would you like to give your company name? you can change this
            later.
          </p>{" "}
          {/* Instruction text */}
        </div>
        <Label>Company Name</Label> {/* Label for the company name input */}
        <Input
          type="text"
          className="my-2" // Add margin for spacing
          placeholder="JobHunt, Microsoft etc." // Placeholder text
          onChange={(e) => setCompanyName(e.target.value)} // Update state on input change
        />
        <div className="flex items-center gap-2 my-10">
          {" "}
          {/* Container for buttons */}
          <Button
            variant="outline"
            onClick={() => navigate("/admin/companies")}
          >
            Cancel
          </Button>{" "}
          {/* Cancel button */}
          <Button onClick={registerNewCompany}>Continue</Button>{" "}
          {/* Continue button to register company */}
        </div>
      </div>
    </div>
  );
};

export default CompanyCreate; // Export the CompanyCreate component
