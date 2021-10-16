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
    margin: '0 0 10px 0',
    paddingTop: '5px',
  },
  titleContent: {
    alignItems: 'center',
    margin: '0 auto',
    textAlign: 'center',
    color: ColorScheme.onPrimary,
    fontFamily: 'Bebas Neue',
    fontSize: '5em',
  },
  cellStyle: {
    //backgroundColor:
  },
  wrapper: {
    backgroundColor: ColorScheme.background,
    height: '100vh',
    padding: '10px',
  },
  stickyActions: {
    tfoot: {
      border: '0px !important',
      borderColor: '0 !important',
      backgroundColor: 'blue !important',
    },
    '& table:first-child': {
      '& tr': {
        '& td:first-child, th:first-child': {
          backgroundColor: '#fffff0',
          
          position: 'sticky',
          left: 0,
          zIndex: 999,
        },
        '& th:first-child': {
          
          zIndex: 999,
        },
      },
      '& tr:last-child': {
        '& td:first-child, th:first-child': {
          backgroundColor: '#fffff0',
          boxShadow: '10px 0px black',
          position: 'sticky',
          left: 0,
          zIndex: 999,
        },
      },
    },
    '& table:not(first-child)': {
      '& td, th': {
        border: '1px solid black',
      },
    },
  },


}));
export default useStyles;