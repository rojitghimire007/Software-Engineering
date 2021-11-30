import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import useStyles from "style/CreateProjectStyle";
import ColorScheme from "style/ColorScheme";
import Button from "@mui/material/Button";
import background from "img/pipeline-2.jpg";
import { Typography } from "@mui/material";
import api from "api";
import { useHistory } from "react-router-dom";

const CreateProject = () => {
  const styling = useStyles();

  let history = useHistory();

  const [project_number, setProject_number] = useState("");
  const [pname, setPname] = useState("");
  const [company, setCompany] = useState("");
  const [company_address, setCompany_address] = useState("");
  const [company_phone, setCompany_phone] = useState("");
  const [company_email, setCompany_email] = useState("");
  const [work_number, setWork_number] = useState("");
  const [work_site_phone, setWork_site_phone] = useState("");
  const [plocation, setPlocation] = useState("");
  const [notes, setNotes] = useState("");
  const [start_date, setStart_date] = useState("");
  const [end_date, setEnd_date] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const addProject = () => {
    api
      .postProjectAdmin(
        project_number,
        pname,
        company,
        company_address,
        company_phone,
        company_email,
        work_number,
        work_site_phone,
        plocation,
        notes,
        new Date(start_date).getTime(),
        new Date(end_date).getTime()
      )
      .then((res) => {
        alert(res.message);
        history.push('/project-select');
      })
      .catch((err) => alert(err.message));
  };

  return (
    <div
      style={{ backgroundSize: "cover", backgroundImage: `url(${background})` }}
    >
      <div style={{ padding: "3rem 0", width: "80%", margin: "auto" }}>
        <div className={styling.headerStyle} style={{ width: "100%" }}>
          <Typography variant="h3" className={styling.headerContent}>
            Pipeliner Project
          </Typography>
        </div>
        <div className={styling.formContainer} style={{ width: "100%" }}>
          <form style={{ display: "flex", flexDirection: "column" }}>
            <TextField
              onChange={(e) => {
                setCompany(e.target.value);
              }}
              id="company-name"
              label="Company Name"
              variant="outlined"
              name="company_name"
              style={{ paddingBottom: "15px" }}
            />

            <TextField
              onChange={(e) => {
                setCompany_address(e.target.value);
              }}
              id="company-address"
              label="Company Address"
              variant="outlined"
              name="company_address"
              style={{ paddingBottom: "15px" }}
            />

            <TextField
              onChange={(e) => {
                setCompany_phone(e.target.value);
              }}
              id="company-phone"
              label="Company Phone"
              variant="outlined"
              name="company_phone"
              style={{ paddingBottom: "15px" }}
            />

            <TextField
              onChange={(e) => {
                setCompany_email(e.target.value);
              }}
              id="company-email"
              label="Company Email"
              variant="outlined"
              name="company_email"
              style={{ paddingBottom: "15px" }}
            />

            <TextField
              onChange={(e) => {
                setPname(e.target.value);
              }}
              id="project-name"
              label="Project Name"
              variant="outlined"
              name="project_name"
              style={{ paddingBottom: "15px" }}
            />

            <TextField
              onChange={(e) => {
                setPlocation(e.target.value);
              }}
              id="project-location"
              label="Project Location"
              variant="outlined"
              name="plocation"
              style={{ paddingBottom: "15px" }}
            />

            <TextField
              onChange={(e) => {
                setProject_number(e.target.value);
              }}
              id="project-number"
              label="Project Number"
              variant="outlined"
              name="project_number"
              style={{ paddingBottom: "15px" }}
            />

            <TextField
              onChange={(e) => {
                setWork_number(e.target.value);
              }}
              id="work-number"
              label="Work Order Number"
              variant="outlined"
              name="work_number"
              style={{ paddingBottom: "15px" }}
            />

            <TextField
              onChange={(e) => {
                setWork_site_phone(e.target.value);
              }}
              id="work-site-phone"
              label="Work Site Phone"
              variant="outlined"
              name="work_site_phone"
              style={{ paddingBottom: "15px" }}
            />

            <TextField
              onChange={(e) => {
                setStart_date(e.target.value);
              }}
              id="start-date"
              label="Start Date"
              variant="outlined"
              name="start_date"
              type="date"
              InputLabelProps={{ shrink: true, required: true }}
              style={{ paddingBottom: "15px", width: "210px" }}
            />

            <TextField
              onChange={(e) => {
                setEnd_date(e.target.value);
              }}
              id="end-date"
              label="End Date"
              variant="outlined"
              name="end_date"
              type="date"
              InputLabelProps={{ shrink: true, required: true }}
              style={{ paddingBottom: "15px", width: "210px" }}
            />

            <TextField
              onChange={(e) => {
                setNotes(e.target.value);
              }}
              id="notes"
              label="Notes"
              multiline
              rows={4}
              variant="outlined"
              name="notes"
              style={{ paddingBottom: "15px", width: "210px" }}
            />

            <Button
              onClick={() => {
                addProject();
              }}
              variant="contained"
              style={{
                backgroundColor: "#81977b",
                display: "flex",
                textAlign: "center",
              }}
            >
              Submit
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
    </div>
  );
};
export default CreateProject;
