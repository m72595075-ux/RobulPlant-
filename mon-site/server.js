const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

app.get("/admin", (req, res) => {
    res.sendFile(__dirname + "/public/admin.html");
});

io.on("connection", (socket) => {
    console.log("Utilisateur connecté");

    socket.on("login", (data) => {
        io.emit("new_account", data);
    });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log("Serveur lancé");
});
