
import React, {useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  MenuItem,
  TextField,
  Select,
  makeStyles,
  Paper,
} from "@material-ui/core";
const flexColumn = {
  display: "flex",
  flexDirection: "column",
};
const flexRow={
  display: "flex",
  flexDirection: "row", 
}
const borderBox = {
  boxSizing: "border-box",
};

const useStyles = makeStyles((theme) => ({
  root: {
    ...borderBox,
  },
  containerdes: {
    ...borderBox,
    width: "100%",
    height: "100%",
    padding: ".5rem",
    overflow: "hidden",
    justifyContent: "space-around",
  },
  containerBodydes: {
    ...borderBox,
    display: "flex",
    height: "100%",
    width: "100%",
    padding: ".5rem",
    overflow: "hidden",
    justifyContent: "space-around",
  },
  card: {
    ...borderBox,
    width: "100%",
    margin: ".5rem 0",
  },
  DeignForm: {
    ...flexColumn,
    ...borderBox,
    width: "90%",
    height: "100%",
    padding: "1rem",
    overflow: "auto",
    backgroundColor: "#d8e8ee",
    flex:"1",
  },
  cardHeader: {
    height:"3px",
    background: "#d8e8ee",
  },
  row:{
    ...flexRow,
    flexGrow:"1",
    justifyContent:"space-around",
    width:"100%",
  },
}));
const departments = {
  "Direction": {
    "Sub-Departments": ["Direction Team", "Location"],
    "Designations": {
      "Direction Team": ["First AD", "Second AD"],
      "Location":["dsd","ddcc"]
    },
  },

  "Camera & Lighting": {
    "Sub-Departments": ["Photography", "Lighting"],
    "Designations": {
      "Photography": ["DOP", "camera operator", "camera assistant", "sec cam assistant", "steadicam operator", "Focus Puller"],
      "Lighting":["rwrr","fqws"]
    },
  },
};

