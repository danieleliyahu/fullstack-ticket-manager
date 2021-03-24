const express = require("express");
const app = express();
const axios = require("axios");
const Tickets = require("./tickets")
const cors = require('cors')
app.use(cors())
app.use(express.static("client/build"));
// const { data } = await axios.get(`/api/tickets/:done`);
// const tickets = await Tickets.find({data});
// res.send(tickets)
app.get('/api/tickets',async(req,res,next) => {
    const params = new URLSearchParams(req.query)
    console.log(`${params}    params`)
    console.log(`${req.query}      req.query`)
    if(!params){
        const tickets = await Tickets.find({});
        // console.log(tickets)
        return res.send(tickets)
    }else{
        const tickets = await Tickets.find({title:{$regex : `.*${params.get('searchText')}.*`}});
        // const myParam = urlParams.get('myParam');
        console.log(`${params} PARAMSSSS`)
        for (const [key,value] of params) {
            // console.log(key)
            // console.log(value)
          }
          return res.send(tickets)
    }
  })
app.get('/api/tickets',async(req,res,next) => {
    const tickets = await Tickets.find({});
    console.log('tickets')
    return res.send(tickets)
  })
app.patch('/api/tickets/:ticketId',async(req,res)=>{
    const ticketId = req.params.ticketId
    console.log(ticketId)
    const tickets = await Tickets.findById({_id:ticketId });
    if(tickets.done === true){
       tickets.done =  false
    }else{
       tickets.done =  true
    }
    await tickets.save();
    res.send(tickets)
})
app.get('/api',(req,res) => {
res.send('hi')
})
module.exports = app;
