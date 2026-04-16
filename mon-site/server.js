const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// servir le dossier public
app.use(express.static("public"));

// admin
app.get("/admin", (req, res) => {
    res.sendFile(__dirname + "/public/admin.html");
});

// compteur utilisateurs
let users = 0;

io.on("connection", (socket) => {
    users++;
    io.emit("users", users);

    console.log("Utilisateur connecté");

    socket.on("login", (data) => {
        console.log("Compte reçu :", data);
        io.emit("new_account", data);
    });

    socket.on("disconnect", () => {
        users--;
        io.emit("users", users);
    });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log("Serveur lancé sur port " + PORT);
});
