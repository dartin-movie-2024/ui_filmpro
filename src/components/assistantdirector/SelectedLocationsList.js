/*import React, { useEffect, useState } from "react";
import { Button, makeStyles } from "@material-ui/core";
import LocationCard from "../reusable-components/LocationCard";
import axios from "axios";
import { serverURL } from "../../constants";
import { Link } from "react-router-dom";

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
  containerFooter: {
    height: "75px",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderTop: "1px solid #ccc",
    padding: "0 4rem",
    boxSizing: "border-box",
  },
  assignedAD: {
    width: "20rem",
  },
}));

const SelectedLocationsList = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState({});
  const storedData = localStorage.getItem("myData");

  useEffect(() => {
    let isCancelled = false;
    if (isCancelled === false) setLoading(true);
    axios({
      method: "POST",
      url: `${serverURL}/api/get_location_setup`,
      headers: {
        Authorization: "Bearer " + storedData,
      },
    })
      .then(({ data: { result = [] } }) =>
        setLocations([...getModifiedLocationsArray(result)])
      )
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  const cardSelectionToggled = (id) => {
    setLocations(
      locations.map((location) => {
        if (location.id === id) {
          return {
            ...location,
            selected: !location.selected,
          };
        }
        return location;
      })
    );

    if (selectedLocation?.id === id) {
      setSelectedLocation({});
    } else {
      setSelectedLocation(locations.find((location) => location.id === id));
    }
  };

  function isEmpty(obj) {
    return Object.keys(obj).length === 0;
  }

  const getModifiedLocationsArray = (locationsArray) =>
    locationsArray?.map((location) => ({
      id: location.Scene_Id,
      title: location.Location_Name,
      description: location.Location_Description,
      status: location.Status,
      totalScenes: location.No_Of_Scenes,
      requirements: location.Special_requirements,
      selected: false,
      showStatusButton: false,
      showSelectButton: true,
      showMoreButton: true,
    })) || [];

  loading && <div>Loading...</div>;

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
            showSelectButton={
              isEmpty(selectedLocation)
                ? true
                : selectedLocation.id === location.id
            }
            selectButtonAction={cardSelectionToggled}
          />
        ))}
      </div>
      <div className={classes.containerFooter}>
        <Link
          to={
            !selectedLocation?.id
              ? ""
              : "/assistantdirector/searchLocationDatabase"
          }
          state={{ locations, id: selectedLocation.id }}
        >
          <Button
            className={classes.footerButton}
            variant="contained"
            color="primary"
            disabled={!selectedLocation?.id}
          >
            Search Database
          </Button>
        </Link>
        <Link to={"/assistantdirector/addLocation"}>
          <Button
            className={classes.footerButton}
            variant="contained"
            color="primary"
          >
            Add Location
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default SelectedLocationsList;*/
import React, { useEffect, useState } from "react";
import { Button, makeStyles } from "@material-ui/core";
import LocationCard from "../reusable-components/LocationCard";
import axios from "axios";
import { serverURL } from "../../constants";
import { Link } from "react-router-dom";

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
  containerFooter: {
    height: "75px",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderTop: "1px solid #ccc",
    padding: "0 4rem",
    boxSizing: "border-box",
  },
  assignedAD: {
    width: "20rem",
  },
}));

const SelectedLocationsList = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState({});
  const storedData = localStorage.getItem("myData");

  useEffect(() => {
    let isCancelled = false;
    if (isCancelled === false) setLoading(true);
    axios({
      method: "POST",
      url: `${serverURL}/api/get_location_setup`,
      headers: {
        "Authorization": `Bearer ${process.env.REACT_APP_AUTH_TOKEN}`,
      },
    })
      .then(({ data: { result = [] } }) =>
        setLocations([...getModifiedLocationsArray(result)])
      )
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  const cardSelectionToggled = (id) => {
    setLocations(
      locations.map((location) => {
        if (location.id === id) {
          return {
            ...location,
            selected: !location.selected,
          };
        }
        return location;
      })
    );

    if (selectedLocation?.id === id) {
      setSelectedLocation({});
    } else {
      setSelectedLocation(locations.find((location) => location.id === id));
    }
  };

  function isEmpty(obj) {
    return Object.keys(obj).length === 0;
  }

  const getModifiedLocationsArray = (locationsArray) =>
    locationsArray?.map((location) => ({
      id: location.Scene_Id,
      title: location.Location_Name,
      description: location.Location_Description,
      status: location.Status,
      totalScenes: location.No_Of_Scenes,
      requirements: location.Special_requirements,
      selected: false,
      showStatusButton: false,
      showSelectButton: true,
      showMoreButton: true,
    })) || [];

  loading && <div>Loading...</div>;

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
            showSelectButton={
              isEmpty(selectedLocation)
                ? true
                : selectedLocation.id === location.id
            }
            selectButtonAction={cardSelectionToggled}
          />
        ))}
      </div>
      <div className={classes.containerFooter}>
        <Link
          to={
            !selectedLocation?.id
              ? ""
              : "/assistantdirector/searchLocationDatabase"
          }
          state={{ locations, id: selectedLocation.id }}
        >
          <Button
            className={classes.footerButton}
            variant="contained"
            color="primary"
            disabled={!selectedLocation?.id}
          >
            Search Database
          </Button>
        </Link>
        <Link to={"/assistantdirector/addLocation"}>
          <Button
            className={classes.footerButton}
            variant="contained"
            color="primary"
          >
            Add Location
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default SelectedLocationsList;
