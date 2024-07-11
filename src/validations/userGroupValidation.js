import Joi from "joi";

const schema = Joi.object({
    usersId: Joi.array().items(Joi.number().integer()).required(),
    groupId: Joi.number().integer().required(),
});

export default schema;