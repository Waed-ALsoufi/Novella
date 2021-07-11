import React, { useEffect, useState } from 'react';
import { db } from './firebase';
import {
  Grid,
  Typography,
  CardMedia,
  Card,
  CardContent,
} from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  cover: {
    width: 151,
    height: 151,
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
  },
  userImage: {
    width: 30,
    height: 30,
    borderRadius: 50,
    objectFit: 'cover',
  },
  location: {
    marginTop: 10,
    marginLeft: 10,
  },
  accepted: {
    fontWeight: 100,
    float: 'right',
    marginLeft: 50,
    marginTop: 60,
    color: 'rgba(0, 200, 0, 0.7)',
  },
}));

function Regesters({ post, UserId, index }) {
  const classes = useStyles();
  const [bookImage, setBookImage] = useState();
  const [bookName, setBookName] = useState();
  const [bookAuthor, setBookAuthor] = useState();
  const [userName, setUserName] = useState();
  const [userImage, setUserImage] = useState();
  const [location, setLocation] = useState();
  const [accepted, setAccepted] = useState();

  useEffect(() => {
    db.collection('AllPosts')
      .doc(post.bookId)
      .onSnapshot((doc) => {
        setBookImage(doc.data().src);
        setBookName(doc.data().bookName);
        setBookAuthor(doc.data().bookAuthor);
        setLocation(doc.data().bookLocation);
        setAccepted(doc.data().accepted);
      });
    db.collection('users')
      .doc(post.OwnerId)
      .onSnapshot((doc) => {
        setUserName(doc.data().firstName + ' ' + doc.data().lastName);
        setUserImage(doc.data().image);
      });
  }, [post.bookId, post.OwnerId]);

  return (
    <Grid style={{ marginTop: 15 }}>
      <Card container className={classes.container}>
        <CardMedia
          item
          className={classes.cover}
          image={bookImage}
          title='Live from space album cover'
        />
        <Link
          to={`/Details/${post.bookId}`}
          style={{ textDecoration: 'none', color: 'black' }}
        >
          <CardContent container item>
            <Typography variant='h5'>{bookName}</Typography>
            <Typography variant='caption' color='textSecondary'>
              {bookAuthor}
            </Typography>
            <Grid container alignItems='center' className={classes.location}>
              <Grid container alignItems='center'>
                <img
                  src={userImage}
                  alt='user'
                  className={classes.userImage}
                  style={{ marginRight: 10 }}
                />
                <Typography variant='body2'>{userName}</Typography>
              </Grid>
              <Grid container alignItems='center' className={classes.location}>
                <LocationOnIcon fontSize='small' color='disabled' />
                <Typography variant='caption' color='textSecondary'>
                  {location}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>{' '}
        </Link>
        {accepted ? <h3 className={classes.accepted}>ACCEPTED</h3> : null}
      </Card>
    </Grid>
  );
}

export default Regesters;
