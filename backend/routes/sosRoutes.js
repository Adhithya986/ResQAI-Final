const { analyzeImage } = require("../services/geminiService");
const express = require("express");
const router = express.Router();

const SOS = require("../models/Sos");
const upload = require("../middleware/upload");

console.log("✅ SOS Routes Loaded");
// =====================================
// CREATE SOS
// =====================================

router.post("/", upload.single("image"), async (req, res) => {
  try {
    console.log("=================================");
    console.log("🚨 SOS REQUEST RECEIVED");
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);
    console.log("=================================");

    let aiAnalysis = "";

    // Only analyze image if one was uploaded
    if (req.file) {
      console.log("🤖 Image received:", req.file.filename);

      try {
        aiAnalysis = await analyzeImage(req.file.filename);
        console.log("✅ AI Analysis completed");
      } catch (aiError) {
        console.error("⚠️ Gemini Analysis Failed:");
        console.error(aiError);

        // Don't stop SOS because AI failed
        aiAnalysis = "AI analysis unavailable.";
      }
    }

    const body = req.body || {};

    if (!body.name || !body.phone || !body.emergency) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: name, phone, emergency",
      });
    }

    // Create SOS
    const sos = new SOS({
      name: body.name,
      phone: body.phone,
      emergency: body.emergency,
      description: body.description || "",

      location: body.location
        ? typeof body.location === "string"
          ? JSON.parse(body.location)
          : body.location
        : null,

      image: req.file ? req.file.filename : "",
      aiAnalysis: aiAnalysis,
      status: "Pending",
    });

    console.log("💾 Saving SOS to MongoDB...");
    console.log(sos.toObject());

    await sos.save();

    console.log("✅ SOS SAVED TO MONGODB");
    console.log("ID:", sos._id);

    // Send realtime notification
    const io = req.app.get("io");

    if (io) {
      io.emit("newSOS", sos);
      console.log("📡 newSOS broadcast sent");
    }

    res.status(201).json({
      success: true,
      message: "🚨 SOS Saved Successfully!",
      data: sos,
    });

  } catch (error) {

    console.error("❌ SOS SAVE ERROR:");
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
});

// =====================================
// GET ALL SOS REQUESTS
// =====================================

router.get("/", async (req, res) => {
  try {
    const sosRequests = await SOS.find().sort({
      createdAt: -1,
    });

    res.json(sosRequests);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

// =====================================
// UPDATE SOS STATUS
// =====================================

router.put("/:id", async (req, res) => {
  try {
    const { status } = req.body;

    const updatedSOS = await SOS.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updatedSOS) {
      return res.status(404).json({
        success: false,
        message: "SOS Request Not Found",
      });
    }

    const io = req.app.get("io");
    if (io) {
      io.emit("sosUpdated", updatedSOS);
    }

    res.json({
      success: true,
      message: "Status Updated Successfully",
      data: updatedSOS,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});



// =====================================
// GET SOS BY ASSIGNED TEAM
// =====================================

router.get("/team/:team", async (req, res) => {
  try {
    const team = req.params.team;

    const requests = await SOS.find({
      assignedTo: team,
    }).sort({
      createdAt: -1,
    });

    res.json(requests);

  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

// =====================================
// ASSIGN RESCUE TEAM
// =====================================

router.put("/:id/assign", async (req, res) => {
  try {
    const { assignedTo } = req.body;

    const sos = await SOS.findByIdAndUpdate(
      req.params.id,
      { assignedTo },
      { new: true }
    );

    if (!sos) {
      return res.status(404).json({
        success: false,
        message: "SOS Not Found",
      });
    }

    const io = req.app.get("io");
    if (io) {
      io.emit("sosAssigned", sos);
    }

    res.json({
      success: true,
      message: "Rescue Team Assigned Successfully",
      data: sos,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

module.exports = router;