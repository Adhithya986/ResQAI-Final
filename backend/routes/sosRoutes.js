const { analyzeImage } = require("../services/geminiService");
const express = require("express");
const router = express.Router();

const SOS = require("../models/Sos");
const upload = require("../middleware/upload");

console.log("✅ SOS Routes Loaded");

// =====================================
// CREATE SOS (WITH IMAGE)
// =====================================

router.post("/", upload.single("image"), async (req, res) => {
  try {

    console.log("BODY:", req.body);
console.log("FILE:", req.file);

let aiAnalysis = "";

if (req.file) {
  console.log("🤖 Analyzing image with Gemini...");

  aiAnalysis = await analyzeImage(req.file.filename);

  console.log(aiAnalysis);
}

    const sos = new SOS();

sos.name = req.body.name;
sos.phone = req.body.phone;
sos.emergency = req.body.emergency;
sos.description = req.body.description;

sos.location = req.body.location
  ? JSON.parse(req.body.location)
  : null;

sos.image = req.file ? req.file.filename : "";

sos.aiAnalysis = aiAnalysis;

sos.status = "Pending";

    console.log("Image filename:", req.file?.filename);
console.log("Image value:", sos.image);
console.log("AI Analysis value:", sos.aiAnalysis);
console.log("SOS object before save:", sos.toObject());

await sos.save();
const io = req.app.get("io");

io.emit("newSOS", sos);

console.log("SOS object after save:", sos.toObject());

    res.status(201).json({
      success: true,
      message: "🚨 SOS Saved Successfully!",
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