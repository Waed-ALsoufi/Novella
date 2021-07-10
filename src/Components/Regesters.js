import React, { useEffect, useState } from "react";
import { db } from "./firebase";
import {
  Grid,
  Typography,
  CardMedia,
  Card,
  CardContent,
  Avatar,
} from "@material-ui/core";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import { makeStyles, useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  cover: {
    width: 151,
    height: 151,
  },
  container: {
    display: "flex",
    flexDirection: "row",
  },
  userImage: {
    width: 30,
    height: 30,
    borderRadius: 50,
    objectFit: "cover",
  },
  location: {
    marginTop: 10,
    marginLeft: 10,
  },
}));

function Regesters({ post }) {
  const classes = useStyles();

  const [bookImage, setBookImage] = useState();
  const [bookName, setBookName] = useState();
  const [bookAuthor, setBookAuthor] = useState();
  const [userName, setUserName] = useState();
  const [userImage, setUserImage] = useState();
  const [location, setLocation] = useState();

  useEffect(() => {
    db.collection("AllPosts")
      .doc(post.bookId)
      .onSnapshot((doc) => {
        setBookImage(doc.data().src);
        setBookName(doc.data().bookName);
        setBookAuthor(doc.data().bookAuthor);
      });
    db.collection("users")
      .doc(post.OwnerId)
      .onSnapshot((doc) => {
        setUserName(doc.data().firstName + " " + doc.data().lastName);
        setUserImage(doc.data().image);
      });
  }, []);
  return (
    <Grid>
      <Card container className={classes.container}>
        <CardMedia
          item
          className={classes.cover}
          image={bookImage}
          title="Live from space album cover"
        />
        <CardContent container item>
          <Typography variant="h5">{bookName}</Typography>
          <Typography variant="caption" color="textSecondary">
            {bookAuthor}
          </Typography>
          <Grid container alignItems="center">
            <img
              src={userImage}
              className={classes.userImage}
              style={{ marginRight: 10 }}
            />
            <Typography variant="body2">{userName}</Typography>
          </Grid>
          <Grid container alignItems="center" className={classes.location}>
            <LocationOnIcon fontSize="small" color="disabled" />
            <Typography variant="caption" color="textSecondary">
              location
            </Typography>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default Regesters;