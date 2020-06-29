import React, {useState, useEffect} from 'react'
import UserPNG from '../../../Utils/Assets/people@2x.png'
import Dr from '../../../Utils/Assets/doctor@3x.png'
import Add from '../../../Utils/Assets/add@3x.png'
import Tick from '../../../Utils/Assets/tick@3x.png'
import {ReactComponent as Doctor} from '../../../Utils/Assets/doctor-placeholder.svg' 

import './tile.scss'
const Tile = (props) => {
    const [isSelectedProvider, setIsSelectedProvider] = useState(false)
    const [isSelectedUser, setIsSelectedUser] = useState(false)
    const [dummy, setDummy] = useState("")
    useEffect(() => {
        if(props.selectedProviders){
            if(props.selectedProviders.includes(props.data) === false){
                setIsSelectedProvider(false)
            }
            else{
                setIsSelectedProvider(true)
            }
        }
        if(props.selectedUsers){
            if(props.selectedUsers.includes(props.data)){
                setIsSelectedUser(true)
            }
            else{
                setIsSelectedUser(false)
            }
        }
    }, [props, dummy])

    const handleSelectProvider = () => {      
        props.AddProvider(props.data)
        localStorage.setItem("proceed", false)
        setDummy(true)
        
    }
    const handleSelectUser = () => {
        props.AddUser(props.data)
        localStorage.setItem("proceed", true)
        setDummy(true)

    }



    return(
        <div className="tile">
            <div className="user">
            
               <div className="avatar">
               {
                    props.data.type === "Provider" 
                    ?
                   <>
                   <Doctor className="png"/>
                    <p  className="name">{props.data.name}</p>
                    <p className="des">{props.data.activity}</p>
                    <span className="dr"><img src={Dr} alt=""/></span>
                    <span className="add">
                        {
                            isSelectedProvider
                            ?
                            <img  src={Tick} alt=""/>
                            :
                            <img onClick={handleSelectProvider} src={Add} alt=""/>
                        }
                    </span>
                   </>
                    :
                    <>
                   <img className="png" src={UserPNG} alt=""/>
                   <p  className="user">{props.data.name}</p>
                    <p className="des">User - {props.data.gender}</p>
                    <span className="add2">
                        {
                            isSelectedUser
                            ?
                            <img  src={Tick} alt=""/>
                            :
                            <img onClick={handleSelectUser} src={Add} alt=""/>
                        }
                    </span>
                   </>                
                }
               </div>
            </div>
        </div>
    )
}

export default Tile