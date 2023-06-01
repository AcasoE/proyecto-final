const { createProduct, updateProductById, deleteProductById, getProducts, getProductById } = require("./products.controllers");
const { isAuth, isAdmin } = require("../middlewares/auth");
const productsRoutes = require('express').Router();

productsRoutes.post("/create" , createProduct )
productsRoutes.put("/update/:id",updateProductById)
productsRoutes.delete("/delete/:id", deleteProductById)
productsRoutes.get("/:id",getProductById)
productsRoutes.get("/",getProducts )

module.exports = { productsRoutes }