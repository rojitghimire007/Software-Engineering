import { makeStyles } from "@material-ui/core";
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
        backgroundColor: "#f39237",
    },
    buttonSecondary: {
        margin: "20px",
    },
    textField: {

    },
    wrapper: {
        // backgroundColor: "#39a9db"
    },
    page: {
        minHeight: "100vh",
        backgroundColor: "#39a9db",
        // backgroundImage: 'url(${https://source.unsplash.com/_EMkxLdko9k/1920x2880})',
        // backgroundImage: 'url({https://source.unsplash.com/_EMkxLdko9k/1920x2880})',
        // backgroundPosition: 'center',
        // backgroundSize: 'cover',
        // backgroundRepeat: 'no-repeat',
    },
    header: {
        backgroundColor: "#f39237",
    },
    card: {

    },
    cardContent: {
        
    },
    headerText: {
        color: "white",
        padding: '0 50px'
    },
    title: {
        backgroundColor: "#40bcd8",
    },
    accordionPrimary: {

    },
    accordionSecondary: {
        
    },
    main: {
        // backgroundImage: 'url(${https://unsplash.com/photos/_EMkxLdko9k})',
    }
    
}));

export default useStyles;