import React from "react";
import {
  makeStyles,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
} from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles(() => ({
  title: {
    marginTop: "5%",
  },

  container: {
    marginTop: "5%",
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
const Home = () => {
  const classes = useStyles();

  return (
    <>
      <Container maxWidth="sm" className={classes.container}>
        <Card>
          <Typography variant="h5" className={classes.title}>
            Base Login Auth App
          </Typography>

          <Card align="center" className={classes.card}>
            <Grid container spacing={3}>
              <CardContent className={classes.content}>
                <Link to="login" className={classes.link}>
                  <Button color="primary" variant="contained">
                    Log in
                  </Button>
                </Link>
              </CardContent>
            </Grid>

            <Grid container spacing={3}>
              <CardContent className={classes.content}>
                <Link to="register" className={classes.link}>
                  <Button color="primary" variant="contained">
                    Register
                  </Button>
                </Link>
              </CardContent>
            </Grid>
          </Card>
        </Card>
      </Container>
    </>
  );
};

export default Home;
