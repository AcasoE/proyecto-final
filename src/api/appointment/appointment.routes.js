const {createDate, updateDateById, deleteDateById, getDateById, getDates} = require("./appointment.controllers");
const { isAuth, isAdmin } = require("../middlewares/auth");
const datesRoutes = require('express').Router();

datesRoutes.post("/create"  ,createDate )
datesRoutes.put("/update/:id" ,updateDateById)
datesRoutes.delete("/delete/:id" , deleteDateById)
datesRoutes.get("/:id" ,getDateById)
datesRoutes.get("/",getDates)


module.exports = { datesRoutes }