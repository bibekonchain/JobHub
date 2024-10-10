import React from "react"; // Import React
import ReactDOM from "react-dom/client"; // Import ReactDOM for rendering
import App from "./App.jsx"; // Import the main App component
import "./index.css"; // Import global styles
import { Toaster } from "./components/ui/sonner.jsx"; // Import Toaster component for notifications
import { Provider } from "react-redux"; // Import Provider to connect Redux store
import store from "./redux/store.js"; // Import the configured Redux store
import { persistStore } from "redux-persist"; // Import persistStore for Redux persistence
import { PersistGate } from "redux-persist/integration/react"; // Import PersistGate for handling loading state during rehydration

// Create a persistor for the Redux store
const persistor = persistStore(store);

// Render the application
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {" "}
    {/* Enable strict mode for highlighting potential problems */}
    <Provider store={store}>
      {" "}
      {/* Provide the Redux store to the application */}
      <PersistGate loading={null} persistor={persistor}>
        {" "}
        {/* Gate for handling persisted state */}
        <App /> {/* Render the main App component */}
        <Toaster /> {/* Render the Toaster component for notifications */}
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
