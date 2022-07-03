import React, { useState, useEffect } from "react";
import { Redirect, useHistory } from "react-router-dom";
import {
  Typography,
  CardContent,
  Card,
  Container,
  makeStyles,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  LinearProgress,
} from "@material-ui/core";
import { read } from "./api-user";
import { logout } from "../auth/api-auth";

const useStyles = makeStyles(() => ({
  container: {
    marginTop: "5%",
  },

  button: {
    textTransform: "none",
    marginTop: "40px",
    marginBottom: "5px",
  },

  link: { textDecoration: "none" },
  dialog: { justifyContent: "center" },
}));

const Profile = ({ match }) => {
  const classes = useStyles();
  const [values, setValues] = useState({
    name: "",
    email: "",
    error: "",
    open: false,
  });

  useEffect(() => {
    read({ userId: match.params.userId }).then((data) => {
      if (data && data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, name: data.name});
      }
    });
    //eslint-disable-next-line
  }, [match.params.userId]);

  const history = useHistory();

  const logoutUser = () => {
    setValues({ ...values, open: true });
    setTimeout(() => {
      logout().then(() => history.push("/"));
    }, 1234);
  };

  if (values.error || values.name === undefined) {
    logout();
    return <Redirect to={"/"} />;
  }

  return (
    <>
      <Container maxWidth="sm" className={classes.container}>
        <Card align="center">
          <CardContent>
            <div>
              {!values.name ? (
                <LinearProgress />
              ) : (
                <Typography variant="h6">Welcome {values.name}!</Typography>
              )}
            </div>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={logoutUser}
            >
              Log out
            </Button>
            {values.error && (
              <Typography component="p" color="error">
                {values.error}
                <Redirect to="/" />
              </Typography>
            )}
          </CardContent>
        </Card>
        <Dialog open={values.open}>
          <br />
          <br />
          <DialogContent>
            <DialogContentText variant="h6">
              You have been logged out.
            </DialogContentText>
          </DialogContent>
          <br />
        </Dialog>
      </Container>
    </>
  );
};

export default Profile;
