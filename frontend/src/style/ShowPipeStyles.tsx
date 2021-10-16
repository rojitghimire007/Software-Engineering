import { makeStyles } from '@material-ui/core';
import { ImportantDevices } from '@mui/icons-material';

import ColorScheme from './ColorScheme';
import HueSelector from './HueSelector';

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
   wrapper: {
    backgroundColor: ColorScheme.background,
    height: '100vh',
    padding: '10px',
  },
  table: {
    '&.MtableHeader-header-19': {
      fontSize: '32px !important',
      border: '3px solid black !important',
    },
  },
  toolbar: {
    backgroundColor: `${ColorScheme.primaryLight}`,
    color: 'black',
    // borderRadius: '15px 15px 0 0',
    // border: '5px 5px 0 5px',
    // borderColor: ColorScheme.background,
  },
  columnHead: {
    backgroundColor: `${ColorScheme.secondary}`,
  },
  row: {
    backgroundColor: ColorScheme.secondaryLight,

    '&:nth-child(odd)': {
      backgroundColor: ColorScheme.secondaryDark,
    },
  },
  filterRow: {},

  cell: {
    padding: '1px !important',
    border: 'thin solid !important',

  },
/*
  root: {
    "& .MuiTableCell-root": {
        padding: '1px',
        border: ' thin solid',
        border-bottom: 'thin solid',
    },*/
  
}));
export default useStyles;
