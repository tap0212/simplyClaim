import React, {useEffect} from 'react'
import TableTileUser from './TableTile/tableTileUser'
import './table.scss'
export default function TableUsers(props) {

    const setUsers = () => {
        localStorage.setItem("users", JSON.stringify(props.selectedUsers))
    }
    return (
        <div>
        {setUsers()}
            {
                props.selectedUsers.map((data, index) => {
                    return(
                        <TableTileUser ActivateProceedBtn={props.ActivateProceedBtn} RemoveUser={props.RemoveUser} key={index} data={data} />
                    )
                })
            }
        </div>
    )
}
