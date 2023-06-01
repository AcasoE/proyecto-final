const { generateSign, verifyToken } = require('../../utils/jsonwebtoken')
const User = require('./users.model')
const bcrypt = require('bcrypt')

const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find()
        return res.json(users)
    } catch (error) {
        return next(error)
    }
}

const registerUser  = async (req, res, next) => {
    try {
        if (req.body.rol === 'admin') {
            req.body.rol === 'user'
        }
        const newUser = new User(req.body)

        if (req.file) {
            newUser.image = req.file.path;
          }

        await newUser.save()
        return res.json(newUser)
    } catch (error) {
        return next(error)
        
    }
}

const loginUser = async (req, res, next) => {

    try {
        const userToLog = await User.findOne({userName: req.body.userName})
    if (!userToLog) {
        res.status(500).json("Credenciales no válidas")
        
    }
    if (bcrypt.compareSync(req.body.password, userToLog.password)) {
        const token = generateSign(userToLog._id);
        return res.status(200).json({token, userToLog})
    } else{
        return res.status(400).json('Credenciales no válidas')
    }
    } catch (error) {
        return next(error)
    }
    
}
const checkSession = async (req, res, next) =>{
    return res.json(req.user)
}
module.exports = { getAllUsers, registerUser, loginUser,  checkSession}