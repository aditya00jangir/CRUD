const express = require("express");
const router = new express.Router();
const conn = require("../db/connection");
const multer = require("multer");
const bodyParser = require("body-parser");
const RgstrtnController = require("../Controllers/RgstrtnController.js");
const {
  validateMobileNumber,
} = require("../Middleware/EmpRagistrationMiddleware.js");

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
}).single("file");

router.use(bodyParser.json({ limit: "10mb" })); // Set to 10MB to accommodate large JSON payloads
router.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
router.post("/create", upload, validateMobileNumber, RgstrtnController.CrtData);
router.post(
  "/update",
  upload,
  validateMobileNumber,
  RgstrtnController.UpdtData
);
router.get("/getusers", RgstrtnController.GetData);
router.delete("/dltData", RgstrtnController.DltRec);

module.exports = router;
