import React, { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  makeStyles,
} from "@material-ui/core";
import LocationCard from "../reusable-components/LocationCard";
import axios from "axios";
import { PATHS, serverURL } from "../../constants";

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
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const LocationCardList = ({ fetchAPI, fetchType }) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [locations, setLocations] = useState([]);
  const [assignedAD, setAssignedAD] = useState("");
  const [adList, setAdList] = useState([]);
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);

  const { GET_AD_LIST, ASSIGN_LOCATION_TO_AD } = PATHS;

  useEffect(() => {
    let isCancelled = false;
    if (isCancelled === false) setLoading(true);
    const storedData = localStorage.getItem("myData");

    axios({
      method: fetchType,
      url: `${serverURL}/${fetchAPI}`,
      headers: {
        Authorization: "Bearer " + storedData,
      },
      data: { Production_id: 14 },
    })
      .then(({ data: { result = [] } }) =>
        setLocations([...getModifiedLocationsArray(result)])
      )
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [fetchAPI, fetchType]);

  // get ad list from 'api/asstdirector_list'
  useEffect(() => {
    let isCancelled = false;
    if (isCancelled === false) setLoading(true);
    const storedData = localStorage.getItem("myData");

    axios({
      method: "POST",
      url: `${serverURL}/${GET_AD_LIST}`,
      headers: {
        Authorization: "Bearer " + storedData,
      },
      data: { Production_id: 14 },
    })
      .then(({ data: { result = [] } }) => {
        const adListResult = result?.map((ad) => ({
          id: ad.User_id,
          name: ad.Full_Name,
        }));
        setAdList([...adListResult]);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [GET_AD_LIST]);

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
  };

  const handleAssignAD = (event) => {
    setAssignedAD(event.target.value);
  };

  const handleAssign = async () => {
    try {
      await saveLocations();
    } catch (error) {
      console.error(error);
    }
  };

  const saveLocations = async () => {
    const payload = {
      Location_Id: locations
        .filter((location) => location.selected)
        .map((location) => location.id),
      Assigned_To: assignedAD,
    };
    const storedData = localStorage.getItem("myData");

    axios({
      method: "POST",
      url: `${serverURL}/${ASSIGN_LOCATION_TO_AD}`,
      headers: {
        Authorization: "Bearer " + storedData,
      },
      data: { ...payload },
    })
      .then((result) => handleOpen())
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

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

  function getModalStyle() {
    const top = 50 + Math.round(Math.random() * 20) - 10;
    const left = 50 + Math.round(Math.random() * 20) - 10;

    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    resetSelection();
  };

  const resetSelection = () => {
    setLocations(
      locations.map((location) => ({
        ...location,
        selected: false,
      }))
    );
    setAssignedAD("");
  };

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
      <div className={classes.containerFooter}>
        <FormControl className={classes.assignedAD}>
          <InputLabel id="assign-to-AD">Assign to AD</InputLabel>
          <Select
            inputProps={{
              name: "assignedAD",
            }}
            labelId="assign-to-AD"
            variant="outlined"
            label="Assign to AD"
            onChange={handleAssignAD}
          >
            {adList.map((ad) => (
              <MenuItem value={ad.id}>{ad.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          className={classes.footerButton}
          variant="contained"
          color="primary"
          onClick={handleAssign}
        >
          Assign
        </Button>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <h2 id="simple-modal-title">
            Successfully assigned selected locations to{" "}
            {adList.find((ad) => ad.id === assignedAD)?.name}
          </h2>
          <Button variant="contained" color="primary" onClick={handleClose}>
            Close
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default LocationCardList;