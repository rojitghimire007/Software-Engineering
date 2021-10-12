import { makeStyles } from "@material-ui/core";

import ColorScheme from "./ColorScheme";
import HueSelector from "./HueSelector";


const useStyles = makeStyles((theme) => ({
  header: {
    backgroundColor: ColorScheme.secondaryLight,
    textAlign: 'center',
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
  },
  titleContent: {
    alignItems: 'center',
    margin: '0 auto',
    textAlign: 'center',
    color: ColorScheme.onPrimary,
    fontFamily: 'Bebas Neue',
    fontSize: '72px',
  },
  cellStyle: {
    //backgroundColor:
  },
  wrapper: {
    backgroundColor: ColorScheme.background,
    height: '100vh',
    padding: '10px',
  },
  table: {
    '&.MtableHeader-header-19' : {
        fontSize: '32px !important',
        border: '3px solid black !important',
    },
  },
  toolbar: {
    backgroundColor: `${ColorScheme.primaryLight}`,
    color: ColorScheme.onPrimary,
    borderRadius: '15px 15px 0 0'
  },
  columnHead: {
    backgroundColor: `${ColorScheme.secondary}`,
  },
  row: {
    backgroundColor: ColorScheme.secondaryLight,

    '&:nth-child(even)' : {
      backgroundColor: ColorScheme.secondary,
    }
  },
  filterRow: {},



}));
export default useStyles;