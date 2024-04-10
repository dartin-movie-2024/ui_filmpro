/*import {Box,Card,CardContent} from "@material-ui/core";
import React, { useState } from "react";
//import axios from "axios";
import Button from "@material-ui/core/Button";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
//import TextField from "@material-ui/core/TextField";
import DeleteIcon from "@material-ui/icons/Delete";
import Paper from "@material-ui/core/Paper";
import "./../../App.css"
const CardStyles={
  maxWidth:"80%",
  marginTop:"5%",
  marginLeft:"5%",
  height:"50vh"
} 
function UploadScript(){
  const [selectedFile, setSelectedFile] = useState(null);
  const [scriptPreview, setScriptPreview] = useState(null);

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setScriptPreview(event.target.result);
      };
      reader.readAsText(file);
    } else {
      setScriptPreview(null);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setScriptPreview(null);
  };

          return(
          <>
        <Card style={CardStyles}>
        <CardContent style={{display:"flex",gap:"20px"}}>
            <Box
            bgcolor="lavender"
            padding={3}
            color="balck"
            textAlign="center"
            borderRadius={5}
            width="50%"
            height="40vh"
            display="flex"  
            flexDirection="column" 
            justifyContent="center"  
            alignItems="center"     
            >
      
              <div>
                <input
                  accept="*"
                  type="file"
                  onChange={handleFileInput}
                  style={{ display: "none" }}
                  id="contained-button-file"
                />
                <label htmlFor="contained-button-file">
                  <Button
                    variant="contained"
                    color="default"
                    startIcon={<CloudUploadIcon />}
                    component="span"
                  >
                    Upload
                  </Button>
                </label>
                {selectedFile && (
                  <>
                    <span>{selectedFile.name}</span>
                    <Button
                      variant="contained"
                      color="secondary"
                      startIcon={<DeleteIcon />}
                      onClick={handleRemoveFile}
                    >
                      Remove
                    </Button>
                  </>
                )}
              </div> 
            </Box>
            <div className="scriptview">
            <Box
              bgcolor="lavender"
              padding={3}
              color="balck"
              textAlign="center"
              borderRadius={5}
              width="50%"
              overflowY="auto"

            >
          <div>
                  /*{/* This is where you can display the uploaded script preview 
                  {scriptPreview && (
                    <Paper>
                      <pre>{scriptPreview}</pre>
                    </Paper>
                  )}
                </div>

            </Box>
            </div>
        </CardContent>
        </Card>
        </>
       ) };*/
       import React, { useState, useContext } from "react";
import axios from "axios";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import TextField from "@material-ui/core/TextField";
import DeleteIcon from "@material-ui/icons/Delete";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import ResponseContext from "./../ResponseContext";
import { makeStyles } from "@material-ui/core/styles";
import { serverURL, loremIpsum } from "./../../constants";
import { useNavigate } from "react-router-dom";

const flexColumn = {
  display: "flex",
  flexDirection: "column",
}

const centeredContent = {
  alignItems: "center",
  justifyContent: "center",
}

const roundedCorners = (borderRadius) => ({
  borderRadius: `${borderRadius}%`
})

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    height: "100%",
  },
  //file upload css start
  input: {
    display: "none",
  },
  button: {
    margin: theme.spacing(1),
  },
  uploadContainer: {
    height: "50%",
    display: "flex",
    ...centeredContent,
    padding: theme.spacing(2),
  },
  sceneForm: {
    flexGrow: 1,
    overflow: "auto",
    maxHeight: "45%",
  },
  scriptUpload: {
    width: "50%",
    height: "100%",
    background: "#e0f9ff",
    ...flexColumn,
    ...centeredContent,
    ...roundedCorners(5),
    marginRight: '2rem'
  },
  scriptPreview: {
    width: "50%",
    height: "100%",
    background: "#e0f9ff",
    overflow: "auto",
    padding: theme.spacing(1),
    ...roundedCorners(5),
  },
  heading: {
    marginBottom: theme.spacing(2),
    fontSize: theme.typography.pxToRem(15),
  },
  fileLabel: {
    display: "flex",
    alignItems: "center",
  },
  fileName: {
    marginLeft: theme.spacing(1),
  },
  //accordion start
  accordionContainer: {
    display: "block",
    width: "100%",
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: "bottom",
    height: 20,
    width: 20,
  },
  details: {
    display: "block",
    alignItems: "center",
  },
  column: {
    // flexBasis: '33.33%',
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2),
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  //accordion end
  //priority dropdown start
  formControl: {
    margin: theme.spacing(1),
    minWidth: 150,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  //priority dropdown end
  //File upload css end
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(4),
    height: "100%",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column"
  },
  textArea: {
    margin: "1rem 0",
    width: "100%",
  },
}));

function createSceneData(sceneNo, shootTown, est) {
  return { sceneNo, shootTown, est };
}

