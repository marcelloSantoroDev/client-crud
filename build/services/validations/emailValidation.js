"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { emailSchema } = require('./schemas');
const validateEmail = (email) => {
    const { error } = emailSchema.validate(email);
    if (error) {
        return false;
    }
    return true;
};
exports.default = validateEmail;
//# sourceMappingURL=emailValidation.js.map