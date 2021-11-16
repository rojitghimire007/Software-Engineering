import {
  Typography,
  AppBar,
  Toolbar,
  Container,
} from '@material-ui/core';
import useStyles from '../../../style/DashboardStyles'; // new styling
import CarouselInventory from './CarouselInventory';


const DashboardInventory = () => {

const classes = useStyles();

  return (
    <div className={classes.container} >
      <div className={classes.background}></div>
      <div className={classes.page}>
        {/* Used to enhance title bar spacing */}
        {/* <CssBaseline /> */}
        <AppBar position="relative" className={classes.title}>
          <Toolbar>
            <Typography variant="h3" className={classes.titleContent}>
              Honor Guard Inspections
            </Typography>
          </Toolbar>
        </AppBar>
        {/* className={classes.page} */}
        <main >
          
          <Container maxWidth="lg" >
            <CarouselInventory />
          </Container>
        </main>
      </div>
    </div>
  );
};

export default DashboardInventory;
