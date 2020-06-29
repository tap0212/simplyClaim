import React, {useEffect, useState} from 'react'
import SearchPNG from '../../Utils/Assets/search@3x.png'
import ArrowForwardIosTwoToneIcon from '@material-ui/icons/ArrowForwardIosTwoTone';
import Providers from '../../Utils/Data/Provider.json'
import Users from '../../Utils/Data/users.json'
import './searchbox.scss'
import Tile from './Tile/tile'
export default function Searchbox(props) {
    const [selected, setSelected] = useState("All")
    const [Data, setData] = useState("")
    const [All, setAll] = useState("")
    useEffect(() => {
        const shuffledData = []
        let iterator = 0;
        while(iterator < Providers.length && iterator< Users.length){
         shuffledData.push(Providers[iterator])
         if(iterator+1 !== Providers.length) shuffledData.push(Providers[iterator+1])
         shuffledData.push(Users[iterator])
         if(iterator+1 !== Users.length) shuffledData.push(Users[iterator+1])
         iterator=iterator+2;
         }
         
         setData(shuffledData)
         setAll(shuffledData)
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
    const AddAllUsers = () => {
        props.AddAllUsers()
    }
    const AddAllProviders = () => {
        props.AddAllProviders()
    }
    const AddAllUsersAndProviders = () => {
        props.AddAllUsersAndProviders()
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
                    <p onClick={AddAllUsersAndProviders}>Link all providers & users to this location<ArrowForwardIosTwoToneIcon className="arrow" /></p>
                    :
                    selected === "Providers" 
                        ?
                        <p onClick={AddAllProviders}>Link all providers to this location<ArrowForwardIosTwoToneIcon className="arrow" /></p>
                        :
                        <p onClick={AddAllUsers}>Link all users to this location<ArrowForwardIosTwoToneIcon className="arrow" /></p>
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
                                <Tile key={index}  AddProvider={props.AddProvider} data={data} selectedProviders={props.selectedProviders}/>
                            )
                            })    
                            :
                            Data && 
                            Data.map((data, index) => {
                            return(
                                <Tile key={index} AddUser={props.AddUser} data={data} selectedUsers={props.selectedUsers}/>
                            )
                            })      
            }
            </div>
        </div>
    )
}
