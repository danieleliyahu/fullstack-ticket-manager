const mongoose = require('mongoose');

const ticketsSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    content: {
        type:String,
        required:true
    },
    userEmail: {
        type:String,
        required:true
    },
    done: {
        type:Boolean,
        required:true
    },
    creationTime: {
        type:Number,
        required:true
    },
    labels: {
        type:Array,
        required:true
    },
})

module.exports = mongoose.model('Tickets',ticketsSchema )