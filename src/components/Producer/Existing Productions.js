import React, {useState } from "react";
import { useNavigate } from 'react-router-dom';
import b from './barbie.jpg';
import o from './oh1.jpg';
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
    height: "200px",
    margin: "10px",
    border: "1px solid #ddd",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  tileimg:{
    maxWidth: "100%",
    maxHeight:"100%",
    objectFit: "cover",
  }
}));
function ExistingProds(){
    const classes = useStyles();
    const navigate=useNavigate();
    const handleclick=()=>{
      navigate("/Producer/AddProduction");
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
            <div className={classes.tile}>
            <img src={b} alt='tile1'/>
            </div>
            <div className='tile'>
            <img src={o} alt='tile2'/>
            </div>
        </div>
        <Button variant='contained' color='primary' onClick={handleclick}>Add New Production</Button>
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
