import { makeStyles } from "@material-ui/core";
import React from "react";
import { centerAligned, flexColumn } from "../../constants";

const multiProgressColorMap = {
    'Open': '#4472c4',
    'Assigned': '#ed7d32',
    'Submitted': '#AFE1AF',
    'Approved': '#ffbf00',
    'Pending': '#AA4A44',
    'Completed': '#AFE1AF',
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

const MultiProgressComponent = ({ progressItem }) => {
    const classes = useStyles();
    // Adjusted to check if progressItem is an array
    if (!progressItem || !Array.isArray(progressItem)) {
        console.error('Invalid progressItem:', progressItem);
        return <div>Invalid data</div>; // Or simply return null to render nothing
    }

    // Assuming totalScenesCount is the sum of counts from all progressItem elements
    const totalScenesCount = progressItem.reduce((acc, item) => acc + item.count, 0);

    return <div className={classes.container}>
        {
            progressItem.map((item, index) => {
                return <div
                    key={index}
                    className={classes.progressItem}
                    style={{
                        width: `${item.Percentage}%`,
                        fontSize: '0.8rem',
                        color: "#ffffff",
                        backgroundColor: (multiProgressColorMap[item.Status] || 'gray'),
                    }}>
                    <div>{item.Status || 'NA'} ({item.count})</div>
                    <div>{Math.ceil((item.count / totalScenesCount) * 100)}%</div>
                </div>
            })
        }
    </div>;
}

export default MultiProgressComponent;
