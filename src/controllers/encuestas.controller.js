import Encuestas from "../models/encuestas.model.js";

//TODO Hacer las validaciones

export const getEncuestas = async (req, res) => {
  try {
    const encuestaData = await Encuestas.find();

    return res.status(200).json(encuestaData);
  } catch (error) {
    return res.status(500).json({ message: "Ocurrió un error" });
  }
};

export const getEncuesta = async (req, res) => {
  try {
    const { id } = req.params;

    const encuestaData = await Encuestas.findById(id);

    if (!encuestaData) {
      return res.status(404).json({ message: "Encuesta no encontrada" });
    }

    return res.status(200).json(encuestaData);
  } catch (error) {
    return res.status(500).json({ message: "Ocurrió un error" });
  }
};

export const createEncuesta = async (req, res) => {
  try {
    const { nombre, descripcion, preguntas, respuestas, categoria } = req.body;

    const newEncuesta = new Encuestas({
      nombre,
      descripcion,
      preguntas,
      respuestas,
      categoria,
      user: req.userId,
    });

    const encuestaSaved = await newEncuesta.save();

    return res.status(201).json(encuestaSaved);
  } catch (error) {
    return res.status(500).json({ message: "Ocurrió un error" });
  }
};

export const updateEncuesta = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion, preguntas, respuestas, categoria } = req.body;

    const encuestaData = await Encuestas.findById(id);

    if (!encuestaData) {
      return res.status(404).json({ message: "Encuesta no encontrada" });
    }

    encuestaData.nombre = nombre;
    encuestaData.descripcion = descripcion;
    encuestaData.preguntas = preguntas;
    encuestaData.respuestas = respuestas;
    encuestaData.categoria = categoria;

    const encuestaUpdated = await encuestaData.save();

    return res.status(200).json(encuestaUpdated);
  } catch (error) {
    return res.status(500).json({ message: "Ocurrió un error" });
  }
};

export const deleteEncuesta = async (req, res) => {
  try {
    const { id } = req.params;

    const encuestaData = await Encuestas.findById(id);

    if (!encuestaData) {
      return res.status(404).json({ message: "Encuesta no encontrada" });
    }

    await Encuestas.findByIdAndDelete(id);

    return res.status(200).json({ message: "Encuesta eliminada" });
  } catch (error) {
    return res.status(500).json({ message: "Ocurrió un error" });
  }
};
