import Joi from "joi";

const signUpSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "Ingresa tu nombre",
    "any.required": "ingresa tu nombre",
  }),

  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required().messages({
      "string.empty": "Ingresa tu email",
      "any.required": "Ingresa tu email",
      "*": "Ingresa un email con formato válido"
    }),

  password: Joi.string().required().messages({
    "string.empty": "Ingresa tu contraseña",
    "any.required": "Ingresa tu contraseña",
  }),
});

const loginSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required().messages({
      "string.empty": "Ingresa tu email",
      "any.required": "Ingresa tu email",
      "*": "Ingresa un email con formato válido"
    }),

  password: Joi.string().required().messages({
    "string.empty": "Ingresa tu contraseña",
    "any.required": "Ingresa tu contraseña",
  }),
});

export default {signUpSchema, loginSchema};
