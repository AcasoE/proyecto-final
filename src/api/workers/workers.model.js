const mongoose = require("mongoose")
const WorkerSchema = new mongoose.Schema(
    {
        products: [{type: mongoose.Types.ObjectId, ref: "products"}],
        name: {type: String, required: true, unique: true},
    },
    {
        timestamps: true,
        collection: "workers",
      }
)

  const Worker = mongoose.model("posts", WorkerSchema);
module.exports = Worker;