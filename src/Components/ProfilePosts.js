import React, { useState, useEffect } from 'react';
import app from '../Components/firebase';
import {
  Typography,
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
} from '@material-ui/core';
import { useAuth } from '../Components/Auth';
import { Link } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';
import useStyles from './UseStyle';

function ProfilePosts({ UserId }) {
  const classes = useStyles();
  const { currentUser } = useAuth();
  const [userPosts, setUserPosts] = useState([]);
  useEffect(() => {
    app
      .firestore()
      .collection('AllPosts')
      .onSnapshot((item) => {
        const all = [];
        item.forEach((doc) => {
          const data = doc.data();
          data.id = doc.id;
          all.push(data);
          const posts = all.filter((post) => post.publisherId === UserId);
          setUserPosts(posts);
        });
      });
  }, [UserId]);

  return (
    <>
      {userPosts.length > 0 ? (
        <Grid container direction='row' spacing={3}>
          {userPosts.map((post) => (
            <Link
              style={{ textDecoration: 'none', color: 'black' }}
              to={{
                pathname: `/Details/${post.id}`,
              }}
              key={post.id}
            >
              <Grid key={post.id}>
                <Card className={classes.card2}>
                  <CardMedia className={classes.media} image={post.src} />
                  <CardContent>
                    <Typography
                      variant='subtitle1'
                      component={'span'}
                      gutterBottom
                    >
                      {post.bookName}
                    </Typography>
                    <br />
                    <Typography
                      variant='subtitle2'
                      component={'span'}
                      color='textSecondary'
                    >
                      {post.bookAuthor}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Link>
          ))}
        </Grid>
      ) : (
        <div className={classes.NoPosts}>
          <Typography variant='h4' component={'span'} gutterBottom>
            No Posts Yet
          </Typography>
          {currentUser.uid === UserId ? (
            <Link
              style={{ textDecoration: 'none', color: 'black' }}
              to={{
                pathname: '/Publish',
              }}
            >
              <Button
                variant='contained'
                color='default'
                size='small'
                startIcon={<AddIcon />}
                style={{ backgroundColor: '#440a67', color: '#FFFFFF' }}
              >
                Add Book
              </Button>
            </Link>
          ) : null}
        </div>
      )}
    </>
  );
}
export default ProfilePosts;
