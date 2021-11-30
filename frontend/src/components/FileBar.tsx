import React, { useState, useEffect } from 'react';
import { Drawer, Divider, IconButton } from '@material-ui/core';
import { List, ListItem, ListItemText } from '@material-ui/core';
import FolderIcon from '@mui/icons-material/Folder';
import { Link } from 'react-router-dom';

const styles = {
  sideNav: {

  },
  link: {
    color: 'black',
    textDecoration: 'none',
  }
};

const FileBar = (links: any) => {
  const options = [...links.links]; // takes from parent
  const [isDrawerOpened, setIsDrawerOpened] = useState(false);

  //submenu
  const [isSubDrawerOpen, setIsSubDrawerOpen] = useState(false);

  const [linkOpen, setLinkOpen] = useState('');

  return (
    <div>
      <div style={styles.sideNav}>
        <IconButton onClick={() => { setIsDrawerOpened(!isDrawerOpened) }}>
          {!isDrawerOpened ? <FolderIcon /> : null}
        </IconButton>
      </div>

      <Divider />

      <Drawer
        variant="temporary"
        open={isDrawerOpened}
        onClose={() => { setIsDrawerOpened(!isDrawerOpened) }}
      >
        {/* Maps links from options array */}
        {options.map((link: any, i: number) => {
          return (
            <List>
              {link.subItems[0] == '' ?
                <a href={`${link.default}`}>
                  <ListItem button key={link.main} onClick={() => {
                    setIsSubDrawerOpen(!isSubDrawerOpen);
                    setLinkOpen(link.main);
                  }}>
                    <ListItemText primary={link.main} />
                  </ListItem>
                </a>
                : //or
                <ListItem button key={link.main} onClick={() => {
                  setIsSubDrawerOpen(!isSubDrawerOpen);
                  setLinkOpen(link.main);
                }}>
                  <ListItemText primary={link.main} />
                </ListItem>
              }

              {isSubDrawerOpen && linkOpen == link.main && link.subItems[0] != '' ?
                link.subItems.map((sub: any) => {
                  return (
                    <a href={`${sub.default}`}>
                      <ListItem style={{color: 'Black', paddingLeft: '3rem' }}>
                        {sub.main}
                      </ListItem>
                    </a>
                  )
                })
                : null
              }

            </List>


          )
        })}
      </Drawer>
    </div>
  );
}

export default FileBar;