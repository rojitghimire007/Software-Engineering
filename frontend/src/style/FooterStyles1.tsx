import { makeStyles } from "@material-ui/core"
import { borderColor, borderRadius, flexbox, fontSize } from "@mui/system";
import ColorScheme from "./ColorScheme";

const useStyles = makeStyles((theme) => ({
   // *: {
    /* padding: 0, */
    //margin: '0',
    /* box-sizing: border-box, */
    //fontFamily: Roboto, Helvetica, sans-serif,
//},

footerContainer: {
    zIndex: 1,
    backgroundColor: '#5eb8ff',
    border: '2px #005b9f groove',
    /* padding-bottom: 2rem, */
    /* height: 100%,
    width: 100%, */
    /* position: 'relative', */
    /* bottom: 0,
    left: 0,
    right: 0, */
    display: 'flex',
    flexDirection: 'column',
    /* margin-top: 2em, */
    /* position: fixed, */
},

footer: {
    width: '60%',
    height: '10vh',
    /* width: 85%,
    height: 15vh, */
    backgroundColor: '#5eb8ff',
    color: '#fff',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    margin: '1vh auto 1vh auto',
},
/* .footer-heading {
    display: flex,
    flexDirection: column,
    marginRight: 4rem,
} */

footerHeading: {
    marginBottom: '4rem',
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    color: '#000',
    fontSize: '1.2vw',
},

//footerHeading a: {
   /* color: '#000',
    textDecoration: 'none',
    marginBottom: '0.25rem',
    /*marginBottom: 0.2rem,*/
    /* fontSize: 1.2vw, */

    /* &:hover {
        fontStyle: italic,
    } */
//}
//footerReading a:hover: {
    //fontStyle: 'italic',
    //color: '#fff',
    //textDecoration: 'underline',
//}

colSm: {
    textAlign: 'center',
    fontSize: '1.2vw' /*1rem*/,
    color: '#000',
    letterSpacing: '.2em',
    margin: '1vh auto 0 auto',
    display: 'block',
    position: 'relative',
    flexShrink: 1,
},

list: {
    fontSize: '5vh',
    textAlign: 'left',
},

}))

export default useStyles;