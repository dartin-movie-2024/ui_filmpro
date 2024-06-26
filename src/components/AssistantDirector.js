import React, { Fragment } from "react";
import clsx from "clsx";
import { useOutlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import GroupIcon from "@material-ui/icons/Group";
import BarChartIcon from "@material-ui/icons/BarChart";
import PersonIcon from "@material-ui/icons/Person";
import VideocamIcon from "@material-ui/icons/Videocam";
import VideoCallIcon from "@material-ui/icons/VideoCall";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import ScheduleIcon from "@material-ui/icons/Schedule";
import PinDropIcon from "@material-ui/icons/PinDrop";
import BuildIcon from "@material-ui/icons/Build";
import AssignmentIcon from "@material-ui/icons/Assignment";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import MovieCreationIcon from "@material-ui/icons/MovieCreation";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import FullPageContainer from "./FullPageContainer";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@material-ui/core";
import { AssistantdirectorListItems } from "../constants";

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    background: "#5840bb",
    boxSizing: "border-box",
    height: "100vh",
  },
  navList: {},
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  directorHome: {
    height: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    background: "transparent",
    boxShadow: "none",
    border: "none",
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100%",
    overflow: "hidden",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
  IconButton: {
    color: "#fff",
  },
}));

const getIcon = (icon) => {
  switch (icon) {
    case "GroupIcon":
      return <GroupIcon style={{ color: "#fff" }} />;
    case "ScheduleIcon":
      return <ScheduleIcon style={{ color: "#fff" }} />;
    case "PinDropIcon":
      return <PinDropIcon style={{ color: "#fff" }} />;
    case "VideoCallIcon":
      return <VideoCallIcon style={{ color: "#fff" }} />;
    case "PersonAddIcon":
      return <PersonAddIcon style={{ color: "#fff" }} />;
    case "MovieCreationIcon":
      return <MovieCreationIcon style={{ color: "#fff" }} />;
    case "VideocamIcon":
      return <VideocamIcon style={{ color: "#fff" }} />;
    case "PersonIcon":
      return <PersonIcon style={{ color: "#fff" }} />;
    case "BarChartIcon":
      return <BarChartIcon style={{ color: "#fff" }} />;
    case "BuildIcon":
      return <BuildIcon style={{ color: "#fff" }} />;
    case "AssignmentIcon":
      return <AssignmentIcon style={{ color: "#fff" }} />;
    case "CloudUploadIcon":
      return <CloudUploadIcon style={{ color: "#fff" }} />;
    default:
      return null;
  }
};

const AssistantDirector = (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const navigate = useNavigate();
  const outlet = useOutlet();

  return (
    <div className={classes.root}>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          {open && (
            <IconButton
              onClick={handleDrawerClose}
              className={classes.IconButton}
            >
              <ChevronLeftIcon />
            </IconButton>
          )}
          {!open && (
            <IconButton
              onClick={handleDrawerOpen}
              className={classes.IconButton}
            >
              <MenuIcon />
            </IconButton>
          )}
        </div>
        <Divider />
        <List className={classes.navList}>
          {AssistantdirectorListItems.map((item, index) => {
            return (
              <ListItem
                button
                onClick={() => {
                  navigate(item.route);
                }}
                key={index}
              >
                <ListItemIcon>{getIcon(item.icon)}</ListItemIcon>
                <ListItemText style={{ color: "#fff" }} primary={item.text} />
              </ListItem>
            );
          })}
        </List>
      </Drawer>
      <FullPageContainer>
        <main className={classes.content}>
          {outlet || (
            <div className={classes.directorHome}>
              <Typography component="h1" variant="h6" color="inherit" noWrap>
                Assistant Director Home
              </Typography>
            </div>
          )}
        </main>
      </FullPageContainer>
    </div>
  );
};

export default AssistantDirector;
