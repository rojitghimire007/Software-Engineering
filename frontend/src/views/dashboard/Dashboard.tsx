import useStyles from "../../style/DashboardStyles"; // new styling
import Carousel from "./Carousel";
import MenuAppBar from "../../components/AppBar";

const Dashboard = () => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.container}>
        <div className={classes.background}></div>
        <div className={classes.page}>
          <MenuAppBar />
          <Carousel />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
