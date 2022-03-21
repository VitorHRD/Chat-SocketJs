const express = require('express');
const app = express();
const path = require('path');
const socket = require('socket.io');
const cors = require('cors')

const PORT = process.env.PORT || 5000


app.use(cors())
app.use('/grupo1', express.static(path.join(__dirname, 'public')));
app.use('/grupo2', express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/inicial.html'));
})
const server = app.listen(PORT, () => {
    console.log("servidor rodando na porta " + PORT);
})
const io = socket(server);

const messages = {
    grupo1: [],
    grupo2: []
}
const userGrupo1 = [];
const userGrupo2 = [];

const grupo1 = io.of('/grupo1').on('connection', (socket) => {
    socket.emit('update_messages', messages.grupo1);
    socket.on('new_messages', (data) => {
        messages.grupo1.push(data);
        grupo1.emit('update_messages', messages.grupo1);

    })
    socket.on('deleteMsg', (id) => {
        removerPorId(messages.grupo1, id);
        grupo1.emit('update_messages', messages.grupo1);
    })
    socket.on('check-user', (user) => {
        let users = userGrupo1.find(function (i) {
            return i == user;
        })
        if (users !== undefined) {
            socket.emit("check-fail");
        }
        else {
            userGrupo1.push(user)
            socket.emit("check-success");
        }
    })
})
const grupo2 = io.of('/grupo2').on('connection', (socket) => {

    socket.emit('update_messages', messages.grupo2);

    socket.on('new_messages', (data) => {
        messages.grupo2.push(data);
        grupo2.emit('update_messages', messages.grupo2);
    })
    socket.on('deleteMsg', (id) => {
        removerPorId(messages.grupo2, id);
        grupo2.emit('update_messages', messages.grupo2);
    })
    socket.on('check-user', (user) => {
        let users = userGrupo2.find(function (i) {
            return i == user
        })
        if (users !== undefined) {
            socket.emit("check-fail");
        }
        else {
            userGrupo2.push(user);
            socket.emit("check-success");
        }
    })
})
function removerPorId(array, id) {
    var result = array.filter(function (el) {
        return el.id == id;
    });

    for (var elemento of result) {
        var index = array.indexOf(elemento);
        array.splice(index, 1);
    }
}


