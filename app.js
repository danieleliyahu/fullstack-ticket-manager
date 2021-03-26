const express = require("express");
const app = express();
const axios = require("axios");
const Tickets = require("./tickets")
app.use(express.static("client/build"));
// const { data } = await axios.get(`/api/tickets/:done`);
// const tickets = await Tickets.find({data});
// res.send(tickets)
app.get('/api/tickets', async (req, res, next) => {
    const params = req.query.searchText;
    console.log(params)
    console.log("????")

    if (!params) {
        // console.log(`${params}    params`)
        // console.log(`${req.query}      req.query`)
        const tickets = await Tickets.find({});
        console.log("ifff", tickets.length)
        // console.log(tickets)

        return res.send(tickets);
    } else {
        const tickets = await Tickets.find({ title: { $regex: `.*${params}.*`, $options: 'i' } });
        // const myParam = urlParams.get('myParam');
        console.log("else", tickets.length)
        // console.log(`hhhhhhhhhhhhhhh ${tickets.length}`)
        // console.log(`${params} PARAMSSSS`)
        for (const [key, value] of params) {
            console.log("ggg" + key)
            console.log(value)
        }
        return res.send(tickets)
    }
})
// 
app.patch('/api/tickets/:ticketId/undone', async (req, res) => {
    const ticketId = req.params.ticketId
    console.log(ticketId)
    const tickets = await Tickets.findById({ _id: ticketId });
    if (tickets.done === true) {
        tickets.done = false
        console.log(tickets.done)
    } else {
        tickets.done = true
        console.log(tickets.done)
    }
    await tickets.save();
    res.send({ updated: true })
});
app.patch('/api/tickets/:ticketId/done', async (req, res) => {
    const ticketId = req.params.ticketId
    console.log(ticketId)
    const tickets = await Tickets.findById({ _id: ticketId });
    if (tickets.done === true) {
        tickets.done = false
        console.log(tickets.done)
    } else {
        tickets.done = true
        console.log(tickets.done)
    }
    await tickets.save();
    res.send({ updated: true })
})
app.get('/api', (req, res) => {
    res.send('hi')
})
module.exports = app;
