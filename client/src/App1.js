import React, { useEffect, useState ,useCallback } from 'react';
import axios from 'axios';
import Tickets from "./components/Tickets";
import './style.css';
function App() {
  const [tickets, settickets] = useState(null)
  const [seeMoreAndLess, setseeMoreAndLess] = useState('show more')
  const [value, setValue] = useState('')
  const [SearchValue, setSearchValue] = useState('')
  const [count, setcount] = useState(0)
   const changeValue = (e) => {
    const newValue = e.target.value;
    setValue(newValue)
  }
  const setSearchValueFunc = (value) =>{
    setSearchValue(value)
  }
  useEffect(() => {
    const counter = (e) =>{
      setcount(count+1)
      e.target.parentNode.className = "hidden"
    }
    // if(value !== undefined){

    // }
    const connectReview = (e) =>{
      if(e.target.innerText === 'show more'){
        e.target.innerText = 'show less'
        e.target.parentNode.className="tickets ticketClosed"
       
        // setseeMoreAndLess('show less')
      // return  setseeMoreButtonClass('ticketClose')
      }else{
        e.target.innerText = 'show more'
        e.target.parentNode.className="tickets ticketOpen"
      }
    }
    axios.get(`/api/tickets?searchText=${SearchValue}`)
    .then(({data})=>{
      let ticketData = data;
     let x = ticketData.map((x,i)=>{
      let dateFormat = new Date(x.creationTime).toLocaleString();
        return(
          <div className="tickets" key={i}>
            <button id="hidebutton" onClick={counter}>hide</button>
            <h3 className="title"> {x.title}</h3>
            <p className="content" > {x.content}</p>
            <p className="done"> {x.done}</p>
            <div key={i} onClick={(e) =>(connectReview(e))}>{seeMoreAndLess}</div>
            <span className="bottomline userEmail"> by {x.userEmail}  </span>
            <span className="bottomline creationTime"> {dateFormat}</span>
            <p className="label"> {x.labels.map((c)=>{return `${c} `})}</p>
          </div> 
     )})
      settickets(x)
    })
  },[seeMoreAndLess,SearchValue,count])
  // const addCount = () => { //count function that will be used in the ticket componenet to update the count of hidden tickets
  //   setCounter((prev) => prev + 1);
  // };
  // const restore = async () => { //restore function to display hidden tickets
  //   setCall((prev) => prev + 1);
  //   setCounter(0);
  // };
  // const hiddenItems = () => { //if there is hidden tickets displayng the count of them and button to restore them
  //   if (counter === 0) {
  //     return '';
  //   }
  //   return (
  //     <span className="counterHidden">
  //       &nbsp;
  //       (&nbsp;
  //       <span id="hideTicketsCounter" className="hideTicketsCounter">{counter}</span>
  //       &nbsp;
  //       hidden tickets -
  //       <button onClick={restore} id="restoreHideTickets">restore</button>
  //       )
  //     </span>
  //   );
  // };
console.log(tickets)
  return (
    <div className="App">
      {count}
     <Tickets tickets = {tickets} changeValue={changeValue} value={value} setValue={setValue}  setSearchValueFunc={setSearchValueFunc}/>
    </div>
  );
}

export default App;
