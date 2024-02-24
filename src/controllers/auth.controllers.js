import User from "../models/users.model.js";

export const signup = async (req, res) => {
  const { username, email, password } = req.body;

  //TODO antes de crear un usuario, verificar que no exista otro con el mismo email o username.

  try {
    const newUser = new User({
      username,
      email,
      password,
    });

    await newUser.save();

    res.status(201).json({ message: "Usuario creado exitosamente" });
  } catch (error) {
    res.status(500).json({ message: "Ocurrió un error" });
  }
};
