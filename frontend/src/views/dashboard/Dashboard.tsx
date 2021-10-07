import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

import {
  Typography,
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
  CardActionArea,
} from '@material-ui/core';

import {
  Accordion,
  AccordionSummary,
  Collapse,
  IconButton,
  // Link,
  AccordionDetails,
  List,
  ListItemText,
  ListItemButton,
  Chip,
  Divider,
  CircularProgress,
  LinearProgress
} from '@mui/material';

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
    'Extra',
  ];

  // Used for menu links
  const [selectedIndex, setSelectedIndex] = useState(1);

  // Used for loading bar
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const timer = React.useRef<number>();

  const classes = useStyles();

  // Material UI does NOT play nice with TypeScript:
  // const CustomGrid = (props: GridProps<'container'. spacing={4} cloumns={2}>) => {

  // }

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

  // Used for menu links
  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
  ) => {
    setSelectedIndex(index);

    // for loading bar
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      timer.current = window.setTimeout(() => {
        setSuccess(true);
        setLoading(false);
      }, 2000);
    }
    
    return(<LinearProgress color="secondary" variant="determinate" value={75}/>);
  };

  return (
    <div className={classes.page}>

      {/* Used to enhance title bar spacing */}
      <div className={classes.divPad}></div>
      
      <CssBaseline />
      <AppBar position="relative" className={classes.title}>
        <Toolbar className={classes.title}>
          <Typography variant="h3" className={classes.titleContent}>
            Honor Guard Inspections
          </Typography>
        </Toolbar>
      </AppBar>

      <main className={classes.page}>
        <Container maxWidth="lg" className={classes.page}>
          {/* This isn't working nice with TypeScript */}
          {/* <Grid container spacing={4} cloumns={2}>  */}

          {/* <Grid item> */}
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

            {/* simply maps each menu item to a new card component. */}
            {/* Spent like 30 minutes trying to get this styling to work
                    Without realizing I had commented out the call to generateMenus.
                    Been working within a function that never gets used. */}
            {menus.map((menuName, card) => (
              <Grid item key={card} xs={12} sm={5} md={4}>
                {/* <CardActionArea className={classes.cardAction}> */}
                  <Card className={classes.cardAction}>
                    <CardMedia
                      className={classes.cardMedia}
                      image="https://source.unsplash.com/random"
                      title="Image Title"
                    />
                    <CardContent className={classes.cardContent}>

                      {/* Card submenus */}
                      {/* Works, but I'll probably switch to the Collapse component. */}
                      {/* Transitions for sidebar may also work. Less responsive out of the gate, though. */}
                      <Accordion
                        variant='outlined'
                        className={classes.dropDown}
                      >
                        <AccordionSummary expandIcon={<ExpandMoreIcon color="inherit" className={ classes.icon } />}>
                          <Typography className={classes.cardTitle} style={{fontWeight: 'bold'}}>
                            {menuName}
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>

                          <Divider className={classes.divider}>
                            <Chip 
                              label=":ICON_HERE:" 
                              variant="filled"
                              size='medium'
                              clickable={false}
                              className={classes.dividerIcon}
                            />
                          </Divider>

                          {/* Need to map submenus!!!! */}
                          {/* <Link
                            component="button"
                            variant="body2"
                            underline="hover"
                            
                            onClick={() => {
                              console.info("I'm a link.");
                            }}
                          > */}
                            {/* <a href="http://localhost:3000/pipes">Pipe Inventory</a> */}
                            {/* <a href="http://localhost:3000/fittings">Fittings Inventory</a> */}


                            <List component="nav">
                              <ListItemButton
                                selected={selectedIndex === 0}
                                onClick={(event) => handleListItemClick(event, 0)}
                              >
                                {/* <ListItemText primary="Pipes" /> */}
                                <Link to="/pipes" className={classes.link}>Pipes</Link>
                              </ListItemButton>
                              <ListItemButton
                                selected={selectedIndex === 0}
                                onClick={(event) => handleListItemClick(event, 0)}
                              >
                                {/* <ListItemText primary="Fittings" /> */}
                                <Link to="/fittings" className={classes.link}>Fittings</Link>
                              </ListItemButton>
                              <ListItemButton
                                selected={selectedIndex === 0}
                                onClick={(event) => handleListItemClick(event, 0)}
                              >
                                {/* <ListItemText primary="Valves" /> */}
                                <Link to="/valves" className={classes.link}>Valves</Link>
                              </ListItemButton>
                            </List>







                            {/* <div className={classes.link}>
                              <a href="http://localhost:3000/pipes">Pipe Inventory</a>
                            </div>
                            <div className={classes.link}>
                              <a href="http://localhost:3000/fittings">Fittings Inventory</a>
                            </div>                           */}
                          {/* </Link> */}

                        </AccordionDetails>
                      </Accordion>

                      {/* Collapse submenus */}
                      {/* Can't get this working */}
                      {/* <CardActions>
                            <ExpandMore
                              expand={expanded}
                              onClick={handleExpandClick}
                              aria-expanded={expanded}
                              aria-label="show more"
                            >
                                <ExpandMoreIcon />
                            </ExpandMore>
                          </CardActions> */}

                      {/*<Collapse timeout="auto" unmountOnExit>
                            <CardContent>
                              <Typography>
                                Trying stuff out
                              </Typography>
                            </CardContent>
                          </Collapse> */}
                    </CardContent>
                  </Card>
                {/* </CardActionArea> */}
              </Grid>
            ))}

            {/* Trying to fix TS Errors */}
            {/* </Grid>
              <Grid item> */}

            {/* Will put side menu here once TypeScript errors are addressed */}
            {/* <Typography>
                  Hey
                </Typography> */}

            {/* Trying to fix TS Errors */}
            {/* </Grid> */}
          </Grid>

          {/* Again, TypeScript issue */}
          {/* </Grid> */}
        </Container>
      </main>
    </div>
  );
};

export default Dashboard;
