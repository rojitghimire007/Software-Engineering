import { makeStyles } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
    appContainer: {
        backgroundColor: '#191970',
        minHeight: '40px !important',
    },
    /*
    navBar: {
        backgroundColor: '#060b26',
        height: '80px',
        display: 'flex',
        justifyContent: 'start',
        alignItems: 'center',
    },
    menuBars: {
        fontSize: '3rem',
        background: 'none',
    },
    navMenu: {
        /*backgroundColor: #060b26,*/
    /*    width: '250px',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        position: 'fixed',
        top: 0,
        left: '-100%',
        transition: '850ms',
    },
    "& navMenu.active": {
        left: 0,
        transition: '350ms',
    },
    navText: {
        display: 'flex',
        justifyContent: 'start',
        alignItems: 'center',
        padding: '8px 0px 8px 16px',
        height: '60px',
    },
    "& navText a": {
        textDecoration: 'none',
        color: '#f5f5f5',
        backgroundColor: '#1a83ff',
        fontSize: '18px',
        width: '95%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        padding: '0 16px',
        borderRadius: '4px',
    },
    "& navText a:hover": {
        backgroundColor: '#1a83ff',
    },
    navMenuItems: {
        width: '100%',
    },
    navBarToggle: {
        /*backgroundColor: #060b26,*/
    /*    width: '100%',
        height: '80px',
        display: 'flex',
        justifyContent: 'start',
        alignItems: 'center',
    },

     span {
        margin-left: 16px,
    } */
    headerOptions: {
        display: 'flex',
    },
}))

export default useStyles;