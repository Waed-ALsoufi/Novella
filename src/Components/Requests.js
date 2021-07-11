import React, { useEffect, useState } from "react";
import { db } from "./firebase";
import {
  Grid,
  Typography,
  CardMedia,
  Card,
  CardContent,
  Button,
} from "@material-ui/core";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  cover: {
    width: 151,
    height: 151,
  },
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
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
  acceptButton: {
    margin: 10,
  },
  acceptedButton: {
    float: "right",
    height: 50,
    cursor: "pointer",
  },
}));

function Requests({ post, postIndex, key }) {
  const classes = useStyles();

  const [bookImage, setBookImage] = useState();
  const [bookName, setBookName] = useState();
  const [bookAuthor, setBookAuthor] = useState();
  const [userName, setUserName] = useState();
  const [userImage, setUserImage] = useState();
  const [location, setLocation] = useState();
  const [accepted, setAccepted] = useState();

  useEffect(() => {
    db.collection("AllPosts")
      .doc(post.bookId)
      .onSnapshot((doc) => {
        setBookImage(doc.data().src);
        setBookName(doc.data().bookName);
        setBookAuthor(doc.data().bookAuthor);
        setLocation(doc.data().bookLocation);
        setAccepted(doc.data().accepted);
      });
    db.collection("users")
      .doc(post.consumerID)
      .onSnapshot((doc) => {
        setUserName(doc.data().firstName + " " + doc.data().lastName);
        setUserImage(doc.data().image);
      });
  }, [post]);

  const acceptRequest = () => {
    db.collection("AllPosts").doc(post.bookId).update({ accepted: true });
  };
  return (
    <Grid key={key}>
      <Card container className={classes.container}>
        <CardMedia
          item
          className={classes.cover}
          image={bookImage}
          title="Live from space album cover"
        />
        <Link
          to={`/Details/${post.bookId}`}
          style={{ textDecoration: "none", color: "black" }}
        >
          <CardContent container item>
            <Grid container>
              <Grid item>
                <Typography variant="h5">{bookName}</Typography>
                <Typography variant="caption" color="textSecondary">
                  {bookAuthor}
                </Typography>
                <Grid container alignItems="center">
                  <img
                    src={userImage}
                    alt="user"
                    className={classes.userImage}
                    style={{ marginRight: 10 }}
                  />
                  <Typography variant="body2">{userName}</Typography>
                </Grid>
                <Grid
                  container
                  alignItems="center"
                  className={classes.location}
                >
                  <LocationOnIcon fontSize="small" color="disabled" />
                  <Typography variant="caption" color="textSecondary">
                    {location}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Link>
        {accepted ? (
          <Button
            variant="contained"
            color="default"
            size="small"
            style={{
              marginLeft: "200px",
              width: "160px",
              height: "40px",
              backgroundColor: "rgba(0, 170, 0, 0.6)",
              color: "#FFFFFF",
            }}
            disabled
          >
            Accepted
          </Button>
        ) : (
          <Button
            onClick={acceptRequest}
            variant="contained"
            color="default"
            size="small"
            style={{
              marginLeft: "200px",
              width: "160px",
              height: "40px",
              backgroundColor: "rgba(0, 120, 0, 0.5)",
              color: "#FFFFFF",
            }}
          >
            Accept
          </Button>
        )}
      </Card>
    </Grid>
  );
}

export default Requests;
