import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Typography,
  Modal,
  IconButton,
} from "@material-ui/core";
import { useLocation } from "react-router-dom";
import CloseIcon from "@material-ui/icons/Close";

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
    width: "40ch",
  },
  button: {
    margin: theme.spacing(10),
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
    width: "30%",
    height: "60%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    top: theme.spacing(1),
    right: theme.spacing(1),
  },
}));

function CastingCall() {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [dateOfAudition, setDateOfAudition] = useState("");
  const [venue, setVenue] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [email, setEmail] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [open, setOpen] = useState(false);

  const {
    state: { characters, id },
  } = useLocation();

  const defaultCharacter = characters.find((character) => character.id === id);
  const defaultName = defaultCharacter ? defaultCharacter.title : "";

  useEffect(() => {
    setName(defaultName);
  }, [defaultName]);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDateOfAuditionChange = (event) => {
    setDateOfAudition(event.target.value);
  };

  const handleVenueChange = (event) => {
    setVenue(event.target.value);
  };

  const handleContactPersonChange = (event) => {
    setContactPerson(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleWhatsappNumberChange = (event) => {
    setWhatsappNumber(event.target.value);
  };

  const handleGenerate = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Typography variant="h4" align="center" style={{ margin: "2rem 0" }}>
        Casting Call
      </Typography>
      <form className={classes.root} noValidate autoComplete="off">
        <FormControl className={classes.textField}>
          <InputLabel id="select-character-label">Select Character</InputLabel>
          <Select
            labelId="select-character-label"
            id="select-character"
            value={name}
            onChange={handleNameChange}
          >
            {characters.map((character) => (
              <MenuItem key={character.id} value={character.title}>
                {character.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          className={classes.textField}
          id="date-of-audition"
          label="Date of Audition"
          type="date"
          value={dateOfAudition}
          onChange={handleDateOfAuditionChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          className={classes.textField}
          id="venue"
          label="Venue"
          value={venue}
          onChange={handleVenueChange}
        />
        <TextField
          className={classes.textField}
          id="contact-person"
          label="Contact Person"
          value={contactPerson}
          onChange={handleContactPersonChange}
        />
        <TextField
          className={classes.textField}
          id="email"
          label="Email"
          value={email}
          onChange={handleEmailChange}
        />
        <TextField
          className={classes.textField}
          id="whatsapp-number"
          label="Whatsapp Number"
          value={whatsappNumber}
          onChange={handleWhatsappNumberChange}
        />
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          onClick={handleGenerate}
        >
          Generate
        </Button>
        <Modal className={classes.modal} open={open} onClose={handleClose}>
          <div className={classes.paper}>
            <IconButton className={classes.closeButton} onClick={handleClose}>
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" gutterBottom>
              Casting Call for {name}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Date of Audition: {dateOfAudition}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Venue: {venue}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Contact Person: {contactPerson}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Email: {email}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Whatsapp Number: {whatsappNumber}
            </Typography>
          </div>
        </Modal>
      </form>
    </div>
  );
}

export default CastingCall;
