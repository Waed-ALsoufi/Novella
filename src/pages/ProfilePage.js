import React, { useState } from 'react';
import UserLabel from '../Components/UserLabel';
import ProfileTaps from '../Components/ProfileTaps';
import { Paper, Grid } from '@material-ui/core';
import useStyles from '../Components/UseStyle';
import Loading from '../Components/Loading';

export default function ProfilePage(props) {
  const classes = useStyles();
  const UserId = props.match.params.UserId;
  const [isLoading, setisLoading] = useState(true);

  setTimeout(() => {
    setisLoading(false);
  }, 1000);
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className={classes.main}>
      <Grid className={classes.root}>
        <Paper className={classes.paper}>
          <UserLabel UserId={UserId} />
        </Paper>
        <Paper square className={classes.taps}>
          <ProfileTaps UserId={UserId} />
        </Paper>
      </Grid>
    </div>
  );
}
