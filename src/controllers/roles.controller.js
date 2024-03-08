import Roles from "../models/roles.model.js";

export const getRoles = async (req, res) => {
  try {
    const rolesData = await Roles.find();

    return res.status(200).json(rolesData);
  } catch (error) {
    return res.status(500).json({ message: "Ocurrió un error" });
  }
};

export const getRol = async (req, res) => {
  try {
    const { id } = req.params;

    const rolData = await Roles.findById(id);

    if (!rolData) {
      return res.status(404).json({ message: "Rol no encontrado" });
    }

    return res.status(200).json(rolData);
  } catch (error) {
    return res.status(500).json({ message: "Ocurrió un error" });
  }
};

export const createRol = async (req, res) => {
  try {
    const { nombre, descripcion } = req.body;

    const newRol = new Roles({
      nombre,
      descripcion,
    });

    const rolSaved = await newRol.save();

    return res.status(201).json(rolSaved);
  } catch (error) {
    return res.status(500).json({ message: "Ocurrió un error" });
  }
};

export const updateRol = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion } = req.body;

    const rolData = await Roles.findById(id);

    if (!rolData) {
      return res.status(404).json({ message: "Rol no encontrado" });
    }

    rolData.nombre = nombre;
    rolData.descripcion = descripcion;

    const rolUpdated = await rolData.save();

    return res.status(200).json(rolUpdated);
  } catch (error) {
    return res.status(500).json({ message: "Ocurrió un error" });
  }
};

export const deleteRol = async (req, res) => {
  try {
    const { id } = req.params;

    const rolData = await Roles.findByIdAndDelete(id);

    if (!rolData) {
      return res.status(404).json({ message: "Rol no encontrado" });
    }

    return res.status(200).json({ message: "Rol eliminado" });
  } catch (error) {
    return res.status(500).json({ message: "Ocurrió un error" });
  }
};
