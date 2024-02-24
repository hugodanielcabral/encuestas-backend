import mongoose from "mongoose";

const encuestaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  descripcion: {
    type: String,
    required: true,
    trim: true,
  },
  preguntas: {
    type: Array,
    required: true,
  },
  respuestas: {
    type: Array,
    required: true,
  },
  categoria: {
    type: String,
    required: true,
    trim: true,
  },
});

export default mongoose.model("Encuesta", encuestaSchema);
