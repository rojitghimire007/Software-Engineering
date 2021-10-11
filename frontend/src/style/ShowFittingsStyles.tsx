import { makeStyles } from "@material-ui/core";

import ColorScheme from "./ColorScheme";
import HueSelector from "./HueSelector";


const useStyles = makeStyles((theme) => ({
  headerStyle: {
    backgroundColor: ColorScheme.secondaryLight
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
    alignItems: 'center',
    margin: '0 auto',
    textAlign: 'center',
    color: ColorScheme.onPrimary,
  },
  cellStyle: {
    //backgroundColor:
  }



}));
export default useStyles;