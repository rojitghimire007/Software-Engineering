import React from "react";
import useStyles from "style/FooterStyles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useHistory } from "react-router-dom";
import Button from "@mui/material/Button";

const Footer = () => {
  const classes = useStyles();
  const history = useHistory();
  const handleButtonsClick = (pageURL: string) => {
    history.push(pageURL);
  };
  return (
    <AppBar position="static">
      <Toolbar className={classes.appContainer}>
        <Typography component="div" sx={{ flexGrow: 1 }}>
          <p className={classes.title}>
            Copyright 2015 - 2022 by Honor Guard Inspection
          </p>
        </Typography>

        {/*menu items from app bar*/}
        <div>
          <Button
            className={classes.button}
            onClick={() => handleButtonsClick("/privacy")}
          >
            Privacy Statement
          </Button>
          <Button
            className={classes.button}
            onClick={() => handleButtonsClick("/terms")}
          >
            Terms Of Use{" "}
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};
export default Footer;
