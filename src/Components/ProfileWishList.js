import React, { useState, useEffect } from 'react';
import {
  Typography,
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
} from '@material-ui/core';
import useStyles from './UseStyle';
import { Link } from 'react-router-dom';
import app from '../Components/firebase';

function ProfileWishList({ UserId }) {
  const classes = useStyles();
  const [wishList, setWishList] = useState([]);

  useEffect(() => {
    app
      .firestore()
      .collection('users')
      .doc(UserId)
      .get()
      .then((doc) => {
        setWishList(doc.data().wishList);
      });
  }, [UserId]);
  return (
    <>
      <div className={classes.Wishlist}>
        <Typography
          variant='h4'
          component={'span'}
          style={{
            fontFamily: ` 'Sriracha', cursive`,
            color: '#440a67',
          }}
          gutterBottom
        >
          My Book Wishlist
        </Typography>
        <Link
          style={{ textDecoration: 'none', color: 'black' }}
          to={{
            pathname: '/WishList',
          }}
        >
          <Button
            variant='contained'
            color='default'
            size='small'
            style={{
              marginLeft: '350px',
              width: '160px',
              height: '40px',
              backgroundColor: '#753a99',
              color: '#FFFFFF',
            }}
          >
            Search for book
          </Button>
        </Link>
      </div>
      <hr style={{ borderTop: '1px solid #11111' }} />
      <div style={{ marginTop: '20px' }}>
        <Grid container direction='row' spacing={3}>
          {wishList &&
            wishList.map((book) => (
              <Grid key={book.id}>
                <Card className={classes.card2}>
                  <CardMedia className={classes.media} image={book.image} />
                  <CardContent>
                    <Typography
                      variant='subtitle1'
                      component={'span'}
                      gutterBottom
                    >
                      {book.name}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
        </Grid>
      </div>
    </>
  );
}
export default ProfileWishList;
