import React, {useState,useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import {serverURL} from "../../constants"
import axios from "axios";
// import b from './barbie.jpg';
// import o from './oh1.jpg';
import {
  Button,
  Card,
  CardContent,
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
  containerexist: {
    ...borderBox,
    width: "100%",
    height: "100%",
    padding: ".5rem",
    overflow: "hidden",
    justifyContent: "space-around",
  },
  containerBodyexist: {
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
  existForm: {
    ...flexColumn,
    ...borderBox,
    width: "90%",
    height: "100%",
    padding: "1rem",
    overflow: "auto",
    backgroundColor: "#d8e8ee",
    flex:"1",
  },
  row:{
    ...flexRow,
    justifyContent:"space-around",
  },
  Tile:{
    display: "flex",
    flexWrap: "wrap",
    marginLeft: "30%",
    gap: "40px",
    rowGap: "30px",
  },
  tile:{
    bordeRradius: "5px 5px",
    width: "200px",
    height: "300px",
    margin: "10px",
    border: "1px solid #ddd",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    borderRadius:"5px 5px",
  },
  tileimg:{
    width: "100%",
    height:"100%",
    objectFit: "cover",
  }
}));
function ExistingProds(){
    const classes = useStyles();
    const navigate=useNavigate();
    const [loading, setLoading] = useState(true);
    const [finaldata,setfinaldata]=useState();
    const handleclick=()=>{
      navigate("/Producer/AddProduction");
    }
    const handleClickprod_crew=()=>{
      navigate("/Prod_crew")
    }
    useEffect(()=>{
      let isCancelled = false;
    if (isCancelled === false) setLoading(true);
    axios({
      method: "GET",
      url: `${serverURL}/api/production_list`,
      headers: {
        Authorization: "Bearer " +"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJQcm9kdWN0aW9uX2lkIjoiMyIsImxvZ2luX3R5cGUiOiJBZG1pbiJ9.ekUr9ZiKEODQFqLOSTM1XTDqkLiq3YQgcxtlDjgin3c",
    }})
    .then((response) => {
      const finalresponse=response.data;
      console.log(finalresponse);
      setfinaldata(finalresponse.result[0])
      setLoading(false);
    })
    .catch((error) => {
      console.error('Error fetching production list:', error);
      setLoading(false);
    });
}, []);
if (loading) {
  return <div>Loading...</div>;
}
    return(
        <>
        <div className={classes.containerexist}>
        <div className={classes.containerBodyexist}>
            <Card className={classes.existForm}>
            <CardContent>
            <Paper style={{width:"100%", textAlign:"center"}}><h2>Exsisting Productions</h2></Paper>
                <Card>
                    <CardContent>
        <div className={classes.row}>
        </div>
        <div className={classes.Tile}>
        <div style={{display:"flex",flexDirection:"column" }}>
            <div className={classes.tile}>
            {finaldata && <img src={finaldata.Image_path} alt={finaldata.Production_Name} onClick={handleClickprod_crew} style={{cursor:"pointer"}}/>}
            </div>
            {finaldata && <label style={{marginTop:"5px",marginLeft:"20%"}}>{finaldata.Production_Name}</label>}
        </div>
        </div>
        <Button variant='contained' color='primary' onClick={handleclick} style={{float:"right",marginBottom:"10px"}}>Add New Production</Button>
        </CardContent>
        </Card>
        </CardContent>
        </Card>
        </div>
        </div>
        </>
    )
}
export default ExistingProds;
