import React from 'react'
const Tickets = ({tickets,changeValue,value,setSearchValueFunc}) => {
    return (
        <div>
            <input onChange={(e) =>((changeValue(e)))} ></input>
            <p>{value}</p>
            <button onClick={() =>((setSearchValueFunc()))}>Serch</button>
            <button onClick={() =>((setSearchValueFunc()))}>restore</button>
            
            {tickets}
        </div>
    )
}

export default Tickets
