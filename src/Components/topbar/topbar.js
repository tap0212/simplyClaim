import React, {useState, useEffect} from 'react'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import './topbar.scss'
const Topbar = (props) => {
    const [hospital, setHospital] = useState("")
    useEffect(() => {
        setHospital(props.hospitals[props.selectedHospital])
    }, [props.selectedHospital, props.hospitals])
    return (
        <div className="topbar">
            <p><ArrowBackIosIcon style={{fontSize:"15"}} className="back" />back to users</p>
           {hospital && 
            <div className="hospitalDetail">
                <h1>{hospital.name}</h1>
                <h4>{hospital.address} <FiberManualRecordIcon className="dot" /> {hospital.company}</h4>
                <button
                 className={props.isProceedBtnActive ? "proceed-btn-active" : "proceed-btn-disabled"}
                 >
                 Proceed
                </button>
            </div>
           }
        </div>
    )
}
export default Topbar