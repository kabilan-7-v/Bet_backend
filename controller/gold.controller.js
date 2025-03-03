const express = require('express');

const http = require('http');
const { Double } = require('mongodb');
const { Server } = require('socket.io');
const app = express();

const server = http.createServer(app);
const io = new Server(server);

var count = 0;
var decrementRate = 0;
let countTimer;

function reduceCount(io){
    if (!countTimer){
    countTimer = setInterval(() => {
        
        if (count > 0) {
            io.emit('countdown', count);
            count-=decrementRate;
            console.log(count);
        } 
    }, 1000);
}
}

function stopReduceCount(){
    if (countTimer){
        clearInterval(countTimer);
    }
}

io.on('connection', (socket,) => {
    console.log('A user connected:', socket.id);

    reduceCount(io);

    socket.on('disconnect', () => {
        
        console.log('User disconnected:', socket.id);
    });
});

exports.createGoldbet = async (req,res) =>{
    const {amount,rate,time} = req.body;
    

    if (!amount || !rate || !time){
        return res.status(400).json({message: "Please fill all fields"});
    }
    res.status(200).json({message: "Server Started Successfully"});
     count = amount;
     decrementRate = rate;

    console.log(
        "amount: ",amount,
    );
}

server.listen(3000, () => {
    console.log(`Server running at http://localhost:${3000}`);
});