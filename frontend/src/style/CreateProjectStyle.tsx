import { makeStyles } from "@material-ui/core";
import ColorScheme from './ColorScheme';



const useStyles = makeStyles(() => ({




  formContainer:{
      width: "360px",
      backgroundColor: "white",
      margin: "auto",
      boxShadow: "0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)",
      padding: "10px",
      borderColor: "black",
  },
    
  headerStyle:{
    width: "360px",
    height: "120px",
    backgroundColor: "#81977b",
    margin: "auto",
    boxShadow: "0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)",
    padding: "10px",
    borderColor: "black",
    textAlign: "center",
    color: "white",
    paddingTop: "5px",
    paddingBottom: "25px",
      
  },
  headerContent:{
    textAlign: 'center',
    color: ColorScheme.onPrimary,
    fontFamily: 'Bebas Neue',
    fontSize: '6vw',
    letterSpacing: '.5rem',
    wordWrap: 'break-word',
    textShadow: '0 0 black, 0 2px black, 3px 2px black, 0 1px black',
  },



}));

export default useStyles;