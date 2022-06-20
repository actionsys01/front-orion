import { Dispatch, SetStateAction } from 'react';

const LoadAndGetData = (
  setLoading: Dispatch<SetStateAction<boolean>>,
  onClick: any,
) => {
  return (
    setLoading(true),
    setTimeout(() => {
      onClick();
    }, 1600)
  );
};

export default LoadAndGetData;
