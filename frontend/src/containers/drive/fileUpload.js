import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { DropzoneAreaBase } from "material-ui-dropzone";
import Button from "@material-ui/core/Button";
import { getToken } from "../../helpers/authHelper";
import axios from "axios";
import { serverUrl } from "../../configs/config";
import PrimarySearchAppBar from "../../components/appBar";
import { toast } from "react-toastify";
// import "./styles.css";

export default function FileUpload() {
  const history = useHistory();
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

  // handle upload button onClick
  const handleUpload = () => {
    if (files.length === 0) {
      toast("Select file!");
      return;
    }

    toast("File uploading!");
    const formDataArray = new FormData();
    files.forEach((item) => {
      formDataArray.append("file", item.file);
    });
    formDataArray.append("token", JSON.stringify(getToken()));

    axios.post(`${serverUrl}/fileUpload`, formDataArray).then((response) => {
      if (response.status === 200) {
        toast("File uploaded successfully!");
        history.push("/home");
      } else toast("File uploading failed!");
    });
  };

  
  return (
    <div className="container">
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
