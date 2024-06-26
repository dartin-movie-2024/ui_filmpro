import React, { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  makeStyles,
  Modal,
} from "@material-ui/core";
import CharacterCard from "../reusable-components/CharacterCard";
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

const CharacterCardList = ({ fetchAPI, fetchType }) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [characters, setCharacters] = useState([]);
  const [assignedAD, setAssignedAD] = useState("");
  const [adList, setAdList] = useState([]);
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);

  const { GET_AD_LIST, ASSIGN_CHARACTER_TO_AD } = PATHS;

  // get list of characters
  useEffect(() => {
    setLoading(true); // Start loading before the request

    axios({
      method: fetchType,
      url: `${serverURL}/${fetchAPI}`,
      headers: {
        "Authorization": `Bearer ${process.env.REACT_APP_AUTH_TOKEN}`,
      },
      ...(fetchType.toLowerCase() === 'get' ? { params: { Production_id: 14 } } : { data: { Production_id: 14 } }), // Conditionally set params or data based on fetchType
    })
      .then(({ data: { result = [] } }) => setCharacters([...getModifiedCharactersArray(result)]))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [fetchAPI, fetchType]);

  // get ad list from 'api/asstdirector_list'
  useEffect(() => {
    let isCancelled = false;

    const fetchData = async () => {
      if (isCancelled) return;
      setLoading(true);
      try {
        const response = await axios({
          method: "POST",
          url: `${serverURL}/${GET_AD_LIST}`,
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.REACT_APP_AUTH_TOKEN}`,
          },
          data: { Production_id: 14 },
        });

        const adListResult = response.data.result?.map(ad => ({
          id: ad.User_id,
          name: ad.Full_Name,
        }));

        if (!isCancelled) { // Check again to avoid setting state on unmounted component
          setAdList([...adListResult]);
        }
      }
      catch (err) { console.error(err); }
      finally {
        if (!isCancelled) setLoading(false); // Ensure loading is set to false if not cancelled
      }
    };

    fetchData();

    // Cleanup function to set isCancelled true when component unmounts
    return () => {
      isCancelled = true;
    };
  }, [GET_AD_LIST]); // Dependency array

  const cardSelectionToggled = (id) => {
    setCharacters(
      characters.map((character) => {
        if (character.id === id) {
          return {
            ...character,
            selected: !character.selected,
          };
        }
        return character;
      })
    );
  };

  const handleAssignAD = (event) => {
    setAssignedAD(event.target.value);
  };

  const handleAssign = async () => {
    try {
      await saveCharacters();
    } catch (error) {
      console.error(error);
    }
  };

  const getModifiedCharactersArray = (charactersArray) =>
    charactersArray?.map((character) => ({
      id: character.Character_id,
      title: character.Character_Name,
      status: character.Status,
      description: character.Description,
      keyFeatures: character.Key_Features,
      characterDetails: {
        role: character.Role,
        age: character.Actual_Age,
        gender: character.Gender,
      },
      showStatusButton: false,
      showSelectButton: true,
      showMoreButton: true,
    })) || [];

  const saveCharacters = async () => {
    const payload = {
      Character_id: characters
        .filter((character) => character.selected)
        .map((character) => character.id),
      Assigned_To: assignedAD,
    };
    const storedData = localStorage.getItem("myData");

    axios({
      method: "POST",
      url: `${serverURL}/${ASSIGN_CHARACTER_TO_AD}`,
      headers: {
        Authorization: "Bearer " + storedData,
      },
      data: { ...payload },
    })
      .then((result) => handleOpen())
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  const resetSelection = () => {
    setCharacters(
      characters.map((character) => ({
        ...character,
        selected: false,
      }))
    );
    setAssignedAD("");
  };

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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        {characters.map((character) => (
          <CharacterCard
            key={character.id}
            id={character.id}
            title={character.title}
            description={character.description}
            keyFeatures={character.keyFeatures}
            subHeader={character.subHeader}
            status={character.status}
            selected={character.selected ?? false}
            characterDetails={character.characterDetails}
            showStatusButton={character.showStatusButton}
            showSelectButton={character.showSelectButton}
            showMoreButton={character.showMoreButton}
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
              <MenuItem key={ad.id} value={ad.id}>{ad.name}</MenuItem>
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
            Successfully assigned selected characters to{" "}
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

export default CharacterCardList;
