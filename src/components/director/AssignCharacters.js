import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  makeStyles,
} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { serverURL } from "../../constants";

const flexColumn = {
  display: "flex",
  flexDirection: "column",
};

const borderBox = {
  boxSizing: "border-box",
};

const useStyles = makeStyles((theme) => ({
  root: {
    ...borderBox,
  },
  heading: {
    ...borderBox,
    padding: "0",
    widtn: "100%",
    textAlign: "center",
  },
  container: {
    ...borderBox,
    ...flexColumn,
    width: "100%",
    height: "100%",
    padding: ".5rem",
    overflow: "hidden",
    justifyContent: "space-around",
  },
  containerBody: {
    ...borderBox,
    display: "flex",
    height: "85%",
    width: "100%",
    padding: ".5rem",
    overflow: "hidden",
    justifyContent: "space-around",
  },
  containerFooter: {
    padding: ".5rem",
    width: "100%",
    height: "10%",
    display: "flex",
  },
  assignCharacters: {
    ...borderBox,
    width: "25%",
    height: "100%",
    backgroundColor: "#e0f9ff",
  },
  assignCharactersContent: {
    ...flexColumn,
    padding: "0 .5rem",
    height: "100%",
    overflow: "hidden",
  },
  assignCharactersList: {
    flex: 1,
    overflow: "auto",
  },
  card: {
    ...borderBox,
    width: "100%",
    margin: ".5rem 0",
  },
  characterForm: {
    ...flexColumn,
    ...borderBox,
    width: "70%",
    height: "100%",
    padding: "1rem",
    overflow: "auto",
  },
  formRow: {
    width: "100%",
    display: "flex",
    marginBottom: "1rem",
    justifyContent: "space-around",
  },
  formInput: {
    flex: 1,
    margin: "0 1rem",
  },
  formInputSingleItem: {
    flex: 1,
    margin: "0 1rem",
  },
  textArea: {
    flex: 1,
    margin: "0 1rem",
  },
  footerCard: {
    ...borderBox,
    width: "100%",
    height: "100%",
    margin: "0 .5rem",
  },
  footerCardContent: {
    ...borderBox,
    height: "100%",
    width: "100%",
  },
  cardContentWrapper: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
  assignedAD: {
    width: "20rem",
    marginLeft: "5rem",
  },
  footerButton: {},
}));

