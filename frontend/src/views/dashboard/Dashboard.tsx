import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
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
  Backdrop,
} from '@material-ui/core';
import {
  Accordion,
  AccordionSummary,
  Collapse,
  IconButton,
  //Link,
  AccordionDetails,
  List,
  ListItemText,
  ListItemButton,
  Chip,
  Divider,
  CircularProgress,
  LinearProgress,
} from '@mui/material';


import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArchitectureOutlinedIcon from '@mui/icons-material/ArchitectureOutlined';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';

import useStyles from '../../style/DashboardStyles'; // new styling

import inventoryImg from 'img/inventory.jpg';
import weldingImg from 'img/welding.jpg';
import stringingImg from 'img/stringing.jpg';
import bendingImg from 'img/bending.jpg';
import coatingImg from 'img/coating.jpg';
import otherImg from 'img/pipeline-3.jpg';
import { isTemplateExpression } from 'typescript';

import MenuAppBar from '../../components/AppBar';
import Footer from '../../components/Footer';

// type links = {
//   parent: string,
//   link: string,
//   id: string,
// }; 

const Dashboard = () => {
  const menus: string[] = [
    'Material Inventory',
    'Welding',
    'Stringing',
    'Bending',
    'Coating',
    'Other',
  ];

  const images: any[] = [
    `url(${inventoryImg})`,
    `url(${weldingImg})`,
    `url(${stringingImg})`,
    `url(${bendingImg})`,
    `url(${coatingImg})`,
    `url(${otherImg})`,
  ]

  const links = [
    // Inventory
    {
      parent: 'Material Inventory',
      link: '/pipes',
      id: 'Pipes',
    },
    {
      parent: 'Material Inventory',
      link: '/fittings',
      id: 'Fittings',
    },

    // Welding
    // Stringing
    {
      parent: 'Stringing',
      link: 'pipes/strung',
      id: 'Stringing',
    },
    // Bending
    // Coating
    // Other
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
  const generateLinks = (parentMenu: string) => {
    return (
      links.map((hyperlink, i) => {
        if (hyperlink.parent === parentMenu) {
          return (
            <div key={i}>
              <ListItemButton
                // selected={selectedIndex === 0}
                onClick={(event) => handleListItemClick(event, 0)}
              >
                <Link to={hyperlink.link} className={classes.link}>
                  {hyperlink.id}
                </Link>
              </ListItemButton>
            </div>
          )
        }// end if
        else {
          // console.log(false)
        }
      })
    )
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

    return (<LinearProgress color="secondary" variant="determinate" value={75} />);
  };

  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const [sidebar, setSidebar] = useState(false);


  // Future?:
  // For keeping images opaque,
  // need to keep state for EACH accordion.
  const [accordionState, setExpanded] = React.useState();

  return (
    <div className={`${classes.page} ${classes.background}`}>
      {/* Used to enhance title bar spacing */}
      <div className={classes.divPad}></div>

      {/* <CssBaseline /> */}
      {/* <AppBar position="relative" className={classes.title}>
        <Toolbar>
          <Typography variant="h3" className={classes.titleContent}>
            Honor Guard Inspections
          </Typography>
        </Toolbar>
      </AppBar> */}
      {/* className={classes.page} */}
      <main >
        <Container maxWidth="lg" >

          <Grid container spacing={4} className={classes.cardGrid}>

            {/* simply maps each menu item to a new card component. */}
            {/* Spent like 30 minutes trying to get this styling to work
                    Without realizing I had commented out the call to generateMenus.
                  Been working within a function that never gets used. */}
            {menus.map((menuName, card) => (
              <Grid item key={card} xs={12} sm={5} md={4}>
                <Card className={classes.cardAction}>
                  <CardMedia
                    className={classes.cardMedia}
                    // image="https://source.unsplash.com/random"
                    // component="img"
                    // height="140"
                    image={`${images[card].slice(4, -1)}`}
                    title={`${images[card].slice(18, -14)} menu`}
                  />
                  {/* {console.log(images[card].slice(4, -1))} */}
                  <CardContent className={classes.cardContent}>

                    {/* Card submenus */}
                    <Accordion
                      variant='outlined'
                      className={classes.dropDown}

                    // Future?:
                    // For keeping images opaque,
                    // need to keep state for EACH accordion.
                    // expanded={open}
                    // onChange={handleToggle}
                    >

                      <AccordionSummary expandIcon={<ExpandMoreIcon color="inherit" className={classes.icon} />}>
                        <Typography className={classes.cardTitle} style={{ fontWeight: 'bold' }}>
                          {menuName}
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>

                        <Divider className={classes.divider}>
                          <Chip
                            icon={<ArchitectureOutlinedIcon color='action' className={classes.dividerIcon} />}
                            variant="filled"
                            size='medium'
                            clickable={false}
                            className={classes.dividerIcon}
                          />
                        </Divider>

                        <List component="nav">
                          {generateLinks(menuName)}
                          <Backdrop
                            // sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                            open={open}
                            onClick={handleClose}
                          >
                            <CircularProgress color="inherit" />
                          </Backdrop>
                        </List>

                      </AccordionDetails>
                    </Accordion>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Footer />
        </Container>
      </main>
    </div>
  );
};

export default Dashboard;
