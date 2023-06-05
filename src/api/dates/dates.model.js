const mongoose = require("mongoose")
const DateSchema = new mongoose.Schema(
    {
        customer: [{type: mongoose.Types.ObjectId, ref: "users" }],
        product: [{type: mongoose.Types.ObjectId, ref: "products" }],
        time: {type: String, required: true}
    },
    {
        timestamps: true,
        collection: "dates",
      }
)

  const Date = mongoose.model("dates", DateSchema);
module.exports = Date;