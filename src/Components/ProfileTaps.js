import React, { useState, useEffect } from 'react';
import app from '../Components/firebase';
import useStyles from './UseStyle';
import PropTypes from 'prop-types';
import { Typography, Grid, Tabs, Tab, Box } from '@material-ui/core';
import GridOnIcon from '@material-ui/icons/GridOn';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import { useAuth } from '../Components/Auth';
import { Link } from 'react-router-dom';
import Regesters from '../Components/Regesters';
import Requests from '../Components/Requests';
import ProfilePosts from './ProfilePosts';
import ProfileWishList from './ProfileWishList';
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`scrollable-prevent-tabpanel-${index}`}
      aria-labelledby={`scrollable-prevent-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography component={'span'} variant={'body2'}>
            {children}
          </Typography>
        </Box>
      )}
    </div>
  );
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};
function a11yProps(index) {
  return {
    id: `scrollable-prevent-tab-${index}`,
    'aria-controls': `scrollable-prevent-tabpanel-${index}`,
  };
}

function ProfileTaps({ UserId }) {
  const classes = useStyles();
  const { currentUser } = useAuth();
  const [value, setValue] = useState(0);
  const [regesters, setRegesters] = useState([]);
  const [requests, setRequests] = useState([]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    app
      .firestore()
      .collection('users')
      .doc(UserId)
      .get()
      .then((doc) => {
        setRegesters(doc.data().sentExchanges);
        setRequests(doc.data().unapprovedExchanges);
      });
  }, [UserId]);
  return (
    <>
      {currentUser.uid === UserId ? (
        <Tabs
          value={value}
          onChange={handleChange}
          variant='fullWidth'
          TabIndicatorProps={{
            style: { background: '#440a67', height: '4px' },
          }}
        >
          <Tab
            icon={
              <GridOnIcon className={value === 0 ? classes.active : null} />
            }
            className={value === 0 ? classes.active : null}
            label='POSTS'
            {...a11yProps(0)}
          />
          <Tab
            className={value === 1 ? classes.active : null}
            icon={
              <FavoriteIcon className={value === 1 ? classes.active : null} />
            }
            label='Regesters'
            {...a11yProps(1)}
          />
          <Tab
            className={value === 2 ? classes.active : null}
            icon={
              <PersonPinIcon className={value === 2 ? classes.active : null} />
            }
            label='Requests'
            {...a11yProps(2)}
          />
          <Tab
            className={value === 3 ? classes.active : null}
            icon={
              <FavoriteIcon className={value === 3 ? classes.active : null} />
            }
            label='Wishlist'
            {...a11yProps(3)}
          />
        </Tabs>
      ) : (
        <Tabs
          value={value}
          onChange={handleChange}
          TabIndicatorProps={{
            style: { background: '#440a67', height: '4px' },
          }}
        >
          <Tab
            icon={<GridOnIcon className={classes.active} />}
            className={classes.active}
            label='POSTS'
            {...a11yProps(0)}
          />
        </Tabs>
      )}

      <TabPanel value={value} index={0}>
        <ProfilePosts UserId={UserId} />
      </TabPanel>
      <TabPanel value={value} index={1} style={{ minHeight: '200px' }}>
        {regesters.length > 0 ? (
          regesters.map((post) => (
            <Link
              to={`/Details/${post.bookId}`}
              style={{ textDecoration: 'none ' }}
              key={post.id}
            >
              <Regesters key={post.id} post={post} />
            </Link>
          ))
        ) : (
          <Grid container item alignItems='center'>
            <Typography variant='body1'>
              Here you can see the posts that you regestered!
            </Typography>
          </Grid>
        )}{' '}
      </TabPanel>
      <TabPanel value={value} index={2} style={{ minHeight: '200px' }}>
        {requests.length > 0 ? (
          requests.map((post) => (
            <Link
              to={`/Details/${post.bookId}`}
              style={{ textDecoration: 'none ' }}
              key={post.id}
            >
              <Requests key={post.id} post={post} />
            </Link>
          ))
        ) : (
          <Grid container item alignItems='center'>
            <Typography variant='body1'>
              Here you can see the posts that people request from you!
            </Typography>
          </Grid>
        )}{' '}
      </TabPanel>
      <TabPanel value={value} index={3} style={{ minHeight: '200px' }}>
        <ProfileWishList UserId={UserId} />
      </TabPanel>
    </>
  );
}
export default ProfileTaps;
