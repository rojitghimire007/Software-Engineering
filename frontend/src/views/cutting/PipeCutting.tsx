import { Select, MenuItem, InputLabel, FormControl, Button } from '@mui/material';
import api from 'api';
import NewCutting from 'DEMOS/new-cutting-prototype/NewCutting';
import React, { useEffect, useState } from 'react';
import useUpdateEffect from 'utils/useUpdateEffect';

const PipeCutting = () => {
  const [fetch, setFetch] = useState(false);
  const [eligiblePipes, setEligiblePipes] = useState<Array<string>>([]);
  const [eligibleLength, setEligibleLength] = useState(0);
  const [selectedPipe, setSelectedPipe] = useState<string>('');
  const [pipeChosen, setPipeChosen] = useState(false);
  const [errored, setErrored] = useState(false);

  useEffect(() => {
    api
      .getCuttingEligiblePipes()
      .then((res) => {
        // console.log(res)
        setEligiblePipes(res.data.map((item: { id: string }) => item.id));
      })
      .catch((err) => {
        alert(err.message);
      });
  }, []);

  useEffect(() => {
    // console.log(eligiblePipes)
    api
      // .getPipeLength('100D')
      .getPipeLength(eligiblePipes[0])
      .then((res) => {
        // console.log(res.data.plength)
        setEligibleLength(res.data.plength)
        // console.log(eligibleLength)
      })
      .catch((err) => {
        alert(err.message);
      })
  }, [selectedPipe != ''])

  useEffect(() => {
    setSelectedPipe('');
    setPipeChosen(false);
  }, [errored === true])

  useEffect(() => {
    setErrored(false);
  }, [selectedPipe === '', !pipeChosen])


  // useUpdateEffect(() => {
  //   api
  //     .getStrungPipesInfo([selectedPipe])
  //     .then((res) => { console.log(res) })
  //     .catch((e) => alert(e.message));
  // }, [selectedPipe, fetch]);
  return (
    <>
      {/* <button onClick={() => setFetch(!fetch)}>
        {fetch ?
          <>Fetch Data</>
          :
          <>Unfetch</>
        }
      </button> */}
      {!pipeChosen ?
        <div>
          <FormControl sx={{ margin: '25px 0', minWidth: '25%' }}>
            <InputLabel id="cut-eligible-pipes">Select Pipe for Cutting *</InputLabel>
            <Select
              labelId="cut-eligible-pipes"
              id="eligible-pipes"
              value={selectedPipe}
              label="Select Pipe for Cutting *"
              onChange={
                (e) => {
                  setSelectedPipe(e.target.value);
                }
              }
              >
              {eligiblePipes.map((pipe: any) => {
                return (
                  <MenuItem value={pipe}>
                    <em>{pipe}</em>
                  </MenuItem>
                )
              })}
            </Select>
            <Button
              variant="contained"
              onClick={() => { setPipeChosen(true) }}
              >
              Proceed
            </Button>
          </FormControl>
        </div>
        :
        null
      }
      {pipeChosen && selectedPipe === ''?
        <>
          {setErrored(true)}
          {alert('Please select a valid pipe from the drop down')}
        </>
        :
        null

      }
      {pipeChosen && selectedPipe != '' ?
        <NewCutting id={selectedPipe} length={eligibleLength} />
        :
        null
      }
    </>
  );
};

export default PipeCutting;
