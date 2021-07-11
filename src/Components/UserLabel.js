import React, { useState, useEffect } from "react";
import app from "../Components/firebase";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Button, Grid, Avatar } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import { useAuth } from "../Components/Auth";
import { Link } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: "90px",
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  paper: {
    width: "70%",
  },
  img: {
    width: theme.spacing(15),
    height: theme.spacing(15),
  },
  info: {
    marginTop: "30px",
    marginLeft: "10px",
  },
  card: {
    padding: theme.spacing(2),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    margin: theme.spacing(1),
    width: "90px",
  },
}));
function UserLabel({ UserId }) {
  const classes = useStyles();
  const { currentUser } = useAuth();
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState();
  const [bio, setBio] = useState("");
  const [country, setCountry] = useState("");
  useEffect(() => {
    app
      .firestore()
      .collection("users")
      .doc(UserId)
      .get()
      .then((doc) => {
        setUsername(`${doc.data().firstName} ${doc.data().lastName}`);
        setAvatar(doc.data().image);
        setCountry(doc.data().country);
        setBio(doc.data().bio);
      });
  }, [UserId]);

  return (
    <Grid container spacing={2} className={classes.card}>
      <Grid item>
        <Avatar alt="" src={avatar} className={classes.img} />
      </Grid>
      <Grid
        item
        container
        xs={6}
        direction="column"
        spacing={2}
        className={classes.info}
      >
        <Typography variant="body2" component={"span"} gutterBottom>
          {username}
        </Typography>
        <Typography variant="body2" component={"span"} color="textSecondary">
          {bio}
        </Typography>

        <Typography variant="body2" component={"span"}>
          {country}
        </Typography>
        {currentUser.uid === UserId ? (
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to={{
              pathname: "/EditeProfile",
            }}
          >
            <Button
              variant="contained"
              color="default"
              size="small"
              className={classes.button}
              startIcon={<EditIcon />}
              style={{ backgroundColor: "#753a99", color: "#FFFFFF" }}
            >
              Edit
            </Button>
          </Link>
        ) : null}
      </Grid>
    </Grid>
  );
}
export default UserLabel;
