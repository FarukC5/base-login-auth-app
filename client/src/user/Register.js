import React, { useState, useEffect } from "react";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  TextField,
  Typography,
  Dialog,
  Container,
  makeStyles,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { create, list } from "./api-user";
import validateRegisterInput from "../validation/register";

const useStyles = makeStyles(() => ({
  container: {
    marginTop: "5%",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    width: "40%",
  },

  dialog: {
    justifyContent: "center",
  },

  link: {
    textDecoration: "none",
  },
}));

const Register = () => {
  const classes = useStyles();
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    repeatPassword: "",
    open: false,
    error: "",
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

  const clickHandler = async () => {
    const user = {
      name: values.name || undefined,
      email: values.email || undefined,
      password: values.password || undefined,
    };

    const { errors, isValid } = validateRegisterInput(user, values);

     if (!isValid) {
      return setValues({ ...values, inputError: errors });
    }
 
    await create(user).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, error: "", open: true });
      }
    });
  };

  const changeHandler = (name) => (e) => {
    setValues({ ...values, [name]: e.target.value, error: "", inputError: {} });
  };

  return (
    <div>
      <Container maxWidth="sm" className={classes.container}>
        <Card align="center">
          <CardContent className={classes.content}>
            <Typography variant="h6">Register</Typography>
            <TextField
              id="name"
              label="Name"
              value={values.name}
              onChange={changeHandler("name")}
              margin="normal"
            />
            <DialogContentText color="error">
              {values.inputError.name}
            </DialogContentText>
            <TextField
              id="email"
              label="Email"
              value={values.email}
              onChange={changeHandler("email")}
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
              onChange={changeHandler("password")}
              margin="normal"
            />
            <DialogContentText color="error">
              {values.inputError.password}
            </DialogContentText>
            <TextField
              id="repeatPassword"
              type="password"
              label="Repeat Password"
              value={values.repeatPassword}
              onChange={changeHandler("repeatPassword")}
              margin="normal"
            />

            <DialogContentText color="error">
              {values.inputError.repeatPassword}
              <br/>
              {values.error}
            </DialogContentText>
          </CardContent>

          <CardActions className={classes.dialog}>
            <Button color="primary" variant="contained" onClick={clickHandler}>
              Submit
            </Button>
          </CardActions>

          <CardContent>
            Already have an account?&nbsp;
            <Link className={classes.link} to="/login">
              Log in
            </Link>
          </CardContent>

          <Dialog open={values.open}>
            <DialogTitle>New Account</DialogTitle>
            <DialogContent>
              <DialogContentText>
                New account successfully created.
              </DialogContentText>
            </DialogContent>
            <DialogActions className={classes.dialog}>
              <Link to="/login" className={classes.link}>
                <Button
                  variant="outlined"
                  color="primary"
                  autoFocus="autoFocus"
                >
                  login
                </Button>
              </Link>
            </DialogActions>
          </Dialog>
        </Card>
      </Container>
    </div>
  );
};

export default Register;
