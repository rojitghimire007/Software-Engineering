import React, { useState, useEffect } from "react";
import { Drawer, Divider, IconButton } from "@material-ui/core";
import { List, ListItem, ListItemText } from "@material-ui/core";
import ReorderIcon from "@mui/icons-material/Reorder";
import { Link } from "react-router-dom";
import { getLocalStorage } from "utils/utils";

const styles = {
  sideNav: {},
  link: {
    color: "black",
    textDecoration: "none",
  },
};

const SideBar = (links: any) => {
  const options = [...links.links]; // takes from parent
  const [isDrawerOpened, setIsDrawerOpened] = useState(false);

  //submenu
  const [isSubDrawerOpen, setIsSubDrawerOpen] = useState(false);

  const [linkOpen, setLinkOpen] = useState("");

  return (
    <div>
      <div style={styles.sideNav}>
        <IconButton
          onClick={() => {
            setIsDrawerOpened(!isDrawerOpened);
          }}
        >
          {!isDrawerOpened ? <ReorderIcon /> : null}
        </IconButton>
      </div>

      <Divider />

      <Drawer
        variant="temporary"
        open={isDrawerOpened}
        onClose={() => {
          setIsDrawerOpened(!isDrawerOpened);
        }}
      >
        {/* Maps links from options array */}
        {options.map((link: any, i: number) => {
          return (
            <List>
              {link.subItems[0] == "" && !link.admin ? (
                <Link to={link.default}>
                  <ListItem
                    button
                    key={link.main}
                    onClick={() => {
                      setIsSubDrawerOpen(!isSubDrawerOpen);
                      setLinkOpen(link.main);
                    }}
                  >
                    <ListItemText primary={link.main} />
                  </ListItem>
                </Link>
              ) : //or
              link.subItems[0] == "" &&
                link.admin &&
                getLocalStorage("isAdmin") ? (
                <Link to={link.default}>
                  <ListItem
                    button
                    key={link.main}
                    onClick={() => {
                      setIsSubDrawerOpen(!isSubDrawerOpen);
                      setLinkOpen(link.main);
                    }}
                  >
                    <ListItemText primary={link.main} />
                  </ListItem>
                </Link>
              ) : link.subItems[0] !== "" && !link.admin ? (
                <ListItem
                  button
                  key={link.main}
                  onClick={() => {
                    setIsSubDrawerOpen(!isSubDrawerOpen);
                    setLinkOpen(link.main);
                  }}
                >
                  <ListItemText primary={link.main} />
                </ListItem>
              ) : (
                <></>
              )}

              {isSubDrawerOpen &&
              linkOpen == link.main &&
              link.subItems[0] != ""
                ? link.subItems.map((sub: any) => {
                    return (
                      <Link to={sub.default}>
                        <ListItem>{sub.main}</ListItem>
                      </Link>
                    );
                  })
                : null}
            </List>
          );
        })}
      </Drawer>
    </div>
  );
};

export default SideBar;
