const Validator = require("validator");
const validText = require("./valid-text");

module.exports = function validateLoginInput(data) {
  data.name = validText(data.name) ? data.name : "";
  data.email = validText(data.email) ? data.email : "";
  data.password = validText(data.password) ? data.password : "";
  data.userRole = validText(data.userRole) ? data.userRole : "";

  if (!Validator.isEmail(data.email)) {
    return { message: "Email is invalid", isValid: false };
  };

  if (Validator.isEmpty(data.email)) {
    return { message: "Email field is required", isValid: false };
  };

  if (Validator.isEmpty(data.userRole)) {
    return { message: "User Role field is required", isValid: false };
  };

  if (Validator.isEmpty(data.password)) {
    return { message: "Password field is required", isValid: false };
  }

  if (!Validator.isLength(data.password, { min: 8, max: 32 })) {
    return {
      message: "Password length needs to be between 8 and 32 characters",
      isValid: false
    }
  };

  if (!Validator.isLength(data.name, { min: 2, max: 32 })) {
    return {
      message: "Name length needs to be between 2 and 32 characters",
      isValid: false
    }
  };

  if (Validator.isEmpty(data.name)) {
    return {
      message: "Name cannot be empty",
      isValid: false
    }
  };

  return {
    message: "",
    isValid: true
  };
};