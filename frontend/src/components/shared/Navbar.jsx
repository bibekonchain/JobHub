import React from "react"; // Import React
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"; // Import Popover components
import { Button } from "../ui/button"; // Import Button component
import { Avatar, AvatarImage } from "../ui/avatar"; // Import Avatar components
import { LogOut, User2 } from "lucide-react"; // Import icons from lucide-react
import { Link, useNavigate } from "react-router-dom"; // Import Link and useNavigate for routing
import { useDispatch, useSelector } from "react-redux"; // Import Redux hooks
import axios from "axios"; // Import axios for API calls
import { USER_API_END_POINT } from "@/utils/constant"; // Import API endpoint constant
import { setUser } from "@/redux/authSlice"; // Import Redux action to set user
import { toast } from "sonner"; // Import toast for notifications
import ResumeUpload from "../ResumeUpload";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth); // Get user data from Redux store
  const dispatch = useDispatch(); // Initialize dispatch function
  const navigate = useNavigate(); // Initialize navigate function

  // Function to handle user logout
  const logoutHandler = async () => {
    try {
      // Send logout request to the server
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null)); // Clear user from Redux store
        navigate("/"); // Redirect to home page
        toast.success(res.data.message); // Show success message
      }
    } catch (error) {
      console.log(error); // Log error to console
      toast.error(error.response.data.message); // Show error message
    }
  };

  return (
    <div className="bg-white">
      {" "}
      {/* Main navbar container */}
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
        {" "}
        {/* Flexbox for layout */}
        <div>
          <h1 className="text-2xl font-bold">
            Job<span className="text-[#6A38C2]">Hub</span>
          </h1>{" "}
          {/* Branding */}
        </div>
        <div className="flex items-center gap-12">
          {" "}
          {/* Flex container for navigation and user options */}
          <ul className="flex font-medium items-center gap-5">
            {" "}
            {/* Navigation links */}
            {user && user.role === "recruiter" ? ( // Conditional rendering based on user role
              <>
                <li>
                  <Link to="/admin/companies">Companies</Link>
                </li>{" "}
                {/* Link to Companies */}
                <li>
                  <Link to="/admin/jobs">Jobs</Link>
                </li>{" "}
                {/* Link to Jobs */}
              </>
            ) : (
              <>
                <li>
                  <Link to="/">Home</Link>
                </li>{" "}
                {/* Link to Home */}
                <li>
                  <Link to="/jobs">Jobs</Link>
                </li>{" "}
                {/* Link to Jobs */}
                <li>
                  <Link to="/browse">Browse</Link>
                </li>{" "}
                {/* Link to Browse */}
              </>
            )}
          </ul>
          {!user ? ( // If user is not logged in
            <div className="flex items-center gap-2">
              {" "}
              {/* Login/Signup buttons */}
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>{" "}
              {/* Login button */}
              <Link to="/signup">
                <Button className="bg-[#6A38C2] hover:bg-[#5b30a6]">
                  Signup
                </Button>
              </Link>{" "}
              {/* Signup button */}
            </div>
          ) : (
            // If user is logged in
            <Popover>
              {" "}
              {/* Popover for user menu */}
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  {" "}
                  {/* User avatar */}
                  <AvatarImage
                    src={user?.profile?.profilePhoto}
                    alt="@shadcn"
                  />{" "}
                  {/* Avatar image */}
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                {" "}
                {/* Popover content with user info */}
                <div className="">
                  <div className="flex gap-2 space-y-2">
                    {" "}
                    {/* User details layout */}
                    <Avatar className="cursor-pointer">
                      <AvatarImage
                        src={user?.profile?.profilePhoto}
                        alt="@shadcn"
                      />{" "}
                      {/* Avatar image */}
                    </Avatar>
                    <div>
                      <h4 className="font-medium">{user?.fullname}</h4>{" "}
                      {/* User full name */}
                      <p className="text-sm text-muted-foreground">
                        {user?.profile?.bio}
                      </p>{" "}
                      {/* User bio */}
                    </div>
                  </div>
                  <div className="flex flex-col my-2 text-gray-600">
                    {" "}
                    {/* Menu options */}
                    {user &&
                      user.role === "student" && ( // Conditional rendering for student role
                        <div className="flex w-fit items-center gap-2 cursor-pointer">
                          <User2 /> {/* User icon */}
                          <Button variant="link">
                            <Link to="/profile">View Profile</Link>
                          </Button>{" "}
                          {/* View Profile link */}
                          
                          <Button variant="link">
                            <Link to="/upload-resume">Upload Resume</Link>
                          </Button>
                        </div>
                      )}
                    <div className="flex w-fit items-center gap-2 cursor-pointer">
                      {" "}
                      {/* Logout option */}
                      <LogOut /> {/* Logout icon */}
                      <Button onClick={logoutHandler} variant="link">
                        Logout
                      </Button>{" "}
                      {/* Logout button */}
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar; // Export the Navbar component
