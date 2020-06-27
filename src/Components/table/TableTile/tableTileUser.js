import React, {useState, useEffect} from 'react'
import Cross from '../../../Utils/Assets/cancel@3x.png'
import {Grid} from '@material-ui/core'
import './TableTile.scss'
export default function TableTileProvider(props) {
    const [role, setRole] = useState("")
    const [providerNumber, setProviderNumber] = useState("")
    const [gender, setGender] = useState("")
    const [isActive ,setIsActive ] = useState(true)
    
    useEffect(() => {
        setIsActive(localStorage.getItem("proceed"))
    }, [])
    useEffect(() => {
        if(role.length > 0){
            if(gender.length>0){
                if(providerNumber.length>0){
                    setIsActive(false)
                }
            }
        }
    }, [role, providerNumber, gender])

    const handleRemove = () => {
        props.RemoveUser(props.data)
    }
    return (
        <div className={isActive ? "tableTileUser active" : "tableTileUser"}>
           {isActive === false ? props.ActivateProceedBtn(true) : props.ActivateProceedBtn(false)}
           
            <Grid container>
                <Grid item xs={2}><h5>{props.data.name}</h5></Grid>
                <Grid item xs={2}>
                    <select name="role" id="role" onChange={(e) => setRole(e.target.value)}>
                        <option defaultValue value=""> Role</option>
                        <option value="Super Admin">Super Admin</option>
                        <option value="Admin">Admin</option>
                        <option value="Observer">Observer</option>
                        <option value="Guest">Guest</option>
                    </select>
                </Grid>
                <Grid item xs={3}></Grid>
                <Grid item xs={2}>
                    <input type="tel" placeholder="Enter number" onChange={(e) => setProviderNumber(e.target.value)}/>
                </Grid>
                <Grid item xs={2}>
                    <select name="gender" className="gender" id="gender" onChange={(e) => setGender(e.target.value)}>
                        <option value="">Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </Grid>
                <Grid item xs={1}>
                    <img onClick={handleRemove} src={Cross} alt=""/>
                </Grid>
            </Grid>

           
        </div>
    )
}
