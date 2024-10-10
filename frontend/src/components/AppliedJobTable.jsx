import React from "react"; // Import React
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table"; // Import table components
import { Badge } from "./ui/badge"; // Import Badge component for displaying job status
import { useSelector } from "react-redux"; // Import useSelector for accessing Redux store

const AppliedJobTable = () => {
  // Retrieve all applied jobs from the Redux store
  const { allAppliedJobs } = useSelector((store) => store.job);

  return (
    <div>
      <Table>
        <TableCaption>A list of your applied jobs</TableCaption>{" "}
        {/* Table caption */}
        <TableHeader>
          <TableRow>
            {/* Table header cells */}
            <TableHead>Date</TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="text-right">Status</TableHead>{" "}
            {/* Right-aligned status header */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {allAppliedJobs.length <= 0 ? ( // Check if there are applied jobs
            <span>You haven't applied for any jobs yet.</span> // Message for no jobs
          ) : (
            allAppliedJobs.map(
              (
                appliedJob // Map through applied jobs
              ) => (
                <TableRow key={appliedJob._id}>
                  {" "}
                  {/* Unique key for each row */}
                  <TableCell>
                    {appliedJob?.createdAt?.split("T")[0]}
                  </TableCell>{" "}
                  {/* Display application date */}
                  <TableCell>{appliedJob.job?.title}</TableCell>{" "}
                  {/* Display job title */}
                  <TableCell>{appliedJob.job?.company?.name}</TableCell>{" "}
                  {/* Display company name */}
                  <TableCell className="text-right">
                    {/* Display job status with conditional styling */}
                    <Badge
                      className={`${
                        appliedJob?.status === "rejected"
                          ? "bg-red-400"
                          : appliedJob.status === "pending"
                          ? "bg-gray-400"
                          : "bg-green-400"
                      }`}
                    >
                      {appliedJob.status.toUpperCase()}{" "}
                      {/* Show status in uppercase */}
                    </Badge>
                  </TableCell>
                </TableRow>
              )
            )
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJobTable; // Export the AppliedJobTable component
