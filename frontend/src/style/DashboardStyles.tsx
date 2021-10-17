import { makeStyles } from "@material-ui/core";
import { borderColor } from "@mui/system";
import ColorScheme from "./ColorScheme";
import HueSelector from "./HueSelector";

import PipelineImg from 'img/pipeline-1.jpg';

const useStyles = makeStyles ((theme) => ({
    dropDown: {
        // Dropdown background
        '&.MuiAccordion-root': {
            backgroundColor: ColorScheme.secondaryLight,
        }
    },
    buttonPrimary: {
        margin: "20px",
        backgroundColor: ColorScheme.primary,
    },
    page: {
        minHeight: "100vh",
    },
    background: {
        backgroundImage: `url(${PipelineImg})`,
        backgroundPosition: 'center',
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat',       
        backgroundColor: ColorScheme.background,
    },
    cardContent: {
        flexGrow: 1,
        fontSize: '1.4em',
        fontFamily: 'Roboto',
        backgroundColor: ColorScheme.secondaryDark,

        // wrapper below image
        '&.MuiCardContent-root' : {
            padding: '0px',
            
            // Implement Once image has been extended far enough
            // borderRadius: '8px 0',
        },
    },
    cardTitle: {
        flexGrow: 1,
        fontSize: '1.7em',
        fontFamily: 'Teko',
        backgroundColor: ColorScheme.secondaryLight,
        color: ColorScheme.onSecondary,
    },
    title: {
        backgroundColor: ColorScheme.primary,
        alignItems: 'center',
        width: '90vw',
        borderRadius: '8px 8px 8px 8px',
        borderWidth: '0 8px 4px 0',
        borderStyle: 'solid',
        borderColor: ColorScheme.primaryDark,
        paddingTop: '5px',
        margin: '0 auto'
    },
    titleContent: {
        margin: '0 auto',
        textAlign: 'center',
        color: ColorScheme.onPrimary,
        fontFamily: 'Bebas Neue',
        fontSize: '5em',
        borderRadius: '0 0 0 0',
    },
    cardAction: {
        borderRadius: 7,
        borderWidth: '3px', 
        borderStyle: 'solid',
        borderColor: ColorScheme.primary,
        boxShadow: '10px 10px 12px -10px ',
        // transition: '0.6s ease-in-out',
        transition: 'all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)',
        
        // prevents the many repaints
        '&:after': {
            boxShadow: '12px 12px 12px -10px ',
            opacity: 2,
            // transition: 'opacity 0.8s ease-in-out',
            transition: 'all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1)',
        },

        // card animation
        '&:hover': {
            transform: 'scale(1.02,1.02)',
        },
        
        '&:hover::after': {
            opacity: 1,
        },

        
    },
    divider: {
        color: ColorScheme.primary,

        // the lines on the dropdown by the icon
        '&.MuiDivider-root::before' : {
            borderColor: ColorScheme.primaryDark,
        },
        '&.MuiDivider-root::after' : {
            borderColor: ColorScheme.primaryDark,
        },
    },
    dividerIcon: {
        // icon in divider selector
        '&.MuiChip-root' :{
            backgroundColor: ColorScheme.primary,
            color: ColorScheme.onPrimary,
        },
    },
    accordionPrimary: {
        width: '33%', 
        flexShrink: 0,
    },
    link: {
        textAlign: 'left',
        fontSize: '1.2em',
        margin: '0 auto'
    },
    icon: {
        // icon selector
        '&.MuiSvgIcon-root' : {
            color: ColorScheme.onSecondary,
        },
    },

    //single Liners (temporary)
    buttonSecondary: { margin: "20px", },
    header: { 
        backgroundColor: ColorScheme.primary,
    },
    listButton: { backgroundColor: 'grey', },
    menuItem: { padding: '1rem 1.5rem 1.5rem', },
    cardGrid: { padding: '20px 0' },
    cardMedia: { paddingTop: '56.25%' /* 16:9  aspect ratio*/ },
    divPad: {padding: '5px',},
    
    // Deprecated
    textField: {},
    wrapper: {},
    card: {},
    accordionSecondary: {},
}));

export default useStyles;