import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import useStyles from "style/AddUserStyle";
import ColorScheme from "style/ColorScheme";
import Button from "@mui/material/Button";
import background from "img/pipeline-4.jpg";
import { Typography } from "@mui/material";
import api from "api";
import { useHistory } from "react-router-dom";

const SignUpUser = () => {
  const styling = useStyles();

  let history = useHistory();

  const [full_name, setFull_name] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone_number, setPhone_number] = useState("");

  const signupuser = () => {
    api
      .signup(full_name, email, password, phone_number)
      .then((res) => {
        alert(res.message);
      })
      .catch((err) => alert(err.message));
  };

  return (
    <div
      style={{
        position: "fixed",
        backgroundPosition: "center",
        minWidth: "100%",
        minHeight: "100%",
        backgroundSize: "cover",
        backgroundImage: `url(${background})`,
      }}
    >
      <div className={styling.headerStyle}>
        <Typography variant="h3" className={styling.headerContent}>
          Sign up
        </Typography>
      </div>
      <div className={styling.formContainer}>
        <form>
          <TextField
            onChange={(e) => {
              setFull_name(e.target.value);
            }}
            id="full-name"
            label="Full Name"
            variant="outlined"
            name="full_name"
            style={{ paddingBottom: "15px" }}
          />

          <TextField
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            id="email"
            label="Email"
            variant="outlined"
            name="email"
            style={{ paddingBottom: "15px" }}
          />

          <TextField
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            id="password"
            label="Password"
            variant="outlined"
            name="password"
            style={{ paddingBottom: "15px" }}
          />

          <TextField
            onChange={(e) => {
              setPhone_number(e.target.value);
            }}
            id="phone-number"
            label="Phone Number"
            variant="outlined"
            name="phone_number"
            style={{ paddingBottom: "15px" }}
          />

          <Button
            onClick={() => {
              signupuser();
            }}
            variant="contained"
            style={{
              backgroundColor: "#81977b",
              display: "flex",
              textAlign: "center",
            }}
          >
            Register
          </Button>

          <Button
            onClick={() => {
              history.push("/project-select");
            }}
            variant="contained"
            style={{
              backgroundColor: "#81977b",
              display: "inline",
              marginTop: "10px",
              textAlign: "center",
            }}
          >
            Back
          </Button>
        </form>
      </div>
    </div>
  );
};
export default SignUpUser;
