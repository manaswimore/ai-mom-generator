import { useState } from "react";
import api from "../services/api";
import bgImage from "../assets/background.png";

function UploadMeeting() {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!title || !file) {
      alert(
        "Please enter meeting title and select a file"
      );
      return;
    }

    const formData = new FormData();

    formData.append("title", title);
    formData.append("meetingFile", file);

    try {
      setLoading(true);

      const res = await api.post(
        "/meetings/upload",
        formData
      );

      console.log(res.data);

      alert(
        "Meeting Uploaded Successfully"
      );

      setTitle("");
      setFile(null);

      document.getElementById(
        "meetingFile"
      ).value = "";

    } catch (error) {

      console.log(error);

      alert("Upload Failed");

    } finally {

      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-8"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="bg-white/90 backdrop-blur-md border border-gray-200 rounded-3xl shadow-xl w-full max-w-2xl p-10">

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-black">
            Upload Meeting
          </h1>

          <p className="text-gray-500 mt-2">
            Upload meeting recordings for AI
            analysis and summary generation.
          </p>
        </div>

        <div className="space-y-6">

          <div>
            <label className="block text-sm font-semibold mb-2">
              Meeting Title
            </label>

            <input
              type="text"
              placeholder="Enter meeting title"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              className="w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:border-black bg-white"
            />
          </div>

          <div>

            <label className="block text-sm font-semibold mb-2">
              Upload File
            </label>

            <div className="border-2 border-dashed border-gray-300 rounded-2xl p-10 text-center bg-gray-50">

              <input
                id="meetingFile"
                type="file"
                onChange={(e) =>
                  setFile(
                    e.target.files[0]
                  )
                }
                className="w-full"
              />

              <p className="text-gray-500 mt-4">
                Upload MP3, MP4, WAV or
                meeting documents
              </p>

            </div>

            {file && (
              <div className="mt-4 border border-gray-200 rounded-xl p-4 bg-white">

                <p className="font-semibold">
                  Selected File
                </p>

                <p className="text-gray-500 mt-1">
                  {file.name}
                </p>

              </div>
            )}

          </div>

          <button
            onClick={handleUpload}
            disabled={loading}
            className="w-full bg-black text-white py-4 rounded-xl hover:bg-gray-800 transition disabled:bg-gray-500"
          >
            {loading
              ? "Uploading..."
              : "Upload Meeting"}
          </button>

        </div>

      </div>
    </div>
  );
}

export default UploadMeeting;