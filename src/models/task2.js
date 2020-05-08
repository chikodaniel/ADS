const mongoose = require('mongoose');
const { Schema } = mongoose;

const PuestoSchema = new Schema({
    puesto: { type: String, required: true },
    sueldo: { type: String, required: true }
});

module.exports = mongoose.model('Puesto', PuestoSchema);