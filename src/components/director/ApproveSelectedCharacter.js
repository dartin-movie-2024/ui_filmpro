import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { serverURL } from "../../constants";
import { Button, Typography, makeStyles } from "@material-ui/core";

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
    fontSize: "1rem",
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
    // padding: "1rem 0",
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
    overflow:"auto",
  },
  nameHeader: {
    width: "100%",
    height: "40px",
    // padding: "1rem 0",
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
  },
  detailValue: {
    width: "60%",
  },
}));

const ApproveSelectedCharacter = () => {
  const classes = useStyles();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [selectedCharacter, setSelectedCharacter] = useState({});
  const [selectedArtist, setSelectedArtist] = useState({});

  const { id, character } = location.state;

  useEffect(() => {
    setSelectedCharacter({ ...character, id: character?.Character_id });
  }, [character]);

  useEffect(() => {
    axios({
      method: "post",
      url: `${serverURL}/api/select_character`,
      data: {
        characterId: id,
      },
    })
      .then(({ data: { result } }) => {
        const { character_data: artistDetails = {} } = result;
        setSelectedArtist({ ...artistDetails, id: artistDetails.Character_id });

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
      url: `${serverURL}/api/approve_assign_char`,
      data: {
        Scene_Character_Id: selectedCharacter.id,
        Character_id: selectedArtist.Character_id,
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

  loading && <div>Loading...</div>;

  return (
    <div className={classes.root}>
      <div className={classes.header}>Approve Selected Character</div>
      <div className={classes.container}>
        <div className={classes.character}>
          <div className={classes.nameHeader}>
            {selectedCharacter?.title ?? "Character Name"}
          </div>
          <div className={classes.details}>
            <div className={classes.detail}>
              <div className={classes.detailName}>Height</div>
              <div className={classes.detailValue}>
                {selectedCharacter?.Height}
              </div>
            </div>
            <div className={classes.detail}>
              <div className={classes.detailName}>Weight</div>
              <div className={classes.detailValue}>
                {selectedCharacter?.Weight}
              </div>
            </div>
            <div className={classes.detail}>
              <div className={classes.detailName}>Gender</div>
              <div className={classes.detailValue}>
                {selectedCharacter?.characterDetails?.gender}
              </div>
            </div>
            <div className={classes.detail}>
              <div className={classes.detailName}>Age</div>
              <div className={classes.detailValue}>
                {selectedCharacter?.characterDetails?.age}
              </div>
            </div>
            <div className={classes.detail}>
              <div className={classes.detailName}>Hair</div>
              <div className={classes.detailValue}>
                {selectedCharacter?.Hair_colour}
              </div>
            </div>
            <div className={classes.detail}>
              <div className={classes.detailName}>Distinguishing Features</div>
              <div className={classes.detailValue}>
                {selectedCharacter?.keyFeatures}
              </div>
            </div>
            <div className={classes.detail}>
              <div className={classes.detailName}>Number of Scenes</div>
              <div className={classes.detailValue}>
                {selectedCharacter?.No_Of_Scenes}
              </div>
            </div>
          </div>
        </div>
        <div className={classes.artist}>
          <div className={classes.nameHeader}>
            {selectedArtist?.Character_Name ?? "Artist Name"}
          </div>
          <div className={classes.artistDetails}>
            <div className={classes.column}>
              <div className={classes.imageContainer}>
                <img
                  src={`/artist-images/${selectedArtist?.id}.jpeg`}
                  className={classes.artistImage}
                  alt="artist"
                />
              </div>
              <div className={classes.detail}>
                <div className={classes.detailName}>Height</div>
                <div className={classes.detailValue}>
                  {selectedArtist?.Height}
                </div>
              </div>
              <div className={classes.detail}>
                <div className={classes.detailName}>Weight</div>
                <div className={classes.detailValue}>
                  {selectedArtist?.Weight}
                </div>
              </div>
              <div className={classes.detail}>
                <div className={classes.detailName}>Gender</div>
                <div className={classes.detailValue}>
                  {selectedArtist?.Gender}
                </div>
              </div>
              <div className={classes.detail}>
                <div className={classes.detailName}>Hair Color</div>
                <div className={classes.detailValue}>
                  {selectedArtist?.Hair_colour}
                </div>
              </div>
              <div className={classes.detail}>
                <div className={classes.detailName}>Eye Color</div>
                <div className={classes.detailValue}>
                  {selectedArtist?.Eye_Colour}
                </div>
              </div>
            </div>
            <div className={classes.column}>
              <div className={classes.detail}>
                <div className={classes.detailName}>Languages</div>
                <div className={classes.detailValue}>
                  {selectedArtist?.Languages}
                </div>
              </div>
              <div className={classes.detail}>
                <div className={classes.detailName}>Email</div>
                <div className={classes.detailValue}>
                  {selectedArtist?.Email_Id}
                </div>
              </div>
              <div className={classes.detail}>
                <div className={classes.detailName}>Phone</div>
                <div className={classes.detailValue}>
                  {selectedArtist?.Mobile_No1}
                </div>
              </div>
              <div className={classes.detail}>
                <div className={classes.detailName}>Performing Arts</div>
                <div className={classes.detailValue}>
                  {selectedArtist?.Arts}
                </div>
              </div>
              <div className={classes.detail}>
                <div className={classes.detailName}>Athletics</div>
                <div className={classes.detailValue}>
                  {selectedArtist?.Athletics}
                </div>
              </div>
              <div className={classes.detail}>
                <div className={classes.detailName}>Dance & Music</div>
                <div className={classes.detailValue}>
                  {selectedArtist?.Dance}, {selectedArtist?.Music}
                </div>
              </div>
              <div className={classes.detail}>
                <div className={classes.detailName}>Address</div>
                <div className={classes.detailValue}>
                  {selectedArtist?.Address}
                </div>
              </div>
              <div className={classes.detail}>
                <div className={classes.detailName}>Film Experience</div>
                <div className={classes.detailValue}>
                  {selectedArtist?.Film_Exp}
                </div>
              </div>
              <div className={classes.detail}>
                <div className={classes.detailName}>Films</div>
                <div className={classes.detailValue}>
                  {selectedArtist?.Films_Played}
                </div>
              </div>
              <div className={classes.detail}>
                <div className={classes.detailName}>Roles Played</div>
                <div className={classes.detailValue}>
                  {selectedArtist?.Roles_Played}
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
        <Link to={"/director/approveCharacter"}>
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

export default ApproveSelectedCharacter;