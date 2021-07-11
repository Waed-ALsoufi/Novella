import React, { useState, useEffect } from "react";
import app from "../Components/firebase";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Loading from "../Components/Loading";

import {
  Typography,
  Button,
  Paper,
  Grid,
  Avatar,
  Tabs,
  Tab,
  Box,
  Card,
  CardMedia,
  CardContent,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import GridOnIcon from "@material-ui/icons/GridOn";
import FavoriteIcon from "@material-ui/icons/Favorite";
import PersonPinIcon from "@material-ui/icons/PersonPin";
// import GridOffIcon from '@material-ui/icons/GridOff';
import AddIcon from "@material-ui/icons/Add";
import { useAuth } from "../Components/Auth";
import { Link } from "react-router-dom";
import Regesters from "../Components/Regesters";
import Requests from "../Components/Requests";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-prevent-tabpanel-${index}`}
      aria-labelledby={`scrollable-prevent-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography component={"span"} variant={"body2"}>
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
    "aria-controls": `scrollable-prevent-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  main: {
    minHeight: "100vh",
    backgroundImage: "linear-gradient(to top, #d299c2 0%, #fef9d7 100%)",
  },
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
  taps: {
    width: "70%",
  },
  card2: {
    width: 250,
    "&:hover": {
      boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    },
    margin: "10px",
  },
  media: {
    paddingTop: "50%",
  },
  active: {
    color: "#440a67",
  },
  NoPosts: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "50px",
    flexDirection: "column",
  },
  Wishlist: {
    display: "flex",
    justifyContent: "spaceBetween",
    flexDirection: "row",
    alignItems: "spaceBetween",
  },
}));

export default function ProfilePage(props) {
  const classes = useStyles();
  const { currentUser } = useAuth();
  const [isLoading, setisLoading] = useState(false);
  const UserId = props.match.params.UserId;
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState();
  const [bio, setBio] = useState("");
  const [country, setCountry] = useState("");
  const [value, setValue] = useState(0);
  const [userPosts, setUserPosts] = useState([]);
  const [wishList, setWishList] = useState([]);

  const [regesters, setRegesters] = useState([]);
  const [requests, setRequests] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    setisLoading(true);
    app
      .firestore()
      .collection("AllPosts")
      .get()
      .then((item) => {
        const all = [];
        item.forEach((doc) => {
          const data = doc.data();
          data.id = doc.id;
          all.push(data);
          const posts = all.filter((post) => post.publisherId === UserId);
          setUserPosts(posts);
        });
      });
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
        setWishList(doc.data().wishList);
        setisLoading(false);
        setRegesters(doc.data().sentExchanges);
        setRequests(doc.data().unapprovedExchanges);
      });
  }, [UserId]);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className={classes.main}>
      <Grid className={classes.root}>
        <Paper className={classes.paper}>
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
              <Typography
                variant="body2"
                component={"span"}
                color="textSecondary"
              >
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
                  >
                    Edit
                  </Button>
                </Link>
              ) : null}
            </Grid>
          </Grid>
        </Paper>
        <Paper square className={classes.taps}>
          {currentUser.uid === UserId ? (
            <Tabs
              value={value}
              onChange={handleChange}
              variant="fullWidth"
              TabIndicatorProps={{
                style: { background: "#440a67", height: "4px" },
              }}
            >
              <Tab
                icon={
                  <GridOnIcon className={value === 0 ? classes.active : null} />
                }
                className={value === 0 ? classes.active : null}
                label="POSTS"
                {...a11yProps(0)}
              />
              <Tab
                className={value === 1 ? classes.active : null}
                icon={
                  <FavoriteIcon
                    className={value === 1 ? classes.active : null}
                  />
                }
                label="Regesters"
                {...a11yProps(1)}
              />
              <Tab
                className={value === 2 ? classes.active : null}
                icon={
                  <PersonPinIcon
                    className={value === 2 ? classes.active : null}
                  />
                }
                label="Requests"
                {...a11yProps(2)}
              />
              <Tab
                className={value === 3 ? classes.active : null}
                icon={
                  <FavoriteIcon
                    className={value === 3 ? classes.active : null}
                  />
                }
                label="Wishlist"
                {...a11yProps(3)}
              />
            </Tabs>
          ) : null}
          {currentUser.uid !== UserId ? (
            <Tabs
              value={value}
              onChange={handleChange}
              TabIndicatorProps={{
                style: { background: "#440a67", height: "4px" },
              }}
            >
              <Tab
                icon={<GridOnIcon className={classes.active} />}
                className={classes.active}
                label="POSTS"
                {...a11yProps(0)}
              />
            </Tabs>
          ) : null}
          <TabPanel value={value} index={0}>
            {userPosts.length > 0 ? (
              <Grid container direction="row" spacing={3}>
                {userPosts.map((post) => (
                  <Link
                    style={{ textDecoration: "none", color: "black" }}
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
                            variant="subtitle1"
                            component={"span"}
                            gutterBottom
                          >
                            {post.bookName}
                          </Typography>
                          <br />
                          <Typography
                            variant="subtitle2"
                            component={"span"}
                            color="textSecondary"
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
                {/* <GridOffIcon style={{ fontSize: 60 }} /> */}
                <Typography variant="h4" component={"span"} gutterBottom>
                  No Posts Yet
                </Typography>
                {currentUser.uid === UserId ? (
                  <Link
                    style={{ textDecoration: "none", color: "black" }}
                    to={{
                      pathname: "/Publish",
                    }}
                  >
                    <Button
                      variant="contained"
                      color="default"
                      size="small"
                      startIcon={<AddIcon />}
                    >
                      Add Book
                    </Button>
                  </Link>
                ) : null}
              </div>
            )}
          </TabPanel>
          <TabPanel value={value} index={1}>
            {regesters ? (
              regesters.map((post) => <Regesters post={post} />)
            ) : (
              <Grid justifyContent="center" alignItems="center">
                <Typography variant="body1">
                  Here you can see the posts that you regestered!
                </Typography>
              </Grid>
            )}{" "}
          </TabPanel>
          <TabPanel value={value} index={2}>
            {requests ? (
              requests.map((post, index) => (
                <Requests post={post} postIndex={index} UserId={UserId} />
              ))
            ) : (
              <Grid justifyContent="center" alignItems="center">
                <Typography variant="body1">
                  Here you can see the posts that people request from you!
                </Typography>
              </Grid>
            )}{" "}
          </TabPanel>
          <TabPanel value={value} index={3}>
            <div className={classes.Wishlist}>
              <Typography
                variant="h4"
                component={"span"}
                style={{
                  fontFamily: ` 'Sriracha', cursive`,
                  color: "#440a67",
                }}
                gutterBottom
              >
                My Book Wishlist Books
              </Typography>
              <Link
                style={{ textDecoration: "none", color: "black" }}
                to={{
                  pathname: "/WishList",
                }}
              >
                <Button
                  variant="contained"
                  color="default"
                  size="small"
                  style={{
                    marginLeft: "350px",
                    width: "160px",
                    height: "40px",
                  }}
                >
                  Search for book
                </Button>
              </Link>
            </div>
            <hr style={{ borderTop: "1px solid #11111" }} />
            <div style={{ marginTop: "20px" }}>
              <Grid container direction="row" spacing={3}>
                {wishList &&
                  wishList.map((book) => (
                    <Grid key={book.id}>
                      <Card className={classes.card2}>
                        <CardMedia
                          className={classes.media}
                          image={book.image}
                        />
                        <CardContent>
                          <Typography
                            variant="subtitle1"
                            component={"span"}
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
          </TabPanel>
        </Paper>
      </Grid>
    </div>
  );
}
