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
      }
}));

export default useStyles;