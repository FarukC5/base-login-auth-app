import React, { useState, useEffect } from "react";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  TextField,
  Typography,
  Container,
  makeStyles,
  DialogContentText,
} from "@material-ui/core";
import { Redirect, Link } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { login } from "../auth/api-auth";
import validateLoginInput from "../validation/login";
import { list } from "../user/api-user";

const useStyles = makeStyles(() => ({
  container: {
    marginTop: "5%",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    width: "40%",
  },

  link: {
    textDecoration: "none",
  },
  cardAction: {
    justifyContent: "center",
  },
}));

const Login = () => {
  const classes = useStyles();
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    redirectToReferrer: false,
    token: null,
    users: [],
    inputError: {},
  });

  useEffect(() => {
    list().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, users: data });
      }
    });
    //eslint-disable-next-line
  }, []);

  const clickSubmit = async () => {
    const user = {
      email: values.email || undefined,
      password: values.password || undefined,
    };

    const { errors, isValid } = validateLoginInput(user, values);

    if (!isValid) {
      return setValues({ ...values, inputError: errors });
    }

   await login(user).then((data) => {
      if (data && data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          error: "",
          redirectToReferrer: true,
          token: data.token,
        });
      }
    });
  };

  const handleChange = (name) => (e) => {
    setValues({ ...values, [name]: e.target.value, error: "", inputError: {} });
  };

  const userId = () => {
    return jwtDecode(values.token)._id;
  };

  const { redirectToReferrer } = values;

  if (redirectToReferrer) {
    return <Redirect to={"/" + userId()} />;
  }

  return (
    <>
      <Container maxWidth="sm" className={classes.container}>
        <Card align="center">
          <CardContent action="submit" className={classes.content}>
            <Typography align="center" variant="h6">
              Log in
            </Typography>
            <TextField
              id="email"
              type="email"
              label="Email"
              value={values.email}
              onChange={handleChange("email")}
              margin="normal"
            />
            <DialogContentText color="error">
              {values.inputError.email}
            </DialogContentText>

            <TextField
              id="password"
              type="password"
              label="Password"
              value={values.password}
              onChange={handleChange("password")}
              margin="normal"
            />

            <DialogContentText color="error">
              {values.inputError.password}
              {values.error}
            </DialogContentText>
          </CardContent>

          <CardActions className={classes.cardAction}>
            <Button
              className={classes.button}
              color="primary"
              variant="contained"
              onClick={clickSubmit}
            >
              Submit
            </Button>
          </CardActions>
          <CardContent>
            Don't have an account?&nbsp;
            <Link color="primary" className={classes.link} to="/register">
              Register
            </Link>
          </CardContent>
        </Card>
      </Container>
    </>
  );
};

export default Login;
