import React from "react";
import {
    Button,
    Card,
    CardContent,
    CardHeader,
    MenuItem,
    Select,
    Paper,
    makeStyles,
  } from "@material-ui/core";
  import TextField from "@material-ui/core/TextField";
  import { useState } from "react";
  //import "./../../App.css";

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
    containerpros: {
      ...borderBox,
      width: "90%",
      height: "100%",
      padding: ".5rem",
      marginLeft:"5%",
      //marginTop:"2%",
      display: "flex",
      justifyContent:"space-around",

    },
    heading: {
      ...borderBox,
      padding: "0",
      width: "100%",
      textAlign: "center",
    },
    containerprosBody: {
      ...borderBox,
      height: "100%",
      width: "100%",
      padding: ".5rem",
      display:"flex",
      justifyContent:"space-around",
    },
      card: {
      ...borderBox,
      flex: "1",
      margin: ".5rem 0",
    },
    cardpro:{
      maxHeight: "350px",
      maxWidth: "300px",
    },
    ProsForm: {
      ...borderBox,
      width: "70%",
      height: "100%",
      padding: "1rem",
      overflow: "auto",
      backgroundColor: "#d8e8ee",
      flex:"1",
    },
    assignpros: {
      ...borderBox,
      width:"100%",
      height: "100%",
      backgroundColor: "white",
    },
    assignprosContent: {
      padding: "0 .5rem",
      height: "100%",
      overflow: "hidden",
    },
    cardHeaderPro: {
      height:"3px",
      background: "#d8e8ee",
    },
    imagePreview: {
      width: "100%",
    height: "100%",
    objectFit: "cover", 
    },
    imageContainer: {
      maxWidth: "100%",
      maxHeight: "100%",
    },
    prodcontainer:{
      textAlign:"center",
    },
    Maincontainer:{
      ...flexRow,
      justifyContent:"center",
      textAlign:"center",
      gap:"10%",
    },
    productionType:{
      ...flexColumn,
    }
  }));
function AddProduction(){
    const [image, setImage] = useState(null);

    const handleImageChange = (e) => {
      const file = e.target.files[0];
  
      if (file) {
        if (file.type.match(/^image\//)) {
          const reader = new FileReader();
  
          reader.onload = (e) => {
            setImage(e.target.result);
          };
          reader.readAsDataURL(file);
        } else {
          alert('Please select a valid image file.');
        }
      } else {
        alert('Please select an image to upload.');
      }
    };
     const [inputValue1, setInputValue1] = useState('');
     const [inputValue2, setInputValue2] = useState('');
     const [showRadioButtons, setShowRadioButtons] = useState(false);

     const radioOptions = {
        Option1: 'Option 1',
        Option2: 'Option 2',
        Option3: 'Option 3',
        Option4: 'Option 4',
        Option5: 'Option 5',
        Option6: 'Option 6',
        Option7: 'Option 7',
        Option8: 'Option 8',
        Option9: 'Option 9',
        Option10: 'Option 10',
        Option11: 'Option 11',
        Option12: 'Option 12',
      };
     const handleInputChange1 = (e) => {
       setInputValue1(e.target.value);
     };
     const handleInput2Focus = () => {
       setShowRadioButtons(true);
     };
     const handleRadioChange = (e) => {
       setInputValue2(e.target.value);
     };
     const classes = useStyles();
    return(

      <>
      <div className={classes.containerpros}>
        <div className={classes.containerprosBody}>
          <Card className={classes.ProsForm}>
                <CardContent >
                <Paper style={{width:"100%", textAlign:"center"}}><h2>ADD PRODUCTIONS</h2></Paper>
                <div className={classes.Maincontainer}>
                <div className={classes.prodcontainer}>
                  <Card className={`${classes.assignpros} ${classes.cardpro}`}>
                    <CardContent className={`${classes.assignprosContent} ${classes.cardpro}`}>
                  <input type="file" accept="image/*" onChange={handleImageChange}/>
                        {image && (
                          <div className={classes.imageContainer}>
                        <img
                            src={image}
                            alt="Uploaded"
                            className={classes.imagePreview}
                        />
                        </div>
                        )} 
                  </CardContent>
                  </Card>
                </div>


                    <div className='prod'>
                      <Card>
                        <CardContent>
                          <CardHeader title="Add New Production" className={classes.cardHeaderPro}/>
                      <Card className={`${classes.assignpros} ${classes.card}`}>
                        <CardContent className={classes.assignprosContent}>
                        <h3>Production Name</h3>
                            <TextField value={inputValue1} onChange={handleInputChange1} label="Production Name" variant="outlined" color="primary"></TextField>
                        <div className={classes.productionType}>
                            <h3>Type Of Production</h3>
                            <Select
                                label="Type of Production"
                                onFocus={handleInput2Focus}
                                value={inputValue2}
                                onChange={handleRadioChange}
                            ><MenuItem value="">
                            <em>Select an Option</em>
                          </MenuItem>
                               {showRadioButtons && (
                                        Object.keys(radioOptions).map((option) => (
                                            <MenuItem key={option} value={option}>
                                            {radioOptions[option]}
                                            </MenuItem>
                                        ))
                                    )}</Select>
                                    <Button variant='contained' color="primary" type='submit' >SUBMIT</Button>
                        </div>
                    </CardContent>
                    </Card>
                    </CardContent>
                    </Card>
                    </div>
                    </div>
                    </CardContent>
                    </Card>
                    </div>
                    </div>
        </>
    )
}


export default AddProduction;