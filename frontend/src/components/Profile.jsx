import React, { useState } from "react"; // Import React and useState
import Navbar from "./shared/Navbar"; // Import the Navbar component
import { Avatar, AvatarImage } from "./ui/avatar"; // Import Avatar components
import { Button } from "./ui/button"; // Import Button component
import { Contact, Mail, Pen } from "lucide-react"; // Import icons from lucide-react
import { Badge } from "./ui/badge"; // Import Badge component
import { Label } from "./ui/label"; // Import Label component
import AppliedJobTable from "./AppliedJobTable"; // Import AppliedJobTable component
import UpdateProfileDialog from "./UpdateProfileDialog"; // Import UpdateProfileDialog component
import { useSelector } from "react-redux"; // Import useSelector from Redux
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs"; // Custom hook to fetch applied jobs

// const skills = ["Html", "Css", "Javascript", "Reactjs"]; // Example skills array, currently not in use
const isResume = true; // Boolean flag to check if the user has a resume

const Profile = () => {
  useGetAppliedJobs(); // Fetch applied jobs using custom hook
  const [open, setOpen] = useState(false); // State to manage the open/closed status of the update dialog
  const { user } = useSelector((store) => store.auth); // Extract user information from the Redux store

  return (
    <div>
      <Navbar /> {/* Render the Navbar */}
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8">
        {" "}
        {/* Profile container */}
        <div className="flex justify-between">
          {" "}
          {/* Header section for user info */}
          <div className="flex items-center gap-4">
            <Avatar className="h-24 w-24">
              {" "}
              {/* User Avatar */}
              <AvatarImage
                src="https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"
                alt="profile"
              />
            </Avatar>
            <div>
              <h1 className="font-medium text-xl">{user?.fullname}</h1>{" "}
              {/* Display user's full name */}
              <p>{user?.profile?.bio}</p> {/* Display user's bio */}
            </div>
          </div>
          <Button
            onClick={() => setOpen(true)}
            className="text-right"
            variant="outline"
          >
            <Pen />
          </Button>{" "}
          {/* Button to open update dialog */}
        </div>
        <div className="my-5">
          {" "}
          {/* User contact information */}
          <div className="flex items-center gap-3 my-2">
            <Mail /> {/* Mail icon */}
            <span>{user?.email}</span> {/* Display user's email */}
          </div>
          <div className="flex items-center gap-3 my-2">
            <Contact /> {/* Contact icon */}
            <span>{user?.phoneNumber}</span> {/* Display user's phone number */}
          </div>
        </div>
        <div className="my-5">
          {" "}
          {/* User skills section */}
          <h1>Skills</h1> {/* Skills header */}
          <div className="flex items-center gap-1">
            {user?.profile?.skills.length !== 0 ? (
              user?.profile?.skills.map((item, index) => (
                <Badge key={index}>{item}</Badge>
              ))
            ) : (
              <span>NA</span>
            )}{" "}
            {/* Display user's skills as badges or "NA" if none available */}
          </div>
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          {" "}
          {/* Resume section */}
          <Label className="text-md font-bold">Resume</Label>{" "}
          {/* Resume label */}
          {isResume ? (
            <a
              target="blank"
              href={user?.profile?.resume}
              className="text-blue-500 w-full hover:underline cursor-pointer"
            >
              {user?.profile?.resumeOriginalName}
            </a>
          ) : (
            <span>NA</span>
          )}{" "}
          {/* Display resume link or "NA" if not available */}
        </div>
      </div>
      <div className="max-w-4xl mx-auto bg-white rounded-2xl">
        {" "}
        {/* Container for applied jobs */}
        <h1 className="font-bold text-lg my-5">Applied Jobs</h1>{" "}
        {/* Header for applied jobs section */}
        <AppliedJobTable /> {/* Render the AppliedJobTable component */}
      </div>
      <UpdateProfileDialog open={open} setOpen={setOpen} />{" "}
      {/* Render update profile dialog */}
    </div>
  );
};

export default Profile; // Export the Profile component
