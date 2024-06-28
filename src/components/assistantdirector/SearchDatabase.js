import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import PersonIcon from "@material-ui/icons/Person";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {
  Card,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import axios from "axios";
import { serverURL } from "../../constants";
import { Link, useLocation } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "2rem",
    "& > *": {
      margin: theme.spacing(1),
      boxSizing: "border-box",
    },
  },
  textField: {
    margin: theme.spacing(1),
    width: "25ch",
  },
  form: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "70%",
    margin: `0 auto`,
  },
  rowItem: {
    width: "100%",
    margin: theme.spacing(1),
    display: "flex",
  },
  rowItemInput: {
    flex: 1,
    margin: `0 ${theme.spacing(1)}`,
  },
  buttonsContainer: {
    width: "100%",
    margin: theme.spacing(1),
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    margin: theme.spacing(1),
  },
  cardsContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    margin: theme.spacing(2),
    flex: 1,
    overflow: "scroll",
  },
  actorCard: {
    width: "30%",
    cursor: "pointer",
    margin: theme.spacing(1),
  },
  actorCardHeader: {
    paddingBottom: 0,
  },
  actorCardContent: {
    display: "flex",
  },
  actorCardIcon: {
    height: "100%",
    width: "30%",
  },
  actorCardContainer: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    width: "70%",
  },
  PersonIcon: {
    fontSize: "5rem",
  },
}));

function SearchDatabase() {
  const classes = useStyles();

  const [selectedArtist, setSelectedArtist] = useState({});
  const [gender, setGender] = useState("");
  const [actingAgeRange, setActingAgeRange] = useState("");
  const [actualAgeRange, setActualAgeRange] = useState("");
  const [height, setHeight] = useState("");
  const [language, setLanguage] = useState("");
  const [eyeColour, setEyeColour] = useState("");
  const [loading, setLoading] = useState(false);
  const [artists, setArtists] = useState([]);
  const storedData = localStorage.getItem("myData");

  useEffect(() => {
    let isCancelled = false;

    if (isCancelled === false) setLoading(true);

    axios({
      method: "GET",
      url: `${serverURL}/api/get_actors`,
      headers: {
        "Authorization": `Bearer ${process.env.REACT_APP_AUTH_TOKEN}`,
      },
    })
      .then(({ data: { result } }) => {
        setArtists(result || []);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  const {
    state: { characters, id },
  } = useLocation();

  const handleNameChange = (event, actor_id) => {
    setSelectedArtist(
      artists.find(
        (artist) => artist.actor_id === (event.target.value || actor_id)
      )
    );
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleActingAgeRangeChange = (event) => {
    setActingAgeRange(event.target.value);
  };

  const handleActualAgeRangeChange = (event) => {
    setActualAgeRange(event.target.value);
  };

  const handleHeightChange = (event) => {
    setHeight(event.target.value);
  };

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  const handleEyeColourChange = (event) => {
    setEyeColour(event.target.value);
  };

  const handleApply = () => {
    setLoading(true);
    axios({
      method: "post",
      url: `${serverURL}/api/approve_assign_char`,
      headers: {
        "Authorization": `Bearer ${process.env.REACT_APP_AUTH_TOKEN}`,
      },
      data: {
        Character_id: id,
        actor_id: selectedArtist.actor_id,
      },
    })
      .then((result) => {
        console.log({ result });
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const handleClear = () => {
    setSelectedArtist({});
  };

  loading && <div>Loading...</div>;

  return (
    <div className={classes.root}>
      <Typography variant="h4" align="center" gutterBottom>
        Casting Call:{" "}
        {characters.find((character) => character.id === id)?.title}
      </Typography>
      <form className={classes.form}>
        <div className={classes.rowItem}>
          <FormControl className={classes.rowItemInput}>
            <InputLabel id="select-character-label">
              Select Character
            </InputLabel>
            <Select
              labelId="select-character-label"
              id="select-character"
              value={selectedArtist?.actor_id || ""}
              onChange={handleNameChange}
            >
              {artists.map((artist) => (
                <MenuItem key={artist.actor_id} value={artist.actor_id}>
                  {artist.ActorName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Link to="/assistantdirector/addActor">
            <Button
              className={classes.button}
              variant="outlined"
              color="primary"
            >
              Add New
            </Button>
          </Link>
        </div>
        <TextField
          className={classes.textField}
          id="gender"
          label="Gender"
          value={selectedArtist?.Gender || ""}
          onChange={handleGenderChange}
        />
        <TextField
          className={classes.textField}
          id="acting-age-range"
          label="Acting Age Range"
          value={selectedArtist?.ActingAge || ""}
          onChange={handleActingAgeRangeChange}
        />
        <TextField
          className={classes.textField}
          id="actual-age-range"
          label="Actual Age Range"
          value={selectedArtist?.ActingAge || ""}
          onChange={handleActualAgeRangeChange}
        />
        <TextField
          className={classes.textField}
          id="height"
          label="Height"
          value={selectedArtist?.Height || ""}
          onChange={handleHeightChange}
        />
        <TextField
          className={classes.textField}
          id="language"
          label="Language"
          value={selectedArtist?.Language || ""}
          onChange={handleLanguageChange}
        />
        <TextField
          className={classes.textField}
          id="eye-colour"
          label="Eye Colour"
          value={selectedArtist?.EyeColour || ""}
          onChange={handleEyeColourChange}
        />
        <div className={classes.buttonsContainer}>
          <Button
            className={classes.button}
            variant="contained"
            color="secondary"
            onClick={handleClear}
          >
            Clear
          </Button>
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            onClick={handleApply}
          >
            Apply
          </Button>
        </div>
      </form>
      <div className={classes.cardsContainer}>
        {artists.map((artist) => (
          <Card
            className={classes.actorCard}
            key={artist.actor_id}
            onClick={(e) => handleNameChange(e, artist.actor_id)}
            style={{
              border:
                artist?.id === selectedArtist?.id
                  ? "1px solid #5840bb"
                  : "1px solid #ccc",
              background:
                artist?.id === selectedArtist?.id ? "#d8e8ee" : "#fff",
            }}
          >
            <CardContent className={classes.actorCardContent}>
              <div className={classes.actorCardIcon}>
                <PersonIcon className={classes.PersonIcon} />
              </div>
              <div className={classes.actorCardContainer}>
                <Typography variant="h6" gutterBottom>
                  Name: <b>{artist.ActorName}</b>
                </Typography>
                <Typography color="textSecondary">
                  Age: {artist.ActingAge}
                </Typography>
                <Typography variant="body2" component="p">
                  Gender: {artist.Gender}
                </Typography>
                <Typography variant="body2" component="p">
                  Phone: {artist.PhoneNumber}
                </Typography>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default SearchDatabase;
