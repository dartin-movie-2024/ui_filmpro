import React from 'react';
import { makeStyles } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';

/* 
    CrewTable component
    it takes in data as a json array. each array item is an object with the following properties:
    {
        id: number,
        name: string,
        dept: string,
        subDept: string,
        designation: string,
    }
    all these properties are represented as columns in the table along with an edit button as last column.
*/

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        height: '100%',
        width: '100%',
        overflow: 'hidden'
    },
}));

const CrewTable = ({ rows, columns }) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <DataGrid
                rows={rows}
                columns={columns}
                checkboxSelection
                disableSelectionOnClick
                />
        </div>
    );
};

export default CrewTable;