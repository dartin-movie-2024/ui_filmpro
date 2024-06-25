import React, { useEffect, useState } from "react";
import axios from "axios";
import MultiProgressComponent from "../reusable-components/MultiProgress";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { flexColumn, serverURL } from "../../constants";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  container: {
    ...flexColumn,
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "100%",
    height: "100%",
    overflowY: "auto",
  },
  progressItem: {
    marginBottom: "20px",
    width: "80%",
    minHeight: "210px",
    borderRadius: "10px",
    backgroundColor: "#f8f8f8",
    ...flexColumn,
  },
  cardHeader: {
    textAlign: "center",
    backgroundColor: "#f4f1f1",
    fontSize: "10px",
  },
  multiProgressComponent: {
    width: "100%",
    margin: ".5rem 0",
  },
  setupHeader: {
    width: "100%",
    textAlign: "center",
  },
  cardActions: {
    display: "flex",
    justifyContent: "flex-end",
  },
}));

const SetupComponent = ({ paths }) => {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let isCancelled = false;
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await axios.get(`${serverURL}/api/count`, {
          headers: {
            "Authorization": `Bearer ${process.env.REACT_APP_AUTH_TOKEN}`,
          },
        });
        if (!isCancelled) {
          const transformedData = Object.keys(result.data).map((key) => ({
            name: key.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()), // Transform key to a more readable format
            details: result.data[key].result,
          }));
          setData(transformedData);
        }
      } catch (err) {
        if (!isCancelled) {
          console.error(err);
        }
      } finally {
        if (!isCancelled) setLoading(false);
      }
    };

    fetchData();

    return () => {
      isCancelled = true;
    };
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className={classes.container}>
      {data.map((setup, index) => (
        <Card className={classes.progressItem} key={index}>
          <CardHeader className={classes.cardHeader} title={<Typography variant="h6">
            {setup.name}
          </Typography>} />
          <CardContent>
            <MultiProgressComponent
              progressItem={setup.details}
              className={classes.multiProgressComponent}
            />
          </CardContent>
          <CardActions className={classes.cardActions}>
            <Button
              variant="contained"
              className={classes.viewButton}
              color="primary"
              onClick={() => { navigate(paths[setup.name]); }}>
              View
            </Button>
          </CardActions>
        </Card>
      ))}
    </div>
  );
};

export default SetupComponent;
