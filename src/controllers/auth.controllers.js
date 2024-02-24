import User from "../models/users.model.js";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";

export const signup = async (req, res) => {
  const { username, email, password } = req.body;

  //TODO antes de crear un usuario, verificar que no exista otro con el mismo email o username.

  try {
    //* Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    //* Crear un nuevo usuario
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    //* Guardar el usuario en la base de datos
    //* el userSaved contiene los datos del usuario guardado en la base de datos
    const userSaved = await newUser.save();

    //* Crear un token de acceso
    const token = await createAccessToken({ id: userSaved._id });

    //* Guardar el token en una cookie
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 dia
    });

    //* Responder al cliente con el usuario guardado
    res.status(201).json({
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
      createdAt: userSaved.createdAt,
      updatedAt: userSaved.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: "Ocurrió un error" });
  }
};
