import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  Typography,
  Button,
  CardContent,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@material-ui/core";
import { logoutUser } from "../redux/actions/authActions";

const useStyles = makeStyles(() => ({
  container: {
    marginTop: "10%",
  },

  button: {
    textTransform: "none",
    marginTop: "40px",
    marginBottom: "5px",
  },
  link: { textDecoration: "none" },
}));

const ProfilePage  = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onUserLogout = (e) => {
    e.preventDefault();
    dispatch(logoutUser());
    navigate("/");
  };

  return (
    <Container maxWidth="sm" className={classes.container}>
      <Card align="center">
        <CardContent>
          <Typography variant="h6">Welcome {user.name}!</Typography>

          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={() => {
              setOpen(true);
            }}
          >
            Logout
          </Button>
        </CardContent>
      </Card>
      <Dialog open={open}>
        <DialogContent>
          <DialogContentText>You have been logged out.</DialogContentText>
        </DialogContent>

        <DialogActions>
          <Link to="/" className={classes.link}>
            <Button
              onClick={onUserLogout}
              color="primary"
            >
              Confirm
            </Button>
          </Link>
        </DialogActions>
      </Dialog>
    </Container>
  );
};
export default ProfilePage;
