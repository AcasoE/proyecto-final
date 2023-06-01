const {createDate, updateDateById, deleteDateById, getDateById, getDates} = require("./dates.controllers");
const { isAuth, isAdmin } = require("../middlewares/auth");
const datesRoutes = require('express').Router();

datesRoutes.post("/create" , [isAuth],createDate )
datesRoutes.put("/update/:id",[isAuth],updateDateById)
datesRoutes.delete("/delete/:id",[isAuth], deleteDateById)
datesRoutes.get("/:id",[isAuth],getDateById)
datesRoutes.get("/",[isAdmin],getDates)


module.exports = { datesRoutes }