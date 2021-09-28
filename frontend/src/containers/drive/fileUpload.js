import React, { useState, useEffect } from "react";
import { DropzoneAreaBase } from "material-ui-dropzone";
import Button from "@material-ui/core/Button";
import { getToken } from "../../helpers/authHelper";
import axios from "axios";
import { serverUrl } from "../../configs/config";
import PrimarySearchAppBar from "../../components/appBar";
// import "./styles.css";

export default function FileUpload() {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    console.log(files);
  }, [files]);

  useEffect(() => {
    console.log(getToken());
  }, []);

  const handleAdd = (newFiles) => {
    newFiles = newFiles.filter(
      (file) => !files.find((f) => f.data === file.data)
    );
    setFiles([...files, ...newFiles]);
  };

  const handleDelete = (deleted) => {
    setFiles(files.filter((f) => f !== deleted));
  };

  const handleUpload = () => {
    if (files.length === 0) return;
    console.log("handleUpload");
    const formDataArray = new FormData();

    files.forEach((item) => {
      formDataArray.append("file", item.file);
    });

    formDataArray.append("token", JSON.stringify(getToken()));

    axios.post(`${serverUrl}/fileUpload`, formDataArray).then((response) => {
      console.log(response);
      if (response.status === 200) window.location.reload();
    });
  };

  return (
    <div className="container">
      <PrimarySearchAppBar />
      <h1 align="center">
        {" "}
        <span className="badge badge-dark">File Uploader</span>
      </h1>
      <div style={{ marginLeft: "70px", marginRight: "70px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            // height: '200px',
          }}
        >
          <DropzoneAreaBase
            fileObjects={files}
            onAdd={handleAdd}
            onDelete={handleDelete}
          />
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleUpload}
          >
            Upload
          </Button>
        </div>
      </div>
    </div>
  );
}
