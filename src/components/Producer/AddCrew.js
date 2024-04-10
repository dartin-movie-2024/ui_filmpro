
import { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  MenuItem,
  InputLabel,
  Select,
  TextField,
  makeStyles,
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
    flex:"1",
    gap:"1%",
  },
  assigncrewContent: {
    ...flexColumn,
    padding: "0 .5rem",
    height: "100%",
    overflow: "hidden",
    flex:"1",
    gap:"1%",
  },
  card: {
    ...borderBox,
    width: "100%",
    margin: ".5rem 0",
    flex:"1",
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
  textArea: {
    flex: 1,
    margin: "0 1rem",
  },
  Row:{
    ...flexRow, 
    flex:"1",
    width:"100%",
    justifyContent:"space-around",
  },
  cardHeadercrew: {
    height:"3px",
    background: "#d8e8ee",
  },
  footer:{
    ...flexRow,
    justifyContent:"space-between",
  }
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

function AddCrew() {
  const classes = useStyles();
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedSubDepartment, setSelectedSubDepartment] = useState("");
  const [selectedDesignation, setSelectedDesignation] = useState("");
  const EmpDetails=["CrewID","Gender","DOB","Band","Address","Whatsapp","CrewName","Reporting Crew","DOJ","Grade","Contact","E-Mail"];
  const AccDetails=["Name","BankName","Account Number","IFSC Code","PAN Number","Payment Type"]
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
  const saveemployee=(e)=>{
    
  }

  return (
    <div className={classes.containercrew}>
      <div className={classes.containercrewBody}>
        <Card className={classes.CrewForm}>
          <CardContent>
            <Card>
              <CardContent>
                <div className={classes.Row} style={{ marginBottom: '1rem' }}>
                  <div>
                    <Card style={{flex:"1"}}>
                      <CardContent>
                        <CardHeader title="Departments" className={classes.cardHeadercrew} />
                        <Card className={`${classes.assigncrew} ${classes.card}`} style={{ flex:"1"}}>
                          <CardContent className={classes.assigncrewContent}>
                            <Select className={classes.Dropdown} value={selectedDepartment} onChange={handleDepartmentChange}>
                              <em>Select a Department</em>
                              {Object.keys(departments).map((department, index) => (
                                <MenuItem key={index} value={department}>{department}</MenuItem>
                              ))}
                            </Select>
                          </CardContent>
                        </Card>
                      </CardContent>
                    </Card>
                  </div>
                  <div>
                    {selectedDepartment && (
                      <Card style={{flex:"1"}}>
                        <CardContent>
                          <CardHeader title="Sub-Departments" className={classes.cardHeadercrew} />
                          <Card className={`${classes.assigncrew} ${classes.card}`} style={{ flex:"1"}}>
                            <CardContent className={classes.assigncrewContent}>
                              <Select className={classes.SubDropdown} value={selectedSubDepartment} onChange={handleSubDepartmentChange}>
                                <em>Select a Sub-Department</em>
                                {departments[selectedDepartment]["Sub-Departments"].map((subDepartment, index) => (
                                  <MenuItem key={index} value={subDepartment}>{subDepartment}</MenuItem>
                                ))}
                              </Select>
                            </CardContent>
                          </Card>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                  <div>
                    {selectedSubDepartment && (
                      <Card style={{flex:"1"}}>
                        <CardContent>
                          <CardHeader title="Designations" className={classes.cardHeadercrew} />
                          <Card className={`${classes.assigncrew} ${classes.card}`} style={{ flex:"1"}}>
                            <CardContent className={classes.assigncrewContent}>
                              <Select className={classes.SubDropdown1} value={selectedDesignation} onChange={handleDesignationChange}>
                                <em>Select a Designation</em>
                                {departments[selectedDepartment]["Designations"][selectedSubDepartment].map((designation, index) => (
                                  <MenuItem key={index} value={designation}>{designation}</MenuItem>
                                ))}
                              </Select>
                            </CardContent>
                          </Card>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            <div>
              <Card>
                <CardContent>
              <div className={classes.Row} style={{ marginBottom: '1rem' }}>
            <Card style={{flex:"1",maxHeight:"300px",overflowY:"auto",}}>
              <CardContent>
                <CardHeader title="Employee Master" className={classes.cardHeadercrew}/> 
                <Grid xl={2}>
                <table>
                  <tbody>
                      {EmpDetails.map((emp,index)=>(
                        <tr>
                          <td><Card style={{flex:"1"}}><CardContent>{emp}</CardContent></Card></td>
                          <td><TextField variant="outlined" fullWidth></TextField></td>
                        </tr>
                      ))}
                  </tbody>
                </table> 
                </Grid>
                <Button variant="outlined" color="primary" onClick={saveemployee}>ADD</Button>
                <Button variant="outlined" color="primary">CANCEL</Button>            
              </CardContent>
            </Card>
            <Card style={{flex:"1",maxHeight:"300px",overflowY:"auto"}}>
              <CardContent>
              <CardHeader title="Account Details" className={classes.cardHeadercrew}/>
              <Grid xl={2}>
                <table>
                  <tbody>
                      {AccDetails.map((acc,index)=>(
                        <tr>
                          <td><Card style={{flex:"1"}}><CardContent>{acc}</CardContent></Card></td>
                          <td><TextField variant="outlined" fullWidth></TextField></td>
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
              <div className={classes.Row} style={{ marginBottom: '1rem' }}>
            <Card style={{flex:"1"}}>
              <CardContent className={classes.footer}>
              <Button variant="contained" color="primary">SEARCH DATABASE</Button>
                <Button variant="contained" color="primary">BULK UPLOAD</Button>
                </CardContent>
                </Card>
            </div>
          </CardContent>
        </Card>
      
      </div>
    </div>   
  );
}

export default AddCrew;
