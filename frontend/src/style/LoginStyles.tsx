import { makeStyles } from "@material-ui/core";
import { autocompleteClasses } from "@mui/material";
import { url } from "inspector";

import ColorScheme from "./ColorScheme";
import HueSelector from "./HueSelector";

const useStyles = makeStyles ((theme) => ({
    buttonPrimary: {
        margin: "20px",
        // backgroundColor: "#9de0ad",
        fontSize: '2.196vw',//'30px',

        '&.MuiButtonBase-root' : {
            fontFamily: 'Bebas Neue',
        },

        // backgroundColor: HueSelector(ColorScheme.primaryDark,1,1),
    },
    buttonSecondary: {
        margin: "20px",
        backgroundColor: '#e5fcc2',
        fontSize: '2.196vw',//'30px',

        '&.MuiButtonBase-root' : {
            fontFamily: 'Bebas Neue',
        }
    },
    header: {
        // backgroundColor: "#45ada8",
        background: 'linear-gradient(to top left, #45ada8, #594f4f)'
    },
    headerText: {
        color: "#e5fcc2",
        padding: '0 30px',
        fontFamily: 'Bebas Neue',
        fontSize: '5.27vw', //'72px',
        letterSpacing: '0.2em',
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
        padding: '0 0 5px 0',
        //borderRadius: '0 0 15px 15px',
        backgroundColor: "#594f4f",
        background: 'linearGradient(19deg, #594f4f, #594f4f)',
        // transform: 'skewY(-10deg)',
        
    },
    titleContent: {
        margin: '0 auto',
        textAlign: 'center',
        color: "#e5fcc2",
        fontFamily: "alfa-slab-one",
        fontWeight: 400,
        fontSize: '5.2vw',//'5em',
        letterSpacing: '0.05em',
        
        '&.MuiTypography-root' : {
            fontStyle: 'bold',
            fontStretch: 'expanded',
            
        }
    },
    wrapper: {
        backgroundImage: 'linear-gradient(to bottom right, #45ADA8, #e5fcc2)',
    },
    main: {width: '60%',}, cardContent: { background: ''},
}));

export default useStyles;