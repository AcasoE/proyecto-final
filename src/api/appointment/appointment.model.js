const mongoose = require("mongoose")
const AppointmentSchema = new mongoose.Schema(
    {
        customer: {type: mongoose.Types.ObjectId, ref: "users" },
        product: {type: mongoose.Types.ObjectId, ref: "products" },
        date:{type: Date, required: true},
        duration: {type: Number, required: true},
        endDate:{type: Date},

    },
    {
        timestamps: true,
        collection: "appointments",
      }
)
AppointmentSchema.pre("save", async function (next) {
  const appointmentStart = new Date(this.date);
  const appointmentEnd = new Date(
    appointmentStart.getTime() + this.duration * 60000
  );

  const existingAppointments = await Appointment.find({
    _id: { $ne: this._id },
    date: { $lt: appointmentEnd },
    endDate: { $gt: appointmentStart}
  })

  if (existingAppointments.length > 0 ) {
    const error = new Error("Ya existe una cita en ese período de tiempo.");
    return next(error);
  }
this.endDate = appointmentEnd
  next();
});

  const Appointment = mongoose.model("appointments", AppointmentSchema);
module.exports = Appointment;