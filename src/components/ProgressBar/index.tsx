import React, { useState, useEffect } from 'react';

interface ProgressProps {
    done: number;
}

const ProgressBar = ({ done }: ProgressProps) => {
    const [bar, setBar] = useState({});

    useEffect(() => {
        const newStyle = {
            opacity: 1,
            width: `${done}%`,
        };

        setBar(newStyle);
    }, [done]);

    return (
        <>
            <div className="progress">
                <div style={bar}>
                    <span style={{ display: 'none' }}> {done}</span>
                </div>
            </div>
        </>
    );
};

export default ProgressBar;
