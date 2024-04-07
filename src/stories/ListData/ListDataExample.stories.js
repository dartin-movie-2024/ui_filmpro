import ListDataExample from "./ListDataExample";

export default {
  title: "Example/ListData",
  component: ListDataExample,
  argTypes: {
    editButtonConfig: {
      control: {
        type: "select",
      },
      options: ["verifyCrew", "sceneSetup", "characterSetup"],
    },
    headerText: {
      control: {
        type: "text",
      },
    },
    fetchAPI: {
      control: {
        type: "text",
      },
    },
    fetchType: {
      control: {
        type: "text",
      },
      options: ["GET", "POST", "PUT", "DELETE"],
    },
    searchByField: {
      control: {
        type: "text",
      },
    },
  },
};

export const VerifyCrew = {
  args: {
    editButtonConfig: "verifyCrew",
    headerText: "Crew Details",
    fetchAPI: "crew",
    fetchType: "GET",
    searchByField: "name",
  },
};

export const SceneInput = {
  args: {
    editButtonConfig: "sceneSetup",
    headerText: "Scene Setup",
    fetchAPI: "getSceneSetup",
    fetchType: "GET",
    searchByField: "sceneLocation",
  },
};

export const CharacterInput = {
  args: {
    editButtonConfig: "characterSetup",
    headerText: "Character Setup",
    fetchAPI: "getCharacterSetup",
    fetchType: "GET",
    searchByField: "characterName",
  },
};

export const LocationInput = {
  args: {
    editButtonConfig: "locationSetup",
    headerText: "Location Setup",
    fetchAPI: "getLocationSetup",
    fetchType: "GET",
    searchByField: "locationName",
  },
};
