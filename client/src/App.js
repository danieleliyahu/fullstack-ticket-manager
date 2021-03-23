import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Tickets from "./components/Tickets";
import './style.css';
function App() {
  const [tickets, settickets] = useState(null)
  const [seeMoreAndLess, setseeMoreAndLess] = useState('show more')
  const [seeMoreButtonClass, setseeMoreButtonClass] = useState('ticketOpen')
  function connectReview(){
    if(seeMoreAndLess === 'show more'){
      alert(11)
      setseeMoreAndLess('show less')
      setseeMoreButtonClass('ticketClose')
    }else{
      alert(121)
      setseeMoreAndLess('show more')
      setseeMoreButtonClass('ticketOpen')
    }
  }
  useEffect(() => {

    axios.get('/api/tickets')
    .then(({data})=>{
     let x = data.map((x)=>{
      let dateFormat = new Date(x.creationTime).toLocaleString();
        return(
          <div className={seeMoreButtonClass}>
          <h3 className="title"> {x.title}</h3>
          <p className="content"> {x.content}</p>
          <p className="done"> {x.done}</p>
          <div onClick={() =>connectReview()}>{seeMoreAndLess}</div>
          <span className="bottomline userEmail"> by {x.userEmail}  </span>
          <span className="bottomline creationTime"> {dateFormat}</span>
          </div> 
     )})
      settickets(x)
    })
  }, [seeMoreAndLess,seeMoreButtonClass])

console.log(tickets)
  return (
    <div className="App">
     <Tickets tickets = {tickets}/>
    </div>
  );
}

export default App;
