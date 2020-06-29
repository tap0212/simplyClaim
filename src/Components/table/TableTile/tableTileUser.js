import React, {useState, useEffect} from 'react'
import Cross from '../../../Utils/Assets/cancel@3x.png'
import {Grid} from '@material-ui/core'

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


import './TableTile.scss'

const useStyles = makeStyles((theme) => ({
    formControl1: {
       marginTop:"5%",
        minHeight:"70%",
        minWidth: 100,
    },
    formControl2: {
        marginTop:"5%",
        minHeight:"70%",
        minWidth: 100,
        float:"right",
      },
    selectEmpty: {
     
    },
 
      selectRoot: {
        color: "#A9A9A9"
      },
      icon: {
        color: "#A9A9A9"
      },
      selectPaper: {
        backgroundColor: "#1E1E24",
        border: "1px solid #484850",
        borderRadius: "5px",
        color: "#FFFFFF",
        "& li:hover": {
          backgroundColor: "#303039"
        }
      }
  }));
export default function TableTileProvider(props) {
    const classes = useStyles();

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
                <FormControl className={classes.formControl1}>
                    <Select
                    value={role}
                    onChange={(e) => {setRole(e.target.value)}}
                    displayEmpty
                    
                    className={classes.selectEmpty}
                    
                    classes={{
                            root: classes.selectRoot,
                            icon: classes.icon
                    }}
                    MenuProps={{ classes: { paper: classes.selectPaper } }}
                    inputProps={{ 'aria-label': 'Without label' }}
                    >
                    <MenuItem value="" disabled>
                        Role
                    </MenuItem>
                    <MenuItem value="Super Admin">Super Admin</MenuItem>
                    <MenuItem value="Admin">Admin</MenuItem>
                    <MenuItem value="Observer">Observer</MenuItem>
                    <MenuItem value="Guest">Guest</MenuItem>
                    </Select>
                </FormControl>
                </Grid>
                <Grid item xs={3}></Grid>
                <Grid item xs={2}>
                    <input type="tel" placeholder="Ph. Number" onChange={(e) => setProviderNumber(e.target.value)}/>
                </Grid>
                <Grid item xs={2}>
                    <FormControl className={classes.formControl2}>
                    <Select
                    value={gender}
                    onChange={(e) => {setGender(e.target.value)}}
                    displayEmpty
                    className={classes.selectEmpty}
                    classes={{
                            root: classes.selectRoot,
                            icon: classes.icon
                    }}
                    MenuProps={{ classes: { paper: classes.selectPaper } }}
                    inputProps={{ 'aria-label': 'Without label' }}
                    >
                    <MenuItem value="" disabled>
                        Gender
                    </MenuItem>
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                    </Select>
                </FormControl>
                </Grid>
                <Grid item xs={1}>
                    <img onClick={handleRemove} src={Cross} alt=""/>
                </Grid>
            </Grid>

           
        </div>
    )
}
