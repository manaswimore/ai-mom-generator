import { useEffect, useState } from "react";
import api from "../services/api";
import jsPDF from "jspdf";
import bgImage from "../assets/background.png";

function ViewMeetings() {
  const [meetings, setMeetings] = useState([]);

  useEffect(() => {
    fetchMeetings();
  }, []);

  const fetchMeetings = async () => {
    try {
      const res = await api.get("/meetings");
      setMeetings(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const generateSummary = async (id) => {
    try {
      await api.post(
        `/meetings/generate-summary/${id}`
      );

      alert(
        "Summary Generated Successfully"
      );

      fetchMeetings();

    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Failed to Generate Summary"
      );
    }
  };

  const deleteMeeting = async (id) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this meeting?"
      );

      if (!confirmDelete) return;

      await api.delete(
        `/meetings/${id}`
      );

      alert("Meeting Deleted");

      fetchMeetings();

    } catch (error) {
      console.log(error);

      alert("Delete Failed");
    }
  };

  const downloadPDF = (meeting) => {
    const doc = new jsPDF();

    doc.setFontSize(18);

    doc.text(
      "AI Meeting Minutes",
      20,
      20
    );

    doc.setFontSize(12);

    doc.text(
      `Meeting Title: ${meeting.title}`,
      20,
      40
    );

    doc.text(
      `File: ${meeting.fileName}`,
      20,
      50
    );

    if (meeting.summary) {
      const lines =
        doc.splitTextToSize(
          meeting.summary,
          170
        );

      doc.text(
        lines,
        20,
        70
      );
    }

    doc.save(
      `${meeting.title}.pdf`
    );
  };

  return (
    <div
      className="min-h-screen p-8"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="max-w-4xl mx-auto">

        <div className="mb-10 text-center">
          <h1 className="text-5xl font-bold text-white">
            Meetings
          </h1>

          <p className="text-gray-300 mt-2">
            Manage meeting recordings,
            AI summaries and reports.
          </p>
        </div>

        {meetings.length === 0 ? (
          <div className="bg-white/90 backdrop-blur-md border border-gray-200 rounded-2xl p-8">
            <p className="text-gray-500">
              No Meetings Found
            </p>
          </div>
        ) : (
          meetings.map((meeting) => (
            <div
              key={meeting._id}
              className="bg-white/90 backdrop-blur-md border border-gray-200 rounded-3xl p-8 mb-8 shadow-xl">
              <div className="flex flex-col items-center text-center">

                <div>
                  <h2 className="text-2xl font-semibold text-black">
                    {meeting.title}
                  </h2>

                  <p className="text-gray-500 mt-1">
                    {meeting.fileName}
                  </p>

                  <p className="text-gray-400 text-sm mt-1">
                    {new Date(
                      meeting.uploadDate
                    ).toLocaleString()}
                  </p>
                </div>

                <div className="flex gap-2 mt-4 justify-center">

                  <span className="px-3 py-1 text-sm border border-gray-300 rounded-full">
                    Transcript
                  </span>

                  {meeting.summary && (
                    <span className="px-3 py-1 text-sm bg-black text-white rounded-full">
                      Summary Ready
                    </span>
                  )}

                </div>

              </div>

              {meeting.transcript && (
                <div className="mt-6 bg-gray-50 border border-gray-200 rounded-xl p-4 text-center">

                  <h3 className="font-semibold mb-3">
                    Transcript
                  </h3>

                  <p className="text-gray-700">
                    {meeting.transcript}
                  </p>

                </div>
              )}

              {meeting.summary && (
                <div className="mt-6 bg-white border border-gray-200 rounded-xl p-4 text-center">

                  <h3 className="font-semibold mb-3">
                    AI Summary
                  </h3>

                  <pre className="whitespace-pre-wrap text-gray-700">
                    {meeting.summary}
                  </pre>

                </div>
              )}

              <div className="flex flex-wrap justify-center gap-3 mt-6">

                <button
                  onClick={() =>
                    generateSummary(
                      meeting._id
                    )
                  }
                  className="bg-black text-white px-5 py-2 rounded-lg hover:bg-gray-800 transition"
                >
                  Generate Summary
                </button>

                <button
                  onClick={() =>
                    downloadPDF(
                      meeting
                    )
                  }
                  className="border border-black text-black px-5 py-2 rounded-lg hover:bg-gray-100 transition"
                >
                  Download PDF
                </button>

                <button
                  onClick={() =>
                    deleteMeeting(
                      meeting._id
                    )
                  }
                  className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 transition"
                >
                  Delete
                </button>

              </div>

            </div>
          ))
        )}

      </div>
    </div>
  );
}

export default ViewMeetings;