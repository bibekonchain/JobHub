import React, { useEffect, useState } from "react"; // Import React, useEffect, and useState hooks
import Navbar from "../shared/Navbar"; // Import Navbar component
import { Button } from "../ui/button"; // Import Button component for actions
import { ArrowLeft, Loader2 } from "lucide-react"; // Import icons for navigation and loading
import { Label } from "../ui/label"; // Import Label component for input labels
import { Input } from "../ui/input"; // Import Input component for user input
import axios from "axios"; // Import axios for making HTTP requests
import { COMPANY_API_END_POINT } from "@/utils/constant"; // Import API endpoint constant
import { useNavigate, useParams } from "react-router-dom"; // Import hooks for routing
import { toast } from "sonner"; // Import toast for notifications
import { useSelector } from "react-redux"; // Import useSelector to access Redux store
import useGetCompanyById from "@/hooks/useGetCompanyById"; // Custom hook to fetch company by ID

const CompanySetup = () => {
  const params = useParams(); // Get company ID from URL parameters
  useGetCompanyById(params.id); // Fetch company details using custom hook
  const [input, setInput] = useState({
    // State to hold input values
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });
  const { singleCompany } = useSelector((store) => store.company); // Get single company data from Redux store
  const [loading, setLoading] = useState(false); // State to manage loading state
  const navigate = useNavigate(); // Initialize navigate for routing

  // Handler for input changes
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  // Handler for file input changes
  const changeFileHandler = (e) => {
    const file = e.target.files?.[0]; // Get the selected file
    setInput({ ...input, file }); // Update state with the selected file
  };

  // Submit handler for the form
  const submitHandler = async (e) => {
    e.preventDefault(); // Prevent default form submission
    const formData = new FormData(); // Create FormData object for file upload
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);
    if (input.file) {
      formData.append("file", input.file); // Append file if selected
    }
    try {
      setLoading(true); // Set loading state to true
      const res = await axios.put(
        `${COMPANY_API_END_POINT}/update/${params.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Set content type for file upload
          },
          withCredentials: true, // Include credentials in the request
        }
      );
      if (res.data.success) {
        toast.success(res.data.message); // Show success message
        navigate("/admin/companies"); // Navigate to companies list
      }
    } catch (error) {
      console.log(error); // Log any errors to the console
      toast.error(error.response.data.message); // Show error message
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  // Effect to populate input fields with the company data when fetched
  useEffect(() => {
    setInput({
      name: singleCompany.name || "",
      description: singleCompany.description || "",
      website: singleCompany.website || "",
      location: singleCompany.location || "",
      file: singleCompany.file || null,
    });
  }, [singleCompany]);

  return (
    <div>
      <Navbar /> {/* Render the Navbar component */}
      <div className="max-w-xl mx-auto my-10">
        <form onSubmit={submitHandler}>
          {" "}
          {/* Form to update company details */}
          <div className="flex items-center gap-5 p-8">
            <Button
              onClick={() => navigate("/admin/companies")}
              variant="outline"
              className="flex items-center gap-2 text-gray-500 font-semibold"
            >
              <ArrowLeft /> {/* Back button */}
              <span>Back</span>
            </Button>
            <h1 className="font-bold text-xl">Company Setup</h1>{" "}
            {/* Title for the setup form */}
          </div>
          <div className="grid grid-cols-2 gap-4">
            {" "}
            {/* Grid layout for inputs */}
            <div>
              <Label>Company Name</Label> {/* Label for company name input */}
              <Input
                type="text"
                name="name" // Input name
                value={input.name} // Controlled input value
                onChange={changeEventHandler} // Change event handler
              />
            </div>
            <div>
              <Label>Description</Label> {/* Label for description input */}
              <Input
                type="text"
                name="description" // Input name
                value={input.description} // Controlled input value
                onChange={changeEventHandler} // Change event handler
              />
            </div>
            <div>
              <Label>Website</Label> {/* Label for website input */}
              <Input
                type="text"
                name="website" // Input name
                value={input.website} // Controlled input value
                onChange={changeEventHandler} // Change event handler
              />
            </div>
            <div>
              <Label>Location</Label> {/* Label for location input */}
              <Input
                type="text"
                name="location" // Input name
                value={input.location} // Controlled input value
                onChange={changeEventHandler} // Change event handler
              />
            </div>
            <div>
              <Label>Logo</Label> {/* Label for logo upload */}
              <Input
                type="file" // File input type
                accept="image/*" // Accept image files
                onChange={changeFileHandler} // Change event handler for file input
              />
            </div>
          </div>
          {loading ? (
            <Button className="w-full my-4">
              {" "}
              {/* Loading button while submitting */}
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
            </Button>
          ) : (
            <Button type="submit" className="w-full my-4">
              Update
            </Button> // Update button
          )}
        </form>
      </div>
    </div>
  );
};

export default CompanySetup; // Export the CompanySetup component
