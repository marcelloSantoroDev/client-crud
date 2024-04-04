const Joi = require('joi');

const emailSchema = Joi.string().email();

module.exports = {
    emailSchema,
};