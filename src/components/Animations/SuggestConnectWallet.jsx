import React from 'react'
import Lottie from 'react-lottie';
import animationData from '../../assets/animations/wallet.json';


function SuggestConnectWallet() {

    return (
        <Lottie options={{
            loop: false,
            animationData: animationData
        }} height={450} width={450} />
    )
}

export default SuggestConnectWallet