const express = require("express");
const multer = require("multer");

const Meeting = require("../models/Meeting");
const { generateSummary } = require("../ai/gemini");

const router = express.Router();

// =========================
// Multer Configuration
// =========================

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// =========================
// Test Gemini AI
// =========================

router.get("/test-ai", async (req, res) => {
  try {
    const sampleText =
      "John will complete dashboard by Friday. Sarah will finish testing by Monday. Mike will deploy next week.";

    console.log("Sample Text:", sampleText);

    const summary = await generateSummary(
      sampleText
    );

    res.json({
      success: true,
      summary,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// =========================
// Upload Meeting
// =========================

router.post(
  "/upload",
  upload.single("meetingFile"),
  async (req, res) => {
    try {

      const meeting =
        await Meeting.create({
          title: req.body.title,

          fileName:
            req.file.filename,

          // Temporary Transcript
          transcript:
            "John will complete dashboard by Friday. Sarah will finish testing by Monday. Mike will deploy next week.",
        });

      res.status(201).json(
        meeting
      );

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message: error.message,
      });
    }
  }
);

// =========================
// Get All Meetings
// =========================

router.get("/", async (req, res) => {
  try {

    const meetings =
      await Meeting.find().sort({
        uploadDate: -1,
      });

    res.json(meetings);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
});

// =========================
// Generate Summary
// =========================

router.post(
  "/generate-summary/:id",
  async (req, res) => {
    try {

      const meeting =
        await Meeting.findById(
          req.params.id
        );

      if (!meeting) {
        return res.status(404).json({
          message:
            "Meeting not found",
        });
      }

      console.log(
        "Transcript:",
        meeting.transcript
      );

      const summary =
        await generateSummary(
          meeting.transcript
        );

      meeting.summary = summary;

      await meeting.save();

      res.json({
        success: true,
        summary,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message: error.message,
      });
    }
  }
);

// =========================
// Delete Meeting
// =========================

router.delete(
  "/:id",
  async (req, res) => {
    try {

      const meeting =
        await Meeting.findByIdAndDelete(
          req.params.id
        );

      if (!meeting) {
        return res.status(404).json({
          message:
            "Meeting not found",
        });
      }

      res.json({
        success: true,
        message:
          "Meeting deleted successfully",
      });

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });
    }
  }
);

module.exports = router;