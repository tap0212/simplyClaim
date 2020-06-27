import React, {useEffect, useState} from 'react'
import SearchPNG from '../../Utils/Assets/search@3x.png'
import ArrowForwardIosTwoToneIcon from '@material-ui/icons/ArrowForwardIosTwoTone';
import Providers from '../../Utils/Data/Provider.json'
import Users from '../../Utils/Data/users.json'
import './searchbox.scss'
import Tile from './Tile/tile'
import { Switch } from '@material-ui/core';
export default function Searchbox(props) {
    const [selected, setSelected] = useState("All")
    const [Data, setData] = useState("")
    const All = [...Providers, ...Users]
    useEffect(() => {
        setData(All)
    }, [])

    
    const handleSelect = (e) => {
        setSelected(e.target.innerHTML)
        switch (e.target.innerHTML) {
            case "All":
                setData(All)
                break;
            case "Providers":
                setData(Providers)
                break;
            default:
                setData(Users)
                break;
        }
    }
    const handleChange = (e) => {
                const data = Data.filter(data => data.name.includes(e.target.value))
                setData(data)   
                if(e.target.value.length === 0){
                    switch (selected) {
                        case "All":
                            setData(All)
                            break;
                        case "Providers":
                            setData(Providers)
                            break;
                        default:
                            setData(Users)
                            break;
                    }
                }      
    }
    
    return (
        <div className="searchbox">
            <div className="search">
            <form style={{display:"inline"}}>
                    <img src={SearchPNG} alt="" className="searchSvg" />
                    <input onChange={handleChange} type="text" placeholder="Search providers & users"/>    
            </form>
            </div>
            <div className="toggleBar">
                <div className="toggle">
                <span className={selected === "All" ? "selectedTab" : ""} onClick={handleSelect} value="1">All</span>
                <span className={selected === "Providers" ? "selectedTab" : ""} onClick={handleSelect} value="2">Providers</span>
                <span className={selected === "Users" ? "selectedTab" : ""} onClick={handleSelect} value="3">Users</span>
                </div>
                {
                    selected === "All" 
                    ?
                    <p>Link all providers & users to this location<ArrowForwardIosTwoToneIcon className="arrow" /></p>
                    :
                    selected === "Providers" 
                        ?
                        <p>Link all providers to this location<ArrowForwardIosTwoToneIcon className="arrow" /></p>
                        :
                        <p>Link all users to this location<ArrowForwardIosTwoToneIcon className="arrow" /></p>
                }
    
            </div>

            <div className="list">
            {
                    selected === "All" 
                    ?
                    Data && 
                    Data.map((data) => {
                       return(
                           <Tile  AddProvider={props.AddProvider} AddUser={props.AddUser} data={data} selectedProviders={props.selectedProviders} selectedUsers={props.selectedUsers} />
                       )
                    })
                    :
                    selected === "Providers" 
                        ?
                        Data && 
                            Data.map((data, index) => {
                            return(
                                <Tile  AddProvider={props.AddProvider} data={data} selectedProviders={props.selectedProviders}/>
                            )
                            })    
                            :
                            Data && 
                            Data.map((data, index) => {
                            return(
                                <Tile  AddUser={props.AddUser} data={data} selectedUsers={props.selectedUsers}/>
                            )
                            })      
            }
            </div>
        </div>
    )
}
