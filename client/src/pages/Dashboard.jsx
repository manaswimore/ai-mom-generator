import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  FaFileAlt,
  FaRobot,
  FaUpload,
} from "react-icons/fa";
import api from "../services/api";
import bgImage from "../assets/background.png";

function Dashboard() {
  const navigate = useNavigate();

  const [totalMeetings, setTotalMeetings] =
    useState(0);

  useEffect(() => {
    fetchMeetings();
  }, []);

  const fetchMeetings = async () => {
    try {
      const res = await api.get("/meetings");

      setTotalMeetings(
        res.data.length
      );

    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Navbar */}

      <div className="bg-black/60 backdrop-blur-md border-b border-gray-800 px-8 py-5">

        <h1 className="text-2xl font-bold text-white">
          AI Meeting Minutes Generator
        </h1>

      </div>

      <div className="max-w-7xl mx-auto p-8">

        {/* Header */}

        <div className="mb-10">

          <h2 className="text-5xl font-bold text-white">
            Welcome Back
          </h2>

          <p className="text-gray-300 mt-3">
            Manage meetings, generate AI summaries,
            and export reports.
          </p>

        </div>

        {/* Stats Cards */}

        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-white/50 backdrop-blur-md border rounded-2xl p-6 shadow-lg">

            <FaFileAlt
              size={30}
              className="text-black"
            />

            <h3 className="text-xl font-semibold mt-4">
              Meetings
            </h3>

            <p className="text-4xl font-bold mt-2">
              {totalMeetings}
            </p>

          </div>

          <div className="bg-white/50 backdrop-blur-md border rounded-2xl p-6 shadow-lg">

            <FaRobot
              size={30}
              className="text-black"
            />

            <h3 className="text-xl font-semibold mt-4">
              AI Status
            </h3>

            <p className="text-black font-medium mt-2">
              Gemini Connected
            </p>

          </div>

          <div className="bg-white/50 backdrop-blur-md border rounded-2xl p-6 shadow-lg">

            <FaUpload
              size={30}
              className="text-black"
            />

            <h3 className="text-xl font-semibold mt-4">
              Upload Center
            </h3>

            <p className="text-gray-600 mt-2">
              Manage meeting recordings
            </p>

          </div>

        </div>

        {/* Quick Actions */}

        <div className="mt-10 bg-white/50 backdrop-blur-md border rounded-2xl p-8 shadow-lg">

          <h3 className="text-2xl font-bold mb-6">
            Quick Actions
          </h3>

          <div className="flex flex-wrap gap-4">

            <Link to="/upload">
              <button className="bg-black text-white px-8 py-3 rounded-xl hover:bg-gray-800 transition">
                Upload Meeting
              </button>
            </Link>

            <Link to="/meetings">
              <button className="border border-black text-black px-8 py-3 rounded-xl hover:bg-gray-100 transition">
                View Meetings
              </button>
            </Link>

            <button
              onClick={logout}
              className="bg-red-700 text-white px-8 py-3 rounded-xl hover:bg-red-900 transition"
            >
              Logout
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Dashboard;