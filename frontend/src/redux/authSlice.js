import { createSlice } from "@reduxjs/toolkit"; // Import createSlice from Redux Toolkit

// Create a slice for authentication state management
const authSlice = createSlice({
  name: "auth", // Name of the slice
  initialState: {
    loading: false, // Indicates if a loading state is active
    user: null, // Holds the authenticated user information, initialized to null
  },
  reducers: {
    // Action to set the loading state
    setLoading: (state, action) => {
      state.loading = action.payload; // Update loading state with the provided payload
    },
    // Action to set the authenticated user
    setUser: (state, action) => {
      state.user = action.payload; // Update the user state with the provided user data
    },
  },
});

// Export the action creators for use in components
export const { setLoading, setUser } = authSlice.actions;

// Export the reducer function to be included in the Redux store
export default authSlice.reducer;
