import React from "react";
import "./index.css";
import CharacterCard from "../../components/reusable-components/CharacterCard";

export const CharacterCardExample = ({ ...props }) => {
  return (
    <div
      style={{
        width: "30%",
        height: "100%",
      }}
    >
      {/* 
        ListData uses <Link>. Link component needs to appear inside a router.
        So wrapping it inside BrowserRouter.
      */}
      <CharacterCard {...props} />
    </div>
  );
};

export default CharacterCardExample;

CharacterCardExample.args = {
  id: 3,
  title: "Natasha Romanoff",
  status: "In Progress",
  characterDetails: {
    role: "Main",
    gender: "F",
    age: "30",
  },
  selected: false,
  showStatusButton: false,
  showSelectButton: true,
  showMoreButton: true,
  description:
    "Natasha Romanoff, also known as Black Widow, is a skilled spy and assassin. She's highly trained in hand-to-hand combat and espionage.",
  keyFeatures: "Red hair, athletic build, striking and confident look",
};
