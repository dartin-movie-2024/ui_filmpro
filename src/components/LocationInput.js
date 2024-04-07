import React, { useContext, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ResponseContext from "./ResponseContext";
import { TimeSlots } from "./CharacterInput";
import { serverURL } from "../constants";
import { useNavigate } from "react-router-dom";

const timeSlots = [
  {
    name: "Time Slot 1:",
    key: "timeSlotOne",
  },
  {
    name: "Time Slot 2:",
    key: "timeSlotTwo",
  },
];

const LocationItem = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  margin: '1rem',
  boxShadow: '3px 3px 25px -10px rgba(0,0,0,0.75)'
}));

const Item = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1),
}));

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    height: "100%",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    height: '100%',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column'
  },
  containerForm: {
    flexGrow: 1,
    overflow: 'hidden',
    display: 'flex',
    height: '100%',
    flexDirection: 'column'
  },
  containerFormBox: {
    flexGrow: 1,
    height: '100%',
    overflow: 'auto',
    padding: `${theme.spacing(3)} ${theme.spacing(1)}`,
  },
  heading: {
    fontWeight: theme.typography.fontWeightBold,
  },
  accordianDetails: {
    display: "block",
    width: "100%",
  },
  accordionContainer: {
    display: "block",
    alignItems: "center",
  },
  details: {
    padding: "0px",
    display: "block",
    alignItems: "center",
  },
  datePicker: {
    overflow: "unset",
  },
}));

const LocationInputComponent = ({ onSubmit }) => {
  const styles = useStyles();
  const formData = useRef([]);
  const responseContexts = useContext(ResponseContext);
  const navigate = useNavigate();

  const handleDateChange = (index, index1, item, key, event) => {
    const updatedData = formData.current;
    const formIndex = formData.current.findIndex(
      (record) => record.id === index
    );
    if (formIndex !== -1)
      updatedData[formIndex] = {
        ...updatedData[formIndex],
        [key]: {
          ...formData.current[formIndex][key],
          [item]: event?.toLocaleString(),
        },
      };
    else
      updatedData.push({
        id: index,
        [key]: { [item]: event.toLocaleString() },
      });
    formData.current = updatedData;
  };

  const handleDataChange = (index, item, event, date) => {
    let name, value;
    if (!!date) {
      name = date;
      value = event?.toLocaleString();
    } else {
      name = event.target.name;
      value = event.target.value;
    }
    let updatedData = formData.current;
    if (formData.current.some((show) => show.id === index)) {
      updatedData = updatedData.map((record) =>
        record.id === index ? { ...record, [name]: value } : record
      );
    } else {
      updatedData.push({ id: index, [name]: value });
    }
    formData.current = updatedData;
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = formData.current;
    console.log(data);
    axios
      .post(`${serverURL}/duration`, formData.current, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response);
        console.log("success");
        //const locationData = response.data;
        //setResponseData({ locationData });
        // onSubmit("shootDuration");
        navigate("/director/shootDuration");
      })
      .catch((error) => {
        // handle errors
        console.log(error);
      });
  };

  return (
    <Container maxWidth="xl" className={styles.container}>
      <Typography component="h1" variant="h6" color="inherit" noWrap>
        Location Inputs
      </Typography>
      <form onSubmit={handleSubmit}  className={styles.containerForm}>
        <Box spacing={2} className={styles.containerFormBox}>
          {responseContexts?.responseData?.locationData?.locations.map(
            (location, index) => {
              const scenes =
                responseContexts?.responseData?.locationData?.loc_dict[
                  location
                ];
              const item = {
                name: location,
                scenes: scenes,
                noOfScenes: scenes?.length.toString(),
              };
              return (
                <LocationItem>
                  <Typography variant="body1" className={styles.heading}>
                    Location Details
                  </Typography>
                  <Stack>
                    <Item>
                      <Grid container direction="row">
                        <Grid item sm={2}>
                          <Typography variant="body2">Location:</Typography>
                        </Grid>
                        <Grid item sm={4}>
                          <Typography variant="body1">
                            <b>{item.name}</b>
                          </Typography>
                        </Grid>
                      </Grid>
                    </Item>
                    <Item>
                      <Grid container direction="row">
                        <Grid item sm={2}>
                          <Typography variant="body2">
                            Location Name:
                          </Typography>
                        </Grid>
                        <Grid item sm={4}>
                          <TextField
                            inputProps={{
                              name: "locationName",
                              id: item.name + "locationName",
                            }}
                            label="Name"
                            variant="outlined"
                            fullWidth
                            onChange={(e) =>
                              handleDataChange(index, item, e)
                            }
                          />
                        </Grid>
                      </Grid>
                    </Item>
                    <Item>
                      <Grid container direction="row">
                        <Grid item sm={2}>
                          <Typography variant="body2">
                            Number of scenes:
                          </Typography>
                        </Grid>
                        <Grid item sm={4}>
                          <Typography variant="body1">
                            <b>{item.noOfScenes}</b>
                          </Typography>
                        </Grid>
                      </Grid>
                    </Item>
                    <Item>
                      <Grid container direction="row">
                        <Grid item sm={2}>
                          <Typography variant="body2">
                            Scene list:
                          </Typography>
                        </Grid>
                        <Grid item sm={2}>
                          <FormControl variant="outlined">
                            <Select
                              native
                              inputProps={{
                                name: "sceneNo",
                                id: item.name + "sceneNo",
                              }}
                              onChange={(e) =>
                                handleDataChange(index, item, e)
                              }
                            >
                              <option aria-label="None" value="" />
                              {item.scenes.map((value) => (
                                <option key={value} value={value}>
                                  {value}
                                </option>
                              ))}
                            </Select>
                          </FormControl>
                        </Grid>
                      </Grid>
                    </Item>
                    <Item>
                      <Typography variant="body2">
                        Available Dates:
                      </Typography>
                      <Box sx={{ mt: 1 }} fullWidth>
                        <Accordion>
                          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <div>
                              <Typography variant="body2">
                                Time Slots
                              </Typography>
                            </div>
                          </AccordionSummary>
                          <AccordionDetails className={styles.details}>
                            <TimeSlots
                              index={index}
                              timeSlots={timeSlots}
                              handleDateChange={handleDateChange}
                            />
                          </AccordionDetails>
                        </Accordion>
                      </Box>
                    </Item>
                    <Item>
                      <Grid container direction="row">
                        <Grid item sm={2}>
                          <Typography variant="body2">
                            Criticality:
                          </Typography>
                        </Grid>
                        <Grid item sm={0} />
                        <Grid item sm={2}>
                          <FormControl variant="outlined">
                            <Select
                              native
                              label={`${item.name}-Criticality`}
                              inputProps={{
                                name: "criticality",
                                id:
                                  item.name + "outlined-age-native-simple",
                              }}
                              onChange={(e) =>
                                handleDataChange(index, item, e)
                              }
                            >
                              <option aria-label="None" value="" />
                              <option value={1}>1</option>
                              <option value={2}>2</option>
                              <option value={3}>3</option>
                              <option value={4}>4</option>
                              <option value={5}>5</option>
                              <option value={6}>6</option>
                            </Select>
                          </FormControl>
                        </Grid>
                      </Grid>
                    </Item>
                  </Stack>
                </LocationItem>
              );
            }
          )}
        </Box>
        <Item>
          <Button variant="contained" type="submit" color="primary">
            Submit
          </Button>
        </Item>
      </form>
    </Container>
  );
};

export default LocationInputComponent;
