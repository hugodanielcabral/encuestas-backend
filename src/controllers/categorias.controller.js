import Categorias from "../models/categorias.model.js";

export const getCategorias = async (req, res) => {
  try {
    const categoriasData = await Categorias.find();

    return res.status(200).json(categoriasData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const getCategoria = async (req, res) => {
  try {
    const { id } = req.params;

    console.log(id);

    const categoriaData = await Categorias.findById(id);

    if (!categoriaData) {
      return res.status(404).json({ message: "Categoria no encontrada" });
    }

    return res.status(200).json(categoriaData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const createCategoria = async (req, res) => {
  try {
    const { nombre, descripcion, imagen } = req.body;

    const newCategoria = new Categorias({
      nombre,
      descripcion,
      imagen,
    });

    const categoriaSaved = await newCategoria.save();

    return res.status(201).json(categoriaSaved);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const updateCategoria = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion, imagen } = req.body;

    const categoriaData = await Categorias.findById(id);

    if (!categoriaData) {
      return res.status(404).json({ message: "Categoria no encontrada" });
    }

    categoriaData.nombre = nombre;
    categoriaData.descripcion = descripcion;
    categoriaData.imagen = imagen;

    const categoriaUpdated = await categoriaData.save();

    return res.status(200).json(categoriaUpdated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const deleteCategoria = async (req, res) => {
  try {
    const { id } = req.params;

    const categoriaData = await Categorias;

    if (!categoriaData) {
      return res.status(404).json({ message: "Categoria no encontrada" });
    }

    await Categorias.findByIdAndDelete(id);

    return res.status(200).json({ message: "Categoria eliminada" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
