const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const { tempCrewData } = require("./constants/tempCrewData");
const { tempScenesSetupData } = require("./constants/tempSceneSetupData");
const {
  tempCharacterSetupData,
} = require("./constants/tempCharacterSetupData");
const { tempLocationSetupData } = require("./constants/tempLocationSetupData");
const tempDirectorSetupData = require("./constants/tempdirectorSetupData");

const app = express();
app.use(cors());
app.use(bodyParser.json());
const port = 7789;

// Define storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage });

const dummyAPI = (req, res) => {
  res.send([]);
};

// POST endpoint for file upload
app.post("/upload", upload.single("file"), (req, res) => {
  res.send("File uploaded successfully.");
});

app.post("/saveCharacter", (req, res) => {
  res.send("Character saved successfully.");
});

app.get("/crew", (req, res) => {
  res.send(tempCrewData);
});

app.get("/getSetup", (req, res) => {
  res.send(tempDirectorSetupData);
});

app.get("/getSceneSetup", (req, res) => {
  res.send(tempScenesSetupData);
});

app.get("/getCharacterSetup", (req, res) => {
  res.send(tempCharacterSetupData);
});

app.get("/getLocationSetup", (req, res) => {
  res.send(tempLocationSetupData);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
