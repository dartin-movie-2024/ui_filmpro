import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import Person from "@material-ui/icons/Person";
import axios from "axios";
import { serverURL } from "../../constants";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    height: "150px",
    width: "100%",
    display: "flex",
    borderBottom: "1px solid #ccc",
    padding: "0 4rem",
    boxSizing: "border-box",
    alignItems: "center",
  },
  container: {
    flex: 1,
    width: "100%",
    overflow: "auto",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
  },
  footer: {
    height: "75px",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    borderTop: "1px solid #ccc",
    padding: "0 4rem",
    boxSizing: "border-box",
  },
  textField: {
    margin: theme.spacing(1),
    width: "25%",
  },
  heading: {
    margin: theme.spacing(1),
    width: "100%",
    textAlign: "center",
  },
  nameField: {
    margin: theme.spacing(1),
    flex: 1,
  },
  addPhoto: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "15%",
  },
  personIcon: {
    fontSize: "3rem",
    marginRight: theme.spacing(1),
  },
  addPhotoInput: {
    width: "100px",
  },
}));

const AddActor = () => {
  const classes = useStyles();
  const [formData, setFormData] = React.useState({});

  const handleDataChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const addActor = () => {
    const storedData = localStorage.getItem("myData");

    axios({
      method: "POST",
      url: `${serverURL}/api/create_actor`,
      headers: {
        Authorization: "Bearer " + storedData,
      },
      data: formData,
    })
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
  };

  return (
    <div className={classes.root}>
      <h1 className={classes.heading}>Add Actor</h1>
      <div className={classes.header}>
        <div className={classes.addPhoto}>
          <Person className={classes.personIcon} />
          <TextField
            className={classes.addPhotoInput}
            id="photo"
            label="Photo"
            type="file"
          />
        </div>
        <TextField
          inputProps={{
            id: "ActorName",
          }}
          onChange={handleDataChange}
          className={classes.nameField}
          id="name"
          label="Name"
        />
      </div>
      <div className={classes.container}>
        <TextField
          inputProps={{
            id: "ActingAge",
          }}
          onChange={handleDataChange}
          className={classes.textField}
          id="actingAge"
          label="Acting Age"
        />
        <TextField className={classes.textField} id="height" label="Height" />
        <FormControl className={classes.textField}>
          <InputLabel id="demo-simple-select-label">Gender</InputLabel>
          <Select
            onChange={handleDataChange}
            labelId="demo-simple-select-label"
            inputProps={{
              id: "Gender",
            }}
            variant="outlined"
            label="Gender"
          >
            <MenuItem value={"male"}>Male</MenuItem>
            <MenuItem value={"female"}>Female</MenuItem>
          </Select>
        </FormControl>
        <TextField
          inputProps={{
            id: "HairColour",
          }}
          onChange={handleDataChange}
          className={classes.textField}
          id="hairColor"
          label="Hair Color"
        />
        <TextField
          inputProps={{
            id: "EyeColour",
          }}
          onChange={handleDataChange}
          className={classes.textField}
          id="eyeColor"
          label="Eye Color"
        />
        <TextField
          inputProps={{
            id: "Language",
          }}
          onChange={handleDataChange}
          className={classes.textField}
          id="languages"
          label="Languages"
        />
        <TextField
          inputProps={{
            id: "Email",
          }}
          onChange={handleDataChange}
          className={classes.textField}
          id="email"
          label="Email"
        />
        <TextField
          inputProps={{
            id: "PhoneNumber",
          }}
          onChange={handleDataChange}
          className={classes.textField}
          id="phone"
          label="Phone Number"
        />
        <TextField
          inputProps={{
            id: "PerformingArts",
          }}
          onChange={handleDataChange}
          className={classes.textField}
          id="performingArts"
          label="Performing Arts"
        />
        <TextField
          inputProps={{
            id: "Athletics",
          }}
          onChange={handleDataChange}
          className={classes.textField}
          id="atheletics"
          label="Atheletics"
        />
        <TextField
          inputProps={{
            id: "DanceAndMusic",
          }}
          onChange={handleDataChange}
          className={classes.textField}
          id="danceAndMusic"
          label="Dance and Music"
        />
        <TextField
          inputProps={{
            id: "Address",
          }}
          onChange={handleDataChange}
          className={classes.textField}
          id="address"
          label="Address"
        />
        <TextField
          inputProps={{
            id: "FilmExperience",
          }}
          onChange={handleDataChange}
          className={classes.textField}
          id="filmExperience"
          label="Film Experience"
        />
      </div>
      <div className={classes.footer}>
        <div>
          <Button
            variant="contained"
            type="submit"
            color="primary"
            onClick={addActor}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddActor;
