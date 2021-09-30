import React, { useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { getLoggedUserData } from "../../helpers/authHelper";
import queryString from "query-string";
import { serverUrl } from "../../configs/config";

const theme = createTheme();

export default function Verify() {
  const location = useLocation();
  const history = useHistory();

  // get access token using code
  useEffect(() => {
    const body = { code: queryString.parse(location.search) };
    axios.post(`${serverUrl}/getToken`, body).then((response) => {
      const serializedValue = JSON.stringify(response.data);
      // Save access token in localStorage
      localStorage.setItem("token", serializedValue);  
      getLoggedUserData(response.data, history);
    });
  }, [location]);


  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Signing....
          </Typography>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
