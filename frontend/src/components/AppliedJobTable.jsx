import { Table, TableBody, TableCell, TableHeader, TableRow } from "./ui/table"; // Removed TableHead import since it is not used
import { Badge } from "./ui/badge";
import { useSelector } from "react-redux";

const AppliedJobTable = () => {
  const { allAppliedJobs } = useSelector((store) => store.job);

  return (
    <div className="p-6 bg-[#6A38C2] rounded-lg shadow-md">
      {/* Text above the table */}

      <div className="mb-4 text-lg font-semibold text-white text-center">
        A list of your applied jobs
      </div>
      <Table className="min-w-full bg-white rounded-lg overflow-hidden">
        <TableHeader>
          <TableRow className="bg-gray-200 text-[#6A38C2]">
            {/* Ensure TableHead is used inside TableRow */}
            <TableCell className="p-4 font-bold">Date</TableCell>
            <TableCell className="p-4 font-bold">Job Role</TableCell>
            <TableCell className="p-4 font-bold">Company</TableCell>
            <TableCell className="p-4 font-bold text-right">Status</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allAppliedJobs.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center p-4 text-gray-500">
                You haven't applied for any jobs yet.
              </TableCell>
            </TableRow>
          ) : (
            allAppliedJobs.map((appliedJob) => (
              <TableRow
                key={appliedJob._id}
                className="hover:bg-gray-100 transition-colors"
              >
                <TableCell className="p-4">
                  {new Date(appliedJob.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="p-4">{appliedJob.job?.title}</TableCell>
                <TableCell className="p-4">
                  {appliedJob.job?.company?.name}
                </TableCell>
                <TableCell className="p-4 text-right">
                  <Badge
                    className={`${
                      appliedJob.status === "rejected"
                        ? "bg-red-700 text-white"
                        : appliedJob.status === "pending"
                        ? "bg-[#6A38C2] text-white"
                        : "bg-green-700 text-white"
                    } rounded-full px-3 py-1 text-xs font-semibold`}
                  >
                    {appliedJob.status.toUpperCase()}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJobTable;
