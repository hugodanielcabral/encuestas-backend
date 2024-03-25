import User from "../models/users.model.js";
import Roles from "../models/roles.model.js";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";

export const signup = async (req, res) => {
  const { username, email, password, roles } = req.body;

  try {
    const userExists = await User.findOne({ email: email });

    if (userExists) {
      return res.status(400).json({ message: "El usuario o correo ya existe" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      roles,
    });

    const userSaved = await newUser.save();

    await User.populate(userSaved, { path: "roles" });

    const token = await createAccessToken({ id: userSaved._id });
    console.log(token);
    // Guardar el token en una cookie
    res.cookie("token", token, {
      sameSite: "None",
      // secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
      createdAt: userSaved.createdAt,
      updatedAt: userSaved.updatedAt,
      roles: userSaved.roles,
      encuestasRealizadas: userSaved.encuestasRealizadas,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    //* Buscar el usuario en la base de datos
    const user = await User.findOne({ email }).populate("roles");
    //* Si el usuario no existe
    if (!user) {
      return res.status(400).json({ message: "Credenciales incorrectas" });
    }

    //* Verificar la contraseña
    const isMatch = await bcrypt.compare(password, user.password);

    //* Si la contraseña no coincide
    if (!isMatch) {
      return res.status(400).json({ message: "Credenciales incorrectas" });
    }

    //* Crear un token de acceso
    const token = await createAccessToken({ id: user._id });
    console.log(token);

    //* Guardar el token en una cookie
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "none",
      // secure: true,
      maxAge: 24 * 60 * 60 * 1000,
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res.status(200).json({
      id: user._id,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      roles: user.roles,
      encuestasRealizadas: user.encuestasRealizadas,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const signout = (req, res) => {
  res.clearCookie("token").json({ message: "Sesión cerrada" });
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find().populate("roles");
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate("roles");
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

