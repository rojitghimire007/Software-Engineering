import api from 'api';
import React, { useEffect, useState } from 'react';
import useUpdateEffect from 'utils/useUpdateEffect';

const PipeCutting = () => {
  const [eligiblePipes, setEligiblePipes] = useState<Array<string>>([]);
  const [selectedPipe, setSelectedPipe] = useState<string>('');

  useEffect(() => {
    api
      .getCuttingEligiblePipes()
      .then((res) => {
        setEligiblePipes(res.map((item: { pipe_id: string }) => item.pipe_id));
      })
      .catch((err) => {
        alert(err.message);
      });
  }, []);

  useUpdateEffect(() => {
    api
      .getStrungPipesInfo([selectedPipe])
      .then((res) => {})
      .catch((e) => alert(e.message));
  }, [selectedPipe]);
  return <></>;
};

export default PipeCutting;
