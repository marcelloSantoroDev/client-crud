const { emailSchema } = require('./schemas')

const validateEmail = (email) => {
    const { error } = emailSchema.validate(email);

    if (error) {
        return false
    }

    return true;
};

module.exports = validateEmail;