import User from "../models/users.model.js";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";

export const signup = async (req, res) => {
  const { username, email, password } = req.body;
  console.log(username);

  try {
    //* Verificar si el usuario o correo ya existe
    const userExists = await User.findOne({ email: email});

    if (userExists) {
      return res.status(400).json({ message: `El email ${email} ya está registrado` });
    }
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
      /*       httpOnly: true,
       */ sameSite: "None",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 dia
    });

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

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    //* Buscar el usuario en la base de datos
    const user = await User.findOne({ email });

    //* Si el usuario no existe
    if (!user) {
      return res.status(400).json({ message: "Credenciales incorrectas" });
    }

    //* Verificar la contraseña
    const hashedPassword = await bcrypt.compare(password, user.password); 

    //* Si la contraseña no coincide
    if (!hashedPassword) {
      return res.status(400).json({ message: "Credenciales incorrectas" });
    }

    //* Crear un token de acceso
    const token = await createAccessToken({ id: user._id });

    //* Guardar el token en una cookie
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "none",
      /*       secure: true,
       */ maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res.status(200).json({
      id: user._id,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: "Ocurrió un error" });
  }
};

export const signout = (req, res) => {
  res.clearCookie("token").json({ message: "Sesión cerrada" });
};
