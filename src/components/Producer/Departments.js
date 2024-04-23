import React, {useEffect, useState } from "react";
import { serverURL } from "../../constants";
import axios from "axios";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  MenuItem,
  Select,
  makeStyles,
} from "@material-ui/core";
import {Box,Typography,Radio,FormControlLabel,RadioGroup} from "@mui/material"
import TextField from "@material-ui/core/TextField";

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
  heading: {
    ...borderBox,
    padding: "0",
    widtn: "100%",
    textAlign: "center",
  },
  container: {
    ...borderBox,
    width: "100%",
    height: "100%",
    padding: ".5rem",
    overflow: "hidden",
    justifyContent: "space-around",
  },
  containerBody: {
    ...borderBox,
    display: "flex",
    height: "100%",
    width: "100%",
    padding: ".5rem",
    overflow: "hidden",
    justifyContent: "space-around",
  },
  assigndeps: {
    ...borderBox,
    width: "100%",
    height: "100%",
    backgroundColor: "white",
  },
  assigndepsContent: {
    ...flexColumn,
    padding: "0 .5rem",
    height: "100%",
    overflow: "hidden",
  },
  card: {
    ...borderBox,
    flex: "1", 
    width: "100%",
    margin: ".5rem 0",
  },
  DepForm: {
    ...flexColumn,
    ...borderBox,
    width: "80%",
    height: "100%",
    padding: "1rem",
    overflow: "auto",
    backgroundColor: "#d8e8ee",
    flex:"1",
  },
  dep3:{
    ...flexColumn,
  },
  dep1:{
    ...flexRow,
    justifyContent: "space-between",
    width: "100%",
    flexWrap: "wrap", 
  },
  Row:{
    ...flexRow, 
    justifyContent: "space-between", 
    width:"100%",
    flex:"1",
  },
  Depcard:{
    maxHeight:"150px",
    overflowY:"auto",
    Width:"100%",
    flex:1,
    overflowX:"auto",
  },
  cardHeader: {
    height:"3px",
    background: "#d8e8ee",
  },
  DirectorCard:{
  height:"200px",
   textAlign:"center",
  },
  grid1:{
    display:"grid",
    width:"100%",
    gap:"10px",
    gridTemplateColumns: "1fr 2fr",
  },
  grid2:{
    display:"grid",
    width:"100%",
    gap:"10px",
    gridTemplateColumns: "2fr 1fr",
  },
  gap1:{
    ...flexColumn,
    gap:"10px",
  }
}));
function Department(){
        const dir={
            name:"Abcd efg"
        }
        const dep_data=[
          "loren Ipsum","gsdgsdgsdgb","tutukmbncx","qebngjkgm"
      ];
      const [dep4_data,setdep4_data]=useState([{s_no:1.,dep:"loren Ipsum",},
      {s_no:2.,dep:"loren Ipsum",},
      {s_no:3.,dep:"loren Ipsum",}
    ]);
    const [depart, setdepart] = useState("");
    const [isNewRowAdded, setIsNewRowAdded] = useState(false);
    const [membersdep,setmembersdep]=useState(null);
    const [memberssubdep,setmemberssubdep]=useState(null)
    const HandleDep1Change=()=>{
    const data={
        s_no:dep4_data.length + 1,
        dep:depart
    }
    setdep4_data([...dep4_data,data])
    setdepart("")
    setIsNewRowAdded(true);
    const formData1={
      'Production_id':"3",
    'Department_Name':depart,
    'Total_Members':membersdep,
    'Department_Type':selectradio,
    }
    
    axios({
        method: "POST",
        url: `${serverURL}/api/create_department`,
        data:formData1,
        headers:
        {
          "Authorization":"Bearer "+"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJQcm9kdWN0aW9uX2lkIjoiMyIsImxvZ2luX3R5cGUiOiJBZG1pbiJ9.ekUr9ZiKEODQFqLOSTM1XTDqkLiq3YQgcxtlDjgin3c",
          "Content-Type": "multipart/form-data",
        }
      }
    )
    .then((response) => {
      console.log("Production updated:", response.data);
    })
    .catch((error) => {
      console.error("Error updating production:", error);
    });
    }
    const [dep4Data, setDep4Data] = useState([
      { s_no: 1, dep: "loren Ipsum", sub_dep: "loren ipsum" },
      { s_no: 2, dep: "loren Ipsum", sub_dep: "loren ipsum" },
      { s_no: 3, dep: "loren Ipsum", sub_dep: "loren ipsum" },
    ]);
    const [dep, setdep] = useState("");
    const [subdep,setsubdep]=useState("");
    const [selectradio, setselectradio] = useState(""); 
    const [loading, setLoading] = useState(true);

    const handleRadioButton = (event) => {
      setselectradio(event.target.value); 
    };
    const HandleDepchange = () => {
      const newData = {
        s_no: dep4Data.length + 1,
        dep: dep,
        sub_dep: subdep,
      };
      setDep4Data([...dep4Data, newData]);
      setdep("");
      const formData2={
        'Production_id':"3",
        'Department_Id':subdep,
      'SubDepartment_Name':dep,
      'Total_Members':memberssubdep,
      }
        let isCancelled = false;
    if (isCancelled === false) setLoading(true);
      axios({
          method: "POST",
          url: `${serverURL}/api/create_subdepartment`,
          data:formData2,
          headers:
          {
            "Authorization":"Bearer "+"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJQcm9kdWN0aW9uX2lkIjoiMyIsImxvZ2luX3R5cGUiOiJBZG1pbiJ9.ekUr9ZiKEODQFqLOSTM1XTDqkLiq3YQgcxtlDjgin3c",
            "Content-Type": "multipart/form-data",
          }
        }
      )
      .then((response) => {
        console.log("Production updated:", response.data);
      })
      .catch((error) => {
        console.error("Error updating production:", error);
      });
      
      if (loading) {
        return <div>Loading...</div>;
      }
    }
    const classes = useStyles();
    
return(
    <div className={classes.container}>
    <div className={classes.containerBody}>
      <Card className={classes.DepForm}>
        <CardContent>
         <div className={classes.gap1}>
        <div className={classes.grid1}>
          
          <div>
            <Card className={`${classes.assigndeps} ${classes.card}`} style={{ flex: 1 }}>
              <CardContent className={classes.assigndepsContent}>
              <CardHeader title="Panoma Vol2" className={classes.cardHeader}/>
          <Card className={`${classes.assigndeps} ${classes.card}`} style={{ flex: 1 }}>
            <CardContent className={classes.assigndepsContent}>
            <Typography variant="body1">Director:{dir.name}</Typography>
            </CardContent>
            </Card>
            </CardContent>
            </Card>
            </div>
        <div className="g2">
            <Card className={`${classes.assigndeps} ${classes.card}`} style={{ flex: 1 }}>
              <CardContent className={classes.assigndepsContent}>
              <Card className={`${classes.assigndeps} ${classes.card}`} style={{ flex: 1 }}>
              <CardContent className={classes.assigndepsContent}>
            <div className={classes.dep1}>
                <div className="b1">
                <h3 style={{background:"#d8e8ee"}}>Assistant Directors</h3>
                <ul >
                    {dep_data.map((people,index)=>(
                    <>
                    <li key={index}>{people}</li>
                    </>
                    ))}
                </ul>
            </div>
            <div className="b1">
            <h3 style={{background:"#d8e8ee"}}>Music Directors</h3>
            <ul >
                    {dep_data.map((people,index)=>(
                    <>
                    <li key={index}>{people}</li>
                    </>
                    ))}
                </ul>
            </div>
            <div className="b1">
            <h3 style={{background:"#d8e8ee"}}>Costume Department</h3>
            <ul >
                    {dep_data.map((people,index)=>(
                    <>
                    <li key={index}>{people}</li>
                    </>
                    ))}
                </ul>
            </div>
            </div>
            </CardContent>
            </Card>
            </CardContent>
            </Card>
        </div>
        
      </div>
      
      <div className={classes.grid2}>
          <div className="dep3">
            <Card className={`${classes.assigndeps} ${classes.card}`} style={{ flex: 1 }}>
              <CardContent>
                <CardHeader title="Departments" className={classes.cardHeader}/>
            <Card className={`${classes.assigndeps} ${classes.card}`} style={{ flex: 1 }}>
            <CardContent className={classes.assigndepsContent}>
              <div className={classes.Depcard}>
                <table >
                <thead>
                    <tr>
                        <th className="table-cell">S.NO</th>
                        <th className="table-cell">Department</th>
                    </tr>
                </thead>
                    <tbody>
                        {dep4_data.map((val,index)=>(
                            <>
                            <tr key={index}>
                            <td className="table-cell">{val.s_no}</td>
                            <td className="table-cell">{val.dep}</td>
                            <td className="table-cell">{<Button className="b" variant="outlined">Edit</Button>}</td>
                            <td className="table-cell">{<Button className="but" variant="outlined">Details</Button>}</td>
                            </tr>
                           </>
                        ))}
                </tbody>
                </table>
                </div>
                </CardContent>
            </Card>
            </CardContent>
            </Card>
            </div>
        <div className="g1">
          <Card>
            <CardContent>
              <CardHeader title="Add New Department"  className={classes.cardHeader}/>
            <Card className={`${classes.assigndeps} ${classes.card}`} style={{ flex: 1 }}>
              <CardContent className={classes.assigndepsContent}>
            <div className={classes.dep3}>
            <TextField label="Name Department" variant="outlined" color="primary" value={depart} onChange={(e)=>{setdepart(e.target.value)}}></TextField>
            <form className="form" >
            <RadioGroup value={selectradio} onChange={handleRadioButton} >
              <div style={{display:"flex"}}>
            <FormControlLabel
              value="Main"
              control={<Radio />}
              label="Main"
            />
            <FormControlLabel
              value="Sub"
              control={<Radio />}
              label="Sub"
            />
            </div>
          </RadioGroup>
            </form>
            <TextField label="Total members" onChange={(e)=>{setmembersdep(e.target.value)}}></TextField>
            <Button variant="contained" color="primary" onClick={HandleDep1Change}>ADD</Button>
            </div>
            </CardContent>
            </Card>
            </CardContent>
            </Card>
            </div>
       </div>
       <div className={classes.grid2}>
        
        <div className="dep4">
          <Card className={`${classes.assigndeps} ${classes.card}`} style={{ flex: 1 }}>
            <CardContent>
              <CardHeader title="Sub-Departments" className={classes.cardHeader}/>
          <Card className={`${classes.assigndeps} ${classes.card}`} style={{ flex: 1 }}>
            <CardContent className={classes.assigndepsContent}>
            <div className={classes.Depcard}>
              <table>
                <thead>
                  <tr>
                    <th className="table-cell">S.NO</th>
                    <th className="table-cell">Department</th>
                    <th className="table-cell">Sub-Department</th>
                  </tr>
                </thead>
                <tbody>
                  {dep4Data.map((val, index) => (
                    <>
                      <tr key={index}>
                        <td className="table-cell">{val.s_no}</td>
                        <td className="table-cell">{val.dep}</td>
                        <td className="table-cell">{val.sub_dep}</td>
                        <td className="table-cell">
                          <Button className="but" variant="outlined">Edit</Button>
                        </td>
                        <td className="table-cell">
                          <Button className="but" variant="outlined">Details</Button>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
          </Card>
          </CardContent>
          </Card>
        </div>
        <div className="g1">
        <Card>
            <CardContent>
              <CardHeader title="Add Sub Department"  className={classes.cardHeader}/>
          <Card className={`${classes.assigndeps} ${classes.card}`} style={{ flex: 1 }}>
            <CardContent className={classes.assigndepsContent}>
            <div className={classes.dep3}>
              <Select label="Select sub-Department" value={subdep} onChange={(e)=>{setsubdep(e.target.value)}}>
                <MenuItem disabled value="">
                  <em>Select Department</em>
                </MenuItem>
                <MenuItem value="option1">Option 1</MenuItem>
                <MenuItem value="option2">Option 2</MenuItem>
              </Select>
              <TextField
                label="Name sub-Department"
                value={dep}
                variant="outlined" color="primary"
                onChange={(e) => setdep(e.target.value)}
              ></TextField>
              <TextField label="Total members" onChange={(e) => setmemberssubdep(e.target.value)}></TextField>
              <Button
                variant="contained"
                color="primary"
                onClick={HandleDepchange}
              >Add</Button>
            </div>
          </CardContent>
          </Card>
          </CardContent>
          </Card>
        </div>
       
       </div>
       </div>
      </CardContent>
      </Card>
      </div>
      </div>
    );
  }
  export default Department;