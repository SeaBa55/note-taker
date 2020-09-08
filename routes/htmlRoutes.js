// ==============================================================================
// LOAD MODULES
// ==============================================================================
const path = require("path");
const router = require("express").Router();

// ==============================================================================
// Default HTML GET Requests
// ==============================================================================
router.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

// ==============================================================================
// Notes HTML GET Requests - Uses apiRoutes as extension
// ==============================================================================
router.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/notes.html"));
});

module.exports = router;