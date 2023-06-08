const { userRoutes }= require("./src/api/users/users.routes")
const { datesRoutes } = require("./src/api/appointment/appointment.routes")
const { productsRoutes } = require("./src/api/products/products.routes")


//VARIABLES OCULTAS
require("dotenv").config();
const port = process.env.PORT;


//SERVIDOR
const cors = require("cors");
const express = require("express");
const server = express();
server.use(cors());
server.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
  });



//BBDD
const db = require("./src/utils/db.js");
db.connectDB();



//MIDDELWARE PARA INPERPRETAR PETICIONES
server.use(express.json());
server.use(express.urlencoded({extended: true}));

server.use('/users', userRoutes)
server.use("/appointments", datesRoutes)
server.use("/products", productsRoutes)

server.use("*", (req, res, next)=>{
    return res.status(404).json("Route not found");
});




//MIDDELWARE PARA INPERPRETAR ERRORES
server.use((err, req, res, next) => {
    return res.status(err.status || 500).json(err.message || "Error inesperado");
});


server.use("/", (req,res)=>{
    res.send("It Works!");
});

server.listen(port,()=>{
    console.log(`Server running`);
});