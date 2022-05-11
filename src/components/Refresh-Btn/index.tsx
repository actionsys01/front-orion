import React from 'react';
import { RefreshCw } from '@geist-ui/react-icons';
import { Refresh } from './styles';

// interface IBtn {
//   onClick: Promise<[]>;
// }

const RefreshBtn: React.FC<any> = () => {
  return (
    <Refresh>
      <RefreshCw />
    </Refresh>
  );
};

export default RefreshBtn;
