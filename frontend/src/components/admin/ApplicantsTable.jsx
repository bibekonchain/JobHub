import React from "react"; // Import React
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table"; // Import UI table components
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"; // Import Popover components for dropdown actions
import { MoreHorizontal } from "lucide-react"; // Import icon for more options
import { useSelector } from "react-redux"; // Import useSelector to access Redux state
import { toast } from "sonner"; // Import toast for notifications
import { APPLICATION_API_END_POINT } from "@/utils/constant"; // Import API endpoint constant
import axios from "axios"; // Import axios for API requests

const shortlistingStatus = ["Accepted", "Rejected"]; // Array of possible shortlisting statuses

const ApplicantsTable = () => {
  const { applicants } = useSelector((store) => store.application); // Access applicants from Redux store

  // Function to handle status updates for applicants
  const statusHandler = async (status, id) => {
    console.log("called"); // Log to console when the function is called
    try {
      axios.defaults.withCredentials = true; // Ensure cookies are sent with requests
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/status/${id}/update`,
        { status }
      ); // Make API request to update status
      console.log(res); // Log the response
      if (res.data.success) {
        toast.success(res.data.message); // Show success notification
      }
    } catch (error) {
      toast.error(error.response.data.message); // Show error notification if request fails
    }
  };

  return (
    <div>
      <Table>
        {" "}
        {/* Render table for applicants */}
        <TableCaption>A list of your recent applied users</TableCaption>{" "}
        {/* Table caption */}
        <TableHeader>
          <TableRow>
            <TableHead>FullName</TableHead> {/* Column header for Full Name */}
            <TableHead>Email</TableHead> {/* Column header for Email */}
            <TableHead>Contact</TableHead> {/* Column header for Contact */}
            <TableHead>Resume</TableHead> {/* Column header for Resume */}
            <TableHead>Date</TableHead> {/* Column header for Date */}
            <TableHead className="text-right">Action</TableHead>{" "}
            {/* Column header for Action */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {applicants &&
            applicants?.applications?.map(
              (
                item // Check if applicants exist and map through the applications
              ) => (
                <tr key={item._id}>
                  {" "}
                  {/* Each row must have a unique key */}
                  <TableCell>{item?.applicant?.fullname}</TableCell>{" "}
                  {/* Applicant's full name */}
                  <TableCell>{item?.applicant?.email}</TableCell>{" "}
                  {/* Applicant's email */}
                  <TableCell>{item?.applicant?.phoneNumber}</TableCell>{" "}
                  {/* Applicant's phone number */}
                  <TableCell>
                    {
                      item.applicant?.profile?.resume ? ( // Check if the applicant has a resume
                        <a
                          className="text-blue-600 cursor-pointer"
                          href={item?.applicant?.profile?.resume}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {item?.applicant?.profile?.resumeOriginalName}
                        </a> // Link to resume
                      ) : (
                        <span>NA</span>
                      ) // Display "NA" if no resume is available
                    }
                  </TableCell>
                  <TableCell>
                    {item?.applicant.createdAt.split("T")[0]}
                  </TableCell>{" "}
                  {/* Display application date */}
                  <TableCell className="float-right cursor-pointer">
                    <Popover>
                      {" "}
                      {/* Dropdown for actions */}
                      <PopoverTrigger>
                        <MoreHorizontal /> {/* Trigger for dropdown */}
                      </PopoverTrigger>
                      <PopoverContent className="w-32">
                        {" "}
                        {/* Content of the dropdown */}
                        {shortlistingStatus.map((status, index) => {
                          // Map through the shortlisting statuses
                          return (
                            <div
                              onClick={() => statusHandler(status, item?._id)}
                              key={index}
                              className="flex w-fit items-center my-2 cursor-pointer"
                            >
                              <span>{status}</span>{" "}
                              {/* Display status option */}
                            </div>
                          );
                        })}
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </tr>
              )
            )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicantsTable; // Export the ApplicantsTable component
