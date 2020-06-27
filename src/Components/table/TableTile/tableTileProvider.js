import React, {useState, useEffect} from 'react'
import Cross from '../../../Utils/Assets/cancel@3x.png'
import {Grid} from '@material-ui/core'
import './TableTile.scss'
export default function TableTileProvider(props) {
    const [role, setRole] = useState("")
    const [providerNumber, setProviderNumber] = useState("")
    const [bupa, setBupa] = useState("")
    const [bank, setBank] = useState("")
    const [isActive ,setIsActive ] = useState(true)
    useEffect(() => {
        setIsActive(localStorage.getItem("proceed"))
    }, [])
    useEffect(() => {
        if(role.length > 0){
            if(bupa.length>0){
                if(providerNumber.length>0){
                  if(bank.length>0){
                    setIsActive(false)
                  }
                }
            }
        }
    }, [role, providerNumber, bupa, bank])

    const handleRemove = () => {
        props.RemoveProvider(props.data)
    }

    const suggest = () => {
        
    }
    return (
        <div className={isActive ? "tableTile active" : "tableTile"}>
                   {isActive === false ? props.ActivateProceedBtn(true) : props.ActivateProceedBtn(false)}
            <Grid container>
                <Grid item xs={2}>
                    <h5 className="username">{props.data.name}</h5>
                </Grid>
                <Grid item xs={2}>
                    <select name="role" id="role" onChange={(e) => setRole(e.target.value)}>
                        <option defaultValue value=""> Role</option>
                        <option value="Super Admin">Super Admin</option>
                        <option value="Admin">Admin</option>
                        <option value="Observer">Observer</option>
                        <option value="Guest">Guest</option>
                    </select>
                </Grid>
                <Grid item xs={2}>
                    <input type="text" placeholder="Provider Number" onChange={(e) => setProviderNumber(e.target.value)}/>
                </Grid>
                <Grid item xs={2}>
                <input type="text" placeholder="BUPA ID" onChange={(e) => setBupa(e.target.value)}/>
                </Grid>
                <Grid item xs={3}>
                <input className="datalist" type="text" list="data" onChange={(e) => setBank(e.target.value)}  />

                    <datalist id="data">
                        {props.data.bank.map((item, key) =>
                            <option key={key} value={`${item.name}, ${item.number}`} />
                        )}
                    </datalist>
                </Grid>
                <Grid item xs={1}>
                    <img onClick={handleRemove} src={Cross} alt=""/>
                </Grid>
            </Grid>

           
        </div>
    )
}
