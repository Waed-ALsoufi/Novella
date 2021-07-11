import axios from 'axios';
import React, { useState } from 'react';
import {
  Typography,
  Grid,
  CardContent,
  CardMedia,
  Card,
  Button,
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import { useAuth } from './Auth';
import { db } from './firebase';
import firebase from 'firebase/app';

const useStyles = makeStyles((theme) => ({
  main: {
    minHeight: '100vh',
    marginTop: '70px',
  },
  root: {
    paddingTop: '10px',
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  taps: {
    padding: theme.spacing(2),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  img: {
    width: theme.spacing(15),
    height: theme.spacing(15),
  },
  info: {
    marginTop: '30px',
    marginLeft: '10px',
  },
  card: {
    padding: theme.spacing(2),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    margin: theme.spacing(1),
    width: '90px',
  },
  card2: {
    width: 250,
    '&:hover': {
      boxShadow: '0 8px 40px -12px rgba(0,0,0,0.3)',
    },
    margin: '10px',
    height: '250px',
  },
  textField: {
    border: 'none',
    padding: ' 15px',
    margin: ' 8px',
    borderRadius: '10px',
    width: '500px',
    outline: 'none',
    transition: '0.3s',
    height: ' 50px',
    backgroundColor: ' #f1f1f1',
    color: '#11111',
    fontSize: '20px',
    fontFamily: `'Playfair Display ', serif`,
    '&:focus': {
      outline: 'none',
    },
  },
  media: {
    paddingTop: '50%',
  },
}));

function WishList() {
  const classes = useStyles();
  const apiUrl = `https://www.googleapis.com/books/v1/volumes`;
  const [book, setBook] = useState('');
  const [result, setResult] = useState([]);
  const { currentUser } = useAuth();

  const updateWishList = (name, image) => {
    db.collection('users')
      .doc(currentUser.uid)
      .update({
        wishList: firebase.firestore.FieldValue.arrayUnion({ name, image }),
      })
      .then(() => {
        console.log('Document successfully updated!');
      })
      .catch((error) => {
        console.error('Error updating document: ', error);
      });
  };

  function handleChange(event) {
    const bookSearch = event.target.value;
    setBook(bookSearch);
  }
  function handleSubmit(event) {
    event.preventDefault();
    axios.get(`${apiUrl}?q=${book}`).then((data) => {
      console.log(data.data.items);
      setResult(data.data.items);
    });
  }
  return (
    <div className={classes.main}>
      <Grid className={classes.root}>
        <Grid item xs={6}>
          <Typography
            variant='h4'
            align='center'
            style={{
              fontFamily: ` 'Sriracha', cursive`,
              color: '#440a67',
              marginTop: '40px',
            }}
            gutterBottom
          >
            Create Your Wish List
          </Typography>
          <Grid container direction='row' spacing={3}>
            <Grid item>
              <input
                type='text'
                className={classes.textField}
                placeholder='Search By Book Name'
                onChange={handleChange}
                value={book}
              />
            </Grid>

            <Grid item style={{ display: 'flex' }}>
              <Button
                className={classes.button}
                variant='contained'
                onClick={handleSubmit}
                style={{ backgroundColor: '#440a67', color: '#FFFFFF' }}
              >
                Search
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid container direction='row' className={classes.taps} spacing={3}>
          {result.map((book) =>
            book.volumeInfo.imageLinks !== undefined ? (
              <Grid key={book.id}>
                <Card className={classes.card2}>
                  <CardMedia
                    className={classes.media}
                    image={
                      book.volumeInfo.imageLinks !== undefined
                        ? book.volumeInfo.imageLinks.thumbnail
                        : ''
                    }
                  />
                  <CardContent>
                    <div style={{ height: '50px', marginBottom: '5px' }}>
                      <Typography
                        variant='subtitle1'
                        component={'span'}
                        gutterBottom
                      >
                        {book.volumeInfo.title}
                      </Typography>
                    </div>
                    <hr style={{ borderTop: '1px solid #d299c2' }} />
                    <Button
                      variant='contained'
                      color='default'
                      size='small'
                      style={{
                        marginTop: '10px',
                        fontSize: '13px',
                        backgroundColor: '#753a99',
                        color: '#FFFFFF',
                      }}
                      onClick={() => {
                        updateWishList(
                          book.volumeInfo.title,
                          book.volumeInfo.imageLinks.thumbnail
                        );
                      }}
                    >
                      Want To Read
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ) : null
          )}
        </Grid>
      </Grid>
    </div>
  );
}

export default WishList;
