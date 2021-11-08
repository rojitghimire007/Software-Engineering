import React, { useState, useEffect } from 'react';
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

const SideBar = (links: any) => {
  const options = [...links.links]; // takes from parent
  const [isDrawerOpened,setIsDrawerOpened] = useState(false);

  return (
    <div>
      <div style={styles.sideNav}>
        <IconButton onClick={() => {setIsDrawerOpened(!isDrawerOpened)}}>
          {!isDrawerOpened ? <ReorderIcon /> : null }
        </IconButton>
      </div>

      <Divider/>

      <Drawer
        variant="temporary"
        open={isDrawerOpened}
        onClose={() => {setIsDrawerOpened(!isDrawerOpened)}}
      >
        {/* Maps links from options array */}
        {options.map((link: any, i: number) => {
          return(
            <Link to={link.default} style={styles.link}>
              <List>
                <ListItem button key={link.main} onClick={() => {setIsDrawerOpened(!isDrawerOpened)}}>
                  <ListItemText primary={link.main} />
                </ListItem>
              </List>
            </Link>
          )
        })}
      </Drawer>
    </div>
  );
}

export default SideBar;