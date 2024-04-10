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
const tempSearchCharacterData = require("./constants/tempSearchCharacterData");
const tempSearchLocationData = require("./constants/tempSearchLocationData");
const tempArtistsData = require("./constants/tempArtistsData");
const {
  tempSceneLocationsData,
} = require("./constants/tempSceneLocationsData");
const {
  characterToArtistMapping,
} = require("./constants/tempCharacterToArtistMapping");
const {
  locationForMovieLocation,
} = require("./constants/tempLocationToMovieLocationMapping");
const tempCharacterApproveData = require("./constants/tempCharacterApproveData");
const tempLocationApproveData = require("./constants/tempLocationApproveData");

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

// POST endpoint for file upload
app.post("/upload", upload.single("file"), (req, res) => {
  res.send("File uploaded successfully.");
});

app.post("/saveCharacter", (req, res) => {
  res.send("Character saved successfully.");
});

app.post("/api/asstdirector_list", (req, res) => {
  res.send({
    message: "successfully",
    result: [
      {
        Designation: "Asst Director",
        Email_Id: "test2@email.com",
        Full_Name: "Kumar",
        Mobile_No: "1234567892",
        User_Name: "kumar",
        User_id: 3,
      },
      {
        Designation: "Asst Director",
        Email_Id: "test3@email.com",
        Full_Name: "Kumar1",
        Mobile_No: "1234567893",
        User_Name: "kumar1",
        User_id: 4,
      },
    ],
    status: 200,
  });
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

app.post("/api/get_character_setup", (req, res) => {
  res.send(tempSearchCharacterData);
});

app.post("/api/update_assign_char", (req, res) => {
  res.send({
    charactersData: { ...req?.body },
  });
});

app.post("/api/get_location_setup", (req, res) => {
  res.send(tempSearchLocationData);
});

app.get("/api/director_search/assign_location", (req, res) => {
  res.send(tempLocationApproveData);
});

app.post("/api/update_assign_location", (req, res) => {
  res.send({
    locationsData: { ...req?.body },
  });
});

app.get("/api/get_character_setup", (req, res) => {
  res.send(tempSearchCharacterData);
});

app.get("/ad/search/getLocations", (req, res) => {
  res.send(tempSearchLocationData);
});

app.get("/api/get_actors", (req, res) => {
  res.send(tempArtistsData);
});

app.get("/api/master_location", (req, res) => {
  res.send(tempSceneLocationsData);
});

app.post("/api/approve_assign_location", (req, res) => {
  res.send({
    Scene_Location_Id: req?.body?.Scene_Location_Id,
    Location_Id: req?.body?.Location_Id,
  });
});

app.post("/api/create_actor", (req, res) => {
  const reqBody = req?.body || {};
  res.send(reqBody);
});

app.post("/api/create_location", (req, res) => {
  const reqBody = req?.body || {};
  res.send(reqBody);
});

app.get("/api/director_search/assign_character", (req, res) => {
  res.send(tempCharacterApproveData);
});

app.post("/api/select_character", (req, res) => {
  const characterId = req?.body?.characterId;
  res.send(characterToArtistMapping);
});

app.post("/api/approve_assign_char", (req, res) => {
  const reqBody = req?.body || {};
  const { characterId, status } = reqBody;
  res.send({
    characterId,
    status,
  });
});

app.post("/api/approve_assign_location", (req, res) => {
  const reqBody = req?.body || {};
  const { Location_Id, Scene_Location_Id, status } = reqBody;
  res.send({
    Scene_Location_Id,
    Location_Id,
    status,
  });
});

app.post("/api/select_location", (req, res) => {
  const locationId = req?.body?.locationId;

  res.send(locationForMovieLocation);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
