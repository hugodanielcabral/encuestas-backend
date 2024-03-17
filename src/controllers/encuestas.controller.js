import Encuestas from "../models/encuestas.model.js";
import mongoose from "mongoose";

export const getEncuestas = async (req, res) => {
  const { id } = req.params;
  console.log(id, "id");

  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 6;
    const skip = (page - 1) * limit;
    const sort = req.query.sort || "createdAt";
    const order = req.query.order === "desc" ? -1 : 1;
    let categoria = req.query.categoria;

    if (categoria === "Default") {
      categoria = "";
    }

    const filter = categoria ? { categoria } : {};

    const totalDocs = await Encuestas.countDocuments(filter);
    const totalPages = Math.ceil(totalDocs / limit);

    const encuestaData = await Encuestas.find(filter)
      .populate("categoria")
      .skip(skip)
      .limit(limit)
      .sort({ [sort]: order });

    encuestaData.forEach((encuesta) => {
      if (!encuesta.categoria) {
        encuesta.categoria = { nombre: "Sin categoría" };
      }
    });

    return res.status(200).json({
      totalPages,
      currentPage: page,
      encuestas: encuestaData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const getEncuesta = async (req, res) => {
  try {
    const { id } = req.params;

    const encuestaData = await Encuestas.findById(id).populate("categoria");

    if (!encuestaData) {
      return res.status(404).json({ message: "Encuesta no encontrada" });
    }

    if (!encuestaData.categoria) {
      encuestaData.categoria = { nombre: "Sin categoría" };
    }

    return res.status(200).json(encuestaData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const getEncuestasPorCategoria = async (req, res) => {
  try {
    const { categoria } = req.params;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 6;
    const skip = (page - 1) * limit;
    const sort = req.query.sort || "createdAt";
    const order = req.query.order === "desc" ? -1 : 1;

    const totalDocs = await Encuestas.countDocuments({ categoria });
    const totalPages = Math.ceil(totalDocs / limit);

    const encuestaData = await Encuestas.find({ categoria })
      .populate("categoria")
      .populate("user")
      .skip(skip)
      .limit(limit)
      .sort({ [sort]: order });

    if (!encuestaData) {
      return res.status(404).json({ message: "Encuesta no encontrada" });
    }

    encuestaData.forEach((encuesta) => {
      if (!encuesta.categoria) {
        encuesta.categoria = { nombre: "Sin categoría" };
      }
    });

    return res.status(200).json({
      totalPages,
      currentPage: page,
      encuestas: encuestaData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const createEncuesta = async (req, res) => {
  try {
    const {
      nombre,
      descripcion,
      preguntas,
      /* respuestas, */ categoria,
      available,
    } = req.body;

    console.log(req.userId);

    const newEncuesta = new Encuestas({
      nombre,
      descripcion,
      preguntas,
      /* respuestas, */
      categoria,
      user: req.userId,
      available,
    });

    const encuestaSaved = await newEncuesta.save();

    return res.status(201).json(encuestaSaved);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const updateEncuesta = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const encuestaData = await Encuestas.findById(id);

    if (!encuestaData) {
      return res.status(404).json({ message: "Encuesta no encontrada" });
    }

    const encuestaUpdated = await Encuestas.updateOne({ _id: id }, updateData);

    if (!encuestaUpdated) {
      return res
        .status(400)
        .json({ message: "Error al actualizar la encuesta" });
    }

    return res.status(200).json(encuestaUpdated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
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
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
