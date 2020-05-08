const mongoose = require('mongoose');
const { Schema } = mongoose;

const TaskSchema = new Schema({
    clave: { type: String, required: true },
    nombre: { type: String, required: true},
    puesto: { type: String, required: true},
    sueldo: { type: String, required: true}
});

module.exports = mongoose.model('Empleado', TaskSchema);