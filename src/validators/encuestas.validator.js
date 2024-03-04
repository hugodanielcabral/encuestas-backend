import { check } from "express-validator";
import { validateResult } from "../helpers/validationResult.js";

export const encuestaValidator = [
  check("nombre")
    .exists()
    .withMessage("El nombre de la encuesta es requerido")
    .notEmpty()
    .withMessage("El nombre de la encuesta no puede estar vacío")
    .isLength({ min: 3 })
    .withMessage("El nombre de la encuesta debe tener al menos 3 caracteres")
    .isLength({ max: 50 })
    .withMessage(
      "El nombre de la encuesta no puede tener más de 50 caracteres"
    ),
  check("descripcion")
    .exists()
    .withMessage("La descripción de la encuesta es requerida")
    .notEmpty()
    .withMessage("La descripción de la encuesta no puede estar vacía")
    .isLength({ min: 3 })
    .withMessage(
      "La descripción de la encuesta debe tener al menos 3 caracteres"
    )
    .isLength({ max: 100 })
    .withMessage(
      "La descripción de la encuesta no puede tener más de 100 caracteres"
    ),
  check("preguntas")
    .exists()
    .withMessage("Las preguntas de la encuesta son requeridas")
    .notEmpty()
    .withMessage("Las preguntas de la encuesta no pueden estar vacías")
    .isArray()
    .withMessage("Las preguntas de la encuesta deben ser un arreglo"),
  check("respuestas")
    .exists()
    .withMessage("Las respuestas de la encuesta son requeridas")
    .notEmpty()
    .withMessage("Las respuestas de la encuesta no pueden estar vacías")
    .isArray()
    .withMessage("Las respuestas de la encuesta deben ser un arreglo"),
  check("categoria")
    .exists()
    .withMessage("La categoría de la encuesta es requerida")
    .notEmpty()
    .withMessage("La categoría de la encuesta no puede estar vacía"),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];
