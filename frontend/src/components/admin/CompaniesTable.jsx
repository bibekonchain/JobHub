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
import { Avatar, AvatarImage } from "../ui/avatar"; // Import Avatar components for displaying company logos
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"; // Import Popover components for action menus
import { Edit2, MoreHorizontal } from "lucide-react"; // Import icons from lucide-react
import { useSelector } from "react-redux"; // Import useSelector to access Redux store state
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

const CompaniesTable = () => {
  const { companies, searchCompanyByText } = useSelector(
    (store) => store.company
  ); // Access companies and search text from Redux store
  const [filterCompany, setFilterCompany] = useState(companies); // State to hold filtered companies
  const navigate = useNavigate(); // Initialize navigation

  // Effect to filter companies based on search text
  useEffect(() => {
    const filteredCompany =
      companies.length >= 0 &&
      companies.filter((company) => {
        // If there's no search text, return all companies
        if (!searchCompanyByText) {
          return true;
        }
        // Filter companies by name based on the search text
        return company?.name
          ?.toLowerCase()
          .includes(searchCompanyByText.toLowerCase());
      });
    setFilterCompany(filteredCompany); // Update the state with filtered companies
  }, [companies, searchCompanyByText]); // Dependency array includes companies and searchCompanyByText

  return (
    <div>
      <Table>
        <TableCaption>A list of your recent registered companies</TableCaption>{" "}
        {/* Table caption */}
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead> {/* Header for logo column */}
            <TableHead>Name</TableHead> {/* Header for name column */}
            <TableHead>Date</TableHead> {/* Header for date column */}
            <TableHead className="text-right">Action</TableHead>{" "}
            {/* Header for action column */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterCompany?.map(
            (
              company // Map through filtered companies to create rows
            ) => (
              <tr key={company._id}>
                {" "}
                {/* Use company ID as key for each row */}
                <TableCell>
                  <Avatar>
                    {" "}
                    {/* Avatar component for displaying the company logo */}
                    <AvatarImage src={company.logo} />{" "}
                    {/* Display company logo */}
                  </Avatar>
                </TableCell>
                <TableCell>{company.name}</TableCell>{" "}
                {/* Display company name */}
                <TableCell>{company.createdAt.split("T")[0]}</TableCell>{" "}
                {/* Display formatted creation date */}
                <TableCell className="text-right cursor-pointer">
                  {" "}
                  {/* Action cell with cursor pointer */}
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>{" "}
                    {/* Trigger for the popover menu */}
                    <PopoverContent className="w-32">
                      {" "}
                      {/* Popover content */}
                      <div
                        onClick={() =>
                          navigate(`/admin/companies/${company._id}`)
                        }
                        className="flex items-center gap-2 w-fit cursor-pointer"
                      >
                        <Edit2 className="w-4" /> {/* Edit icon */}
                        <span>Edit</span> {/* Edit action text */}
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

export default CompaniesTable; // Export the CompaniesTable component
