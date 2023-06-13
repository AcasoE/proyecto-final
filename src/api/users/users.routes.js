const { isAuth, isAdmin } = require('../middlewares/auth')
const { getAllUsers, registerUser, loginUser, checkSession,  } = require('./users.controllers')
const userRoutes = require('express').Router()
userRoutes.post("/register", registerUser)
userRoutes.post("/login", loginUser)
userRoutes.get("/check",[isAuth], checkSession)
userRoutes.get("/" ,[isAdmin], getAllUsers)

module.exports = {userRoutes}