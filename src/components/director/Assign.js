import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  makeStyles,
} from "@material-ui/core";
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
      apiEndpoint: "/api/status_scence",
      status: "Open",
    },
    {
      title: "Open Characters",
      subHeader: "",
      apiEndpoint: "/api/status_character",
      status: "Open",
    },
    {
      title: "Open Locations",
      subHeader: "",
      apiEndpoint: "/api/status_location",
      status: "Open",
    },
    {
      title: "Assigned Scenes",
      subHeader: "",
      apiEndpoint: "/api/status_scence",
      status: "Assigned",
    },
    {
      title: "Assigned Characters",
      subHeader: "",
      //Replaced "api/director_search/assign_character"
      apiEndpoint: "/api/status_character",
      status: "Assigned",
    },
    {
      title: "Assigned Locations",
      subHeader: "",
      apiEndpoint: "/api/status_location",
      status: "Assigned",
    },
    {
      title: "Submitted Scenes",
      subHeader: "",
      apiEndpoint: "/api/status_scence",
      status: "Completed",
    },
    {
      title: "Submitted Characters",
      subHeader: "",
      apiEndpoint: "/api/status_character",
      status: "Completed",
    },
    {
      title: "Submitted Locations",
      subHeader: "",
      apiEndpoint: "/api/status_location",
      status: "Completed",
    },
  ];

  return (
    <div className={classes.container}>
      <div className={classes.containerBody}>
        <div className={classes.cardsContainer}>
          {cards.map((card, index) => (
            <Card key={index} className={classes.card}>
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
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios({
          method: "POST",
          url: `${serverURL}${card.apiEndpoint}`,
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.REACT_APP_AUTH_TOKEN}`,
          },
        });

        const statusKeyMapping = {
          'Open': 'Open',
          'Assigned': 'Assigned',
          'Completed': 'Completed',
        };

        const responseKey = statusKeyMapping[card.status] || '';
        const responseData = response.data[`${responseKey} records`] || response.data["Submitted records"] || [];
        const allData = Array.isArray(responseData) ? responseData : [];

        const filteredData = allData.filter(item => item.Status === card.status);
        if (Array.isArray(filteredData)) {
          setData(filteredData);
        }
      } catch (error) {
        console.error(`Error fetching data for ${card.title}:`, error);
      }
    };
    fetchData();
  }, [card.title, card.apiEndpoint, card.status]);


  return (
    <div className={classes.cardContentContainer}>
      {data.map((item) => {
        return (
          <Card key={item.id || item.Scene_Id} className={classes.cardItem}>
            <div className={classes.cardItemHeader}>
              <span>Scene {item.Scene_Id}</span>
              <b>Detailed view</b>
            </div>
            <div className={classes.cardItemBody}>
              {card.title === "Open Scenes" || card.title === "Submitted Scenes" || card.title === "Assigned Scenes" && (
                <div>Description: {item.Short_description}</div>
              )}
              {(card.title === "Open Locations" || card.title === "Submitted Locations" || card.title === "Assigned Locations") && (
                <div>Description: {item.AD_Instructions}</div>
              )}
              {(card.title === "Assigned Characters") && (
                <div>Description: {item.Description}</div>
              )}
            </div>
            <div className={classes.cardItemFooter}>Approved</div>
          </Card>
        );
      })}
    </div>
  );
};

export default Assign;

