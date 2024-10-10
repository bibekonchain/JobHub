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
import { setLoading } from "@/redux/authSlice"; // Import Redux action to set loading state
import { Loader2 } from "lucide-react"; // Import loading spinner
import { Eye, EyeOff } from "lucide-react";

const Signup = () => {
  // State to hold form input values
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "", // To hold selected file for upload
  });

  // Access loading state and user from Redux store
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const { loading, user } = useSelector((store) => store.auth);
  const dispatch = useDispatch(); // Initialize dispatch for Redux actions
  const navigate = useNavigate(); // Initialize navigate for routing

  const validate = () => {
    let tempErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const phoneRegex = /^[0-9]{10}$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (!input.fullname) tempErrors.fullname = "Full name is required.";
    if (!input.email || !emailRegex.test(input.email))
      tempErrors.email = "Please enter a valid email.";
    if (!input.phoneNumber || !phoneRegex.test(input.phoneNumber))
      tempErrors.phoneNumber = "Please enter a valid 10-digit phone number.";
    if (!input.password || !passwordRegex.test(input.password))
      tempErrors.password =
        "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one number.";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // Handler to update input state for text inputs
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  // Handler to update input state for file input
  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  // Handler to submit signup form
  const submitHandler = async (e) => {
    e.preventDefault(); // Prevent default form submission

    if (!validate()) return;

    const formData = new FormData(); // Create FormData object to handle file upload
    // Append user input values to FormData
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file); // Append file if provided
    }

    try {
      dispatch(setLoading(true)); // Set loading state
      // Make API request to register user
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: { "Content-Type": "multipart/form-data" }, // Set content type for file upload
        withCredentials: true, // Include credentials for cross-origin requests
      });
      if (res.data.success) {
        navigate("/login"); // Redirect to login page on success
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
          <h1 className="font-bold text-xl mb-5">Sign Up</h1>
          <div className="my-2">
            <Label>Full Name</Label>
            <Input
              type="text"
              value={input.fullname}
              name="fullname"
              onChange={changeEventHandler}
              placeholder="Please enter your full name."
            />
            {errors.fullname && (
              <p className="text-red-500 text-sm">{errors.fullname}</p>
            )}
          </div>
          <div className="my-2">
            <Label>Email</Label>
            <Input
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="Please enter a valid email."
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>
          <div className="my-2">
            <Label>Phone Number</Label>
            <Input
              type="text"
              value={input.phoneNumber}
              name="phoneNumber"
              onChange={changeEventHandler}
              placeholder="Please enter a valid 10-digit phone number."
            />
            {errors.phoneNumber && (
              <p className="text-red-500 text-sm">{errors.phoneNumber}</p>
            )}
          </div>
          <div className="my-2 relative">
            <Label>Password</Label>
            <Input
              type={showPassword ? "text" : "password"}
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="8 characters with one uppercase , one lowercase and one number."
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
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
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
            <div className="flex items-center gap-2">
              <Label>Profile</Label>
              <Input
                accept="image/*" // Accept only image files
                type="file"
                onChange={changeFileHandler} // Handle file input change
                className="cursor-pointer"
              />
            </div>
          </div>
          {loading ? (
            <Button className="w-full my-4">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button type="submit" className="w-full my-4">
              Signup
            </Button>
          )}
          <span className="text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600">
              Login
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Signup; // Export the Signup component
