
import { useState } from "react";
//import { DatePicker, KeyboardDatePicker, KeyboardTimePicker } from "@material-ui/pickers";
import { serverURL } from "../../constants";
import React, { useEffect } from "react";
import axios from "axios";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  MenuItem,
  InputLabel,
  Paper,
  Select,
  TextField,
  makeStyles,
} from "@material-ui/core";
const flexColumn = {
  display: "flex",
  flexDirection: "column",
};
const flexRow = {
  display: "flex",
  flexDirection: "row",
}
const borderBox = {
  boxSizing: "border-box",
};

const useStyles = makeStyles((theme) => ({
  // Your styling here
  root: {
    ...borderBox,
  },
  heading: {
    ...borderBox,
    padding: "0",
    widtn: "100%",
    textAlign: "center",
  },
  containercrew: {
    ...borderBox,
    width: "100%",
    height: "100%",
    padding: ".5rem",
    overflow: "hidden",
    justifyContent: "space-around",
  },
  containercrewBody: {
    ...borderBox,
    display: "flex",
    height: "100%",
    width: "100%",
    padding: ".5rem",
    overflow: "hidden",
    justifyContent: "space-around",
  },
  assigncrew: {
    ...borderBox,
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    flex: "1",
    gap: "1%",
  },
  assigncrewContent: {
    ...flexColumn,
    padding: "0 .5rem",
    height: "100%",
    overflow: "hidden",
    flex: "1",
    gap: "1%",
  },
  card: {
    ...borderBox,
    width: "100%",
    margin: ".5rem 0",
    flex: "1",
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
  CrewForm: {
    ...flexColumn,
    ...borderBox,
    width: "100%",
    height: "100%",
    padding: "1rem",
    overflow: "auto",
    backgroundColor: "#d8e8ee",
  },
  cardHeader: {
    height: "3px",
    background: "#d8e8ee",
  },
  textArea: {
    flex: 1,
    margin: "0 1rem",
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
  Row: {
    ...flexRow,
    flex: "1",
    width: "100%",
    justifyContent: "space-around",
    width: "100%",
    display: "grid",
    width: "100%",
    gap: "10px",
    gridTemplateColumns: "1fr 1fr 1fr",
  },
  Row1: {
    ...flexRow,
    flex: "1",
    width: "100%",
    justifyContent: "space-around",
    width: "100%",
    display: "grid",
    width: "100%",
    gap: "10px",
    gridTemplateColumns: "1fr 1fr",
  },
  cardHeadercrew: {
    height: "3px",
    background: "#d8e8ee",
  },
  footer: {
    ...flexRow,
    justifyContent: "space-between",
  },
  gap1: {
    ...flexColumn,
    gap: "10px",
  }
}));


function AddCrew() {
  const classes = useStyles();
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedSubDepartment, setSelectedSubDepartment] = useState("");
  const [selectedDesignation, setSelectedDesignation] = useState("");
  const [selectedDOJ, handleDOJChange] = useState(new Date());
  const [selectedDOB, handleDOBChange] = useState(new Date());
  const [selectedPaymentType, handlePaymentTypeChange] = useState("");
  const [selectedGender, handleGenderChange] = useState("");
  const EmpDetails = ["CrewID", "Gender", "DOB", "Band", "Address", "Whatsapp", "CrewName", "Reporting Crew", "DOJ", "Grade", "Contact", "E-Mail"];
  const AccDetails = ["Name", "BankName", "Account Number", "IFSC Code", "PAN Number", "Payment Type"]
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

  const [loading, setLoading] = useState(true);
  const [departments, setDepartments] = useState([]);
  const [subDepartments, setSubDepartments] = useState([]);
  const [designations, setDesignations] = useState([]);


  useEffect(() => {
    axios({
      method: "GET",
      url: `${serverURL}/api/get_department`,
      headers: {
        "Authorization": `Bearer ${process.env.REACT_APP_AUTH_TOKEN}`,
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
        "Authorization": `Bearer ${process.env.REACT_APP_AUTH_TOKEN}`,
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
        "Authorization": `Bearer ${process.env.REACT_APP_AUTH_TOKEN}`,
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


  const saveemployee = (e) => {

  }

  return (
    <div className={classes.containercrew}>
      <div className={classes.containercrewBody}>
        <Card className={classes.CrewForm}>
          <CardContent>
            <div className={classes.gap1}>

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

                          </Select>

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

                            </Select>
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

                            </Select>
                          )}

                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </CardContent>
              </Card>


              <div>
                <Card>
                  <CardContent>
                    <div className={classes.Row1} style={{ marginBottom: '1rem' }}>
                      <Card style={{ flex: "1", maxHeight: "300px", overflowY: "auto", }}>
                        <CardContent>
                          <CardHeader title="Employee Master" className={classes.cardHeadercrew} />
                          <Grid xl={2}>
                            <table>
                              <tbody>
                                {EmpDetails.map((emp, index) => (
                                  <tr>
                                    <td><Card style={{ flex: "1" }}><CardContent>{emp}</CardContent></Card></td>
                                    <td>
                                      {emp === "DOB" || emp === "DOJ" ? (
                                        <TextField
                                          variant="outlined"
                                          fullWidth
                                          type="date"
                                          value={selectedDOB}
                                          onChange={handleDOBChange}
                                          InputLabelProps={{
                                            shrink: true,
                                          }}
                                        />
                                      ) : emp === "Gender" ? (
                                        <Select
                                          variant="outlined"
                                          fullWidth
                                          value={selectedGender}
                                          onChange={handleGenderChange}
                                        >
                                          <MenuItem value="male">Male</MenuItem>
                                          <MenuItem value="female">Female</MenuItem>
                                          <MenuItem value="other">Other</MenuItem>
                                        </Select>
                                      ) : (
                                        <TextField variant="outlined" fullWidth />
                                      )}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </Grid>
                          <Button variant="outlined" color="primary" onClick={saveemployee}>ADD</Button>
                          <Button variant="outlined" color="primary">CANCEL</Button>
                        </CardContent>
                      </Card>
                      <Card style={{ flex: "1", maxHeight: "300px", overflowY: "auto" }}>
                        <CardContent>
                          <CardHeader title="Account Details" className={classes.cardHeadercrew} />
                          <Grid xl={2}>
                            <table>
                              <tbody>
                                {AccDetails.map((acc, index) => (
                                  <tr>
                                    <td><Card style={{ flex: "1" }}><CardContent>{acc}</CardContent></Card></td>
                                    <td>
                                      {acc === "Payment Type" ? (
                                        <Select
                                          variant="outlined"
                                          fullWidth
                                          value={selectedPaymentType}
                                          onChange={handlePaymentTypeChange}
                                        >
                                          <MenuItem value="cash">Cash</MenuItem>
                                          <MenuItem value="bank">Bank Transfer</MenuItem>
                                        </Select>)
                                        :
                                        (<TextField variant="outlined" fullWidth />
                                        )}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </Grid>
                          <Button variant="outlined" color="primary" onClick={saveemployee}>ADD</Button>
                          <Button variant="outlined" color="primary">CANCEL</Button>
                        </CardContent>
                      </Card>

                    </div>
                  </CardContent>
                </Card>
              </div>
              {/* <div className={classes.Row} style={{ marginBottom: '1rem' }}> */}
              <div >
                <Card style={{ flex: "1" }}>
                  <CardContent className={classes.footer}>
                    <div className={classes.Row1} style={{ marginBottom: '1rem' }}>
                      <div>
                        <Button variant="contained" color="primary">SEARCH DATABASE</Button>
                      </div>
                      <div>
                        <Button variant="contained" color="primary" style={{ float: "right" }}>BULK UPLOAD</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              {/* </div> */}
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}

export default AddCrew;
