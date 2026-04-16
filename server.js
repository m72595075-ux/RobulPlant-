const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

let usersOnline = 0;

io.on("connection", (socket) => {
    usersOnline++;
    io.emit("users", usersOnline);

    console.log("USER CONNECTÉ");

    socket.on("login", (data) => {
        console.log("COMPTE REÇU :", data);
        io.emit("new_account", data);
    });

    socket.on("disconnect", () => {
        usersOnline--;
        io.emit("users", usersOnline);
    });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log("Serveur lancé");
});