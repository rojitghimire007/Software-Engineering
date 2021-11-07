import React from 'react';
import { Drawer, Divider, IconButton } from '@material-ui/core';
import { List, ListItem, ListItemText } from '@material-ui/core';
import ReorderIcon from '@mui/icons-material/Reorder';
import { Link } from 'react-router-dom';

const styles = {
sideNav: {

},
link: {
	color: 'black',
	textDecoration: 'none',
}
};

export default class SideBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    isDrawerOpened: false,
    };
  }
  toggleDrawerStatus = () => {
    this.setState({
    isDrawerOpened: true,
    })
  }
  closeDrawer = () => {
    this.setState({
    isDrawerOpened: false,
    })
  }
  render() {
    const { isDrawerOpened } = this.state;
    return (
    <div>
      <div style={styles.sideNav}>
        <IconButton onClick={this.toggleDrawerStatus}>
        {!isDrawerOpened ? <ReorderIcon /> : null }
        </IconButton>
      </div>
      <Divider/>
      <Drawer
      variant="temporary"
      open={isDrawerOpened}
      onClose={this.closeDrawer}
      >
      <Link to='/' style={styles.link}>
        <List>
          <ListItem button key='Dashboard' onClick={this.closeDrawer}>
            <ListItemText primary='Main Menu' />
          </ListItem>
        </List>
      </Link>
      <Link to='/pipes/strung' style={styles.link}>
        <List>
          <ListItem button key='Stringing' onClick={this.closeDrawer}>
            <ListItemText primary='Stringing' />
          </ListItem>
        </List>
      </Link>
      <Link to='/pipes' style={styles.link}>
        <List>
          <ListItem button key='Pipes' onClick={this.closeDrawer}>
            <ListItemText primary='Pipe Inventory' />
          </ListItem>
        </List>
      </Link>
      </Drawer>
    </div>
    );
  }
}
