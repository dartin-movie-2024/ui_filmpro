import React, { useEffect, useState } from "react";
import { TextField, Typography, makeStyles } from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import CrewTable from "../reusable-components/CrewTable";
import { getListEditButton, serverURL } from "../../constants";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    height: "100%",
    width: "100%",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: theme.spacing(5),
    boxSizing: "border-box",
  },
  searchContainer: {
    width: "50%",
    margin: "0 auto",
    height: "100px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  searchInput: {
    width: "100%",
  },
  gridContainer: {
    flexGrow: 1,
    width: "95%",
    margin: "0 auto",
  },
}));

/**
 * Props:
 * editButtonConfig: string // gets edit button renderer from listEditButton.helper.js => getListEditButton()
 * headerText: string
 * fetchAPI: string // API path
 * fetchType: string // GET, POST, etc.
 *
 * TODO: handle body data for POST requests
 */
const ListData = ({
  editButtonConfig,
  headerText,
  fetchAPI,
  fetchType,
  searchByField,
}) => {
  const classes = useStyles();
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [loading, setLoading] = useState(true);

  // TODO: good example of how to use useEffect to fetch data
  useEffect(() => {
    let isCancelled = false;
    if (isCancelled === false) setLoading(true);
    axios({
      method: fetchType,
      url: `${serverURL}/${fetchAPI}`,
    })
      .then((result) => {
        const { rows, columns } = result?.data || { rows: [], columns: [] };
        const columnsWithEditButton = [
          ...columns,
          getListEditButton(rows)[editButtonConfig],
        ];

        setRows(rows);
        setFilteredRows(rows);
        setColumns(columnsWithEditButton);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [editButtonConfig, fetchAPI, fetchType]);

  const handleSearchChange = (event) => {
    const searchQuery = event.target.value;

    const filteredRowsData = !!searchQuery
      ? rows.filter((row) =>
          row[searchByField].toLowerCase().includes(searchQuery.toLowerCase())
        )
      : rows;
    setFilteredRows(filteredRowsData);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={classes.content}>
      <Typography variant="h4" gutterBottom>
        {headerText}
      </Typography>
      <div className={classes.searchContainer}>
        <TextField
          className={classes.searchInput}
          id="input-with-icon-textfield"
          placeholder="Search Crew..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          onChange={handleSearchChange}
        />
      </div>
      <div className={classes.gridContainer}>
        <CrewTable rows={filteredRows} columns={columns} />
      </div>
    </div>
  );
};

export default ListData;
