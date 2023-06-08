const Product = require("./products.model")



const createProduct = async (req, res, next) => {
    try {
      const newProduct = await new Product(req.body);
      await newProduct.save();
      return res.json(newProduct);
    } catch (error) {
      return next(error);
    }
  };
  const getProductById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await Product.findById(id);
      if (!product) {
        return res.json("No se encuentra el producto, no se reconoce ese id");
      }
      return res.json(product)
    } catch (error) {
      return next(error)
    }
  };
  const getProducts = async (req, res, next) => {
    try {
      const product = await Product.find();
      return res.json(product);
    } catch (error) {
      return res.json(`No hemos podido acceder a los Productos ${error}`);
    }
  };
  const deleteProductById = async(req, res, next)=>{
  
      try {
          const { id } = req.params
          const product = await Product.findByIdAndDelete(id)
          if (!product) {
              return res.json("no hemos podido encontrar ese coche con ese id")
          }
          await Appointment.deleteMany({ product: id });
          return res.status(200).json(product)
      } catch (error) {
          return next(error)
      }
  }
  const updateProductById = async (req, res, next)=>{
      try {
          const { id } = req.params
          const productUpdated = await Product.findByIdAndUpdate(id, req.body,{new: true})
          return res.status(200).json(productUpdated)
      } catch (error) {
          return next(error)
      }
  }

  module.exports = {createProduct, updateProductById, deleteProductById, getProducts, getProductById}