import React, { useEffect, useState } from "react"; // Import necessary hooks and libraries
import Navbar from "../shared/Navbar"; // Import Navbar component
import { Label } from "../ui/label"; // Import Label component
import { Input } from "../ui/input"; // Import Input component
import { RadioGroup } from "../ui/radio-group"; // Import RadioGroup component
import { Button } from "../ui/button"; // Import Button component
import { Link, useNavigate } from "react-router-dom"; // Import routing components
import axios from "axios"; // Import axios for API requests
import { USER_API_END_POINT } from "@/utils/constant"; // Import API endpoint constant
import { toast } from "sonner"; // Import toast for notifications
import { useDispatch, useSelector } from "react-redux"; // Import Redux hooks
import { setLoading, setUser } from "@/redux/authSlice"; // Import Redux actions
import { Loader2 } from "lucide-react"; // Import loading spinner
import { Eye, EyeOff } from "lucide-react"; // Import eye icons

const Login = () => {
  // State to hold form input values
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  // Access loading state and user from Redux store
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const { loading, user } = useSelector((store) => store.auth);
  const navigate = useNavigate(); // Initialize navigate for routing
  const dispatch = useDispatch(); // Initialize dispatch for Redux actions

  // Handler to update input state
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  // Handler to submit login form
  const submitHandler = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      dispatch(setLoading(true)); // Set loading state
      // Make API request to login
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json", // Set content type
        },
        withCredentials: true, // Include credentials for cross-origin requests
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user)); // Store user in Redux
        navigate("/"); // Redirect to home page
        toast.success(res.data.message); // Show success message
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message); // Show error message
    } finally {
      dispatch(setLoading(false)); // Reset loading state
    }
  };

  // Effect to redirect user if already logged in
  useEffect(() => {
    if (user) {
      navigate("/"); // Redirect to home page if user is authenticated
    }
  }, [user, navigate]); // Run effect when user changes

  return (
    <div>
      <Navbar /> {/* Render Navbar */}
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          onSubmit={submitHandler}
          className="w-1/2 border border-gray-200 rounded-md p-4 my-10"
        >
          <h1 className="font-bold text-xl mb-5">Login</h1>
          <div className="my-2">
            <Label>Email</Label>
            <Input
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="hello@gmail.com" // Placeholder text for email input
            />
          </div>

          <div className="my-2 relative">
            <Label>Password</Label>
            <Input
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="********" // Placeholder text for password input
            />
            <button
              type="button"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 mt-3" // Position the eye icon
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" /> // Eye off icon
              ) : (
                <Eye className="h-5 w-5" /> // Eye icon
              )}
            </button>
          </div>
          <div className="flex items-center justify-between">
            <RadioGroup className="flex items-center gap-4 my-5">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === "student"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="r1">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === "recruiter"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>
          {loading ? (
            <Button className="w-full my-4">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button type="submit" className="w-full my-4">
              Login
            </Button>
          )}
          <span className="text-sm">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-600">
              Signup
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login; // Export the Login component
