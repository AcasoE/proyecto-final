const mongoose = require("mongoose")
const AppointmentSchema = new mongoose.Schema(
    {
        customer: {type: mongoose.Types.ObjectId, ref: "users" },
        product: {type: mongoose.Types.ObjectId, ref: "products" },
        date:{type: Date, required: true},
        duration: {type: Number, required: true}
    },
    {
        timestamps: true,
        collection: "appointments",
      }
)
AppointmentSchema.pre("save", async function (next) {
  console.log(new Date(this.date.getTime() + this.duration * 60000),);
  const existingAppointments = await Appointment.find({
    _id: { $ne: this._id }, 
    date: {
      $lt: new Date(this.date.getTime() + this.duration * 60000),
      $gt: this.date,
    }, 
  });
  if (existingAppointments.length > 0) {
    const error = new Error("Ya existe una cita en ese período de tiempo.");
    return next(error);
  }

  next();
});
  const Appointment = mongoose.model("dates", AppointmentSchema);
module.exports = Appointment;