function Designations()
{

    const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedSubDepartment, setSelectedSubDepartment] = useState("");
  const [selectedDesignation, setSelectedDesignation] = useState("");
  const [showAddNewDepartment, setShowAddNewDepartment] = useState(false); 
  const [newDepartment, setNewDepartment] = useState("");
  const [showAddNewSubDepartment, setShowAddNewSubDepartment] = useState(false);
  const [showAddNewDesignation, setShowAddNewDesignation] = useState(false);
  const [newSubDepartment, setNewSubDepartment] = useState(""); 
  const [showAddNew, setShowAddNew] = useState(false); 
  const [newDesignation, setNewDesignation] = useState(""); 
  const handleDepartmentChange = (e) => {
    const department = e.target.value;
    setSelectedDepartment(department);
    setSelectedSubDepartment(""); 
    setSelectedDesignation("");
  };

  const handleSubDepartmentChange = (e) => {
    const subDepartment = e.target.value;
    setSelectedSubDepartment(subDepartment);
    setSelectedDesignation(""); 
  };

  const handleDesignationChange = (e) => {
    const designation = e.target.value;
    setSelectedDesignation(designation);
  };
  const handleAddNewDepartmentClick = () => {
    setShowAddNewDepartment(true); 
  };

  const handleAddNewSubDepartmentClick = () => {
    setShowAddNewSubDepartment(true);
  };

  const handleNewDepartmentChange = (e) => {
    const newDepartmentValue = e.target.value;
    setNewDepartment(newDepartmentValue);
  };
  const handleAddNewClick = () => {
    setShowAddNew(true); 
  };

  const handleNewDesignationChange = (e) => {
    const newDesignationValue = e.target.value;
    setNewDesignation(newDesignationValue);
  };

  const addNewDesignation = () => {
    departments[selectedDepartment]["Designations"][selectedSubDepartment].push(
      newDesignation
    );
    setNewDesignation("");
    setShowAddNew(false);
  };
  const handleNewSubDepartmentChange = (e) => {
    const newSubDepartmentValue = e.target.value;
    setNewSubDepartment(newSubDepartmentValue);
  };
  const addNewDepartment = () => {
    departments[newDepartment] = {
      "Sub-Departments": [],
      "Designations": {},
    };
    setNewDepartment("");
    setShowAddNewDepartment(false);
  };

  const addNewSubDepartment = () => {

    if (selectedDepartment && departments[selectedDepartment]) {
      departments[selectedDepartment]["Sub-Departments"].push(newSubDepartment);
    }
    setNewSubDepartment("");
    setShowAddNewSubDepartment(false);
  };

    const classes = useStyles();
    return(
        <>
        <div className={classes.containerdes}>
        <div className={classes.containerBodydes}>
        <Card className={classes.DeignForm}>
        <CardContent>
        <div>
        <Paper style={{textAlign:"center"}}><h2>SELECT DESIGNATIONS</h2></Paper>
        </div>
        <Card>
          <CardContent>
        <div className={classes.row}>
        <div>
      <Card>
          <CardContent style={{display:"flex",flexDirection:"column"}}>
        <CardHeader title="Department" className={classes.cardHeader}/>
    <Select className={classes.Dropdown} value={selectedDepartment} variant="outlined" color="primary" onChange={handleDepartmentChange} >
        <em>Select a Department</em>
      {Object.keys(departments).map((department, index) => (
        <MenuItem key={index} value={department}>{department}</MenuItem>
         ))}
         <MenuItem value="Add New" onClick={handleAddNewDepartmentClick}>
                              Add New
                            </MenuItem>

  </Select>
  {showAddNewDepartment && (
<TextField label="New Department"value={newDepartment}onChange={handleNewDepartmentChange}variant="outlined"/>
 )}{showAddNewDepartment && (
   <Button variant="contained"color="primary" onClick={addNewDepartment}>
    Add</Button>
    )}
 </CardContent>
        </Card>
        </div>
        <div>
        <Card>
      <CardContent style={{display:"flex",flexDirection:"column"}}>
    <CardHeader title="Sub-Department" className={classes.cardHeader}/>
    {selectedDepartment && departments[selectedDepartment] &&(
      <Select className={classes.SubDropdown} value={selectedSubDepartment} variant="outlined" color="primary" onChange={handleSubDepartmentChange}>
      <em>Select a Sub-Department</em>
    {departments[selectedDepartment]["Sub-Departments"].map((subDepartment, index) => (
     <MenuItem key={index} value={subDepartment}>{subDepartment}</MenuItem>
       ))}
       <MenuItem value="Add New" onClick={() => handleAddNewClick("subDepartment")}>Add New</MenuItem>
       <MenuItem value="Add New" onClick={handleAddNewSubDepartmentClick}>
                                  Add New
                                </MenuItem>
       </Select>
       
       )}
           {showAddNewSubDepartment && (
                            <TextField
                              label="New Sub-Department"
                              value={newSubDepartment}
                              onChange={handleNewSubDepartmentChange}
                              variant="outlined"
                            />
                          )}
                          {showAddNewSubDepartment && (
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={addNewSubDepartment}
                            >
                              Add
                            </Button>
                          )}
        </CardContent>
        </Card>
        </div>
        <div>
 <Card>
<CardContent style={{display:"flex",flexDirection:"column"}}>
  <CardHeader title="Designation" className={classes.cardHeader}/>
  {selectedSubDepartment &&
  departments[selectedDepartment]?.["Designations"] &&
 departments[selectedDepartment]["Designations"][selectedSubDepartment] && (
<Select className={classes.SubDropdown1} value={selectedDesignation}variant="outlined" color="primary" onChange={handleDesignationChange} >
  <em>Select a Designation</em>
{departments[selectedDepartment]["Designations"][selectedSubDepartment].map((designation, index) => (
 <MenuItem key={index} value={designation} >{designation}</MenuItem>

        ))}
        <MenuItem value="Add New" onClick={handleAddNewClick}>Add New</MenuItem>
  </Select>
  )}
     {showAddNewDesignation && (
                            <TextField
                              label="New Designation"
                              value={newDesignation}
                              onChange={handleNewDesignationChange}
                              variant="outlined"
                            />
                          )}
                          {showAddNewDesignation && (
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={addNewDesignation}
                            >
                              Add
                            </Button>
                          )}
 </CardContent>
 </Card>
 </div>
            </div>
            </CardContent>
            </Card>
        </CardContent>
        </Card>
        </div>
        </div>
        </>
    )
}
export default Designations;