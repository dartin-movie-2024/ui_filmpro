import React from "react";
import MultiProgressComponent from "../../components/reusable-components/MultiProgress";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

export const MultiProgressExample = ({ ...props }) => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      {/* 
        ListData uses <Link>. Link component needs to appear inside a router.
        So wrapping it inside BrowserRouter.
      */}
      <BrowserRouter>
        <MultiProgressComponent {...props} />
      </BrowserRouter>
    </div>
  );
};

export default MultiProgressExample;

MultiProgressExample.args = {
  editButtonConfig: "verifyCrew",
  headerText: "Crew Details",
  fetchAPI: "crew",
  fetchType: "GET",
  searchByField: "name",
};
