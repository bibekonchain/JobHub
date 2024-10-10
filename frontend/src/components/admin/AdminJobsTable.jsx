import React, { useEffect, useState } from "react"; // Import React and necessary hooks
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table"; // Import table components
import { Avatar, AvatarImage } from "../ui/avatar"; // Import Avatar components (not used here)
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"; // Import Popover components
import { Edit2, Eye, MoreHorizontal } from "lucide-react"; // Import icons from lucide-react
import { useSelector } from "react-redux"; // Import useSelector for accessing Redux state
import { useNavigate } from "react-router-dom"; // Import useNavigate for routing

const AdminJobsTable = () => {
  // Access all admin jobs and search text from Redux store
  const { allAdminJobs, searchJobByText } = useSelector((store) => store.job);

  // Local state to store filtered jobs based on search input
  const [filterJobs, setFilterJobs] = useState(allAdminJobs);
  const navigate = useNavigate(); // Initialize navigation

  // Effect to filter jobs based on search input or all jobs
  useEffect(() => {
    console.log("called"); // Log for debugging
    const filteredJobs = allAdminJobs.filter((job) => {
      // If there's no search text, return all jobs
      if (!searchJobByText) {
        return true;
      }
      // Filter jobs by title or company name
      return (
        job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
        job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase())
      );
    });
    // Update the filtered jobs state
    setFilterJobs(filteredJobs);
  }, [allAdminJobs, searchJobByText]); // Run effect when allAdminJobs or searchJobByText changes

  return (
    <div>
      <Table>
        <TableCaption>A list of your recent posted jobs</TableCaption>{" "}
        {/* Caption for the table */}
        <TableHeader>
          <TableRow>
            <TableHead>Company Name</TableHead>{" "}
            {/* Table head for company name */}
            <TableHead>Role</TableHead> {/* Table head for job role */}
            <TableHead>Date</TableHead> {/* Table head for job creation date */}
            <TableHead className="text-right">Action</TableHead>{" "}
            {/* Table head for actions */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterJobs?.map(
            (
              job // Map over filtered jobs
            ) => (
              <tr key={job._id}>
                {" "}
                {/* Unique key for each row */}
                <TableCell>{job?.company?.name}</TableCell>{" "}
                {/* Company name cell */}
                <TableCell>{job?.title}</TableCell> {/* Job title cell */}
                <TableCell>{job?.createdAt.split("T")[0]}</TableCell>{" "}
                {/* Job creation date cell */}
                <TableCell className="text-right cursor-pointer">
                  {" "}
                  {/* Action cell */}
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>{" "}
                    {/* Trigger for popover menu */}
                    <PopoverContent className="w-32">
                      {" "}
                      {/* Content of the popover */}
                      <div
                        onClick={() => navigate(`/admin/companies/${job._id}`)}
                        className="flex items-center gap-2 w-fit cursor-pointer"
                      >
                        <Edit2 className="w-4" /> {/* Edit icon */}
                        <span>Edit</span> {/* Edit action text */}
                      </div>
                      <div
                        onClick={() =>
                          navigate(`/admin/jobs/${job._id}/applicants`)
                        }
                        className="flex items-center w-fit gap-2 cursor-pointer mt-2"
                      >
                        <Eye className="w-4" />{" "}
                        {/* Eye icon for viewing applicants */}
                        <span>Applicants</span> {/* Applicants action text */}
                      </div>
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

export default AdminJobsTable; // Export the AdminJobsTable component
