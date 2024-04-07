import { makeStyles } from "@material-ui/core";
import React from "react";
import { centerAligned, flexColumn } from "../../constants";

const multiProgressColorMap = {
    'Open': '#4472c4',
    'Assigned': '#ed7d32',
    'Submitted': '#a5a5a5',
    'Approved': '#ffbf00'
  };

const useStyles = makeStyles((theme) => ({
    container: {
        width: '100%',
        height: '50px',
        display: 'flex',
    },
    progressItem: {
        ...flexColumn,
        ...centerAligned
    }
}));

const MultiProgressComponent = ({progressItem}) => {
    const classes = useStyles();

    return <div className={classes.container}>
        {
            progressItem.data.map((item, index) => {
                return <div
                    key={index}
                    className={classes.progressItem}
                    style={{
                        width: `${(item.count/progressItem.totalScenesCount)*100}%`,
                        color: "#ffffff",
                        backgroundColor: (multiProgressColorMap[item.name] || 'gray'),
                    }}>
                        <div>{item.name} ({item.count})</div>
                        <div>{Math.ceil((item.count/progressItem.totalScenesCount)*100)}%</div>
                </div>
            })
        }
    </div>;
}

export default MultiProgressComponent;