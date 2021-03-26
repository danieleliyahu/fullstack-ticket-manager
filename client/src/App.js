import React, { useEffect, useState ,useCallback } from 'react';
import axios from 'axios';
import Tickets from "./components/Tickets";
import './style.css';
function App() {
  const [tickets, setTickets] = useState([]); 
  const [seeMoreAndLess, setseeMoreAndLess] = useState('show more')
  const [value, setValue] = useState()
  const [SearchValue, setSearchValue] = useState('')
  const [count, setcount] = useState(0)
  const [restore, setrestore] = useState(0)
   const changeValue = (e) => {
    const newValue = e.target.value;
    axios.get(`/api/tickets?searchText=${newValue}`)
    .then(({data})=>{
      console.log('hiiiiiiii')
      setTickets(data)
  })
}


    const restoreFunc = () =>{
      setrestore(restore+1)
    }
  const connectReview = (e,setContentClass) =>{
    if(e.target.innerText === 'show more'){
      e.target.innerText = 'show less'
      setContentClass(' contentOpen')
     
      // setseeMoreAndLess('show less')
    // return  setseeMoreButtonClass('ticketClose')
    }else{
      e.target.innerText = 'show more'
      setContentClass('content contentClose')
    }
  }
  useEffect(() => {
    console.log('hiiiiiiiiiiiiiii')
    axios.get(`/api/tickets`)
    .then(({data})=>{
      console.log(data)
      setTickets(data)
    }).catch((e) => {console.log(e)})
  },[])

  // useEffect(() => {

  //   })
  // },[value])
  // alert(tickets)
  console.log(tickets)
  console.log(tickets.length)
  if(tickets === []){
    return 
  }
  return (
    <div className="App">
      <div className="headerDiv">
        <input id="searchInput" placeholder="wirte a text to serche" onChange={(e) =>((changeValue(e)))} ></input>
        <div className={"restore"}>showing {tickets.length}results(<span id={"hideTicketsCounter"} >{count}</span> hidden <button className="restoreButton" id="restoreHideTickets" onClick={restoreFunc}>restore</button>)</div>
     </div>
      {tickets.map((x,i)=>{
        return(
        <Tickets
        content={x.content}
          title={x.title}
          date={x.creationTime}
          labels={x.labels}
          done={x.done}
          userEmail={x.userEmail}
          seeMoreAndLess={seeMoreAndLess}
          setseeMoreAndLess={setseeMoreAndLess}
          count={count}
          connectReview={connectReview}
          key={i}
          restore={restore}
          restoreFunc={restoreFunc}
          setcount={setcount}
          ticket={x}
          />)
      })}
    </div>
  );
}

export default App;
