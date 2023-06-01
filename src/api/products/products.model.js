const mongoose = require("mongoose")
const ProductSchema = new mongoose.Schema(
    {
        name: {type: String, required: true, unique: true},
        description:{type: String, required: true},
        duration:{type: Number, required: true},
        price:{type: Number, required: true}
    },
    {
        timestamps: true,
        collection: "products",
      }
)

  const Product = mongoose.model("products", ProductSchema);
module.exports = Product;