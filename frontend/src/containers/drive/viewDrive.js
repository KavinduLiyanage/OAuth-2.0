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

const fileDownload = require("js-file-download");

export default function BasicTable() {
  const [rowsNew, setRowsNew] = useState([]);

  useEffect(() => {
    const body = { token: getToken() };
    axios.post(`${serverUrl}/readDrive`, body).then((response) => {
      console.log(response);
      setRowsNew(response.data);
    });
  }, []);

  const handleDownload = (id) => {
    console.log(id);
    const body = { token: getToken() };
    axios
      .post(`${serverUrl}/download/${id}`, body, { responseType: "blob" })
      .then((response) => {
        console.log(response);
        console.log(rowsNew.find((item) => item.id === id));
        fileDownload(
          response.data,
          rowsNew.find((item) => item.id === id).name
        );
      });
  };

  const handleDelete = (id) => {
    console.log(id);
    const body = { token: getToken() };
    axios.post(`${serverUrl}/deleteFile/${id}`, body).then((response) => {
      console.log(response);
    });
  };

  return (
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
        {rowsNew.length > 0 && (
          <TableBody>
            {rowsNew.map((row) => (
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
  );
}
