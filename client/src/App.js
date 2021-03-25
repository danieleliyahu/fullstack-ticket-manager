import React, { useEffect, useState ,useCallback } from 'react';
import axios from 'axios';
import Tickets1 from "./components/Tickets1";
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
    setValue(newValue)
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
    // if(value !== undefined){

    // }
    console.log('hiiiiiiiiiiiiiii')
    axios.get(`/api/tickets`)
    .then(({data})=>{
      console.log(data)
      setTickets(data)
    })
  },[])

  useEffect(() => {
    // if(value !== undefined){

    // }
    axios.get(`/api/tickets?searchText=${value}`)
    .then(({data})=>{
      console.log('hiiiiiiii')
      setTickets(data)
    })
  },[value])
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
// console.log(tickets)
  return (
    <div className="App">
      {count}
      <input onChange={(e) =>((changeValue(e)))} ></input>
      <button onClick={restoreFunc}>restore</button>
      {tickets.map((x,i)=>{
        return(
        <Tickets1 
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
