import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import axios from "axios";

// Register required Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const BPLevelsChart = () => {
  const [chartData, setChartData] = useState({
    labels: [], // To hold dates
    datasets: [
      {
        label: "Tmmemperature",
        data: [], // To hold systolic BP levels
        borderColor: "rgb(234, 179, 8)", // Tailwind's red-500
        backgroundColor: "rgba(252, 165, 165, 0.3)", // Tailwind's red-200
        fill: true,
        tension: 0.4, // Curve effect
      },
    ],
  });

  const [tableData, setTableData] = useState([]); // To hold data for the table

  const fetchPatientData = async () => {
    try {
      // Retrieve patient data from localStorage
      const data = localStorage.getItem("patientData");
      if (!data) {
        console.error("No patient data found in localStorage");
        return;
      }

      // Parse the stored patient data
      const patientData = JSON.parse(data);
      const { room_number } = patientData;

      // Fetch patient data from API
      const response = await axios.post("/api/get/getpatientbyroom", { room_number });

      if (response.status !== 200) {
        console.error("Error fetching data:", response.data.message);
        return;
      }

      // Extract health_metrics from the response
      const healthMetrics = response.data.body.data.health_metrics;

      // Map data for the chart and table
      const Oxygen = healthMetrics.map((metric) => metric.temperature);
      const dates = healthMetrics.map((metric) =>
        new Date(metric.updated_at).toLocaleDateString()
      );

      // Update chart and table data
      setChartData((prevState) => ({
        ...prevState,
        labels: dates,
        datasets: [{ ...prevState.datasets[0], data: Oxygen }],
      }));

      setTableData(healthMetrics);
    } catch (error) {
      console.error("Error fetching patient data:", error);
    }
  };

  useEffect(() => {
    fetchPatientData();
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // Hide the legend
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // Hide x-axis grid lines
        },
      },
      y: {
        grid: {
          drawBorder: false, // Hide y-axis border line
        },
        ticks: {
          beginAtZero: true, // Ensure y-axis starts at zero
        },
      },
    },
  };

  return (
    <div className="max-w-sm bg-white rounded-lg text-black p-4">
      {/* Icon */}
      <div className="flex justify-center mb-4">
        <div className="flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6 text-[#EAB308]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12l2 2 4-4m-6 4h.01M17 7v6m0 0v1a2 2 0 01-2 2H9a2 2 0 01-2-2v-1m10 0H7m10-7h.01M7 7h10"
            />
          </svg>
        </div>
      </div>

      {/* Title */}
      <div className="text-center">
        <h2 className="text-lg font-semibold">Temperature</h2>
        <p className="text-sm text-gray-500">Recent three visits</p>
      </div>

      {/* Chart */}
      <div className="my-4">
        <Line data={chartData} options={options} />
      </div>

      {/* Table */}
      <div className="overflow-hidden border border-gray-200 rounded-lg">
        <table className="w-full text-sm text-left text-gray-600">
          
          <tbody>
            {tableData.map((metric, index) => (
              <tr key={index} className="border-t">
                <td className="px-4 py-2">
                  {new Date(metric.updated_at).toLocaleDateString()}
                </td>
                <td className="px-4 py-2">{metric.temperature}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BPLevelsChart;
