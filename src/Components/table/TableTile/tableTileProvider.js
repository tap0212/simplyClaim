import React, {useState, useEffect} from 'react'
import Cross from '../../../Utils/Assets/cancel@3x.png'

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


import {Grid} from '@material-ui/core'
import './TableTile.scss'
const useStyles = makeStyles((theme) => ({
    formControl: {
        marginTop:"5%",
        Height:"70%",
        minWidth: 100,
    },
    formControl1: {
        marginTop:"3%",
        Height:"70%",
        minWidth: 100,
        float:"right"
    },
    
    selectRoot: {
        color: "#A9A9A9"
      },
      icon: {
        color: "#A9A9A9"
      },
      selectPaper: {
        backgroundColor: "#202020",
        border: "1px solid #202020",
        borderRadius: "5px",
        color: "#FFFFFF",
        "& li:hover": {
          backgroundColor: "#202020"
        }
      }
    
  }));


export default function TableTileProvider(props) {
    const classes = useStyles();

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

    return (
        <div className={isActive ? "tableTile active" : "tableTile"}>
                   {isActive === false ? props.ActivateProceedBtn(true) : props.ActivateProceedBtn(false)}
            <Grid container>
                <Grid item xs={2}>
                    <h5 className="username">{props.data.name}</h5>
                </Grid>
                <Grid item xs={2}>
                
                <FormControl className={classes.formControl}>
                    <Select
                    disableUnderline={true}
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
                <Grid item xs={2}>
                    <input type="text" placeholder="P. Number" onChange={(e) => setProviderNumber(e.target.value)}/>
                </Grid>
                <Grid item xs={2}>
                <input type="text" placeholder="BUPA ID" onChange={(e) => setBupa(e.target.value)}/>
                </Grid>
                <Grid item xs={3}>
                {/* <Autocomplete
                    onChange={(e) => setBank(JSON.stringify(props.data.bank[e.target.value]))}
                    id="combo-box-demo"
                    options={props.data.bank}
                    getOptionLabel={(option) => option.name}
                    classes="autoC"
                    
                    disablePortal={true}
                    
                    renderInput={(params) => <TextField className="textField"  {...params} label="Linked Bank Account"
                    InputProps={{...params.InputProps, disableUnderline: true ,  'aria-label': 'Without label'}}
                      />}
                    /> */}

                    <FormControl className={classes.formControl1}>
                    <Select
                    disableUnderline={true}
                    value={bank}
                    onChange={(e) => {setBank(e.target.value)}}
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
                        Linked Bank Account
                    </MenuItem>
                   
                    {
                        props.data.bank.map((item, index) => {
                            return(
                                <MenuItem value={`${item.name}, ${item.number}`} >{`${item.name}, (${item.number})`}</MenuItem>
                            )
                        })
                    }
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
