import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { getToken } from "../../helpers/authHelper";
import axios from "axios";
import { serverUrl } from "../../configs/config";
import DownloadIcon from "@mui/icons-material/Download";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import Stack from "@mui/material/Stack";
import { toast } from "react-toastify";

const fileDownload = require("js-file-download");

export default function BasicTable() {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    readDriveFiles();
  }, []);

  // read drive files using access token
  const readDriveFiles = () => {
    const body = { token: getToken() };
    axios.post(`${serverUrl}/readDrive`, body).then((response) => {
      setFiles(response.data);
    });
  };

  // download drive files using access token
  const handleDownload = (id) => {
    toast("File downloading!");
    const body = { token: getToken() };
    axios
      .post(`${serverUrl}/download/${id}`, body, { responseType: "blob" })
      .then((response) => {
        if (response.status === 200) {
          fileDownload(
            response.data,
            files.find((item) => item.id === id).name
          );
        } else toast("File downloading failed!");
      });
  };

  
  // delete drive files using access token
  const handleDelete = (id) => {
    toast("File delete request send!");
    const body = { token: getToken() };
    axios.post(`${serverUrl}/deleteFile/${id}`, body).then((response) => {
      if (response.status === 200) {
        toast("File deleted successfully!");
        readDriveFiles();
      } else toast("File deleting failed!");
    });
  };


  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>File Name</TableCell>
              <TableCell align="center">Id</TableCell>
              <TableCell align="right">Kind</TableCell>
              <TableCell align="right">Mime Type</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          {files.length > 0 && (
            <TableBody>
              {files.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="center">{row.id}</TableCell>
                  <TableCell align="right">{row.kind}</TableCell>
                  <TableCell align="right">{row.mimeType}</TableCell>
                  <TableCell align="right">
                    <Stack direction="row" spacing={2}>
                      <Button
                        id={row.id}
                        onClick={(e) => handleDelete(e.target.id)}
                        variant="outlined"
                        startIcon={<DeleteIcon />}
                      >
                        Delete
                      </Button>
                      <Button
                        id={row.id}
                        onClick={(e) => handleDownload(e.target.id)}
                        variant="contained"
                        endIcon={<DownloadIcon />}
                      >
                        Download
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </TableContainer>
    </>
  );
}
