import React from "react";
import PrimarySearchAppBar from "../../components/appBar";
import FileUpload from "../drive/fileUpload";
import BasicTable from "../drive/viewDrive";

export default function HomePage() {
  return (
    <div className="container">
      <PrimarySearchAppBar />
      <h1 align="center">
        {" "}
        <span className="badge badge-dark">HomePage</span>
      </h1>
      <div style={{ marginLeft: "70px", marginRight: "70px" }}>
        <BasicTable />
        <FileUpload />
      </div>
    </div>
  );
}
