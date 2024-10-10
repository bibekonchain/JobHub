import React, { useState } from "react"; // Import React and useState
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog"; // Import dialog components
import { Label } from "./ui/label"; // Import Label component
import { Input } from "./ui/input"; // Import Input component
import { Button } from "./ui/button"; // Import Button component
import { Loader2 } from "lucide-react"; // Import loading icon
import { useDispatch, useSelector } from "react-redux"; // Import hooks from Redux
import axios from "axios"; // Import Axios for API requests
import { USER_API_END_POINT } from "@/utils/constant"; // API endpoint constant
import { setUser } from "@/redux/authSlice"; // Action to set user in Redux store
import { toast } from "sonner"; // Import toast notifications

const UpdateProfileDialog = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false); // Loading state for the submit button
  const { user } = useSelector((store) => store.auth); // Get user data from Redux store

  // Initialize input state with user data or default empty values
  const [input, setInput] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    bio: user?.profile?.bio || "",
    skills: user?.profile?.skills?.map((skill) => skill) || "",
    file: user?.profile?.resume || "",
  });

  const dispatch = useDispatch(); // Initialize dispatch to update Redux store

  // Handle changes in text input fields
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  // Handle file input changes
  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0]; // Get the first file
    setInput({ ...input, file });
  };

  // Handle form submission
  const submitHandler = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    const formData = new FormData(); // Create a FormData object to send data
    // Append user data to FormData
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills);
    if (input.file) {
      formData.append("file", input.file); // Append file if present
    }
    try {
      setLoading(true); // Set loading state to true
      const res = await axios.post(
        `${USER_API_END_POINT}/profile/update`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Set content type for file upload
          },
          withCredentials: true, // Include cookies in request
        }
      );
      if (res.data.success) {
        dispatch(setUser(res.data.user)); // Dispatch updated user to Redux store
        toast.success(res.data.message); // Show success message
      }
    } catch (error) {
      console.log(error); // Log error to console
      toast.error(error.response.data.message); // Show error message
    } finally {
      setLoading(false); // Reset loading state
    }
    setOpen(false); // Close the dialog
    console.log(input); // Log input data for debugging
  };

  return (
    <div>
      <Dialog open={open}>
        {" "}
        {/* Dialog for updating profile */}
        <DialogContent
          className="sm:max-w-[425px]"
          onInteractOutside={() => setOpen(false)}
        >
          <DialogHeader>
            <DialogTitle>Update Profile</DialogTitle> {/* Dialog title */}
          </DialogHeader>
          <form onSubmit={submitHandler}>
            {" "}
            {/* Form for profile update */}
            <div className="grid gap-4 py-4">
              {/* Name Input */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  name="fullname" // Corrected name attribute
                  type="text"
                  value={input.fullname}
                  onChange={changeEventHandler}
                  className="col-span-3"
                />
              </div>
              {/* Email Input */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={input.email}
                  onChange={changeEventHandler}
                  className="col-span-3"
                />
              </div>
              {/* Phone Number Input */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="number" className="text-right">
                  Number
                </Label>
                <Input
                  id="number"
                  name="phoneNumber" // Corrected name attribute
                  value={input.phoneNumber}
                  onChange={changeEventHandler}
                  className="col-span-3"
                />
              </div>
              {/* Bio Input */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="bio" className="text-right">
                  Bio
                </Label>
                <Input
                  id="bio"
                  name="bio"
                  value={input.bio}
                  onChange={changeEventHandler}
                  className="col-span-3"
                />
              </div>
              {/* Skills Input */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="skills" className="text-right">
                  Skills
                </Label>
                <Input
                  id="skills"
                  name="skills" // Consider handling skills as an array for better management
                  value={input.skills} // Consider joining the array to display as string
                  onChange={changeEventHandler}
                  className="col-span-3"
                />
              </div>
              {/* File Input for Resume */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="file" className="text-right">
                  Resume
                </Label>
                <Input
                  id="file"
                  name="file"
                  type="file"
                  accept="application/pdf" // Limit to PDF files
                  onChange={fileChangeHandler}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              {loading ? (
                <Button className="w-full my-4">
                  {" "}
                  {/* Loading button */}
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                </Button>
              ) : (
                <Button type="submit" className="w-full my-4">
                  Update
                </Button> // Update button
              )}
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UpdateProfileDialog; // Export the UpdateProfileDialog component
