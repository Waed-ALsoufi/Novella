import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
  main: {
    minHeight: '100vh',
  },
  root: {
    paddingTop: '90px',
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paper: {
    width: '70%',
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
  taps: {
    width: '70%',
  },
  card2: {
    width: 250,
    '&:hover': {
      boxShadow: '0 8px 40px -12px rgba(0,0,0,0.3)',
    },
    margin: '10px',
  },
  media: {
    paddingTop: '50%',
  },
  active: {
    color: '#440a67',
  },
  NoPosts: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '50px',
    flexDirection: 'column',
  },
  Wishlist: {
    display: 'flex',
    justifyContent: 'spaceBetween',
    flexDirection: 'row',
    alignItems: 'spaceBetween',
  },
}));
export default useStyles;
