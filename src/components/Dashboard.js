import React, { Fragment } from 'react';
import clsx from 'clsx';
import { Outlet } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import {mainListItems} from './listItems';
import SceneInputComponent from './SceneInput';
import ShootDurationComponent from './ShootDuration';
import CharacterInputComponent from './CharacterInput';
import ScheduleOutputComponent from './ScheduleOutput';
import LocationInputComponent from './LocationInput';
import FullPageContainer from './FullPageContainer';

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    background: '#5840bb',
    boxSizing: 'border-box',
    height: '100vh',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    background: 'transparent',
    boxShadow: 'none',
    border: 'none',
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'hidden'
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),

  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
  IconButton: {
    color: '#fff'
  }
}));

export default function Dashboard() {
  const classes = useStyles();
  const location = useLocation();
  const [selectedItem, setSelectedItem] = React.useState('sceneInput');
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/director');
  };
  const handleFormSubmit = (data) => {
    setSelectedItem(data);
  };

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
          {
            open &&
            <IconButton onClick={handleDrawerClose} className={classes.IconButton}>
              <ChevronLeftIcon />
            </IconButton>
          }
          {
            !open &&
            <IconButton onClick={handleDrawerOpen} className={classes.IconButton}>
              <MenuIcon />
            </IconButton>
          }
        </div>
        <Divider />
        <List onClick={handleClick}>
          {mainListItems}
        </List>
      </Drawer>
      <FullPageContainer>
        <main className={classes.content}>
          {
            location.pathname === '/dashboard' && 
            <Fragment>
              {selectedItem === 'sceneInput' && <SceneInputComponent onSubmit={handleFormSubmit} />}
              {selectedItem === 'shootDuration' && <ShootDurationComponent onSubmit={handleFormSubmit} />}
              {selectedItem === 'characterInput' && <CharacterInputComponent onSubmit={handleFormSubmit} />}
              {selectedItem === 'locationInput' && <LocationInputComponent onSubmit={handleFormSubmit} />}
              {selectedItem === 'scheduleOutput' && <ScheduleOutputComponent />}
            </Fragment>
          
          }
          {location.pathname !== '/dashboard' && <Outlet />}
        </main>
      </FullPageContainer>
    </div>
  );
}