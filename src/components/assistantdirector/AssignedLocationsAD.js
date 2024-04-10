import React from "react";
import {
    Button,
    Card,
    CardContent,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextareaAutosize,
    makeStyles,
  } from "@material-ui/core";
  import TextField from "@material-ui/core/TextField";
  import { useLocation } from "react-router-dom";
  import { useState } from "react";

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
    subheading: {
        ...borderBox,
        padding: "0",
        widtn: "100%",
        textAlign: "left",
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
    assignLocations: {
      ...borderBox,
      width: "25%",
      height: "100%",
      backgroundColor: "#e0f9ff",
    },
    assignLocationsContent: {
      ...flexColumn,
      padding: "0 .5rem",
      height: "100%",
      overflow: "hidden",
    },
    assignLocationsList: {
      flex: 1,
      overflow: "auto",
    },
    card: {
      ...borderBox,
      width: "100%",
      margin: ".5rem 0",
    },
    locationForm: {
      ...flexColumn,
      ...borderBox,
      width: "70%",
      height: "100%",
      padding: "1rem",
      overflow: "auto",
      backgroundColor: "#e0f9ff",
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



const AssignedLocationsAD = (props) =>{
    const classes = useStyles();
  const {
    state: { rows: locations, id },
  } = useLocation();
  const selectedLocation = locations.find((row) => row.id === id);
  const [extralocationdeatils, setExtralocationdeatils] = useState();
  const [updated, setUpdated] = useState('');
  const handleextralocationChange = (e) =>{
    setExtralocationdeatils(e.target.value)
    console.log(extralocationdeatils);
  }
  const handleClick = () => {  
    console.log("clicked"); 
    setUpdated(extralocationdeatils.current.value);
  };
    return(
        <div className={classes.container}>
        <div className={classes.containerBody}>
          <Card className={classes.assignLocations}>
            <CardContent className={classes.assignLocationsContent}>
              <h3 className={classes.heading}>Assigned Locations</h3>
              <div className={classes.assignLocationsList}>
                {locations.map((location, index) => {
                  return (
                    <Card className={classes.card} key={index}>
                      <CardContent className={classes.cardContent}>
                        <h3>{location.locationName}</h3>
                        <h4>{location.noOfScenes}</h4>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>
          <Card className={classes.locationForm}>
            <CardContent className={classes.cardContent}> 
            <h3 className={classes.subheading}>Location Description</h3>
            <div className={classes.formRow}>
            
                <TextareaAutosize
                  className={classes.textArea}
                  maxRows={8}
                  minRows={8}
                  aria-label="Location Description"
                  placeholder="Location Description"
                  defaultValue={selectedLocation?.description || ""}
                />
              </div> 
              <h3 className={classes.subheading}>Special Requirement</h3> 
              <div>
                 <TextField                 
                  className={classes.formInput}
                  InputLabelProps={{ shrink: true }}
                  placeholder="Type Here..."
                  type="text"
                  variant="outlined"                 
                  onChange={handleextralocationChange}
                  value={extralocationdeatils}
                />                  
               <Button onClick={handleClick}              
                  variant="contained"
                  color="primary"
                >
                  Add
                </Button>
              </div><br/>
              <div className={classes.formRow}>
                <TextareaAutosize
                  className={classes.textArea}
                  maxRows={8}
                  minRows={8} 
                  value={updated}
                />
              </div>
              <h3 className={classes.subheading}>Instructions to AD</h3>
            <div className={classes.formRow}>
            
                <TextareaAutosize
                  className={classes.textArea}
                  maxRows={8}
                  minRows={8}
                  defaultValue={selectedLocation?.description || ""}
                />
              </div> 
            </CardContent>
          </Card>
        </div>
        <div className={classes.containerFooter}>
          <Card className={classes.footerCard}>
            <CardContent className={classes.footerCardContent}>
              <div className={classes.cardContentWrapper}>
                <div>Status: {selectedLocation?.status}</div>
                <div>
                  <FormControl className={classes.assignedAD}>
                    <InputLabel id="assign-to-AD">Assign to AD</InputLabel>
                    <Select
                      labelId="assign-to-AD"
                      value={selectedLocation?.assignedAD || ""}
                      variant="outlined"
                      label="Assign to AD"
                      onChange={(e) => {}}
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
                >
                  Save
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
    
}
export default AssignedLocationsAD;