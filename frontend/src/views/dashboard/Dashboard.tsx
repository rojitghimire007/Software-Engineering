import React from 'react';
import { Link } from 'react-router-dom';

import {  Typography, 
  AppBar,  
  Card, 
  CardActions, 
  CardContent, 
  CardMedia, 
  CardHeader,
  CssBaseline, 
  Grid, 
  Toolbar,
  Button, 
  TextField,
  Container, 
  CardActionArea} from '@material-ui/core';

import {  Accordion,
  AccordionSummary,
  AccordionDetails } from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';




// import 'style/Dashboard.css';
import useStyles from '../../style/DashboardStyles'; // new styling

const Dashboard = () => {
  const menus: string[] = [
    'Materials Inventory',
    'Welding',
    'Stringing',
    'Bending',
    'Coating',
    'Menu 4',
  ];

  const classes = useStyles();

  const generateMenus = () => {

    // simply maps each menu item in the array to a new gridItem/card
    // {menus.map((menuName, card) => (
    //   <Grid item key={card} xs={12} sm={5} md={4}>
    //     <CardActionArea className={classes.cardAction}>
    //       <Card>
    //         <CardMedia 
    //           className={classes.cardMedia}
    //           image="https://source.unsplash.com/random"
    //           title="Image Title"
    //         />
    //         <CardContent className={classes.cardContent}>
    //           <Typography gutterBottom variant="h5" key={card} >
    //             {menus}
    //           </Typography>
    //           <Typography>
    //             Hello world
    //           </Typography>
    //         </CardContent>
    //       </Card>
    //     </CardActionArea>
    //   </Grid>
    // ))};

    // return menus.map((item, i) => {
    //   return (
    //     <div
    //       key={i}
    //       className="menuItem"
    //       // style={{ backgroundColor: `${i % 2 == 0 ? 'gray' : 'brown'}` }}
    //     >
    //       {item}
    //     </div>
    //   );
    // });
  };

  return (
    // <div className="dashboard-container">
    //   <div id="menu">{generateMenus()}</div>
    //   <div id="options">
    //     <div className="header">
    //       <b>Options</b>
    //     </div>
    //     <div>
    //       <ul>
    //         <Link to="/pipes/add">
    //           <li>Material Inventory</li>
    //         </Link>

    //         <a href="#">
    //           <li>Option 2</li>
    //         </a>
    //         <a href="#">
    //           <li>Option 3</li>
    //         </a>
    //       </ul>
    //     </div>
    //   </div>
    // </div>

    <>
      <CssBaseline />
        <AppBar position="relative">
          <Toolbar className={classes.title}>
            <Typography variant="h3" align="center" >
              Honor Guard Inspections
            </Typography>
          </Toolbar>
        </AppBar>

      <main>
        <Container maxWidth="md" className={classes.page}>
          <Grid container spacing={4} className={classes.cardGrid}>
            {/* {generateMenus} */}
            {/* {menus.map((card) => (
              <Grid item key={card} xs={12} sm={5} md={4}>
                <Card>
                  <CardContent>
                    <Typography gutterBottom variant="h5" key={card}>
                      {card}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}; */}

            {/* Spent like 30 minutes trying to get this styling to work
                Without realizing I had commented out the call to generateMenus.
                Been working within a function that never gets used. */}
            {menus.map((menuName, card) => (
              <Grid item key={card} xs={12} sm={5} md={4}>
                <CardActionArea className={classes.cardAction}>
                  <Card>
                    <CardMedia 
                      className={classes.cardMedia}
                      image="https://source.unsplash.com/random"
                      title="Image Title"
                    />
                    <CardContent className={classes.cardContent}>
                      <Typography gutterBottom variant="h5">
                        {menuName}
                      </Typography>

                      {/* Works, but I'll probably switch to the Collapse component. */}
                      <Accordion>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                        >

                          <Typography className={classes.accordionPrimary}>
                            Menu
                          </Typography>
                          <Typography className={classes.accordionSecondary}>
                            Requires Access Priveledges
                          </Typography>

                        </AccordionSummary>  
                        <AccordionDetails>
                          <h3>
                            Gonna put links here later
                          </h3>
                          <Typography>
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quia explicabo, veritatis debitis rem est nostrum possimus ullam adipisci deserunt eligendi, laboriosam illum cupiditate rerum quam, sunt odio eius! Error, eius.
                          </Typography>
                        </AccordionDetails>

                      </Accordion>
                    </CardContent>
                  </Card>
                </CardActionArea>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>  
    </>
  );
};

export default Dashboard;
