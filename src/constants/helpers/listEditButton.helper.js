import { IconButton } from "@material-ui/core";
import { Link } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import { PATHS } from "../URLConstants";

export const getListEditButton = (rows) => {
  const editButtonConfigs = {
    verifyCrew: {
      field: "edit",
      headerName: "Edit",
      width: 150,
      renderCell: (params) => {
        return (
          <IconButton aria-label="edit">
            <EditIcon />
          </IconButton>
        );
      },
    },
    sceneSetup: {
      field: "edit",
      headerName: "Edit",
      renderCell: (params) => {
        return (
          <IconButton aria-label="edit">
            <EditIcon />
          </IconButton>
        );
      },
    },
    characterSetup: {
      field: "edit",
      headerName: "Edit",
      renderCell: ({ row: { id } }) => {
        return (
          <Link to={PATHS.EDIT_CHARACTERS} state={{ rows, id }}>
            <IconButton aria-label="edit">
              <EditIcon />
            </IconButton>
          </Link>
        );
      },
    },
    locationSetup: {
      field: "edit",
      headerName: "Edit",
      renderCell: (params) => {
        return (
          <IconButton aria-label="edit">
            <EditIcon />
          </IconButton>
        );
      },
    },
  };

  return editButtonConfigs;
};
