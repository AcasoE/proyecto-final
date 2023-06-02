const { userRoutes }= require("./src/api/users/users.routes")
const { datesRoutes } = require("./src/api/dates/dates.routes")
const { productsRoutes } = require("./src/api/products/products.routes")


//VARIABLES OCULTAS
require("dotenv").config();
const port = process.env.PORT;


//SERVIDOR
const cors = require("cors");
const express = require("express");
const server = express();
server.use(cors());




//BBDD
const db = require("./src/utils/db.js");
db.connectDB();



//MIDDELWARE PARA INPERPRETAR PETICIONES
server.use(express.json());
server.use(express.urlencoded({extended: true}));

server.use('/users', userRoutes)
server.use("/dates", datesRoutes)
server.use("/products", productsRoutes)
server.use("/", (req,res)=>{
    res.send("funcionando");
});





//MIDDELWARE PARA INPERPRETAR ERRORES
server.use((err, req, res, next) => {
    return res.status(err.status || 500).json(err.message || "Error inesperado");
});
server.use("*", (req, res, next)=>{
    return res.status(404).json("Route not found");
});



server.listen(port,()=>{
    console.log(`El servidor está disponible en http://localhost:${port}`);
});