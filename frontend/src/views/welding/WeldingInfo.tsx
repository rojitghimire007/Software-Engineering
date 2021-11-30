import React, { useEffect, useState } from 'react';
import useStyles from 'style/WeldingStyles';
import {
  IconButton,
  List,
  ListItem,
  ListItemText,
  TextField,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import api from 'api';

type dataType = {
  weld_id: string | null;
  rp: Array<string>;
  hp: Array<string>;
  hpp: Array<string>;
  fl: Array<string>;
};

const iconBtnStyle = {
  backgroundColor: 'rgb(25, 118, 210)',
  color: 'white',
  width: 'fit-content',
  margin: 'auto',
};

const WeldingInfo = ({
  data,
  pos,
  addWeld,
}: {
  data: dataType;
  pos: number;
  addWeld: any;
}) => {
  const [edit, setEdit] = useState(false);
  const [values, setValues] = useState<dataType>({
    rp: [],
    hp: [],
    hpp: [],
    fl: [],
    weld_id: null,
  });

  const classes = useStyles();
  const gapCols = [2, 4, 6];

  useEffect(() => {
    setValues({ ...data });
  }, [data]);

  const changeWeldingInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value.toUpperCase().split(','),
    });
  };

  const updateWelding = () => {
    if (!values.weld_id) {
      addWeld(pos, values);
    } else
      api
        .updateWelding({
          ...values,
          weld_id: data.weld_id,
          wdate: new Date().getTime(),
          fldate: new Date().getTime(),
        })
        .catch((err) => alert(err.message));
  };

  if (edit)
    return (
      <div
        className={classes.weldersInfo}
        style={{ gridColumn: `${gapCols[pos]}`, padding: '0' }}
      >
        <List>
          <ListItem className={classes.weldingField}>
            <TextField
              name="rp"
              onChange={changeWeldingInfo}
              id="outlined-password-input"
              label="Root Pass"
              value={values.rp.join(',')}
              size="small"
            />
          </ListItem>
          <ListItem className={classes.weldingField}>
            <TextField
              name="hp"
              onChange={changeWeldingInfo}
              id="outlined-password-input"
              label="Hot Pass"
              value={values.hp.join(',')}
              size="small"
            />
          </ListItem>
          <ListItem className={classes.weldingField}>
            <TextField
              name="hpp"
              onChange={changeWeldingInfo}
              id="outlined-password-input"
              label="2nd Hot Pass"
              value={values.hpp.join(',')}
              size="small"
            />
          </ListItem>
          <ListItem className={classes.weldingField}>
            <TextField
              name="fl"
              onChange={changeWeldingInfo}
              id="outlined-password-input"
              label="Firing Lane"
              value={values.fl.join(',')}
              size="small"
            />
          </ListItem>
        </List>
        <IconButton
          style={iconBtnStyle}
          onClick={(e) => {
            setEdit(false);
            updateWelding();
          }}
        >
          <CheckCircleIcon />
        </IconButton>
      </div>
    );
  else
    return (
      <div
        className={classes.weldersInfo}
        style={{ gridColumn: `${gapCols[pos]}`, padding: '0' }}
      >
        <List>
          <ListItem className={classes.weldingField}>
            rp : {values.rp.join(',')}
          </ListItem>
          <ListItem className={classes.weldingField}>
            hp : {values.hp.join(',')}
          </ListItem>
          <ListItem className={classes.weldingField}>
            hpp : {values.hpp.join(',')}
          </ListItem>
          <ListItem className={classes.weldingField}>
            fl: {values.fl.join(',')}
          </ListItem>
        </List>
        <IconButton style={iconBtnStyle} onClick={(e) => setEdit(true)}>
          <EditIcon />
        </IconButton>
      </div>
    );
};

export default WeldingInfo;
