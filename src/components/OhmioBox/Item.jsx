import React from 'react'
import "./Item.css";

import rohdelogo from './examples/rohde_logo.png'
import rohde_transmitter from './examples/uhf-transmitter-rs.png'

import gatesairlogo from './examples/gatesair_logo.png'
import gatesair_transmitter from './examples/uhf-transmitter-ga.png'


function Item() {
    return (
        <>
            <div className="card">
                <div className="circle" style={{ background: "#09225e" }}>
                    <img src={rohdelogo} className="logo" />
                </div>
                <div className="content">
                    <h2>OHMIOBOX #1</h2>
                    <h3><text style={{ fontWeight: 'bold' }}>Ubication</text>: Barcelona, Spain</h3>
                    <h4><text style={{ fontWeight: 'bold' }}>MiningRewards</text>: 10 &Omega;</h4>
                    <h4><text style={{ fontWeight: 'bold' }}>Last Update</text>: 5 minutes ago</h4>
                    <h4><text style={{ fontWeight: 'bold' }}>Description</text>:</h4>
                    <p>This is a RS®TMU9evo air-cooled UHF transmitter.</p>
                    <a href="#">Explore</a>
                </div>
                <img src={rohde_transmitter} className="product_img" />
            </div>
            <div className="card">
                <div className="circle" style={{ background: "#000101" }}>
                    <img src={gatesairlogo} className="logo" />
                </div>
                <div className="content">
                    <h2>OHMIOBOX #2</h2>
                    <h3><text style={{ fontWeight: 'bold' }}>Ubication</text>: Barcelona, Spain</h3>
                    <h4><text style={{ fontWeight: 'bold' }}>MiningRewards</text>: 10 &Omega;</h4>
                    <h4><text style={{ fontWeight: 'bold' }}>Last Update</text>: 5 minutes ago</h4>
                    <h4><text style={{ fontWeight: 'bold' }}>Description</text>:</h4>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua.</p>
                    <a href="#">Explore</a>
                </div>
                <img src={gatesair_transmitter} className="product_img" />
            </div>
        </>
    )
}

export default Item