import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import 'style/AppBarStyles.css';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { withRouter, useHistory } from 'react-router-dom';
import SideBar from './SideBar';




const ITEM_HEIGHT = 48;

const MenuAppBar = (props: { history: any; }) => {
    
    const [anchorE2, setAnchorE2] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorE2);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorE2(event.currentTarget);
    };
    const handleClose1 = () => {
        setAnchorE2(null);
    };
        
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    //For app bar buttons
    const history = useHistory();
    const handleButtonsClick = (pageURL: string) => {
        history.push(pageURL);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar className="app-container">
                    <SideBar />

                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>

                    </Typography>
                    {/*menu items from app bar*/}
                    <div className = "headerOptions">
                        <Button onClick={() => handleButtonsClick('/dashboard')}> Home </Button>
                        <Button onClick={() => handleButtonsClick('/about')}> About </Button>
                        <Button onClick={() => handleButtonsClick('/dashboard')}> Services </Button>
                        <Button onClick={() => handleButtonsClick('/dashboard')}> Training </Button>
                        <Button onClick={() => handleButtonsClick('/dashboard')}> Careers </Button>
                        <Button onClick={() => handleButtonsClick('/contact')}> Contact Us </Button>
                    </div>
                    
                    <div>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleClose}>Profile</MenuItem>
                            <MenuItem onClick={handleClose}>My account</MenuItem>
                            <MenuItem onClick={handleClose}>Logout</MenuItem>
                        </Menu>
                    </div>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
export default withRouter(MenuAppBar)