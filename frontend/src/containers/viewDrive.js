import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { getToken } from "../helpers/authHelper";
import axios from "axios";
import { serverUrl } from "../configs/config";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export default function BasicTable() {
  const [rowsNew, setRowsNew] = useState([]);

  useEffect(() => {
    const body = { token: getToken() };
    axios.post(`${serverUrl}/readDrive`, body).then((response) => {
      console.log(response);
      setRowsNew(response.data);
    });
  }, []);

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
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="center">{row.id}</TableCell>
                <TableCell align="right">{row.kind}</TableCell>
                <TableCell align="right">{row.mimeType}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>
    </TableContainer>
  );
}
