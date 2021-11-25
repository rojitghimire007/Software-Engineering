import {
  Typography,
  //AppBar,
  Toolbar,
  Container,
} from '@material-ui/core';
import useStyles from '../../style/DashboardStyles'; // new styling
import Carousel from './Carousel';
import MenuAppBar from '../../components/AppBar';


const Dashboard = () => {

const classes = useStyles();

  return (
    <div className={classes.container} >
      <div className={classes.background}></div>
      <div className={classes.page}>
        <MenuAppBar />
        <main className={classes.mainAll}>
          <Container maxWidth="lg" >
            <Carousel />
          </Container>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
