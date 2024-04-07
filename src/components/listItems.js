import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import GroupIcon from "@material-ui/icons/Group";
import BarChartIcon from "@material-ui/icons/BarChart";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AssignmentIcon from "@material-ui/icons/Assignment";

export const mainListItems = (
    <div
      style={{
        color: "#fff",
      }}>
      <ListItem
        button
        onClick={() => {
          console.log("Button clicked director");
        }}
      >
        <ListItemIcon>
          <GroupIcon
            style={{
              color: "#fff",
            }}/>
        </ListItemIcon>
        <ListItemText primary="Director" />
      </ListItem>
      <ListItem
        button
        onClick={() => {
          console.log("Button clicked assistant director route");
        }}
      >
        <ListItemIcon>
          <PersonIcon
            style={{
              color: "#fff",
            }} />
        </ListItemIcon>
        <ListItemText primary="Assistant Director" />
      </ListItem>
      <ListItem
        button
        onClick={() => {
          console.log("Button clicked User");
        }}
      >
        <ListItemIcon>
          <BarChartIcon
            style={{
              color: "#fff",
            }} />
        </ListItemIcon>
        <ListItemText primary="User" />
      </ListItem>
      <ListItem
        button
        onClick={() => {
          console.log("Button clicked actors");
        }}
      >
        <ListItemIcon>
          <ExitToAppIcon
            style={{
              color: "#fff",
            }} />
        </ListItemIcon>
        <ListItemText primary="Log Out" />
      </ListItem>
    </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Saved reports</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon
            style={{
              color: "#fff",
            }} />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon
            style={{
              color: "#fff",
            }} />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon
            style={{
              color: "#fff",
            }} />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItem>
  </div>
);
