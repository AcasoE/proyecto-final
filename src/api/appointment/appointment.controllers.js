const { verifyToken } = require("../../utils/jsonwebtoken");
const Appointment = require("./appointment.model");

const createDate = async (req, res, next) => {
  try {
    const newAppointment = await new Appointment(req.body);
    await newAppointment.save();
    return res.json(newAppointment);
  } catch (error) {
    return next(error);
  }
};

const updateDateById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const appointmentUpdated = await Appointment.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return res.status(200).json(appointmentUpdated);
  } catch (error) {
    return next(error);
  }
};

const deleteDateById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const appointment = await Appointment.findByIdAndDelete(id);
    if (!appointment) {
      return res.json("no hemos podido encontrar esa cita con ese id");
    }
    return res.status(200).json(appointment);
  } catch (error) {
    return next(error);
  }
};
const getDateById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const appointment = await Appointment.findById(id);
    if (!appointment) {
      return res.json("No se encuentra la Cita, no se reconoce ese id");
    }
    return res.json(appointment);
  } catch (error) {
    return next(error);
  }
};
const getDates = async (req, res, next) => {
  const token = req.headers.Authorization
  const user = verifyToken(token)
  try {
    const appointments = await Appointment.find().populate([
      { path: "customer", select: "name surname _id" },
      { path: "product", select: "name price" },
      
    ]);
    if(user.rol === "admin"){
      return res.json(appointments)
    } else {
      const userAppointments = appointments.filter(x=> x.customer._id === user._id)
      return res.json(userAppointments);
    }
  } catch (error) {
    return res.json(`No hemos podido acceder a los Productos ${error}`);
    
  }

  };
module.exports = {
  createDate,
  updateDateById,
  deleteDateById,
  getDateById,
  getDates,
};

/* 
{"customer": "647da4f15b7a472bcdad62c2", "product": "647daa587b047648c2e41cdd","date":"2023-06-07T10:00:00Z", "time": "60"} */