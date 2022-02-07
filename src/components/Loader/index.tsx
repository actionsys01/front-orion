import React from 'react';
import { Loading } from '@geist-ui/react';
import { LoaderContainer } from './style';

const Loader = () => {
    return (
        <LoaderContainer>
            <Loading />
        </LoaderContainer>
    );
};

export default Loader;