const UploadScript = ({ onSubmit }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [scenesDataList, setScenesDataList] = useState([]);
  const [state, setState] = useState({
    sceneNo: "",
    shootTown: "",
    shootTime: "",
  });
  const classes = useStyles();
  const [showAccordion, setShowAccordion] = useState(false);
  const { setResponseData, responseData } = useContext(ResponseContext);
  const [expanded, setExpanded] = useState(true);
  const [formData, setFormData] = useState([]);
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const sceneData = formData.map((item, index) => ({
      sceneNo: index + 1,
      shootTown: item.shootTown,
      shootTime: item.shootTime,
    }));
    console.log({ sceneData });

    axios
      .post(`${serverURL}/character`, sceneData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response);
        console.log("success");
        const charData = response.data;
        setResponseData({ charData });
        // onSubmit("characterInput");
        navigate("/director/characterInput");
      })
      .catch((error) => {
        // handle errors
        console.log(error);
      });
  };
  const handleDataChange = (index) => (event) => {
    const { name, value } = event.target;
    const updatedData = [...formData];
    updatedData[index] = { ...updatedData[index], [name]: value };
    setFormData(updatedData);
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setShowAccordion(false);
  };
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("productname", "pulpfiction");

    axios
      .post(`${serverURL}/scene`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        const responseData =
          response?.data?.scene_numbers?.map((scene_number, index) => ({
            name: `panel${scene_number}`,
            script:
              response?.data?.scene_script[index] || "No script available",
          })) || [];

        setData(responseData);
      })
      .catch((error) => {
        // handle errors
        console.log(error);
      });
  };

  return (
    <Container maxWidth="xl" className={classes.container}>
      <div className={classes.uploadContainer}>
        <div className={classes.scriptUpload}>
          <Typography variant="h5" component="h2" className={classes.heading}>
            Upload your Script here
          </Typography>
          <input
            accept="*"
            className={classes.input}
            id="contained-button-file"
            type="file"
            onChange={handleFileInput}
          />
          <label htmlFor="contained-button-file">
            <Button
              variant="contained"
              color="default"
              startIcon={<CloudUploadIcon />}
              className={classes.button}
              component="span"
            >
              Upload
            </Button>
          </label>
          {selectedFile && (
            <>
              <span className={classes.fileName}>{selectedFile.name}</span>
              <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                startIcon={<DeleteIcon />}
                onClick={handleRemoveFile}
              >
                Remove
              </Button>
            </>
          )}
        </div>
        <div className={classes.scriptPreview}>
            {selectedFile && loremIpsum}
        </div>
      </div>
      <form onSubmit={handleSubmit} className={classes.sceneForm}>
        {/* Chart */}
        <Grid item xs={12} md={12} lg={12}>
          <Paper>
            {selectedFile && (
              <div className={classes.accordionContainer}>
                {data.map((item, index) => (
                  <Accordion
                    key={item.name}
                    expanded={expanded === item.name}
                    onChange={handleChange(item.name)}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls={`${item.name}-content`}
                      id={`${item.name}-header`}
                      overlap="rectangular"
                    >
                      <div className={classes.column}>
                        <Typography className={classes.heading}>
                          Scene{index + 1}
                        </Typography>
                      </div>
                    </AccordionSummary>
                    <AccordionDetails className={classes.details}>
                      <Grid container direction="row">
                        <Grid item sm={3}>
                          <Typography>
                            Shoot Town
                            <br />
                            <TextField
                              label="Town"
                              variant="outlined"
                              inputProps={{
                                name: "shootTown",
                                id: item.name + "Town",
                              }}
                              fullWidth
                              className={classes.selectEmpty}
                              onChange={handleDataChange(index)}
                            />
                          </Typography>
                        </Grid>
                        <Grid item sx={1}>
                          <Divider
                            orientation="vertical"
                            variant="middle"
                            fullWidth
                          />
                        </Grid>
                        <Grid item sm={2}>
                          <Typography>
                            EST Shoot Time:
                            <br />
                            <FormControl
                              variant="outlined"
                              fullWidth
                              className={classes.selectEmpty}
                            >
                              <InputLabel htmlFor="outlined-age-native-simple">
                                Shoot Time
                              </InputLabel>
                              <Select
                                native
                                label={`${item.name}-ShootTime`}
                                autoWidth
                                inputProps={{
                                  name: "shootTime",
                                  id: item.name + "outlined-age-native-simple",
                                }}
                                onChange={handleDataChange(index)}
                              >
                                <option aria-label="None" value="" />
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                                <option value={5}>5</option>
                                <option value={6}>6</option>
                              </Select>
                            </FormControl>
                          </Typography>
                        </Grid>
                        <Grid item sx={1}>
                          <Divider
                            orientation="vertical"
                            variant="middle"
                            fullWidth
                          />
                        </Grid>
                        <Grid item sm={3}>
                          <Typography>
                            Scene Script:
                            <br />
                            <TextareaAutosize
                              className={classes.textArea}
                              maxRows={4}
                              minRows={4}
                              aria-label="Screen script"
                              placeholder="Script"
                              defaultValue={item.script}
                            />
                          </Typography>
                        </Grid>
                      </Grid>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </div>
            )}
          </Paper>
        </Grid>
      </form>
      <Grid>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          //disabled={(scenesDataList.length != data.length)}
          type="submit"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Grid>
    </Container>
  );
};

export default UploadScript;