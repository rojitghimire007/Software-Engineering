import React from "react";
import TextField from '@mui/material/TextField';
import useStyles from "style/CreateProjectStyle";
import ColorScheme from "style/ColorScheme";
import Button from '@mui/material/Button';
import background from 'img/pipeline-2.jpg';
import { Typography } from "@mui/material";




const CreateProject = () => {
    
    const styling = useStyles();
    
    return (
    
    <div style = {{backgroundSize: "cover",backgroundImage: `url(${background})`}}>  
        <div className = {styling.headerStyle}>
            <Typography variant = "h3" className={styling.headerContent}> 
                Pipeliner Project
            </Typography>
        </div>  
        <div className ={styling.formContainer}>
            <form>
                
                <TextField 
                id="company-name" 
                label="Company Name" 
                variant="outlined" 
                name = "company_name"
                style = {{paddingBottom: "15px"}}
                />
                
                <TextField 
                id="company-address" 
                label="Company Address" 
                variant="outlined" 
                name = "company_address"
                style = {{paddingBottom: "15px"}}
                />
                
                <TextField 
                id="company-phone" 
                label="Company Phone" 
                variant="outlined" 
                name = "company_phone"
                style = {{paddingBottom: "15px"}}
                />

                <TextField 
                id="company-email" 
                label="Company Email" 
                variant="outlined" 
                name = "company_email"
                style = {{paddingBottom: "15px"}}
                />  

                <TextField 
                id="project-name" 
                label="Project Name" 
                variant="outlined" 
                name = "project_name"
                style = {{paddingBottom: "15px"}}
                />

                <TextField 
                id="project-location" 
                label="Project Location" 
                variant="outlined" 
                name = "plocation"
                style = {{paddingBottom: "15px"}}
                />

                <TextField 
                id="project-number" 
                label="Project Number" 
                variant="outlined" 
                name = "project_number"
                style = {{paddingBottom: "15px"}}
                />

                <TextField 
                id="work-number" 
                label="Work Order Number" 
                variant="outlined" 
                name = "work_number"
                style = {{paddingBottom: "15px"}}
                />

                <TextField 
                id="work-site-phone" 
                label="Work Site Phone" 
                variant="outlined" 
                name = "work_site_phone"
                style = {{paddingBottom: "15px"}}
                />
                        
                <TextField 
                id="start-date" 
                label="Start Date" 
                variant="outlined" 
                name = "start_date"
                style = {{paddingBottom: "15px"}}
                />

                <TextField 
                id="end-date" 
                label="End Date" 
                variant="outlined" 
                name = "end_date"
                style = {{paddingBottom: "15px"}}
                />

                <TextField 
                id="notes" 
                label="Notes" 
                variant="outlined" 
                name = "notes"
                style = {{paddingBottom: "15px"}}
                />
                
                <Button variant="contained" style={{backgroundColor: "#81977b", display: 'flex', textAlign: "center"}}>Submit</Button>
            </form>
        </div>
    </div>
  );
}
export default CreateProject