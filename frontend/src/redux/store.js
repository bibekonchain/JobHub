import { combineReducers, configureStore } from "@reduxjs/toolkit"; // Import necessary functions from Redux Toolkit
import authSlice from "./authSlice"; // Import the authentication slice
import jobSlice from "./jobSlice"; // Import the job slice
import {
  persistStore, // Function to persist the Redux store
  persistReducer, // Function to create a persisted reducer
  FLUSH, // Action type for flushing persisted state
  REHYDRATE, // Action type for rehydrating state
  PAUSE, // Action type for pausing persistence
  PERSIST, // Action type for persisting state
  PURGE, // Action type for purging persisted state
  REGISTER, // Action type for registering a persisted reducer
} from "redux-persist"; // Import functions and constants from Redux Persist
import storage from "redux-persist/lib/storage"; // Import local storage from Redux Persist
import companySlice from "./companySlice"; // Import the company slice
import applicationSlice from "./applicationSlice"; // Import the application slice

// Configuration object for Redux Persist
const persistConfig = {
  key: "root", // Key for the persisted state
  version: 1, // Version of the persisted state
  storage, // Storage method (local storage)
};

// Combine all the slices into a root reducer
const rootReducer = combineReducers({
  auth: authSlice, // Authentication state
  job: jobSlice, // Job-related state
  company: companySlice, // Company-related state
  application: applicationSlice, // Application-related state
});

// Create a persisted reducer using the root reducer and persist config
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the Redux store
const store = configureStore({
  reducer: persistedReducer, // Use the persisted reducer
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore specific actions for serializable check
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Export the store for use in the application
export default store;
