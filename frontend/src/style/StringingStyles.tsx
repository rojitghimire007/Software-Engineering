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
      border: '3px solid black',
      borderRadius: '15px',
      fontFamily: "'Teko', serif",
      fontSize: '32px',
      //width: '100%',
      transition: '0.4s',
      backgroundColor: ColorScheme.primary,
      color: ColorScheme.onPrimary,
      
      '&:hover' : {
        backgroundColor: ColorScheme.secondaryLight,
        color: ColorScheme.onSecondary,
        transform: 'scale(1.03)',
      },
      
      '& div' : {
        fontSize: '24px',
        textAlign: "left",
        width: '100%',
        border: 'none',
        maegin: '0 5px',
        backgroundColor: 'rgba(0,0,0,0)',
        color: 'inherit',
        transition: 'none',
        //transition: 'color 0.06s', // synced it?????

        '&:hover' : {
          transorm: '0',
          backgroundColor: 'rgba(0,0,0,0)',
        }, // stop scaling text
      },
      
      
    },
}));

export default useStyles;