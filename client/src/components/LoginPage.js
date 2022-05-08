import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
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
import { loginUser } from "../redux/actions/authActions";

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
    color: "blue",
  },
  error: {
    color: "red",
  },
  button: {
    marginLeft: "43%",
  },
}));

const LoginPage = () => {
  const classes = useStyles();
  const auth = useSelector((state) => state.auth);
  const authError = useSelector((state) => state.errors);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [inputError, setInputError] = useState({});
  const { email, password } = input;

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setInput((input) => ({ ...input, [name]: value }));
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email: input.email,
      password: input.password,
    };
    dispatch(loginUser(userData));
  };
  
  useEffect(() => {
    if (auth.isAuthenticated) navigate("/profile");
    if (authError !== inputError) setInputError(authError);
    // eslint-disable-next-line
  }, [auth.isAuthenticated, authError, inputError]);

  return (
    <Container maxWidth="sm" className={classes.container}>
      <Card align="center">
        <CardContent action="submit" className={classes.content}>
          <Typography align="center" variant="h6">
            Login
          </Typography>
          <TextField
            name="email"
            id="email"
            type="email"
            label="Email"
            margin="normal"
            value={email}
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
            value={password}
            onChange={onInputChange}
          />
          <DialogContentText className={classes.error}>
            {inputError.password}
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
          Don't have an account?&nbsp;
          <Link className={classes.link} to="/register">
            Register
          </Link>
        </CardContent>
      </Card>
    </Container>
  );
};

export default LoginPage;
