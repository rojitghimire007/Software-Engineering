import api from 'api';
import React, { useEffect, useState } from 'react';
import useStyles from 'style/WeldingStyles';
import { isNamedExports } from 'typescript';
import WeldingInfo from './WeldingInfo';
import Button from '@mui/material/Button';

type dataType = {
  item_id: string;
  weld_id: string | null;
  station_number: number;
  overlap?: boolean;
  gap_length?: number;
  plength?: number;
  flength?: number;
  start?: number;
  rp: Array<string> | null;
  hp: Array<string> | null;
  hpp: Array<string> | null;
  fl: Array<string> | null;
};

const Weld = () => {
  const classes = useStyles();
  const itemCols = [1, 3, 5, 7];
  const gapCols = [2, 4, 6];

  /**
   * Welding Items
   */
  const [items, setItems] = useState<Array<dataType>>([]);
  const [startWindow, setStartWindow] = useState<number>(0);

  useEffect(() => {
    api
      .getWelding()
      .then((res) => {
        setItems(res.data);
      })
      .catch((error) => alert(error.message));
  }, []);

  const addWeld = (index: number, data: any) => {
    index += startWindow;

    let item: dataType = items[index];
    let fldate = null;

    if (
      (!item.fl && data.fl.length > 0) ||
      (item.fl && JSON.stringify(item.fl) !== JSON.stringify(data.fl))
    )
      fldate = new Date().getTime();

    item = { ...item, ...data };

    if (!items[index + 1]) return;

    api
      .createWeld({
        item: item.item_id,
        next_item: items[index + 1].item_id,
        station: item.station_number,
        rp: item.rp,
        hp: item.hp,
        hpp: item.hpp,
        fl: item.fl,
        wdate: null,
        fldate,
      })
      .then((res) => {
        let temp = [...items];
        temp[index] = res.data[0];
        setItems(temp);
      })
      .catch((err) => alert(err.message));
  };

  if (items.length === 0) return null;
  else
    return (
      <>
        <div>
          <Button
            variant="contained"
            disabled={startWindow === 0}
            onClick={() => setStartWindow(startWindow - 1)}
          >
            Previous
          </Button>
          <Button
            variant="contained"
            disabled={startWindow === items.length - 4}
            onClick={() => setStartWindow(startWindow + 1)}
          >
            Next
          </Button>
        </div>
        <div className={classes.container}>
          <div className={classes.itemGrid}>
            {items.slice(startWindow, startWindow + 4).map((item, index) => {
              return (
                <React.Fragment key={index}>
                  <div
                    className={classes.item}
                    style={{ gridColumn: `${itemCols[index]}` }}
                  >
                    {item.item_id}
                  </div>
                  {!item.weld_id || index == 3 ? null : (
                    <div
                      className={classes.gapItem}
                      style={{
                        gridColumn: `${gapCols[index]}`,
                      }}
                    ></div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
          <div className={classes.infoGrid}>
            {items.slice(startWindow, startWindow + 3).map((item, index) => {
              return (
                <WeldingInfo
                  key={index}
                  data={{
                    weld_id: item.weld_id,
                    rp: item.rp ? item.rp : [],
                    hp: item.hp ? item.hp : [],
                    hpp: item.hpp ? item.hpp : [],
                    fl: item.fl ? item.fl : [],
                  }}
                  pos={index}
                  addWeld={addWeld}
                />
              );
            })}
          </div>
        </div>
      </>
    );
};

export default Weld;
