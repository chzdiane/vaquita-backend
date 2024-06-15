import Joi from "joi";

const signUpSchema = Joi.object({
  name: Joi.string().required(),

  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),

  password: Joi.string().required(),
});

const loginSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),

  password: Joi.string().required(),
});

export default {signUpSchema, loginSchema};
