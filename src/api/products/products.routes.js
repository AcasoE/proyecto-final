const { createProduct, updateProductById, deleteProductById, getProducts, getProductById } = require("./products.controllers");
const { isAuth, isAdmin } = require("../middlewares/auth");
const productsRoutes = require('express').Router();

productsRoutes.post("/create" , [isAdmin], createProduct )
productsRoutes.put("/update/:id",[isAdmin],updateProductById)
productsRoutes.delete("/delete/:id",[isAdmin], deleteProductById)
productsRoutes.get("/:id",[isAuth],getProductById)
productsRoutes.get("/",[isAuth],getProducts )

module.exports = { productsRoutes }