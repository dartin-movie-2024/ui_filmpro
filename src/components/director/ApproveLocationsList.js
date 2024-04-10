import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";
import LocationCard from "../reusable-components/LocationCard";
import axios from "axios";
import { serverURL } from "../../constants";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
  container: {
    flex: 1,
    width: "100%",
    overflow: "auto",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
  },
}));

const ApproveLocationList = ({ fetchAPI, fetchType }) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [locations, setLocations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    let isCancelled = false;
    if (isCancelled === false) setLoading(true);
    axios({
      method: fetchType,
      url: `${serverURL}/${fetchAPI}`,
    })
      .then(({ data: { result = [] } }) => {
        return setLocations([...getModifiedLocationsArray(result)]);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [fetchAPI, fetchType]);

  const cardSelectionToggled = (id) => {
    navigate("/director/approveSelectedLocation", {
      state: {
        id,
        location: locations.find((location) => location.id === id),
      },
    });
  };

  const getModifiedLocationsArray = (locationsArray) =>
    locationsArray?.map((location) => ({
      id: location.Location_Id,
      title: location.Location_Name,
      description: location.Location_Description,
      totalScenes: location.Total_Scenes,
      requirements: location.Requirements,
      selected: false,
      showStatusButton: false,
      showSelectButton: true,
      showMoreButton: true,
    })) || [];

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        {locations.map((location) => (
          <LocationCard
            key={location.id}
            id={location.id}
            title={location.title}
            description={location.description}
            requirements={location.requirements}
            subHeader={location.subHeader}
            status={location.status}
            selected={location.selected ?? false}
            shootTime={location.shootTime}
            showStatusButton={location.showStatusButton}
            showSelectButton={location.showSelectButton}
            showMoreButton={location.showMoreButton}
            selectButtonAction={cardSelectionToggled}
          />
        ))}
      </div>
    </div>
  );
};

export default ApproveLocationList;
