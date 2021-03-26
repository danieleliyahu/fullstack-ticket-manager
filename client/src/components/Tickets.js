import React, { useEffect, useState ,useCallback } from 'react';
import axios from 'axios';
import '../style.css';
const Tickets = ({content,title,date,labels,done,userEmail,seeMoreAndLess,
    setseeMoreAndLess,connectReview,key,restore,restoreFunc,ticket,setcount,count}) => {
        let dateFormat = new Date(date).toLocaleString();
        console.log(dateFormat)
        const [contentClass, setContentClass] = useState('content contentClose')
        const [ticketClass, setticketClass] = useState('ticket')
        const [doneClass, setdoneClass] = useState('undone')
        const doneFunc = () =>{
            if(doneClass=== "undone"){
                axios.patch(`/api/tickets/${ticket._id}/done`,{done: true})
                setdoneClass('done')
            }else{
                axios.patch(`/api/tickets/${ticket._id}/undone`,{done: false})
                setdoneClass('undone')
            }
          }
        useEffect(() => {
            setticketClass("ticket")
            setcount(0)
        }, [restore])
        const counter = () =>{
            setticketClass("hiden")
            setcount(count+1)
        }
    return (
        
        <div className={`${ticketClass}  ${doneClass}`} key={key}>
            <button className="hideTicketButton " onClick={counter}>hide</button>
            <h3 className="title"> {title}</h3>
            <p className={contentClass} > {content}</p>
            <p className="done"> {done}</p>
            <div className="show" onClick={(e) =>(connectReview(e,setContentClass))}>{seeMoreAndLess}</div>
            <span className="bottomline userEmail"> by {userEmail}  </span>
            <span className="bottomline creationTime"> {dateFormat}</span>
            <div>{labels?.map((label, i) => <span className="label" key={i}>{label}</span>)}</div>
            {/* <p className="label"> {labels.map((c)=>{return `${c} `})}</p> */}
            <button onClick={doneFunc}>done</button>
        </div> 
    )
}

export default Tickets
