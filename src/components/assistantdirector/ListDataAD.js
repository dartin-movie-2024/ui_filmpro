import React, { useEffect, useState } from "react";
import { TextField, Typography, makeStyles } from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import CrewTable from "../reusable-components/CrewTable";
import { getListEditButtonAD, serverURL } from "../../constants";
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
    // paddingTop: theme.spacing(5),
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
const ListDataAD = ({
  editButtonConfig,
  headerText,
  fetchAPI,
  fetchType,
  searchByField,
  showEditButton = false
}) => {
  const classes = useStyles();
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const productionId = sessionStorage.getItem("selectedProdId");

  // TODO: good example of how to use useEffect to fetch data
  console.log("prodid",productionId)
  useEffect(() => {
    let isCancelled = false;
    if (!isCancelled) setLoading(true);
    axios({
      method: fetchType,
      url: `${serverURL}/${fetchAPI}`,
      headers: {
        "Authorization": `Bearer ${process.env.REACT_APP_AUTH_TOKEN}`,
      },
      data: {
        Production_id: productionId, 
      },
    })
      .then((result) => {
        if (!isCancelled) {
          let rows = result.data.result;
          if (!rows || rows.length === 0) {
            console.error("No data returned from API");
            return; // Early return if no data
          }
          rows = rows.map(row => ({
            id: row.Crew_Id,
            ...row,
          }));

          let columns = rows.length > 0 ? Object.keys(rows[0])
            .filter(key => key !== 'Crew_Id') // Exclude 'Crew_Id' from the keys
            .map(key => ({
              field: key,
              headerName: key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
              width: 200,
            })) : [];

          if (columns.length > 0) {
            // Assuming you want to set a specific width for a column named 'Name'
            const nameColumnIndex = columns.findIndex(column => column.field === 'id');
            if (nameColumnIndex !== -1) {
              columns[nameColumnIndex].width = 100; // Set specific width for 'Name' column
            }
          }

          const editButtonColumn = getListEditButtonAD(rows)[editButtonConfig];
          if (editButtonColumn) {
            columns.push(editButtonColumn);
          } else {
            console.error("Edit button column definition is missing");
          }
          setRows(rows);
          setFilteredRows(rows);
          setColumns(columns);
        }
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        if (!isCancelled) setLoading(false);
      });

    return () => {
      isCancelled = true;
    };
  }, [editButtonConfig, fetchAPI, fetchType,productionId]);

  const handleSearchChange = (event) => {
    const searchQuery = event.target.value;

    const filteredRowsData = searchQuery
      ? rows.filter((row) => {
        console.log("Row data:", row); // Log the entire row
        console.log("Data for field [" + searchByField + "]:", row[searchByField]); // Log the specific field value
        return row[searchByField] !== undefined && row[searchByField].toString().toLowerCase().includes(searchQuery.toLowerCase());
      })
      : rows;
    setFilteredRows(filteredRowsData);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={classes.content}>
      <Typography variant="h6" gutterBottom>
        {headerText}
      </Typography>
      <div className={classes.searchContainer}>
        <TextField
          className={classes.searchInput}
          id="input-with-icon-textfield"
          placeholder="Search Crew by Name..."
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
        <CrewTable rows={filteredRows} columns={showEditButton ? columns : columns.slice(0, -1)} />
      </div>
    </div>
  );
};

export default ListDataAD;
