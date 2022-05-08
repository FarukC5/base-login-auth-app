import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  CardContent,
  Button,
  Container,
  Card,
  Typography,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@material-ui/core";
import { logoutUser } from "../redux/actions/authActions";

const useStyles = makeStyles(() => ({
  title: {
    marginTop: "5%",
  },

  container: {
    marginTop: "10%",
  },

  content: {
    backgroundColor: "",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    background: "white",
    marginBottom: "50px",
    marginTop: "50px",
  },

  card: {
    display: "flex",
  },

  link: { textDecoration: "none" },
  logout: { textTransform: "none", margin: "20px" },

  button: {
    textTransform: "none",
    marginTop: "20px",
    marginBottom: "5px",
  },
}));

const HomePage = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onUserLogout = (e) => {
    e.preventDefault();
    dispatch(logoutUser());
    navigate("/");
    setOpen(true);
  };

  return (
    <Container maxWidth="sm" className={classes.container}>
      {!!auth.isAuthenticated && (
        <Container maxWidth="sm">
          <Card align="center">
            <CardContent>
              <Typography variant="h6">Hello {user.name}!</Typography>
              <DialogContent>
                <DialogContentText>
                  You are currently logged in
                </DialogContentText>
              </DialogContent>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={onUserLogout}
              >
                Logout
              </Button>
            </CardContent>
          </Card>
        </Container>
      )}

      {!auth.isAuthenticated && (
        <Card>
          <Typography variant="h5" className={classes.title}>
            Base Login Auth App
          </Typography>

          <Card align="center" className={classes.card}>
            <Grid container spacing={3}>
              <CardContent className={classes.content}>
                <Typography variant="h6">Login to your account</Typography>
                <br />
                <Link to="login" className={classes.link}>
                  <Button color="primary" variant="contained">
                    Login
                  </Button>
                </Link>
              </CardContent>
            </Grid>

            <Grid container spacing={3}>
              <CardContent className={classes.content}>
                <Typography variant="h6">Register for account</Typography>
                <br />
                <Link to="register" className={classes.link}>
                  <Button color="primary" variant="contained">
                    Register
                  </Button>
                </Link>
              </CardContent>
            </Grid>
          </Card>
        </Card>
      )}
      {!auth.isAuthenticated && open && (
        <Dialog open={open}>
          <DialogContent>
            <DialogContentText>You have been logged out.</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Link to="/" className={classes.link}>
              <Button
                onClick={() => {
                  setOpen(false);
                }}
                color="primary"
                autoFocus="autoFocus"
              >
                Confirm
              </Button>
            </Link>
          </DialogActions>
        </Dialog>
      )}
    </Container>
  );
};

export default HomePage;
