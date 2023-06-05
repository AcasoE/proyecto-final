const  Date  =require("./dates.model")

const createDate = async (req, res, next) => { 

    try {
        const newDate = await new Date(req.body);
        await newDate.save();
        return res.json(newDate);
      } catch (error) {
        return next(error);
      }
};

const updateDateById = async(req, res, next)=>{
    try {
        const { id } = req.params
        const dateUpdated = await Date.findByIdAndUpdate(id, req.body,{new: true})
        return res.status(200).json(dateUpdated)
    } catch (error) {
        return next(error)
    }
};

const deleteDateById = async (req, res, next)=>{
    try {
        const { id } = req.params
        const date = await Date.findByIdAndDelete(id)
        if (!date) {
            return res.json("no hemos podido encontrar esa cita con ese id");
        }
        return res.status(200).json(date)
    } catch (error) {
        return next(error)
    }
};
const getDateById = async (req, res, next)=>{
    try {
        const { id } = req.params;
        const date = await Date.findById(id);
        if (!date) {
          return res.json("No se encuentra la Cita, no se reconoce ese id");
        }
        return res.json(date)
      } catch (error) {
        return next(error)
      }
};
const getDates = async (req, res, next) => {
    try {
      const date = await Date.find().populate([{path: 'user', select: 'name surname'}, {path: 'product', select: 'name price'}]);;
      return res.json(date);
    } catch (error) {
      return res.json(`No hemos podido acceder a los Productos ${error}`);
    }
  };


module.exports ={createDate, updateDateById, deleteDateById, getDateById, getDates}