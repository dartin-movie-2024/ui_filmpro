import { Route } from "react-router-dom";
import Director from "../components/Director";
import ListData from "../components/director/ListData";
import SetupComponent from "../components/director/Setup";
import SceneInputComponent from "../components/SceneInput";
import ShootDurationComponent from "../components/ShootDuration";
import LocationInputComponent from "../components/LocationInput";
import CharacterInputComponent from "../components/CharacterInput";
import ScheduleOutputComponent from "../components/ScheduleOutput";
import AssignCharacters from "../components/director/AssignCharacters";
import SceneDetails from "../components/director/SceneDetails";
import Assign from "../components/director/Assign";
import { PATHS } from "../constants";

export const directorRoutes = () => (
  <Route path="/director" element={<Director />}>
    <Route
      path={PATHS.VERIFY_CREW}
      element={
        // ListData component for Verify Crew page
        <ListData
          editButtonConfig="verifyCrew"
          headerText="Crew Details"
          fetchAPI="crew"
          fetchType="GET"
          searchByField="name"
        />
      }
    />
    <Route path="/director/sceneInput" element={<SceneInputComponent />} />
    <Route
      path="/director/setup"
      element={
        <SetupComponent
          paths={{
            "Scenes Setup": PATHS.SCENE_SETUP,
            "Character Setup": PATHS.CHARACTER_SETUP,
            "Location Setup": PATHS.LOCATION_SETUP,
          }}
        />
      }
    />
    <Route
      path={PATHS.SCENE_SETUP}
      element={
        // ListData component for Scene Setup page
        <ListData
          editButtonConfig="sceneSetup"
          headerText="Scene Setup"
          fetchAPI="getSceneSetup"
          fetchType="GET"
          searchByField="sceneLocation"
        />
      }
    />
    <Route
      path={PATHS.CHARACTER_SETUP}
      element={
        // ListData component for Character Setup page
        <ListData
          editButtonConfig="characterSetup"
          headerText="Character Setup"
          fetchAPI="getCharacterSetup"
          fetchType="GET"
          searchByField="characterName"
        />
      }
    />
    <Route path={PATHS.EDIT_CHARACTERS} element={<AssignCharacters />} />
    <Route path={PATHS.ASSIGN} element={<Assign />} />
    <Route path={PATHS.SCENE_DETAILS} element={<SceneDetails />} />
    <Route
      path={PATHS.LOCATION_SETUP}
      element={
        // ListData component for Location Setup page
        <ListData
          editButtonConfig="locationSetup"
          headerText="Location Setup"
          fetchAPI="getLocationSetup"
          fetchType="GET"
          searchByField="locationName"
        />
      }
    />
    <Route
      path="/director/shootDuration"
      element={<ShootDurationComponent />}
    />
    <Route
      path="/director/characterInput"
      element={<CharacterInputComponent />}
    />
    <Route
      path="/director/locationInput"
      element={<LocationInputComponent />}
    />
    <Route
      path="/director/scheduleOutput"
      element={<ScheduleOutputComponent />}
    />
  </Route>
);
