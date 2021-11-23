import api from 'api';
import NewCutting from 'DEMOS/new-cutting-prototype/NewCutting';
import React, { useEffect, useState } from 'react';
import useUpdateEffect from 'utils/useUpdateEffect';

const PipeCutting = () => {
  const [fetch,setFetch] = useState(false);
  const [eligiblePipes, setEligiblePipes] = useState<Array<string>>([]);
  const [selectedPipe, setSelectedPipe] = useState<string>('');

  useEffect(() => {
    api
      .getCuttingEligiblePipes()
      .then((res) => {
        console.log(res)
        setEligiblePipes(res.map((item: { pipe_id: string }) => item.pipe_id));
      })
      .catch((err) => {
        alert(err.message);
      });
  }, [fetch]);

  useUpdateEffect(() => {
    api
      .getStrungPipesInfo([selectedPipe])
      .then((res) => { console.log(res) })
      .catch((e) => alert(e.message));
  }, [selectedPipe, fetch]);
  return (
    <>
      <button onClick={()=>setFetch(!fetch)}>Fetch Data</button>
      {/* {console.log(eligiblePipes)}
      {console.log(selectedPipe)} */}
      <NewCutting id='pipe_10' length={200}/>
    </>
  );
};

export default PipeCutting;
