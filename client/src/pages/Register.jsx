import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      await api.post("/auth/register", {
        name,
        email,
        password,
      });

      alert("Registration Successful");

      setName("");
      setEmail("");
      setPassword("");

    } catch (error) {
      console.log(error);
      alert("Registration Failed");
    }
  };

  return (
    <div className="min-h-screen flex">

      {/* Left Side */}
      <div className="hidden md:flex w-1/2 bg-black text-white flex-col justify-center px-16">

        <h1 className="text-5xl font-bold mb-6">
          AI Meeting
          <br />
          Minutes Generator
        </h1>

        <p className="text-gray-300 text-lg leading-relaxed">
          Generate AI-powered meeting summaries,
          action items, and downloadable reports
          from your meeting recordings.
        </p>

      </div>

      {/* Right Side */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-50">

        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-10 w-full max-w-md">

          <h2 className="text-3xl font-bold text-center mb-2">
            Create Account
          </h2>

          <p className="text-gray-500 text-center mb-8">
            Start managing meetings smarter
          </p>

          <div className="space-y-4">

            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-black"
            />

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-black"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-black"
            />

            <button
              onClick={handleRegister}
              className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"
            >
              Create Account
            </button>

          </div>

          <div className="mt-8 text-center">

            <p className="text-gray-500">
              Already have an account?
            </p>

            <Link to="/">
              <button className="mt-3 w-full border border-black text-black py-3 rounded-lg hover:bg-gray-100 transition">
                Sign In
              </button>
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Register;