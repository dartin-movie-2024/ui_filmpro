import { Route } from "react-router-dom";
import AssistantDirector from "../components/AssistantDirector";
import ListDataAD from "../components/assistantdirector/ListDataAD";
import UploadScript from "../components/assistantdirector/UploadScript";
import { PATHS } from "../constants";
import SetupComponentAD from "../components/assistantdirector/SetupAD";
import AssignCharactersAD from "../components/assistantdirector/AssignedCharactersAD";
import AssignedLocationsAD from "../components/assistantdirector/AssignedLocationsAD";
import AssignAD from "../components/assistantdirector/AssignAD";
import SceneDetailsAD from "../components/assistantdirector/SceneDetailsAD";
import SelectedCharacterList from "../components/assistantdirector/SelectedCharacterList";
import CastingCall from "../components/assistantdirector/CastingCall";
import SearchDatabase from "../components/assistantdirector/SearchDatabase";
import AddActor from "../components/reusable-components/AddActor";
import SelectedLocationsList from "../components/assistantdirector/SelectedLocationsList";
import SearchLocationDatabase from "../components/assistantdirector/SearchLocationDatabase";
import AddLocation from "../components/reusable-components/AddLocation";
export const AssistantdirectorRoutes = () => (
  <Route path="/assistantdirector" element={<AssistantDirector />}>
    <Route path="/assistantdirector/UploadScript" element={<UploadScript />} />
    <Route
      path={PATHS.VERIFY_CREWAD}
      element={
        // ListData component for Verify Crew page
        <ListDataAD
          editButtonConfig="verifyCrew"
          headerText="Crew Details"
          fetchAPI="/api/get_crew"
          fetchType="GET"
          searchByField="Crew_Name"
        />
      }
    />
    <Route
      path="/assistantdirector/SetupAD"
      element={
        <SetupComponentAD
          paths={{
            "Scenes Setup": PATHS.SCENE_SETUPAD,
            "Character Setup": PATHS.CHARACTER_SETUPAD,
            "Location Setup": PATHS.LOCATION_SETUPAD,
          }}
        />
      }
    />{" "}
    <Route
      path="/assistantdirector/assignCharacter"
      element={
        <SelectedCharacterList
          fetchAPI="api/get_character_setup"
          fetchType="POST"
        />
      }
    />
    <Route
      path="/assistantdirector/assignLocation"
      element={<SelectedLocationsList />}
    />
    <Route path="/assistantdirector/castingCall" element={<CastingCall />} />
    <Route
      path="/assistantdirector/searchDatabase"
      element={<SearchDatabase />}
    />
    <Route
      path="/assistantdirector/searchLocationDatabase"
      element={<SearchLocationDatabase />}
    />
    <Route path="/assistantdirector/addActor" element={<AddActor />} />
    <Route path="/assistantdirector/addLocation" element={<AddLocation />} />
    <Route
      path={PATHS.SCENE_SETUPAD}
      element={
        // ListData component for Scene Setup page
        <ListDataAD
          editButtonConfig="sceneSetup"
          headerText="Scene Setup"
          fetchAPI="getSceneSetup"
          fetchType="GET"
          searchByField="sceneLocation"
          showEditButton={true}
        />
      }
    />
    <Route
      path={PATHS.CHARACTER_SETUPAD}
      element={
        // ListData component for Character Setup page
        <ListDataAD
          editButtonConfig="characterSetup"
          headerText="Character Setup"
          fetchAPI="getCharacterSetup"
          fetchType="GET"
          searchByField="characterName"
          showEditButton={true}
        />
      }
    />
    <Route path={PATHS.EDIT_CHARACTERSAD} element={<AssignCharactersAD />} />
    <Route path={PATHS.EDIT_LOCATIONSAD} element={<AssignedLocationsAD />} />
    <Route path={PATHS.ASSIGNAD} element={<AssignAD />} />
    <Route path={PATHS.SCENE_DETAILSAD} element={<SceneDetailsAD />} />
    <Route
      path={PATHS.LOCATION_SETUPAD}
      element={
        // ListData component for Location Setup page
        <ListDataAD
          editButtonConfig="locationSetup"
          headerText="Location Setup"
          fetchAPI="getLocationSetup"
          fetchType="GET"
          searchByField="locationName"
          showEditButton={true}
        />
      }
    />
  </Route>
);
