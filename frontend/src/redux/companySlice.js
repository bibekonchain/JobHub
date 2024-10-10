import { createSlice } from "@reduxjs/toolkit"; // Import createSlice from Redux Toolkit

// Create a slice for company state management
const companySlice = createSlice({
  name: "company", // Name of the slice
  initialState: {
    singleCompany: null, // Holds data for a single selected company, initialized to null
    companies: [], // Holds a list of companies, initialized to an empty array
    searchCompanyByText: "", // Holds the search text for filtering companies
  },
  reducers: {
    // Action to set the data for a single company
    setSingleCompany: (state, action) => {
      state.singleCompany = action.payload; // Update singleCompany state with the provided payload
    },
    // Action to set the list of companies
    setCompanies: (state, action) => {
      state.companies = action.payload; // Update companies state with the provided list of companies
    },
    // Action to set the search text for companies
    setSearchCompanyByText: (state, action) => {
      state.searchCompanyByText = action.payload; // Update searchCompanyByText state with the provided payload
    },
  },
});

// Export the action creators for use in components
export const { setSingleCompany, setCompanies, setSearchCompanyByText } =
  companySlice.actions;

// Export the reducer function to be included in the Redux store
export default companySlice.reducer;
