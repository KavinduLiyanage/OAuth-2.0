import React from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { getUserInfo } from "../helpers/authHelper";
import PrimarySearchAppBar from "../components/appBar";

const theme = createTheme();

export default function MyAccount() {
  return (
    <ThemeProvider theme={theme}>
      <PrimarySearchAppBar />
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
            <AccountCircleIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            My Account
          </Typography>
          <img
            src={getUserInfo().picture}
            alt="profile-img"
            style={{ width: "100px" }}
          />
          <Typography component="h1" variant="h5">
          {getUserInfo().name}
          </Typography>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
