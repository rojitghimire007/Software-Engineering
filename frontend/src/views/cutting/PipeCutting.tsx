import api from 'api';
import NewCutting from 'DEMOS/new-cutting-prototype/NewCutting';
import React, { useEffect, useState } from 'react';
import useUpdateEffect from 'utils/useUpdateEffect';

const PipeCutting = () => {
  const [fetch, setFetch] = useState(false);
  const [eligiblePipes, setEligiblePipes] = useState<Array<string>>([]);
  const [eligibleLength, setEligibleLength] = useState(0);
  const [selectedPipe, setSelectedPipe] = useState<string>('');

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
        console.log(eligibleLength)
      })
      .catch((err) => {
        alert(err.message);
      })
  }, [fetch === true])

  // useUpdateEffect(() => {
  //   api
  //     .getStrungPipesInfo([selectedPipe])
  //     .then((res) => { console.log(res) })
  //     .catch((e) => alert(e.message));
  // }, [selectedPipe, fetch]);
  return (
    <>
      <button onClick={() => setFetch(!fetch)}>
        {fetch ?
          <>Fetch Data</>
          :
          <>Unfetch</>
        }
      </button>
      <div>
        
      </div>
      {/* {console.log(eligiblePipes)}
      {console.log(selectedPipe)} */}
      <NewCutting id='pipe_10' length={200} />
    </>
  );
};

export default PipeCutting;
