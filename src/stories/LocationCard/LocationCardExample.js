import React from "react";
import "./index.css";
import LocationCard from "../../components/reusable-components/LocationCard";

export const LocationCardExample = ({ ...props }) => {
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
      <LocationCard {...props} />
    </div>
  );
};

export default LocationCardExample;

LocationCardExample.args = {
  id: 3,
  title: "Natasha Romanoff",
  status: "In Progress",
  totalScenes: "None",
  selected: false,
  showStatusButton: false,
  showSelectButton: true,
  showMoreButton: true,
  description:
    "Natasha Romanoff, also known as Black Widow, is a skilled spy and assassin. She's highly trained in hand-to-hand combat and espionage.",
  requirements: "Red hair, athletic build, striking and confident look",
};
