import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  makeStyles,
} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { serverURL } from "../../constants";

const flexColumn = {
  display: "flex",
  flexDirection: "column",
};

const borderBox = {
  boxSizing: "border-box",
};

const useStyles = makeStyles((theme) => ({
  root: {
    ...borderBox,
  },
  main: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
  container: {
    ...borderBox,
    ...flexColumn,
    width: "100%",
    height: "100%",
    padding: ".5rem",
    overflow: "hidden",
    justifyContent: "space-around",
  },
  containerBody: {
    ...borderBox,
    display: "flex",
    height: "85%",
    width: "100%",
    padding: ".5rem",
    overflow: "hidden",
    justifyContent: "space-around",
  },
  content: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  cardsContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    overflowX: "scroll",
  },
  card: {
    maxHeight: "270px",
    width: "30%",
    margin: "1rem",
    display: "flex",
    flexDirection: "column",
  },
  cardHeader: {
    height: "8px",
    background: "#d8e8ee",
  },
  cardContent: {
    overflow: "auto",
    flex: 1,
    boxSizing: "border-box",
  },
  cardActions: {
    height: "30px",
  },
  cardContentContainer: {
    height: "100%",
    width: "100%",
    overflow: "auto",
    boxSizing: "border-box",
  },
  cardItem: {
    boxSizing: "border-box",
    width: "95%",
    height: "85px",
    margin: "1.2rem auto",
    display: "flex",
    flexDirection: "column",
  },
  cardItemHeader: {
    display: "flex",
    justifyContent: "space-between",
  },
  cardItemBody: {
    margin: ".2rem 0",
  },
  cardItemFooter: {
    textAlign: "right",
  },
  footerButton: {},
}));

const Assign = (props) => {
  const classes = useStyles();
  const cards = [
    {
      title: "Open Scenes",
      subHeader: "",
    },
    {
      title: "Open Characters",
      subHeader: "",
    },
    {
      title: "Open Locations",
      subHeader: "",
    },
    {
      title: "Assigned Scenes",
      subHeader: "",
    },
    {
      title: "Assigned Characters",
      subHeader: "",
    },
    {
      title: "Assigned Locations",
      subHeader: "",
    },
    {
      title: "Submitted Scenes",
      subHeader: "",
    },
    {
      title: "Submitted Characters",
      subHeader: "",
    },
    {
      title: "Submitted Locations",
      subHeader: "",
    },
  ];
  //   const handleCharacterDataUpdate = (e) => {
  //     const { value, name } = e.target;
  //     const updatedCharacter = { ...selectedCharacter, [name]: value };
  //     setSelectedCharacter(updatedCharacter);
  //   };

  //   const saveCharacter = () => {
  //     axios
  //       .post(`${serverURL}/saveCharacter`, selectedCharacter, {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       })
  //       .then((response) => {
  //         console.log("🚀 ~ response:", response);
  //       })
  //       .catch((error) => {
  //         // handle errors
  //         console.log(error);
  //       });
  //   };

  return (
    <div className={classes.container}>
      <div className={classes.containerBody}>
        <div className={classes.cardsContainer}>
          {cards.map((card) => (
            <Card className={classes.card}>
              <CardHeader
                className={classes.cardHeader}
                title={card.title}
                subheader={card.subHeader}
              />
              <CardContent className={classes.cardContent}>
                <CardContentContainer card={card} />
              </CardContent>
              <CardActions disableSpacing className={classes.cardActions}>
                <Button variant="contained" color="primary" component="span">
                  More
                </Button>
              </CardActions>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

const CardContentContainer = function ({ card }) {
  const classes = useStyles();
  return (
    <div className={classes.cardContentContainer}>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => {
        return (
          <Card className={classes.cardItem}>
            <div className={classes.cardItemHeader}>
              <span>Scene {item}</span>
              <b>Detailed view</b>
            </div>
            <div className={classes.cardItemBody}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </div>
            <div className={classes.cardItemFooter}>Approved</div>
          </Card>
        );
      })}
    </div>
  );
};

export default Assign;
