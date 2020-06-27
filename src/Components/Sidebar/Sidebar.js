import React, {useState} from 'react'
import './sidebar.scss'
import {Grid} from '@material-ui/core'
import User from '../../Utils/Assets/doctor-placeholder@2x.png'
import Practice from '../../Utils/Assets/practice@2x.png'
import Payment from '../../Utils/Assets/payment@2x.png'
import Contract from '../../Utils/Assets/contract@2x.png'
import Assets from '../../Utils/Assets/assets@2x.png'
import Summary from '../../Utils/Assets/summary@2x.png'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import Assign from '../../Utils/Assets/assign@2x.png'
import Lock from '../../Utils/Assets/lock@2x.png'
import Logo from '../../Utils/Assets/group-7@3x.png'



 const Sidebar = (props) => {

    const [dropDown, setDropDown] = useState(false)
    const handleSelect = (e) => {
        props.setSelectedHospital(e.target.value)
    }

    const handleDropDown = () => {
        setDropDown(!dropDown)
    }
    return (
        <div className="sidebar">
            <div className="user">
                <Grid container>
                    <Grid item xs={6}>
                        <h3>Alex Junior</h3>
                        <p>Sign out</p>
                    </Grid>

                    <Grid item xs={6}>
                        <img src={User} className="userSvg" alt=""/>
                    </Grid>
                </Grid>
            </div>

            <div className="options">
                <ul>
                    <li><img src={Practice} alt="" className="practiceSvg" />Practice<img alt="" src={Lock} className="lockSvg" /></li>
                    <li><img src={Payment} alt="" className="paymentSvg" />Payment</li>
                    <li><img src={Contract} alt="" className="contractSvg" />Contract</li>
                   
                </ul>
            </div>

            <div className={dropDown ? "down" : "down up"}>
            <li  className="assets"><img src={Assets} alt="" className="assetsSvg" />Assets</li>

            {
                dropDown 
                ?
                <li onClick={handleDropDown} className="assets"><img src={Assign} alt="" className="assetsSvg" />Assignment<KeyboardArrowDownIcon className="arrowSvg" /> </li>
                : 
                <li onClick={handleDropDown} className="assets"><img src={Assign} alt="" className="assetsSvg" />Assignment<KeyboardArrowUpIcon className="arrowSvg" /> </li>
            }
                <div className="list">
                <ul>
                    {
                        props.hospitals.map((hospital, index) => {
                           return(
                                <li onClick={handleSelect} className={index===props.selectedHospital ? "selected" : ""} value={index} key={index}>{hospital.name}</li>
                           )
                        })
                    }
                </ul>
                </div>
            </div>
            <div className="summary">
                <div className="line"></div>

                <p className="summary-li"><img className="summarySvg" src={Summary} alt=""/>Summary</p>
            </div>

            <div className="logo">
                    <img className="logoImg" src={Logo} alt=""/>
            </div>
        </div>
    )
}
export default Sidebar