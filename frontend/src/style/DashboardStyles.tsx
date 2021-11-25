import { makeStyles } from "@material-ui/core";
import { borderColor, borderRadius, flexbox, fontSize } from "@mui/system";
import ColorScheme from "./ColorScheme";
import HueSelector from "./HueSelector";
import BackgroundImage from '../img/backgroundB.jpg'

import PipelineImg from 'img/pipeline-1.jpg';

const useStyles = makeStyles(() => ({
    container: {
        minHeight: "100vh",
        maxWidth: '100vw',
    },
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
        maxWidth: '100vw',
        width: '100%',
        position: 'absolute',
        top: 0,
        // zIndex: 5
    },
    background: {
        position: 'sticky',
        backgroundImage: `url(${BackgroundImage})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 100%',
        boxShadow: '1px 1px',
        // height: '115vh',
        margin: 0,
        height: '111vh',
        maxHeight: '110vh',
        maxWidth: '100vw',
        top: 0,
        bottom: 0,
        backgroundOrigin: 'content-box',
        // backgroundClip: 'content-box',
        // backgroundSize: 'contain',
        // zIndex: 1,
        // display: 'inline-block',
        // backgroundPosition: 'center center',
        // backgroundColor: ColorScheme.background,
        // top: 0,
        // left: 0,
    },
    cardContent: {
        // flexGrow: 1,
        fontSize: '1.4em',
        fontFamily: 'Roboto',
        padding: '0px',
        margin: '0px',
        // backgroundColor: ColorScheme.primaryDark,

        // wrapper below image
        '&.MuiCardContent-root:last-child': {
            padding: '0px !important',
            margin: '0px !important',

            // Implement Once image has been extended far enough
            // borderRadius: '8px 8px 0 0',
        },
    },
    cardTitle: {
        flexGrow: 1,
        // fontSize: '3.6vw',//'2.2em',
        fontSize: '1.4em',//'2.2em',
        letterSpacing: '.02em',
        fontFamily: 'Teko',
        backgroundColor: ColorScheme.secondaryLight,
        color: ColorScheme.onPrimary,

        transition: 'all 0.4s',

        '&:hover': {
            color: ColorScheme.secondaryDark,
        },
    },
    title: {
        backgroundColor: ColorScheme.primary,
        alignItems: 'center',
        paddingTop: '5px',
        borderRadius: '8px 8px 8px 8px',
        borderStyle: 'ridge',
        borderColor: ColorScheme.primaryDark,
        backgroundImage: `linear-gradient(to right, ${ColorScheme.primary}, ${ColorScheme.primaryLight})`,
        margin: '0 auto',
    },
    titleContent: {
        // margin: '0 auto',
        textAlign: 'center',
        color: ColorScheme.onPrimary,
        fontFamily: 'Bebas Neue',
        fontSize: '6vw',
        letterSpacing: '.5rem',
        wordWrap: 'break-word',
        textShadow: '0 0 black, 0 2px black, 3px 2px black, 0 1px black',
        // borderRadius: '0 0 0 0',
        // fontSize: '5vw',
        // letterSpacing: '8px',
    },
    cardAction: {
        borderRadius: 7,
        borderWidth: '3px',
        borderStyle: 'outset',
        borderColor: ColorScheme.primary,
        boxShadow: '10px 10px 12px -10px ',
        // transition: '0.6s ease-in-out',
        transition: 'all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)',

        // prevents the many repaints
        // '& :after': {
        // boxShadow: '12px 12px 12px -10px ',
        // opacity: 2,
        // transition: 'opacity 0.8s ease-in-out',
        // transition: 'all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1)',
        // },

        // card animation
        // idk why this works, but it does
        '&:hover': {
            transform: 'scale(1.03,1.02)',
            color: ColorScheme.secondary,

            '& .MuiTypography-body1': {
                color: ColorScheme.primary,
            },
            '& .MuiCardMedia-root': {
                opacity: 1,
            },
        },

        // keep menu highlighted while accordion is down
        '& .Mui-expanded': {
            '& .MuiTypography-body1': {
                color: ColorScheme.primary,
            },
            '&.MuiCardMedia-root': {
                opacity: 1,
            },
        },

        // Link Styles
        '& div.MuiListItemButton-root, a': {
            marginTop: '2%',
            fontFamily: 'Bebas Neue',
            fontSize: '1.4rem',
            textDecoration: 'none',
            color: ColorScheme.onPrimary,

            '& :hover': {
                color: ColorScheme.primary,
                textDecoration: 'underline',
                fontStyle: 'italic',
            },
        },


    },
    divider: {
        borderColor: ColorScheme.primaryDark,
        height: '100% !important',
        backgroundColor: 'rgba(0,0,0,0)',

        // the lines on the dropdown by the icon
        '&.MuiDivider-root::before': {
            borderColor: ColorScheme.primaryDark,
        },
        '&.MuiDivider-root::after': {
            borderColor: ColorScheme.primaryDark,
        },
    },
    dividerIcon: {
        color: ColorScheme.onPrimary + '!important',
        // margin: '0 auto !important',

        // gets rid of label placeholder space
        '& .MuiChip-label': {
            // padding: 0 + ' !important',
            paddingTop: '3px !important',
        },

        // icon in divider selector
        '& .MuiChip-icon': {
            height: '2.5rem !important',
            width: '2.5rem !important',
            // padding: '0 0 !important',
            paddingLeft: '20% !important'
        },

        '&.MuiChip-root': {
            backgroundColor: ColorScheme.primary,
            color: ColorScheme.onPrimary,
            padding: '0 !important',
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
        '& .MuiSvgIcon-root': {
            color: ColorScheme.onSecondary,
        },
    },

    //single Liners (temporary)
    buttonSecondary: { margin: "20px", },
    header: {
        backgroundColor: ColorScheme.primary,
        letterSpacing: '2px',
    },
    cardMedia: {
        // height: 0,
        paddingTop: '56.25%' /* 16:9  aspect ratio*/,
        opacity: 0.75,
        transition: 'opacity 0.3s cubic-bezier(0.165, 0.84, 0.44, 1)',

        '&:hover': {
            opacity: 2,
            // transition: 'opacity 0.8s ease-in-out',
            // transition: 'all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1)',
        },
        // margin: 30,
    },

    listButton: { backgroundColor: 'grey', },
    menuItem: { padding: '1rem 1.5rem 1.5rem', },
    cardGrid: { padding: '20px 0' },
    mainAll: {paddingTop: '5rem'},
}));

export default useStyles;