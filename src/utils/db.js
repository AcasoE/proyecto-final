const mongoose = require("mongoose");

const db_url = process.env.DB_URL;

const connectDB = async () => {
    try {
        mongoose.set("strictQuery", true);
        const db = await mongoose.connect(db_url);
        const {host}=db.connection;
        console.log("Conectado con éxito al host " + host);
    } catch (error) {
        console.log("No se puede conectar a la base de datos" + error);
    }
};
module.exports={connectDB};