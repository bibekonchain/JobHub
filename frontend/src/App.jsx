import { createBrowserRouter, RouterProvider } from "react-router-dom"; // Import necessary components from react-router-dom
import Navbar from "./components/shared/Navbar"; // Import Navbar component
import Login from "./components/auth/Login"; // Import Login component
import Signup from "./components/auth/Signup"; // Import Signup component
import Home from "./components/Home"; // Import Home component
import Jobs from "./components/Jobs"; // Import Jobs component
import Browse from "./components/Browse"; // Import Browse component
import Profile from "./components/Profile"; // Import Profile component
import JobDescription from "./components/JobDescription"; // Import JobDescription component
import Companies from "./components/admin/Companies"; // Import Companies component for admin
import CompanyCreate from "./components/admin/CompanyCreate"; // Import CompanyCreate component for admin
import CompanySetup from "./components/admin/CompanySetup"; // Import CompanySetup component for admin
import AdminJobs from "./components/admin/AdminJobs"; // Import AdminJobs component for admin
import PostJob from "./components/admin/PostJob"; // Import PostJob component for admin
import Applicants from "./components/admin/Applicants"; // Import Applicants component for admin
import ProtectedRoute from "./components/admin/ProtectedRoute"; // Import ProtectedRoute component for route protection

// Define the application's router using createBrowserRouter
const appRouter = createBrowserRouter([
  {
    path: "/", // Home route
    element: <Home />, // Component to render at home route
  },
  {
    path: "/login", // Login route
    element: <Login />, // Component to render at login route
  },
  {
    path: "/signup", // Signup route
    element: <Signup />, // Component to render at signup route
  },
  {
    path: "/jobs", // Jobs route
    element: <Jobs />, // Component to render at jobs route
  },
  {
    path: "/description/:id", // Dynamic route for job description
    element: <JobDescription />, // Component to render at job description route
  },
  {
    path: "/browse", // Browse route
    element: <Browse />, // Component to render at browse route
  },
  {
    path: "/profile", // Profile route
    element: <Profile />, // Component to render at profile route
  },
  // Admin routes start here
  {
    path: "/admin/companies", // Companies management route for admin
    element: (
      <ProtectedRoute>
        <Companies />
      </ProtectedRoute>
    ), // Component wrapped in ProtectedRoute for access control
  },
  {
    path: "/admin/companies/create", // Route for creating a company
    element: (
      <ProtectedRoute>
        <CompanyCreate />
      </ProtectedRoute>
    ), // Component wrapped in ProtectedRoute
  },
  {
    path: "/admin/companies/:id", // Dynamic route for setting up a specific company
    element: (
      <ProtectedRoute>
        <CompanySetup />
      </ProtectedRoute>
    ), // Component wrapped in ProtectedRoute
  },
  {
    path: "/admin/jobs", // Jobs management route for admin
    element: (
      <ProtectedRoute>
        <AdminJobs />
      </ProtectedRoute>
    ), // Component wrapped in ProtectedRoute
  },
  {
    path: "/admin/jobs/create", // Route for creating a job
    element: (
      <ProtectedRoute>
        <PostJob />
      </ProtectedRoute>
    ), // Component wrapped in ProtectedRoute
  },
  {
    path: "/admin/jobs/:id/applicants", // Dynamic route for viewing applicants for a specific job
    element: (
      <ProtectedRoute>
        <Applicants />
      </ProtectedRoute>
    ), // Component wrapped in ProtectedRoute
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={appRouter} />{" "}
      {/* Render the router provider with defined routes */}
    </div>
  );
}

export default App; // Export the App component
