import { makeStyles } from "@material-ui/core";

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
        backgroundColor: "#39a9db"
    },
    page: {
        minHeight: "100vh",
        backgroundColor: "#39a9db"
    },
    header: {
        backgroundColor: "#f39237",
    },
    card: {

    },
    cardContent: {
        flexGrow: 1,
    },
    headerText: {
        color: "white",
        padding: '0 50px'
    },
    title: {
        backgroundColor: "#40bcd8",
    },



    menuItem: {
        backgroundColor: "#40bcd8",
        padding: '1rem 1.5rem 1.5rem',
    },
    cardGrid: {
        padding: '20px 0'
    },
    cardMedia: {
        paddingTop: '56.25%' // 16:9
    },
    cardAction: {
        borderRadius: 16,
        transition: '0.3s',
        '&:hover': {
            transform: 'scale(1.02)'
        },
    },
    accordionPrimary: {
        width: '33%', flexShrink: 0
    },
    accordionSecondary: {
        color: 'grey',
    }
    
}));

export default useStyles;