const AssignCharacters = (props) => {
  const classes = useStyles();
  const [selectedCharacter, setSelectedCharacter] = useState({});
  const {
    state: { rows: characters, id },
  } = useLocation();

  useEffect(() => {
    const currentCharacter = characters?.find((row) => row.id === id) || {};
    setSelectedCharacter(currentCharacter);
  }, [characters, id]);

  const handleCharacterDataUpdate = (e) => {
    const { value, name } = e.target;
    const updatedCharacter = { ...selectedCharacter, [name]: value };
    setSelectedCharacter(updatedCharacter);
  };

  const saveCharacter = () => {
    axios
      .post(`${serverURL}/saveCharacter`, selectedCharacter, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("🚀 ~ response:", response);
      })
      .catch((error) => {
        // handle errors
        console.log(error);
      });
  };

  return (
    <div className={classes.container}>
      <div className={classes.containerBody}>
        <Card className={classes.assignCharacters}>
          <CardContent className={classes.assignCharactersContent}>
            <h3 className={classes.heading}>Assigned Characters</h3>
            <div className={classes.assignCharactersList}>
              {characters.map((character, index) => {
                return (
                  <Card className={classes.card} key={index}>
                    <CardContent className={classes.cardContent}>
                      <h3>{character.characterName}</h3>
                      <h4>{character.characterType}</h4>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </CardContent>
        </Card>
        <Card className={classes.characterForm}>
          <CardContent className={classes.cardContent}>
            <div className={classes.formRow}>
              <TextField
                InputLabelProps={{ shrink: true }}
                inputProps={{
                  name: "name",
                }}
                className={classes.formInput}
                label="Name"
                variant="outlined"
                value={selectedCharacter?.name || ""}
                onChange={(e) => {
                  handleCharacterDataUpdate(e);
                }}
              />
              <TextField
                InputLabelProps={{ shrink: true }}
                inputProps={{
                  name: "characterName",
                }}
                className={classes.formInput}
                label="Full Name"
                variant="outlined"
                value={selectedCharacter?.characterName || ""}
                onChange={(e) => {
                  handleCharacterDataUpdate(e);
                }}
              />
            </div>
            <div className={classes.formRow}>
              <TextField
                InputLabelProps={{ shrink: true }}
                inputProps={{
                  name: "height",
                }}
                className={classes.formInput}
                label="Height"
                variant="outlined"
                value={selectedCharacter?.height || ""}
                onChange={(e) => {
                  handleCharacterDataUpdate(e);
                }}
              />
              <TextField
                InputLabelProps={{ shrink: true }}
                inputProps={{
                  name: "weight",
                }}
                className={classes.formInput}
                label="Weight"
                variant="outlined"
                value={selectedCharacter?.weight || ""}
                onChange={(e) => {
                  handleCharacterDataUpdate(e);
                }}
              />
              <TextField
                InputLabelProps={{ shrink: true }}
                inputProps={{
                  name: "age",
                }}
                className={classes.formInput}
                label="Age"
                variant="outlined"
                value={selectedCharacter?.age || ""}
                onChange={(e) => {
                  handleCharacterDataUpdate(e);
                }}
              />
              <FormControl className={classes.formInput}>
                <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  inputProps={{
                    name: "gender",
                  }}
                  value={selectedCharacter?.gender || ""}
                  variant="outlined"
                  label="Gender"
                  onChange={(e) => {
                    handleCharacterDataUpdate(e);
                  }}
                >
                  <MenuItem value={"male"}>Male</MenuItem>
                  <MenuItem value={"female"}>Female</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className={classes.formRow}>
              <TextField
                InputLabelProps={{ shrink: true }}
                inputProps={{
                  name: "description",
                }}
                variant="outlined"
                multiline
                label="Description"
                className={classes.formInputSingleItem}
                maxRows={6}
                minRows={6}
                value={selectedCharacter?.description || ""}
                onChange={(e) => {
                  handleCharacterDataUpdate(e);
                }}
              />
            </div>
            <div className={classes.formRow}>
              <TextField
                InputLabelProps={{ shrink: true }}
                inputProps={{
                  name: "hairColor",
                }}
                className={classes.formInput}
                label="Hair colour"
                variant="outlined"
                value={selectedCharacter?.hairColor || ""}
                onChange={(e) => {
                  handleCharacterDataUpdate(e);
                }}
              />
              <TextField
                InputLabelProps={{ shrink: true }}
                inputProps={{
                  name: "eyesColor",
                }}
                className={classes.formInput}
                label="Eyes color"
                variant="outlined"
                value={selectedCharacter?.eyesColor || ""}
                onChange={(e) => {
                  handleCharacterDataUpdate(e);
                }}
              />
            </div>
            <div className={classes.formRow}>
              <TextField
                InputLabelProps={{ shrink: true }}
                inputProps={{
                  name: "keyFeatures",
                }}
                className={classes.formInputSingleItem}
                label="Key Features"
                variant="outlined"
                multiline
                maxRows={6}
                minRows={6}
                value={selectedCharacter?.keyFeatures || ""}
                onChange={(e) => {
                  handleCharacterDataUpdate(e);
                }}
              />
            </div>
          </CardContent>
        </Card>
      </div>
      <div className={classes.containerFooter}>
        <Card className={classes.footerCard}>
          <CardContent className={classes.footerCardContent}>
            <div className={classes.cardContentWrapper}>
              <div>Status: {selectedCharacter?.status}</div>
              <div>
                <FormControl className={classes.assignedAD}>
                  <InputLabel id="assign-to-AD">Assign to AD</InputLabel>
                  <Select
                    inputProps={{
                      name: "assignedAD",
                    }}
                    labelId="assign-to-AD"
                    value={selectedCharacter?.assignedAD || ""}
                    variant="outlined"
                    label="Assign to AD"
                    onChange={(e) => {
                      handleCharacterDataUpdate(e);
                    }}
                  >
                    <MenuItem value={"ad1"}>AD1</MenuItem>
                    <MenuItem value={"ad2"}>AD2</MenuItem>
                    <MenuItem value={"ad3"}>AD3</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <Button
                className={classes.footerButton}
                variant="contained"
                color="primary"
                onClick={saveCharacter}
              >
                Save
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AssignCharacters;
