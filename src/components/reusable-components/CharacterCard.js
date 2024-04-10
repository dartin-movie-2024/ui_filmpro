import React, { Fragment } from "react";
import FaceIcon from "@mui/icons-material/Face";
import CheckIcon from "@mui/icons-material/Check";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  TextField,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {},
  card: {
    minWidth: "350px",
    margin: "1rem",
    display: "flex",
    flexDirection: "column",
  },
  cardHeader: {
    background: "#d8e8ee",
    textAlign: "center",
  },
  cardContent: {
    flex: 1,
    width: "100%",
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    boxSizing: "border-box",
  },
  contentRow: {
    width: "100%",
    height: "75px",
    borderRadius: "5px",
    margin: "0.5rem 0",
    display: "flex",
    boxSizing: "border-box",
  },
  cardActions: {
    display: "flex",
    justifyContent: "flex-end",
    width: "100%",
  },
  cardItemFooter: {
    textAlign: "right",
  },
  footerButton: {
    transform: "scale(0.75)",
    whiteSpace: "nowrap",
    float: "right",
  },
  formInputSingleItem: {
    flex: 1,
  },
  characterIcon: {
    width: "30%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  characterDetails: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  characterDetailItem: {
    fontSize: "0.8rem",
    fontWeight: "bold",
    margin: "0.25rem 0",
  },
}));

const CharacterCard = ({
  id,
  title,
  subHeader,
  status = "",
  characterDetails = {
    role: "",
    gender: "",
    age: "",
  },
  description = "",
  keyFeatures = "",
  selected = false,
  showStatusButton = false,
  showSelectButton = false,
  showMoreButton = false,
  selectButtonAction = () => {},
}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Card
        className={classes.card}
        style={{
          border: selected ? "1px solid #5840bb" : "1px solid #ccc",
          background: selected ? "#d8e8ee" : "#fff",
        }}
      >
        <CardHeader
          className={classes.cardHeader}
          title={title}
          subheader={subHeader}
        />
        <CardContent className={classes.cardContent}>
          <div className={classes.contentRow}>
            <div className={classes.characterIcon}>
              <FaceIcon fontSize="large" />
            </div>
            <div className={classes.characterDetails}>
              <span className={classes.characterDetailItem}>
                {characterDetails.role}
              </span>
              <span className={classes.characterDetailItem}>
                {characterDetails.gender}/{characterDetails.age}
              </span>
            </div>
          </div>
          <div className={classes.contentRow}>
            <TextField
              InputLabelProps={{ shrink: true }}
              inputProps={{
                name: "description",
              }}
              variant="outlined"
              multiline
              label="Description"
              className={classes.formInputSingleItem}
              value={description}
              maxRows={2}
              minRows={2}
              onChange={(e) => {}}
            />
          </div>
          <div className={classes.contentRow}>
            <TextField
              InputLabelProps={{ shrink: true }}
              inputProps={{
                name: "keyFeatures",
              }}
              variant="outlined"
              multiline
              label="Key Features"
              className={classes.formInputSingleItem}
              maxRows={2}
              minRows={2}
              value={keyFeatures}
              onChange={(e) => {}}
            />
          </div>
        </CardContent>
        <CardActions disableSpacing>
          <div className={classes.cardActions}>
            {showStatusButton && (
              <Button
                className={classes.footerButton}
                variant="contained"
                size="small"
                color="primary"
                component="span"
              >
                Status: {status}
              </Button>
            )}
            {showSelectButton && (
              <Button
                className={classes.footerButton}
                variant={selected ? "outlined" : "contained"}
                size="small"
                color="primary"
                component="span"
                onClick={() => {
                  selectButtonAction(id);
                }}
              >
                {selected ? (
                  <Fragment>
                    <CheckIcon /> Selected
                  </Fragment>
                ) : (
                  " Select "
                )}
              </Button>
            )}
            {showMoreButton && (
              <Button
                className={classes.footerButton}
                variant="contained"
                size="small"
                color="primary"
                component="span"
              >
                More
              </Button>
            )}
          </div>
        </CardActions>
      </Card>
    </div>
  );
};

export default CharacterCard;
