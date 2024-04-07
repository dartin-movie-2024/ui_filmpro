import React from "react";
import ListData from "../../components/director/ListData";
import "./listData.css";
import { BrowserRouter } from "react-router-dom";

export const ListDataExample = ({ ...props }) => {
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
        <ListData {...props} />
      </BrowserRouter>
    </div>
  );
};

export default ListDataExample;

ListDataExample.args = {
  editButtonConfig: "verifyCrew",
  headerText: "Crew Details",
  fetchAPI: "crew",
  fetchType: "GET",
  searchByField: "name",
};
