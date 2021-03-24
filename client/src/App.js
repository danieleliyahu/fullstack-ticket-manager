import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Tickets from "./components/Tickets";
import './style.css';
function App() {
  const [tickets, settickets] = useState(null)
  const [seeMoreAndLess, setseeMoreAndLess] = useState('show more')
  const [seeMoreButtonClass, setseeMoreButtonClass] = useState('ticketOpen')

  //  const changeValue = (e) => {
  //   const newValue = e.target.value;
  //   setValue(newValue)
  // }
  useEffect(() => {
    const connectReview = (e) =>{
      if(e.target.innerText === 'show more'){
        alert(11)
        e.target.innerText = 'show less'
        e.target.parentElement.className="ticketClosed"
        // setseeMoreAndLess('show less')
      // return  setseeMoreButtonClass('ticketClose')
      }else{
        alert(121)
        e.target.innerText = 'show more'
        e.target.parentElement.className="ticketOpen"
      }
    }
    axios.get('/api/tickets')
    .then(({data})=>{
      let ticketData = data;
     let x = ticketData.map((x,i)=>{
      let dateFormat = new Date(x.creationTime).toLocaleString();
        return(
          <div className={seeMoreButtonClass} key={i}>
          <h3 className="title"> {x.title}</h3>
          <p className="content"> {x.content}</p>
          <p className="done"> {x.done}</p>
          <div key={i} onClick={(e) =>(connectReview(e))}>{seeMoreAndLess}</div>
          <span className="bottomline userEmail"> by {x.userEmail}  </span>
          <span className="bottomline creationTime"> {dateFormat}</span>
          <p className="done"> {x.labels.map((c)=>{return c})}</p>
          </div> 
     )})
      settickets(x)
    })
  })

console.log(tickets)
  return (
    <div className="App">
     <Tickets tickets = {tickets}/>
    </div>
  );
}

export default App;
