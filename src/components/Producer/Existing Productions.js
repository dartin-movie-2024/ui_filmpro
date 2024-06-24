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
    bordeRradius: "5px 5px",
    width: "200px",
    height: "300px",
    margin: "10px",
    border: "1px solid #ddd",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    borderRadius: "5px 5px",
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
  const [selectedProdId, setSelectedProdId] = useState(null);

  const handleclick = () => {
    navigate("/Producer/AddProduction");
  }

  const handleClickProdCrew = (prodId) => {
    setSelectedProdId(prodId);
    navigate(`/Prod_crew/Departments?id=${prodId}`)
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
      <Paper style={{ width: "100%", textAlign: "center" }}><h3>Existing Productions</h3></Paper>
      <div className={classes.containerexist}>
        <div className={classes.containerBodyexist}>
          <Card className={classes.existForm}>
            <CardContent>
              <Card>
                <CardContent>
                  <div className={classes.row}>
                  </div>
                  <div className={classes.Tile}>
                    {finaldata.map((prod) => (
                      <div key={prod.Production_id} style={{ display: "flex", flexDirection: "column" }}>
                        <div className={classes.tile}>
                          <img
                            src={prod.Image_Path}
                            alt={prod.Production_Name}
                            onClick={() => handleClickProdCrew(prod.Production_id)}
                            style={{ cursor: "pointer" }}
                          />
                        </div>
                        <label style={{ marginTop: "5px", marginLeft: "20%" }}>{prod.Production_Name}</label>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Button variant='contained' color='primary' onClick={handleclick} style={{ marginTop: "10%", float: "right" }}>Add New Production</Button>
            </CardContent >
          </Card >
        </div >
      </div >
    </>
  )
}
export default ExistingProds;
