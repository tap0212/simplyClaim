import React, {useEffect} from 'react'
import TableTileProvider from './TableTile/tableTileProvider'
import './table.scss'
export default function TableProviders(props) {

    const setProviders = () => {
        localStorage.setItem("providers", JSON.stringify(props.selectedProviders))
    }
    return (
        <div className="providerTable">
        {setProviders()}
           {props.selectedProviders.length === 0  && props.selectedUsers.length === 0
           ?
            <div className="noProvider">
                <p>
                    No providers or users assigned to this location. <br/> 
                    Search or click on the "+" sign next to the providers or users to start adding
                </p>
                <p className="orange">
                Every location needs to have atleast 1 provider
                </p>
            </div>
           :
                
                props.selectedProviders.map((data, index) => {
                    return(
                        <TableTileProvider ActivateProceedBtn={props.ActivateProceedBtn} RemoveProvider={props.RemoveProvider} key={index} data={data} />
                    )
                })
            
           
           }
        </div>
    )
}
