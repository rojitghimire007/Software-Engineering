import { makeStyles } from "@material-ui/core";

import ColorScheme from "./ColorScheme";
import HueSelector from "./HueSelector";

const useStyles = makeStyles ((theme) => ({
    task:  {
      border: "2px solid lightgrey",
      borderRadius: '50%',
      padding: '8px',
      marginRight: '8px',
      /* background-color: ${props => (props.isDragging ? 'lightgreen' : 'white')}; */
      width: '40px',
      height: '40px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    station: {
      border: '3px solid' + ColorScheme.primaryDark,
      boxSizing: 'border-box',
      padding: '3px',
      height: '24px',
      width: '150px',
      position: 'relative',
      fontFamily: "'Teko', serif",
      fontSize: '16px',
      zIndex: 3,
      top: 'auto',
      left: '200px',
    },
    eligiblePipe: {
      fontSize: '24px !important',
      

      '& option': {
        fontSize: '16px !important',
      },
    },
    pipe: {
      border: '0 3px 3px 3px solid ' + `${ColorScheme.secondaryDark}`,
      borderRadius: '15px',
      transition: '0.4s',
      fontFamily: "'Teko', serif",
      backgroundColor: ColorScheme.secondary,
      color: ColorScheme.onSecondary,
      boxShadow: '0px 80px 30px -70px '+`${ColorScheme.secondaryDark}`,
      zIndex: 999,
      paddingTop: '10px !important',
      paddingBottom: '10px !important',
      paddingLeft: '10px !important',
      
      '&:hover' : {
        borderColor: `${ColorScheme.secondary}`,
        backgroundColor: ColorScheme.secondaryLight,
        color: ColorScheme.onSecondary,
        transform: 'scale(1.03)',
      },

      // pipe number
      '& :first-child': {
        paddingLeft: '50% !important',
        // paddingBottom: '5px !important', // makes text more pronounced
        fontFamily: "'Bebas Neue', serif",
        fontStyle: 'italic',
        fontSize: '32px',
      },
      
      '& > div': {
        
        '& div' : {
          width: '100% !important',
          
          //header
          '& span' : {
            fontSize: '32px',
            width: '100% !important',
            // margin: '0 auto',
            padding: '50px',
          },
          
          //information
          fontSize: '24px',
          textAlign: "left",
          border: 'none',
          margin: '0 5px',
          backgroundColor: 'rgba(0,0,0,0)',
          color: 'inherit',
          padding: '0',
          transition: 'none',
          //transition: 'color 0.06s', // synced it?????
          // likely not, keeping it for now
        },
      },
    },
    pipeAdd: {
      border: '3px dashed ' + `${ColorScheme.secondaryDark}`,
      borderRadius: '15px',
      transition: '0.4s',
      fontFamily: "'Teko', serif",
      backgroundColor: ColorScheme.secondaryLight,
      color: ColorScheme.onSecondary,
      boxShadow: '0px 80px 30px -70px '+`${ColorScheme.secondaryDark}`,
      position: 'sticky',
      paddingTop: '10px !important',
      paddingBottom: '10px !important',
      paddingLeft: '10px !important',
      paddingRight: '10px !important',
      
      '&:hover' : {
        borderColor: `${ColorScheme.secondary}`,
        backgroundColor: ColorScheme.secondaryLight,
        color: ColorScheme.onSecondary,
        transform: 'scale(1.01)',
      },

      // pipe number
      '& :first-child': {
        // paddingLeft: '50% !important',
        // paddingBottom: '5px !important', // makes text more pronounced
        fontFamily: "'Bebas Neue', serif",
        fontStyle: 'italic',
        fontSize: '32px',
      },
      
      '& > div': {
        
        '& :first-child' : {
          width: '100% !important',
          
          //header
          '& span' : {
            fontSize: '32px',
            width: '100% !important',
            // margin: '0 auto',
            padding: '50px',

          },
          
        },
        // options
        '& > label': {
          fontFamily: 'Teko, serif !important',
          fontSize: '20px !important',
        },
      },
    },
    stationOld: {
      transformOrigin: '1 1',
      transform: 'translate(2rem, 3rem) rotate(-90deg) ',
      // background: 'none',
      backgroundColor: ColorScheme.primaryLight,
      color: ColorScheme.onSecondary,
      position: 'relative',
      // left: '-.5em',
      boxSizing: 'border-box',
      border: '1px black',
      borderStyle: 'double !important',
      boxShadow: '5px 2px black',
      fontFamily: 'Bebas Neue',
      fontStyle: 'italic',
      textDecoration: 'underline',
      padding: '0 1rem !important',
      marginLeft: 0 + '!important',
      width: '30%',
      height: '100%',
      // display: 'inline',
      // zIndex: 999,
    },
    dragContainer: {
      display: 'flex',
    },
    virtList: {
      margin: '0 12px 0 12px',
    },
    pipeDrag: {
      border: '30px dashed ' + `${ColorScheme.secondaryDark}`,
      borderRadius: '15px',
      transition: '0.4s',
      fontFamily: "'Teko', serif",
      backgroundColor: ColorScheme.secondary,
      color: ColorScheme.onSecondary,
    },
    center: {
      display: 'flex',
      justifyContent: 'center',
      margin: '10px auto',
    },
  
    container: {
      height: '200px',
      position: 'relative',
      top: '100px',
      bottom: '0',
      left: '0',
      right: '0',
    
    },
    body: {
      backgroundColor: ColorScheme.background,
      height: '100vh',
      padding: '10px 5px 0 5px',
    },
    left: {
      position: 'absolute',
      top: '50%',
      left: '0'
    } , 
    title: {
      backgroundColor: ColorScheme.primary,
      alignItems: 'center',
      width: '100%',
      borderRadius: '8px 8px 8px 8px',
      borderWidth: '0 0 3px 0',
      borderStyle: 'solid',
      borderColor: ColorScheme.primaryDark,
      margin: '0 0 10px 0',
      paddingTop: '5px',
    },
    titleContent: {
      alignItems: 'center',
      margin: '0 auto',
      textAlign: 'center',
      color: ColorScheme.onPrimary,
      fontFamily: 'Bebas Neue',
      fontSize: '5vw',
      borderRadius: '0 0 0 0',
      letterSpacing: '8px',
    },
}));

export default useStyles;