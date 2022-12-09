import React, { useState } from 'react';

import './FloatingMenu.css';

import { Button } from '@chakra-ui/react';
import { CircularProgress, IconButton, Tooltip } from '@material-ui/core';
import NavigationIcon from '@mui/icons-material/Navigation';
import MemoryIcon from '@mui/icons-material/Memory';
import PlayIcon from '@mui/icons-material/PlayCircleFilledWhite';
import StopIcon from '@mui/icons-material/StopCircle';



function FloatingMenu(props) {
    const socket = props.socket;

    const askCoordenates = () => {
        // console.log('STATUS ACTUAL SOCKET: ', socket);
        props.setIsRealTime(true)
        socket.emit("chat message", { msg: 'start', room: 'executive' });
        socket.emit("chat message", { msg: 'beacons', room: 'executive' });
    };

    const sendCommand = (msg) => {
        // console.log('STATUS ACTUAL SOCKET: ', socket);
        socket.emit("chat message", { msg: msg, room: 'executive' });
    };

    const startRealtime = () => {
        props.setIsRealTime(true)
        sendCommand('start')
    }


    const stopRealtime = () => {
        props.setIsRealTime(false)
        sendCommand('stop')
    }


    return (
        <div className="FABMenu">
            <input type="checkbox" defaultChecked />
            <div className="hamburger">
                <div className="dots">
                    <span className="first" />
                    <span className="second" />
                    <span className="third" />
                </div>
            </div>
            <div className="action_items_bar">
                <div className="action_items">
                    <span className="first_item">
                        <i className="material-icons">
                            <Tooltip title="Centrar">
                                <NavigationIcon />
                            </Tooltip>
                        </i>
                    </span>
                    <span className="second_item">
                        <i className="material-icons">
                            <Tooltip title="Traer datos">
                                <MemoryIcon onClick={askCoordenates} />
                            </Tooltip>
                        </i>
                    </span>
                    <span className="third_item">
                        <i className="material-icons">
                            {!props.isRealTime &&
                                <Tooltip title="Play Real-Time">
                                    <PlayIcon onClick={startRealtime} />
                                </Tooltip>}
                            {props.isRealTime &&
                                <CircularProgress
                                    variant='indeterminate'
                                    color='success'
                                    size={32} />
                            }

                        </i>
                    </span>
                    <span className="fourth_item">
                        <i className="material-icons">
                            <Tooltip title="Stop Real-Time">
                                <StopIcon onClick={stopRealtime} />
                            </Tooltip>
                        </i>
                    </span>
                </div>
            </div>
        </div >
    )
}

export default FloatingMenu