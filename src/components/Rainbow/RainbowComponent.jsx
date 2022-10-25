import React, { useEffect } from 'react';

import './Rainbow.css';
import './Rainbow.js';


function RainbowComponent() {

    useEffect(() => {
        return () => {

        }
    }, [])

    return (
        <canvas id="canvasrainbow" className="canvasrainbow" width="350" height="250" />
    )
}

export default RainbowComponent