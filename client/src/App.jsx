import { BrowserRouter, Routes, Route } from "react-router-dom";
import ViewMeetings from "./pages/ViewMeetings";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import UploadMeeting from "./pages/UploadMeeting";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/upload"
          element={<UploadMeeting />}
        />

        <Route
          path="/meetings"
          element={<ViewMeetings />}
        />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;