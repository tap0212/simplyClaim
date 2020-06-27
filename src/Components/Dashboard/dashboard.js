import React, {useState, useEffect} from 'react'
import Sidebar from '../Sidebar/Sidebar'
import Topbar from '../topbar/topbar'
import WbIncandescentTwoToneIcon from '@material-ui/icons/WbIncandescentTwoTone';import HospitalData from '../../Utils/Data/Hospitals.json'
import MiniTopBar from '../topbar/miniTopBar'
import SearchBox from '../searchBox/searchbox'
import TableProviders from '../table/tableProviders'
import TableUsers from '../table/tableUsers'

import {Grid} from '@material-ui/core'
import './dashboard.scss'
export default function Dashboard() {

    const [hospitals, setHospitals] = useState(HospitalData)
    const [selectedHospital, setSelectedHospital] = useState(-1)
    const [isScroll, setIsScroll] = useState(false)
    const [isProceedBtnActive,  setIsProceedBtnActive] = useState(false)
    const [selectedProviders, setSelectedProviders] = useState([])
    const [selectedUsers, setSelectedUsers] = useState([])
    useEffect(() => {
        document.addEventListener("scroll", () => {
            const scroll = window.scrollY < 100 ? false : true;
      
            setIsScroll(scroll)
          });
    }, [])

    const AddProvider = (newProvider) => {
        setSelectedProviders(selectedProviders => [...selectedProviders, newProvider])
    }


    const AddUser = (newUser) => {
        setSelectedUsers(selectedUsers => [...selectedUsers, newUser])
    }
    

    const RemoveProvider = (provider) => {
        const arr = selectedProviders.filter(item => item !== provider)
        setIsProceedBtnActive(false)
        setSelectedProviders(arr)
        localStorage.setItem("providers", JSON.stringify(arr))        
    }

    const RemoveUser = (user) => {
        const arr = selectedUsers.filter(item => item !== user)
        setIsProceedBtnActive(false)
        setSelectedUsers(arr)
        localStorage.setItem("users", JSON.stringify(arr))        

    }

    const ActivateProceedBtn = (exp) => {
        setIsProceedBtnActive(exp)
    }


    return (
        <div className="dashboard">
        {
            isScroll 
            ? 
                <MiniTopBar isProceedBtnActive={isProceedBtnActive} hospitals={hospitals} selectedHospital={selectedHospital} />
            : 
                <Topbar isProceedBtnActive={isProceedBtnActive} hospitals={hospitals} selectedHospital={selectedHospital} />

        }
            <Sidebar hospitals={hospitals} selectedHospital={selectedHospital} setSelectedHospital={setSelectedHospital} />

        
        <div className="mainDashboard">
        {
            selectedHospital === -1
             ?
             <div className="noLocationChosen">
                <WbIncandescentTwoToneIcon  className="bulb"/>
                <h1>Select a location</h1>
             </div> 
            :

            <div className="content">
                <Grid container>
                    <Grid item xs={3}>
                        <div className="searchBoxContainer">
                            <h4>All Providers & users</h4>
                            <SearchBox  AddProvider={AddProvider} AddUser={AddUser} selectedProviders={selectedProviders} selectedUsers={selectedUsers} />
                        </div>
                    </Grid>
                    <Grid item xs={9} style={{paddingLeft:"0"}}>
                        <div className="table" style={{paddingLeft:"0"}}>
                        <div className="th">
                        <Grid container>
                            <Grid item xs={2}><h5>ASSIGNED PROVIDERS</h5></Grid>
                            <Grid item xs={2}><h5>ROLE</h5></Grid>
                            <Grid item xs={2}><h5>PROVIDER NO.</h5></Grid>
                            <Grid item xs={2}><h5>BUPA ID (OPTIONAL)</h5></Grid>
                            <Grid item xs={3}><h5 className="bank">BANK ACCOUNT</h5></Grid>
                        </Grid>
                        </div>
                            <TableProviders ActivateProceedBtn={ActivateProceedBtn} RemoveProvider={RemoveProvider}  selectedUsers={selectedUsers} selectedProviders={selectedProviders}/>

                            {
                                selectedUsers.length !== 0 &&
                                <div className="th">
                                <Grid container>
                                    <Grid item xs={2}><h5>ASSIGNED USERS</h5></Grid>
                                    <Grid item xs={2}><h5>ROLE</h5></Grid>
                                    <Grid item xs={3}></Grid>
                                    <Grid item xs={2}><h5>MOBILE NUMBER</h5></Grid>
                                    <Grid item xs={2}><h5 className="gender">GENDER</h5></Grid>
                                    <Grid item xs={1}></Grid>
                                </Grid>
                                </div>
                            }
                            <TableUsers ActivateProceedBtn={ActivateProceedBtn} RemoveUser={RemoveUser} selectedUsers={selectedUsers} selectedProviders={selectedProviders}/>
                            {(selectedProviders.length !== 0 || selectedUsers.length !== 0) &&
                                <p className="note">*Details can be edited by clicking on them</p>
                            }
                        </div>
                    </Grid>
                </Grid>
            </div>

            
            
        }
        </div>
        </div>
    )
}
