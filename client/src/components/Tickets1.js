import React, { useEffect, useState ,useCallback } from 'react';
import axios from 'axios';
import '../style.css';
const Tickets1 = ({content,title,date,labels,done,userEmail,seeMoreAndLess,
    setseeMoreAndLess,connectReview,key,restore,restoreFunc,ticket,setcount,count}) => {
        let dateFormat = new Date(date.creationTime).toLocaleString();
        const [contentClass, setContentClass] = useState('content contentClose')
        const [ticketClass, setticketClass] = useState('ticket')
        const [doneClass, setdoneClass] = useState('undone')
        const doneFunc = () =>{
            if(doneClass=== "undone"){
                axios.patch(`/api/tickets/${ticket._id}`,{done: true})
                setdoneClass('done')
            }else{
                axios.patch(`/api/tickets/${ticket._id}`,{done: false})
                setdoneClass('undone')
            }
            
            // .then(({data}) =>{
            //     if(!data.done){
            //         data.done = true
            //         console.log(data.done)
            //         // e.target.className = "done"
            //     }else{
            //         console.log(data)
            //         data.done = false
            //         // e.target.className = "notDone"  
            //     }

            // })
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
        
    <div>
        <div className={`${ticketClass}  ${doneClass}`} key={key}>
            <button id="hidebutton" onClick={counter}>hide</button>
            <h3 className="title"> {title}</h3>
            <p className={contentClass} > {content}</p>
            <p className="done"> {done}</p>
            <div onClick={(e) =>(connectReview(e,setContentClass))}>{seeMoreAndLess}</div>
            <span className="bottomline userEmail"> by {userEmail}  </span>
            <span className="bottomline creationTime"> {dateFormat}</span>
            <p className="label"> {labels.map((c)=>{return `${c} `})}</p>
            <button onClick={doneFunc}>done</button>
        </div> 
    </div>
    )
}

export default Tickets1
