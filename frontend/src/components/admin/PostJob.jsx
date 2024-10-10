import React, { useState } from "react"; // Import React and useState hook
import Navbar from "../shared/Navbar"; // Import Navbar component
import { Label } from "../ui/label"; // Import Label component for input labels
import { Input } from "../ui/input"; // Import Input component for user input
import { Button } from "../ui/button"; // Import Button component for actions
import { useSelector } from "react-redux"; // Import useSelector to access Redux store
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"; // Import Select components for dropdown
import axios from "axios"; // Import axios for making HTTP requests
import { JOB_API_END_POINT } from "@/utils/constant"; // Import API endpoint constant
import { toast } from "sonner"; // Import toast for notifications
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { Loader2 } from "lucide-react"; // Import loading icon

const companyArray = []; // Placeholder for companies, could be removed since it's unused

const PostJob = () => {
  // State to hold input values for job posting
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: 0,
    companyId: "",
  });

  const [loading, setLoading] = useState(false); // State to manage loading state
  const navigate = useNavigate(); // Initialize navigate for routing

  const { companies } = useSelector((store) => store.company); // Get companies from Redux store

  // Handler for input changes
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value }); // Update input state with new value
  };

  // Handler for company selection change
  const selectChangeHandler = (value) => {
    const selectedCompany = companies.find(
      (company) => company.name.toLowerCase() === value
    ); // Find selected company
    setInput({ ...input, companyId: selectedCompany._id }); // Update input state with company ID
  };

  // Submit handler for the form
  const submitHandler = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      setLoading(true); // Set loading state to true
      const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
        headers: {
          "Content-Type": "application/json", // Set content type for request
        },
        withCredentials: true, // Include credentials in the request
      });
      if (res.data.success) {
        toast.success(res.data.message); // Show success notification
        navigate("/admin/jobs"); // Navigate to the jobs list page
      }
    } catch (error) {
      toast.error(error.response.data.message); // Show error notification
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div>
      <Navbar /> {/* Render the Navbar component */}
      <div className="flex items-center justify-center w-screen my-5">
        <form
          onSubmit={submitHandler}
          className="p-8 max-w-4xl border border-gray-200 shadow-lg rounded-md"
        >
          {" "}
          {/* Form to post a new job */}
          <div className="grid grid-cols-2 gap-2">
            {" "}
            {/* Grid layout for inputs */}
            <div>
              <Label>Title</Label> {/* Label for job title input */}
              <Input
                type="text"
                name="title" // Input name
                value={input.title} // Controlled input value
                onChange={changeEventHandler} // Change event handler
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Description</Label> {/* Label for job description input */}
              <Input
                type="text"
                name="description" // Input name
                value={input.description} // Controlled input value
                onChange={changeEventHandler} // Change event handler
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Requirements</Label>{" "}
              {/* Label for job requirements input */}
              <Input
                type="text"
                name="requirements" // Input name
                value={input.requirements} // Controlled input value
                onChange={changeEventHandler} // Change event handler
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Salary</Label> {/* Label for salary input */}
              <Input
                type="text"
                name="salary" // Input name
                value={input.salary} // Controlled input value
                onChange={changeEventHandler} // Change event handler
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Location</Label> {/* Label for job location input */}
              <Input
                type="text"
                name="location" // Input name
                value={input.location} // Controlled input value
                onChange={changeEventHandler} // Change event handler
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Job Type</Label> {/* Label for job type input */}
              <Input
                type="text"
                name="jobType" // Input name
                value={input.jobType} // Controlled input value
                onChange={changeEventHandler} // Change event handler
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Experience Level</Label>{" "}
              {/* Label for experience level input */}
              <Input
                type="text"
                name="experience" // Input name
                value={input.experience} // Controlled input value
                onChange={changeEventHandler} // Change event handler
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>No of Positions</Label>{" "}
              {/* Label for number of positions input */}
              <Input
                type="number"
                name="position" // Input name
                value={input.position} // Controlled input value
                onChange={changeEventHandler} // Change event handler
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            {companies.length > 0 && (
              <Select onValueChange={selectChangeHandler}>
                {" "}
                {/* Select dropdown for company selection */}
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a Company" />{" "}
                  {/* Placeholder for select input */}
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {companies.map((company) => {
                      return (
                        <SelectItem
                          key={company._id}
                          value={company?.name?.toLowerCase()}
                        >
                          {company.name}
                        </SelectItem> // Map over companies to create select options
                      );
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          </div>
          {loading ? (
            <Button className="w-full my-4">
              {" "}
              {/* Loading button while submitting */}
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
            </Button>
          ) : (
            <Button type="submit" className="w-full my-4">
              Post New Job
            </Button> // Submit button for job posting
          )}
          {companies.length === 0 && (
            <p className="text-xs text-red-600 font-bold text-center my-3">
              *Please register a company first, before posting a job
            </p> // Message if no companies are available
          )}
        </form>
      </div>
    </div>
  );
};

export default PostJob; // Export the PostJob component
