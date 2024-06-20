import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { serverURL } from "../../constants"
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
const flexRow = {
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
  existForm: {
    ...flexColumn,
    ...borderBox,
    width: "90%",
    height: "100%",
    padding: "1rem",
    overflow: "hidden",
    flex: "1",
  },
  row: {
    ...flexRow,
    justifyContent: "space-around",
  },
  card: {
    ...borderBox,
    width: "100%",
    margin: ".5rem 0",
    border: "1px solid green",
  },
  Tile: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around", // evenly distribute items along the row
    gap: "20px",
    maxHeight: "300px",
    overflow: "auto"
  },
  tile: {
    borderRadius: "5px",
    width: "150px", // for 4 items per row, adjust as needed
    height: "200px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
  },
  tileimg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  }
}));

function ExistingProds() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [finaldata, setfinaldata] = useState();
  const [error, setError] = useState(null);

  const handleclick = () => {
    navigate("/Producer/AddProduction");
  }

  const handleClickprod_crew = () => {
    navigate("/Prod_crew")
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${serverURL}/api/production_list`, {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_AUTH_TOKEN}`,
          },
        });
        setfinaldata(response.data.result);
      } catch (error) {
        setError('Error fetching production list');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div className={classes.containerexist}>
        <div className={classes.containerBodyexist}>
          <Card className={classes.existForm}>
            <CardContent>
              <Paper style={{ width: "100%", textAlign: "center" }}><h3>Existing Productions</h3></Paper>
              <Card>
                <CardContent>
                  <div className={classes.row}>
                  </div>
                  <div className={classes.Tile}>
                    {finaldata && finaldata.map((data, index) => (
                      <div style={{ display: "flex", flexDirection: "column" }} key={index}>
                        <div className={classes.tile}>
                          <img src={data.Image_path} alt={data.Production_Name} onClick={handleClickprod_crew} style={{ cursor: "pointer" }} />
                        </div>
                        <label style={{ textAlign: "center", fontSize: 14 }}>{data.Production_Name}</label>
                      </div>
                    ))}
                  </div>
                  <Button variant='contained' color='primary' onClick={handleclick} style={{ float: "right" }}>Add New Production</Button>
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
