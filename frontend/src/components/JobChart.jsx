import { useEffect, useState } from "react"; // Import necessary hooks
import axios from "axios"; // Import axios for API requests
import { Bar, Pie } from "react-chartjs-2"; // Import Bar and Pie chart components
import { Chart, registerables } from "chart.js"; // Import Chart and registerables from chart.js
import { useSelector } from "react-redux"; // Import useSelector to access Redux store

// Registering chart.js components
Chart.register(...registerables);

const JobChart = () => {
  // Initializing state for job type and location data
  const [typeChartData, setTypeChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "",
        data: [],
        backgroundColor: [],
        borderWidth: 1,
      },
    ],
  });

  // Corrected state declaration for location chart data
  const [locationChartData, setLocationChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "",
        data: [],
        backgroundColor: [],
        borderWidth: 1,
      },
    ],
  });

  const [loading, setLoading] = useState(true);

  // Access user authentication state from Redux
  const { user } = useSelector((store) => store.auth); // Get user from auth slice

  useEffect(() => {
    // Function to fetch job type data from the backend
    const fetchJobTypeData = async () => {
      try {
        const { data } = await axios.get(
          "https://jobhub-backend-3t1f.onrender.com/api/chart/jobs-by-type"
        );

        if (data && data.length > 0) {
          const labels = data.map((item) => item._id); // Extract job types
          const counts = data.map((item) => item.count); // Extract counts

          setTypeChartData({
            labels,
            datasets: [
              {
                label: "Jobs by Type",
                data: counts,
                backgroundColor: [
                  "rgba(75, 192, 192, 0.6)",
                  "rgba(153, 102, 255, 0.6)",
                  "rgba(255, 159, 64, 0.6)",
                  "rgba(255, 99, 132, 0.6)",
                  "rgba(54, 162, 235, 0.6)",
                ],
                borderWidth: 1,
              },
            ],
          });
        } else {
          console.log("No job type data available.");
        }
      } catch (error) {
        console.error("Error fetching job type chart data:", error);
      }
    };

    // Function to fetch job location data from the backend
    const fetchJobLocationData = async () => {
      try {
        const { data } = await axios.get(
          "https://jobhub-backend-3t1f.onrender.com/api/chart/jobs-by-location"
        );

        if (data && data.length > 0) {
          const labels = data.map((item) => item._id); // Extract locations
          const counts = data.map((item) => item.count); // Extract counts

          setLocationChartData({
            labels,
            datasets: [
              {
                label: "Jobs by Location",
                data: counts,
                backgroundColor: [
                  "rgba(75, 192, 192, 0.6)",
                  "rgba(153, 102, 255, 0.6)",
                  "rgba(255, 159, 64, 0.6)",
                  "rgba(255, 99, 132, 0.6)",
                  "rgba(54, 162, 235, 0.6)",
                ],
                borderWidth: 1,
              },
            ],
          });
        } else {
          console.log("No job location data available.");
        }
      } catch (error) {
        console.error("Error fetching job location chart data:", error);
      }
    };

    // Fetching all data and setting the loading state
    const fetchData = async () => {
      await Promise.all([fetchJobTypeData(), fetchJobLocationData()]);
      setLoading(false); // Set loading to false after data fetching completes
    };

    fetchData();

    return () => {
      // Clean up charts by destroying chart instances if necessary
      const barChart = Chart.getChart("chart-bar");
      const pieChart = Chart.getChart("chart-pie");
      if (barChart) barChart.destroy();
      if (pieChart) pieChart.destroy();
    };
  }, []);

  return (
    <div>
      {/* Display message if user is not logged in */}
      {!user ? (
        <div>
          <h1 className="text-4xl font-bold text-center mb-8">
            {/* Combined title with colored span */}
            <span className="text-[#6A38C2]">Job Market </span> Analysis
          </h1>
          <h1 className="text-center text-xl mb-4">
            Please login to view job charts.
          </h1>
        </div>
      ) : loading ? (
        <p>Loading charts...</p> // Loading message while fetching data
      ) : (
        <div>
          <h1 className="text-4xl font-bold text-center mb-8">
            {/* Combined title with colored span */}
            <span className="text-[#6A38C2]">Job Market </span> Analysis
          </h1>

          <div className="flex flex-col space-y-8">
            {/* Job Type Charts Section */}
            <div className="flex flex-row space-x-8">
              {/* Bar Chart Section */}
              <div className="flex-1 bg-white shadow-lg rounded-lg p-6 h-[500px]">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                  Bar Chart
                  <p className="items-center justify-center text-xl font-medium mt-2">
                    Showing the number of jobs registered in the system
                  </p>
                </h2>
                <div className="p-4 h-[80%]">
                  {typeChartData && typeChartData.labels.length > 0 ? (
                    <Bar
                      id="chart-bar"
                      data={typeChartData}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            display: true,
                          },
                        },
                      }}
                    />
                  ) : (
                    <p>No data available for job types</p>
                  )}
                </div>
              </div>

              {/* Pie Chart Section */}
              <div className="flex-1 bg-white shadow-lg rounded-lg p-6 h-[500px]">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                  Pie Chart
                  <p className="items-center justify-center text-xl font-medium mt-2">
                    Showing the number of jobs registered in the system
                  </p>
                </h2>
                <div className="p-4 h-[80%]">
                  {typeChartData && typeChartData.labels.length > 0 ? (
                    <Pie
                      id="chart-pie"
                      data={typeChartData}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            display: true,
                            position: "bottom",
                          },
                        },
                      }}
                    />
                  ) : (
                    <p>No data available for job types</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobChart; // Export the JobChart component
