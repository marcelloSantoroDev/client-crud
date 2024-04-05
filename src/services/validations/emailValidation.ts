const { emailSchema } = require('./schemas')

const validateEmail = (email: string) => {
    const { error } = emailSchema.validate(email);

    if (error) {
        return false
    }

    return true;
};

export default validateEmail;