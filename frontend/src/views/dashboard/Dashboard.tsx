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
import RunCarousel from './Carousel';

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
            <RunCarousel />
          </Container>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
