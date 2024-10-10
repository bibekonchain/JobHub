import { createSlice } from "@reduxjs/toolkit";

// Create a slice of the Redux store for managing application state
const applicationSlice = createSlice({
  name: "application", // Name of the slice
  initialState: {
    applicants: null, // Initial state for applicants, set to null
  },
  reducers: {
    // Reducer to set the applicants in the state
    setAllApplicants: (state, action) => {
      state.applicants = action.payload; // Update applicants with the provided payload
    },
  },
});

// Export the action creator for setting applicants
export const { setAllApplicants } = applicationSlice.actions;

// Export the reducer function to be used in the store
export default applicationSlice.reducer;
