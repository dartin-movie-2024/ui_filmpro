import React, { useEffect, useState } from "react";
import axios from "axios";
import MultiProgressComponent from "../reusable-components/MultiProgress";
import ListDataAD from "./ListDataAD";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  makeStyles,
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

const SetupComponentAD = ({paths}) => {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // TODO: good example of how to use useEffect to fetch data
  useEffect(() => {
    let isCancelled = false;
    if (isCancelled === false) setLoading(true);
    axios({
      method: "GET",
      url: `${serverURL}/getSetup`,
    })
      .then((result) => {
        console.log({ result });
        setData(result.data)
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className={classes.container}>
      {data.map((setup, index) => {
        return (
          <Card className={classes.progressItem} key={index}>
            <CardHeader className={classes.cardHeader} title={setup.name} />
            <CardContent>
              <MultiProgressComponent progressItem={setup} />
            </CardContent>
            <CardActions className={classes.cardActions}>
              <Button
                variant="contained"
                className={classes.viewButton}
                color="primary"
                onClick={() => {
                  navigate(paths[setup.name]);
                }}
              >
                View
              </Button>
            </CardActions>
          </Card>
        );
      })}
    </div>
  );
};

export default SetupComponentAD;
