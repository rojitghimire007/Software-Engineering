import { makeStyles } from "@material-ui/core";
import { borderColor } from "@mui/system";
import ColorScheme from "./ColorScheme";
import HueSelector from "./HueSelector";

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
        backgroundColor: ColorScheme.background,
    },
    cardContent: {
        flexGrow: 1,
        fontSize: '1.4em',
        backgroundColor: ColorScheme.secondaryDark,

        // wrapper below image
        '&.MuiCardContent-root' : {
            padding: '0px',
            
            // Implement Once image has been extended far enough
            //borderRadius: '8px 0',
        },
    },
    cardTitle: {
        flexGrow: 1,
        fontSize: '1.4em',
        backgroundColor: ColorScheme.secondaryLight,
        color: ColorScheme.onSecondary,
    },
    title: {
        backgroundColor: ColorScheme.primary,
        alignItems: 'center',
        width: '100%',
        borderRadius: '8px 8px 8px 8px',
        borderWidth: '0 0 3px 0',
        borderStyle: 'solid',
        borderColor: ColorScheme.primaryDark,
    },
    titleContent: {
        margin: '0 auto',
        textAlign: 'center',
        color: ColorScheme.onPrimary,
    },
    cardAction: {
        borderRadius: 7,
        transition: '0.3s',
        
        // card animation
        '&:hover': {
            transform: 'scale(1.02)'
        },
        
        borderWidth: '3px', 
        borderStyle: 'solid',
        borderColor: ColorScheme.primary,
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
        textAlign: 'center',
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