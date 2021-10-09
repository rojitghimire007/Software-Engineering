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
    pipe: {
      border: '3px solid ' + `${ColorScheme.primaryDark}`,
      borderRadius: '15px',
      transition: '0.4s',
      fontFamily: "'Teko', serif",
      backgroundColor: ColorScheme.primary,
      color: ColorScheme.onPrimary,
      
      '&:hover' : {
        borderColor: `${ColorScheme.secondaryDark}`,
        backgroundColor: ColorScheme.secondaryLight,
        color: ColorScheme.onSecondary,
        transform: 'scale(1.03)',
      },
      
      '& div' : {

        //header
        '& span' : {
          fontSize: '32px',
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
    pipeDrag: {
      border: '3px solid ' + `${ColorScheme.secondaryDark}`,
      borderRadius: '15px',
      transition: '0.4s',
      fontFamily: "'Teko', serif",
      backgroundColor: ColorScheme.secondary,
      color: ColorScheme.onSecondary,
    },
}));

export default useStyles;