import React, {useState, useEffect} from 'react'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import './topbar.scss'
const MiniTopBar = (props) => {
    const [hospital, setHospital] = useState("")
    useEffect(() => {
        setHospital(props.hospitals[props.selectedHospital])
    }, [props.selectedHospital, props.hospitals])
    return (
        <div className="minibar">
            <p><ArrowBackIosIcon style={{fontSize:"15"}} className="back" />back to users</p>
           {hospital && 
            <div className="hospitalDetail">
                <span>
                    <span className="name">
                        {hospital.name}
                    </span> 
                    <span className="address">
                        {hospital.address} 
                            <FiberManualRecordIcon className="dot"/>
                            {hospital.company}
                    </span>
                </span>
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
export default MiniTopBar