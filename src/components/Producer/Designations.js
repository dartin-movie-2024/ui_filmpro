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
import { serverURL } from "../../constants";
import React, { useEffect, useState } from "react";
import axios from "axios";

const flexColumn = {
  display: "flex",
  flexDirection: "column",
};
const flexRow = {
  display: "flex",
  flexDirection: "row",
};
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
    flex: "1",
  },
  cardHeader: {
    height: "3px",
    background: "#d8e8ee",
  },
  row: {
    ...flexRow,
    flexGrow: "1",
    justifyContent: "space-around",
    width: "100%",
    display: "grid",
    gap: "10px",
    gridTemplateColumns: "1fr 1fr 1fr",
  },
}));

function Designations() {
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedSubDepartment, setSelectedSubDepartment] = useState("");
  const [selectedDesignation, setSelectedDesignation] = useState("");
  const [showAddNewDepartment, setShowAddNewDepartment] = useState(false);
  const [newDepartment, setNewDepartment] = useState("");
  const [showAddNewSubDepartment, setShowAddNewSubDepartment] = useState(false);
  const [showAddNewDesignation, setShowAddNewDesignation] = useState(false);
  const [newSubDepartment, setNewSubDepartment] = useState("");
  const [newDesignation, setNewDesignation] = useState("");
  const [loading, setLoading] = useState(true);

  const [departments, setDepartments] = useState([]);
  const [subDepartments, setSubDepartments] = useState([]);
  const [designations, setDesignations] = useState([]);

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

  const handleNewSubDepartmentChange = (e) => {
    const newSubDepartmentValue = e.target.value;
    setNewSubDepartment(newSubDepartmentValue);
  };

  const handleAddNewClick = () => {
    setShowAddNewDesignation(true);
  };

  const handleNewDesignationChange = (e) => {
    const newDesignationValue = e.target.value;
    setNewDesignation(newDesignationValue);
  };

  const addNewDesignation = () => {
    if (selectedSubDepartment) {
      setDesignations((prevDesignations) => [
        ...prevDesignations,
        { des: newDesignation, subdep: selectedSubDepartment },
      ]);
      setNewDesignation("");
      setShowAddNewDesignation(false);
    }
  };

  const addNewDepartment = () => {
    setDepartments((prevDepartments) => [
      ...prevDepartments,
      { dep: newDepartment },
    ]);
    setNewDepartment("");
    setShowAddNewDepartment(false);
  };

  const addNewSubDepartment = () => {
    if (selectedDepartment) {
      setSubDepartments((prevSubDepartments) => [
        ...prevSubDepartments,
        { subdep: newSubDepartment, dep: selectedDepartment },
      ]);
      setNewSubDepartment("");
      setShowAddNewSubDepartment(false);
    }
  };

  useEffect(() => {
    axios({
      method: "GET",
      url: `${serverURL}/api/get_department`,
      headers: {
        Authorization:
          "Bearer " +
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJQcm9kdWN0aW9uX2lkIjoiMyIsImxvZ2luX3R5cGUiOiJBZG1pbiJ9.ekUr9ZiKEODQFqLOSTM1XTDqkLiq3YQgcxtlDjgin3c",
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        const departmentData = response.data.result.map((department) => ({
          dep: department.Department_Name,
        }));
        setDepartments(departmentData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching departments:", error);
        setLoading(false);
      });

    axios({
      method: "GET",
      url: `${serverURL}/api/get_subdepartment`,
      headers: {
        Authorization:
          "Bearer " +
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJQcm9kdWN0aW9uX2lkIjoiMyIsImxvZ2luX3R5cGUiOiJBZG1pbiJ9.ekUr9ZiKEODQFqLOSTM1XTDqkLiq3YQgcxtlDjgin3c",
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        const subdepartmentData = response.data.result.map((subdepartment) => ({
          subdep: subdepartment.SubDepartment_Name,
          dep: subdepartment.Department_Name, 
        }));
        setSubDepartments(subdepartmentData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching sub-departments:", error);
        setLoading(false);
      });

    axios({
      method: "GET",
      url: `${serverURL}/api/get_designations`,
      headers: {
        Authorization:
          "Bearer " +
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJQcm9kdWN0aW9uX2lkIjoiMyIsImxvZ2luX3R5cGUiOiJBZG1pbiJ9.ekUr9ZiKEODQFqLOSTM1XTDqkLiq3YQgcxtlDjgin3c",
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        const designationData = response.data.result.map((designation) => ({
          des: designation.Designation_Name,
          subdep: designation.SubDepartment_Name, 
        }));
        setDesignations(designationData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching designations:", error);
        setLoading(false);
      });
  }, []);

  const classes = useStyles();
  return (
    <>
      <div className={classes.containerdes}>
        <div className={classes.containerBodydes}>
          <Card className={classes.DeignForm}>
            <CardContent>
              <div>
                <Paper style={{ textAlign: "center" }}>
                  <h2>SELECT DESIGNATIONS</h2>
                </Paper>
              </div>
              <Card>
                <CardContent>
                  <div className={classes.row}>
                    <div className={classes.grid1}>
                      <Card>
                        <CardContent style={{ display: "flex", flexDirection: "column" }}>
                          <CardHeader title="Department" className={classes.cardHeader} />
                          <Select
                            className={classes.Dropdown}
                            value={selectedDepartment}
                            variant="outlined"
                            color="primary"
                            onChange={handleDepartmentChange}
                          >
                            <em>Select a Department</em>
                            {departments.map((department, index) => (
                              <MenuItem key={index} value={department.dep}>
                                {department.dep}
                              </MenuItem>
                            ))}
                            <MenuItem
                              value="Add New"
                              onClick={handleAddNewDepartmentClick}
                              style={{ color: "blue" }}
                            >
                              Add New
                            </MenuItem>
                          </Select>
                          {showAddNewDepartment && (
                            <>
                              <TextField
                                label="New Department"
                                value={newDepartment}
                                onChange={handleNewDepartmentChange}
                                variant="outlined"
                              />
                              <Button
                                variant="contained"
                                color="primary"
                                onClick={addNewDepartment}
                              >
                                Add
                              </Button>
                            </>
                          )}
                        </CardContent>
                      </Card>
                    </div>
                    <div className={classes.grid1}>
                      <Card>
                        <CardContent style={{ display: "flex", flexDirection: "column" }}>
                          <CardHeader title="Sub-Department" className={classes.cardHeader} />
                          {selectedDepartment && (
                            <Select
                              className={classes.SubDropdown}
                              value={selectedSubDepartment}
                              variant="outlined"
                              color="primary"
                              onChange={handleSubDepartmentChange}
                            >
                              <em>Select a Sub-Department</em>
                              {subDepartments
                                // .filter((subdep) => subdep.dep === selectedDepartment)
                                .map((subDepartment, index) => (
                                  <MenuItem key={index} value={subDepartment.subdep}>
                                    {subDepartment.subdep}
                                  </MenuItem>
                                ))}
                              <MenuItem
                                value="Add New"
                                onClick={handleAddNewSubDepartmentClick}
                                style={{ color: "blue" }}
                              >
                                Add New
                              </MenuItem>
                            </Select>
                          )}
                          {showAddNewSubDepartment && (
                            <>
                              <TextField
                                label="New Sub-Department"
                                value={newSubDepartment}
                                onChange={handleNewSubDepartmentChange}
                                variant="outlined"
                              />
                              <Button
                                variant="contained"
                                color="primary"
                                onClick={addNewSubDepartment}
                              >
                                Add
                              </Button>
                            </>
                          )}
                        </CardContent>
                      </Card>
                    </div>
                    <div className={classes.grid1}>
                      <Card>
                        <CardContent style={{ display: "flex", flexDirection: "column" }}>
                          <CardHeader title="Designation" className={classes.cardHeader} />
                          {selectedSubDepartment && (
                            <Select
                              className={classes.SubDropdown1}
                              value={selectedDesignation}
                              variant="outlined"
                              color="primary"
                              onChange={handleDesignationChange}
                            >
                              <em>Select a Designation</em>
                              {designations
                                // .filter((desig) => desig.subdep === selectedSubDepartment)
                                .map((designation, index) => (
                                  <MenuItem key={index} value={designation.des}>
                                    {designation.des}
                                  </MenuItem>
                                ))}
                              <MenuItem
                                value="Add New"
                                onClick={handleAddNewClick}
                                style={{ color: "blue" }}
                              >
                                Add New
                              </MenuItem>
                            </Select>
                          )}
                          {showAddNewDesignation && (
                            <>
                              <TextField
                                label="New Designation"
                                value={newDesignation}
                                onChange={handleNewDesignationChange}
                                variant="outlined"
                              />
                              <Button
                                variant="contained"
                                color="primary"
                                onClick={addNewDesignation}
                              >
                                Add
                              </Button>
                            </>
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
  );
}

export default Designations;
