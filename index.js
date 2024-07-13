const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const dishesRouter = require('./routes/dishes');
const db = require('./db');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(cors());
app.use(express.json());
app.use('/api', dishesRouter);

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

const watchDishesTable = () => {
  db.query('SELECT * FROM dishes', (err, results) => {
    if (err) throw err;
    io.emit('dishesUpdate', results);
  });
};

setInterval(watchDishesTable, 1000);

const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
