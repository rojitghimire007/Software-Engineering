import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    width: '80vw',
    margin: 'auto',
    marginTop: '5vh',
  },
  itemGrid: {
    display: 'grid',
    gridAutoColumns: '20% 6.7% 20% 6.7% 20% 6.7% 20%',
    // gridAutoColumns: '6.7% 20% 6.7% 20% 6.7% 20%',
  },
  item: {
    backgroundColor: 'gray',
    height: '20vh',
    color: 'white',
  },

  gapItem: {
    height: '27vh',
    backgroundColor: 'red',
    position: 'relative',
    top: '-15%',
  },

  infoGrid: {
    display: 'grid',
    gridAutoColumns: '10% 20% 10% 20% 10% 20%',
    width: '80vw',
    height: '20vh',
  },

  weldersInfo: {
    gridRow: '2',
    display: 'flex',
    flexDirection: 'column',
    padding: '0',
  },

  weldingField: {
    border: '1px solid black',
    padding: '10px !important',
  },

  editIcon: {
    backgroundColor: 'rgb(25, 118, 210)',
    color: 'white',
  },
}));

export default useStyles;
