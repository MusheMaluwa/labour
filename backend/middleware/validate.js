const validate = require("validate.js");

// Define your constraints:
const constraints = {
  username: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      minimum: 3,
      maximum: 20,
      message: "must be between 3 and 20 characters"
    },
    format: {
      pattern: "^[a-zA-Z0-9]+$",
      message: "can only contain letters and numbers"
    }
  },
  password: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      minimum: 6,
      message: "must be at least 6 characters"
    }
  }
};
