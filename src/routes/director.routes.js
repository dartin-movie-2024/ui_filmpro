
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
import AssignedLocations from "../components/director/AssignedLocations";
import CharacterCardList from "../components/director/CharacterCardList";
import LocationCardList from "../components/director/LocationCardList";
import ApproveCharacterList from "../components/director/ApproveCharacterList";
import ApproveLocationList from "../components/director/ApproveLocationsList";
import ApproveSelectedCharacter from "../components/director/ApproveSelectedCharacter";
import ApproveSelectedLocation from "../components/director/ApproveSelectedLocation";
import ExistingProds from "../components/Producer/Existing Productions";


export const directorRoutes = () => (
  <Route path="/director" element={<Director />}>
    <Route
      path={PATHS.VERIFY_CREW}
      element={
        // ListData component for Verify Crew page
        <ListData
          editButtonConfig="verifyCrew"
          headerText="Crew Details"
          fetchAPI="/api/get_crew"
          fetchType="GET"
          searchByField="Crew_Name"
        />
      }
    />
    <Route path="/director/sceneInput" element={<SceneInputComponent />} />
    <Route
      path="/director/setup"
      element={
        <SetupComponent
          paths={{
            "Scene Setup": PATHS.SCENE_SETUP,
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
          fetchAPI="api/get_scene_setup"
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
          fetchAPI="api/get_character_setup"
          fetchType="POST"
          searchByField="characterName"
        />
      }
    />
    <Route path={PATHS.EDIT_CHARACTERS} element={<AssignCharacters />} />
    <Route path={PATHS.EDIT_LOCATIONS} element={<AssignedLocations />} />
    <Route path={PATHS.ASSIGN} element={<Assign />} />
    <Route path={PATHS.SCENE_DETAILS} element={<SceneDetails />} />
    <Route path="/director/ExistingProds" element={<ExistingProds />} />
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
      path="/director/assignCharacter"
      element={
        <CharacterCardList
          fetchAPI="api/get_character_setup"
          fetchType="POST"
        />
      }
    ></Route>
    <Route
      path="/director/approveCharacter"
      element={
        <ApproveCharacterList
          fetchAPI="api/director_search/assign_character"
          fetchType="GET"
        />
      }
    />
    <Route
      path="/director/approveSelectedCharacter"
      element={<ApproveSelectedCharacter />}
    />
    <Route
      path="/director/assignLocation"
      element={
        <LocationCardList fetchAPI="api/get_location_setup" fetchType="POST" />
      }
    ></Route>
    <Route
      path="/director/approveLocation"
      element={
        <ApproveLocationList
          fetchAPI="api/director_search/assign_location"
          fetchType="GET"
        />
      }
    ></Route>
    <Route
      path="/director/approveSelectedLocation"
      element={<ApproveSelectedLocation />}
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
