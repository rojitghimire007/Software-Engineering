import { makeStyles } from "@material-ui/core";
import { autocompleteClasses } from "@mui/material";
import { url } from "inspector";
// import Image from "https://source.unsplash.com/_EMkxLdko9k/1920x1440";
// https://images.unsplash.com/photo-1503435824048-a799a3a84bf7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80

//`````````````````````````````
// ------COLOR SCHEME-----
//  check Login.css for colors
//=============================
// --colorsC-01: #1c77c3;
// --colorsC-02: #39a9db;
// --colorsC-03: #40bcd8;
// --colorsC-04: #f39237;
// --colorsC-05: #d63230;
//,,,,,,,,,,,,,,,,,,,,,,,,,,,,,


const useStyles = makeStyles ((theme) => ({
    buttonPrimary: {
        margin: "20px",
        backgroundColor: "#9de0ad",
        fontSize: '20px',
    },
    buttonSecondary: {
        margin: "20px",
        backgroundColor: '#e5fcc2',
        fontSize: '20px',
    },
    header: {
        // backgroundColor: "#45ada8",
        background: 'linear-gradient(to top left, #45ada8, #594f4f)'
    },
    headerText: {
        color: "#e5fcc2",
        padding: '0 50px',
    },
    page: {
        minHeight: "100vh",
        backgroundImage: 'linear-gradient(to bottom right, #45ADA8, #e5fcc2)',
    },
    roundedContainer: {
        borderRadius: "15px",
        width: '100%'
        // padding: '0 20px'
    },
    temp01: {
        background: 'linear-gradient(to bottom right, #e5fcc2, #45ADA8 )'
    },
    title: {
        // position: 'absolute',
        // height: '',
        // top: '0',
        width: '100%',
        padding: '20px 0 10px 0',
        //borderRadius: '0 0 15px 15px',
        backgroundColor: "#594f4f",
        background: 'linearGradient(19deg, #594f4f, #594f4f)',
        // transform: 'skewY(-10deg)',
        
    },
    titleContent: {
        margin: '0 auto',
        //padding: '10px 0',
        textAlign: 'center',
        color: "#e5fcc2",
    },
    wrapper: {
        backgroundImage: 'linear-gradient(to bottom right, #45ADA8, #e5fcc2)',
    },
    main: {width: '60%',}, cardContent: { background: ''},
}));

export default useStyles;