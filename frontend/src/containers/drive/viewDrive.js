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

export default function BasicTable() {
  const [rowsNew, setRowsNew] = useState([]);

  useEffect(() => {
    const body = { token: getToken() };
    axios.post(`${serverUrl}/readDrive`, body).then((response) => {
      console.log(response);
      setRowsNew(response.data);
    });
  }, []);

  const handleRowClick = (id) => {
    const body = { token: getToken() };
    axios.post(`${serverUrl}/download/${id}`, body).then((response) => {
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
          </TableRow>
        </TableHead>
        {rowsNew.length > 0 && (
          <TableBody>
            {rowsNew.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  name={row.id}
                  onClick={(e) => handleRowClick(e.target.name)}
                  component="th"
                  scope="row"
                >
                  {row.name}
                </TableCell>
                <TableCell name={row.id} align="center">
                  {row.id}
                </TableCell>
                <TableCell name={row.id} align="right">
                  {row.kind}
                </TableCell>
                <TableCell name={row.id} align="right">
                  {row.mimeType}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>
    </TableContainer>
  );
}
