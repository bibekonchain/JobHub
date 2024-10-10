import React, { useEffect } from "react"; // Import React and useEffect
import Navbar from "./shared/Navbar"; // Import Navbar component
import HeroSection from "./HeroSection"; // Import HeroSection component
import CategoryCarousel from "./CategoryCarousel"; // Import CategoryCarousel component
import LatestJobs from "./LatestJobs"; // Import LatestJobs component
import Footer from "./shared/Footer"; // Import Footer component
import useGetAllJobs from "@/hooks/useGetAllJobs"; // Custom hook to fetch jobs
import { useSelector } from "react-redux"; // Import useSelector from Redux
import { useNavigate } from "react-router-dom"; // Import useNavigate for routing
import JobChart from "./JobChart";

const Home = () => {
  useGetAllJobs(); // Call hook to fetch all jobs
  const { user } = useSelector((store) => store.auth); // Get user information from Redux store
  const navigate = useNavigate(); // Get navigate function for routing

  useEffect(() => {
    // Effect to redirect recruiters to the companies page
    if (user?.role === "recruiter") {
      navigate("/admin/companies"); // Navigate to the admin companies page
    }
  }, [user, navigate]); // Include dependencies in the effect

  return (
    <div>
      <Navbar /> {/* Render Navbar */}
      <HeroSection /> {/* Render Hero Section */}
      <CategoryCarousel /> {/* Render Category Carousel */}
      <LatestJobs /> {/* Render Latest Jobs section */}
      <JobChart />
      <Footer /> {/* Render Footer */}
    </div>
  );
};

export default Home; // Export the Home component
