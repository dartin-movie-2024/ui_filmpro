import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { serverURL } from "../../constants";
import { Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    height: "75px",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "2rem",
    fontWeight: "bold",
    borderBottom: "1px solid #ccc",
  },
  footer: {
    height: "75px",
    width: "100%",
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderTop: "1px solid #ccc",
  },
  container: {
    flex: 1,
    width: "100%",
    padding: "1rem 0",
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  character: {
    display: "flex",
    flexDirection: "column",
    border: "1px solid #ccc",
    borderRadius: "5px",
    width: "30%",
    height: "80%",
  },
  artist: {
    display: "flex",
    flexDirection: "column",
    border: "1px solid #ccc",
    borderRadius: "5px",
    width: "60%",
    height: "80%",
  },
  nameHeader: {
    width: "100%",
    height: "40px",
    padding: "1rem 0",
    fontSize: "1.5rem",
    fontWeight: "bold",
    textAlign: "center",
  },
  details: {
    width: "100%",
    flex: 1,
    display: "flex",
    flexDirection: "column",
    overflow: "auto",
  },
  detail: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    padding: "0.5rem 1rem",
  },
  imageContainer: {
    width: "60%",
    height: "195px",
    margin: "0 1rem",
    border: "1px solid #ccc",
  },
  artistImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  artistDetails: {
    width: "100%",
    flex: 1,
    display: "flex",
    flexDirection: "row",
  },
  column: {
    width: "50%",
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  detailName: {
    width: "40%",
    fontWeight: "bold",
  },
  detailValue: {
    width: "60%",
  },
}));

const ApproveSelectedLocation = () => {
  const classes = useStyles();
  const location = useLocation();
  const { id, location: movieLocation } = location.state;
  const [loading, setLoading] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState({});
  const [selectedMovieLocation, setSelectedMovieLocation] = useState({});

  useEffect(() => {
    setSelectedLocation({ ...movieLocation, id });
  }, [id, movieLocation]);

  useEffect(() => {
    axios({
      method: "post",
      url: `${serverURL}/api/select_location`,
      data: {
        locationId: id,
      },
    })
      .then(({ data: { result } }) => {
        setSelectedMovieLocation({ ...result[0] });
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [id]);

  const updateAssignmentApproval = (status) => {
    setLoading(true);
    axios({
      method: "post",
      url: `${serverURL}/api/approve_assign_location`,
      data: {
        Location_Id: id,
        Scene_Location_Id: selectedMovieLocation?.Location_Id,
        status,
      },
    })
      .then((result) => {
        console.log({ result });
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  // Loading indicator
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={classes.root}>
      <div className={classes.header}>Approve Selected Location</div>

      <div className={classes.container}>
        <div className={classes.character}>
          <div className={classes.nameHeader}>
            {selectedLocation?.title ?? "Location Name"}
          </div>
          <div className={classes.details}>
            <div className={classes.detail}>
              <div className={classes.detailName}>Description</div>
              <div className={classes.detailValue}>
                {selectedLocation?.description}
              </div>
            </div>
            <div className={classes.detail}>
              <div className={classes.detailName}>Special Requirements</div>
              <div className={classes.detailValue}>
                {selectedLocation?.Requirements}
              </div>
            </div>
            <div className={classes.detail}>
              <div className={classes.detailName}>No. of Scenes</div>
              <div className={classes.detailValue}>
                {selectedLocation?.Total_Scenes}
              </div>
            </div>
          </div>
        </div>

        <div className={classes.artist}>
          <div className={classes.nameHeader}>
            {selectedMovieLocation?.Location_Name}
          </div>
          <div className={classes.artistDetails}>
            <div className={classes.column}>
              <div className={classes.detail}>
                <div className={classes.detailName}>Location Type</div>
                <div className={classes.detailValue}>
                  {selectedMovieLocation?.Location_Type}
                </div>
              </div>
              <div className={classes.detail}>
                <div className={classes.detailName}>Category</div>
                <div className={classes.detailValue}>
                  {selectedMovieLocation?.Category}
                </div>
              </div>
              <div className={classes.detail}>
                <div className={classes.detailName}>Permissions Needed</div>
                <div className={classes.detailValue}>
                  {selectedMovieLocation?.Permissions}
                </div>
              </div>
              <div className={classes.detail}>
                <div className={classes.detailName}>Specification</div>
                <div className={classes.detailValue}>
                  {selectedMovieLocation?.Specification}
                </div>
              </div>
              <div className={classes.detail}>
                <div className={classes.detailName}>Budget Per Day</div>
                <div className={classes.detailValue}>
                  {selectedMovieLocation?.Budget_day}
                </div>
              </div>
            </div>
            <div className={classes.column}>
              <div className={classes.detail}>
                <div className={classes.detailName}>Area</div>
                <div className={classes.detailValue}>
                  {selectedMovieLocation?.Area}
                </div>
              </div>
              <div className={classes.detail}>
                <div className={classes.detailName}>Country</div>
                <div className={classes.detailValue}>
                  {selectedMovieLocation?.Country}
                </div>
              </div>
              <div className={classes.detail}>
                <div className={classes.detailName}>State/Province</div>
                <div className={classes.detailValue}>
                  {selectedMovieLocation?.State}
                </div>
              </div>
              <div className={classes.detail}>
                <div className={classes.detailName}>Owner Details</div>
                <div className={classes.detailValue}>
                  {selectedMovieLocation?.Owner_details}
                </div>
              </div>
              <div className={classes.detail}>
                <div className={classes.detailName}>
                  Previous Films Shot Here
                </div>
                <div className={classes.detailValue}>
                  {selectedMovieLocation?.Previous_Films}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={classes.footer}>
        <Button
          variant="contained"
          type="submit"
          color="secondary"
          onClick={(e) => {
            updateAssignmentApproval("reject");
          }}
        >
          Reject
        </Button>
        <Button
          variant="outlined"
          type="submit"
          color="secondary"
          onClick={(e) => {
            updateAssignmentApproval("reassign");
          }}
        >
          Re-Assign
        </Button>
        <Link to={"/director/approveLocation"}>
          <Button variant="outlined" type="submit">
            Cancel
          </Button>
        </Link>
        <Button
          variant="outlined"
          type="submit"
          color="primary"
          onClick={(e) => {
            updateAssignmentApproval("hold");
          }}
        >
          Hold
        </Button>
        <Button
          variant="contained"
          type="submit"
          color="primary"
          onClick={(e) => {
            updateAssignmentApproval("approve");
          }}
        >
          Approve
        </Button>
      </div>
    </div>
  );
};

export default ApproveSelectedLocation;
