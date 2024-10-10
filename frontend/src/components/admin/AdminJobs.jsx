import React, { useEffect, useState } from "react"; // Import React and necessary hooks
import Navbar from "../shared/Navbar"; // Import the Navbar component
import { Input } from "../ui/input"; // Import the Input component
import { Button } from "../ui/button"; // Import the Button component
import { useNavigate } from "react-router-dom"; // Import useNavigate for routing
import { useDispatch } from "react-redux"; // Import useDispatch for Redux actions
import AdminJobsTable from "./AdminJobsTable"; // Import the AdminJobsTable component
import useGetAllAdminJobs from "@/hooks/useGetAllAdminJobs"; // Custom hook to fetch all admin jobs
import { setSearchJobByText } from "@/redux/jobSlice"; // Import action to set search text

const AdminJobs = () => {
  // Call the custom hook to fetch all admin jobs
  useGetAllAdminJobs();

  // Local state to store input for filtering jobs
  const [input, setInput] = useState("");
  const navigate = useNavigate(); // Initialize navigation
  const dispatch = useDispatch(); // Initialize dispatch for Redux

  // Effect to dispatch the search text whenever input changes
  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input]);

  return (
    <div>
      <Navbar /> {/* Render the Navbar */}
      <div className="max-w-6xl mx-auto my-10">
        <div className="flex items-center justify-between my-5">
          <Input
            className="w-fit" // Class for styling the input
            placeholder="Filter by name, role" // Placeholder text for the input
            onChange={(e) => setInput(e.target.value)} // Update input state on change
          />
          <Button onClick={() => navigate("/admin/jobs/create")}>
            New Jobs
          </Button>{" "}
          {/* Button to navigate to create new job page */}
        </div>
        <AdminJobsTable /> {/* Render the AdminJobsTable component */}
      </div>
    </div>
  );
};

export default AdminJobs; // Export the AdminJobs component
