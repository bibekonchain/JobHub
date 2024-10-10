import { createSlice } from "@reduxjs/toolkit"; // Import createSlice from Redux Toolkit

// Create a slice for job state management
const jobSlice = createSlice({
  name: "job", // Name of the slice
  initialState: {
    allJobs: [], // Initializes an empty array for storing all jobs
    allAdminJobs: [], // Initializes an empty array for storing admin jobs
    singleJob: null, // Holds data for a single selected job, initialized to null
    searchJobByText: "", // Holds the search text for filtering jobs
    allAppliedJobs: [], // Initializes an empty array for storing applied jobs
    searchedQuery: "", // Holds the searched query for jobs
  },
  reducers: {
    // Action to set the list of all jobs
    setAllJobs: (state, action) => {
      state.allJobs = action.payload; // Update allJobs state with the provided payload
    },
    // Action to set the data for a single job
    setSingleJob: (state, action) => {
      state.singleJob = action.payload; // Update singleJob state with the provided payload
    },
    // Action to set the list of admin jobs
    setAllAdminJobs: (state, action) => {
      state.allAdminJobs = action.payload; // Update allAdminJobs state with the provided payload
    },
    // Action to set the search text for jobs
    setSearchJobByText: (state, action) => {
      state.searchJobByText = action.payload; // Update searchJobByText state with the provided payload
    },
    // Action to set the list of all applied jobs
    setAllAppliedJobs: (state, action) => {
      state.allAppliedJobs = action.payload; // Update allAppliedJobs state with the provided payload
    },
    // Action to set the searched query for jobs
    setSearchedQuery: (state, action) => {
      state.searchedQuery = action.payload; // Update searchedQuery state with the provided payload
    },
  },
});

// Export action creators for use in components
export const {
  setAllJobs,
  setSingleJob,
  setAllAdminJobs,
  setSearchJobByText,
  setAllAppliedJobs,
  setSearchedQuery,
} = jobSlice.actions;

// Export the reducer function to be included in the Redux store
export default jobSlice.reducer;
