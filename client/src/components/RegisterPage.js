import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  Typography,
  TextField,
  Button,
  CardContent,
  CardActions,
  Card,
  DialogContentText,
} from "@material-ui/core";
import { registerUser } from "../redux/actions/authActions";

const useStyles = makeStyles(() => ({
  container: {
    marginTop: "10%",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    width: "40%",
  },

  link: {
    textDecoration: "none",
  color:"blue",
  },

  error: {
    color: "red",
  },

  button: {
    marginLeft:"43%"
  }
}));

const RegisterPage = () => {
  const classes = useStyles();
  const auth = useSelector((state) => state.auth);
  const authError = useSelector((state) => state.errors);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const [inputError, setInputError] = useState({});

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setUser((user) => ({ ...user, [name]: value }));
  };

  const onFormSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      name: user.name,
      email: user.email,
      password: user.password,
      password2: user.password2,
    };
    dispatch(registerUser(newUser));
  };

  useEffect(() => {
    if (auth.registered) navigate("/login"); 
    if (authError !== inputError) setInputError(authError);
  // eslint-disable-next-line
  }, [auth.registered, authError, inputError]);

  return (
    <Container maxWidth="sm" className={classes.container} >
      <Card align="center">
        <CardContent className={classes.content}>
          <Typography variant="h6">Register</Typography>
          <TextField
            name="name"
            id="name"
            type="name"
            label="Name"
            margin="normal"
            value={user.name}
            onChange={onInputChange}
          />

          <DialogContentText className={classes.error}>
            {inputError.name}
          </DialogContentText>
          <TextField
            name="email"
            id="email"
            type="email"
            label="Email"
            margin="normal"
            value={user.email}
            onChange={onInputChange}
          />
          <DialogContentText className={classes.error}>
            {inputError.email}
          </DialogContentText>
          <TextField
            name="password"
            id="password"
            type="password"
            label="Password"
            margin="normal"
            value={user.password}
            onChange={onInputChange}
          />
          <DialogContentText className={classes.error}>
            {inputError.password}
          </DialogContentText>
          <TextField
            name="password2"
            id="confirm_password"
            type="password"
            label="Confirm Password"
            margin="normal"
            value={user.password2}
            onChange={onInputChange}
          />
          <DialogContentText className={classes.error}>
            {inputError.password2}
          </DialogContentText>
        </CardContent>

        <CardActions>
          <Button
           className={classes.button}
            color="primary"
            variant="contained"
            onClick={onFormSubmit}
          >
            Submit
          </Button>
        </CardActions>

        <CardContent>
          Already have an account?&nbsp;
          <Link  className={classes.link} to="/login">
            Login
          </Link>
        </CardContent>
      </Card>
    </Container>
  );
};

export default RegisterPage;
