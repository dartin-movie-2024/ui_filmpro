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
  import { serverURL } from "../../constants";
  import { useState,useEffect } from "react";
  import axios from"axios";
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
  const [filename,setfilename] =useState(null);
    const handleImageChange = (e) => {
      const file = e.target.files[0];
  
      if (file) {
        if (file.type.match(/^image\//)) {
          const reader = new FileReader();
          const uploadedfile=file.name;
          setfilename(uploadedfile)
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
     const [idcount,setidcount]=useState(1);

     const radioOptions = {
        1: 'Feature Film',
        2: 'Short Film',
        3: 'Cocial',
        4: 'TV Serial',
        5: 'Documentary',
        6: 'Corporate Film',
        7: 'Web Series',
        8: 'Episode',
        9: 'News Cast',
        10: 'Stage Production',
        11: 'Mini Series',
        12: 'Clip',
      };
     const handleInputChange1 = (e) => {
       setInputValue1(e.target.value);
     };
     const handleInput2Focus = () => {
       setShowRadioButtons(true);
     };
     const handleRadioChange = (e) => {
      const selectedOption = e.target.value;
      const productionId = Object.keys(radioOptions).find(
        (key) => radioOptions[key] === selectedOption
      );
      setInputValue2(selectedOption);
      setidcount(parseInt(productionId));
    };
    
     const classes = useStyles();
    //  const formData={
    //   Production_id:idcount,
    //   Production_Name:inputValue1,
    //   Production_Type_Id:inputValue2,
    //   Image_Path:image,
    //  }
    //  useEffect(()=>{
    //   axios({
    //   method:"POST",
    //   url: `${serverURL}/api/update_production`,
    //   data:formData,
    //   headers: {
    //     Authorization: "Bearer " +"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJQcm9kdWN0aW9uX2lkIjoiMyIsImxvZ2luX3R5cGUiOiJBZG1pbiJ9.ekUr9ZiKEODQFqLOSTM1XTDqkLiq3YQgcxtlDjgin3c",
    //   }
    // })
    //   .then((response) => {
    //     console.log("Production updated:", response.data);
        
    //   })
    //   .catch((error) => {
    //     console.error('Error updating production:', error);}
    //   )
    // },[]
    //  )
    console.log("before");
    
    const handleSubmit = (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append("Production_name", inputValue1);
      formData.append("Production_Type_Id", inputValue2);
      formData.append("Image_Path", filename);
      // formData.append("Production_id", inputValue2);
  
      axios({
        method: "POST",
        url: `${serverURL}/api/add_production`,
        headers: {
          Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJQcm9kdWN0aW9uX2lkIjoiMyIsImxvZ2luX3R5cGUiOiJBZG1pbiJ9.ekUr9ZiKEODQFqLOSTM1XTDqkLiq3YQgcxtlDjgin3c",
        },
        data: formData,
        body: JSON.stringify(formData)
      })
        .then((response) => {
          const resp=response.data
          console.log("Production updated:",resp);
        })
        .catch((error) => {
          console.error("Error updating production:", error);
        });
    };
  
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
                                    <Button variant='contained' color="primary" type='submit' onClick={handleSubmit}>SUBMIT</Button>
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