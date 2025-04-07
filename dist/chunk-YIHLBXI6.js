// src/errors/baseError.ts
var ApiError = class extends Error {
  constructor(message, errors, code) {
    super(message);
    this.errors = errors;
    this.code = code;
  }
  toJson() {
    return {
      errors: this.errors
    };
  }
};

export {
  ApiError
};
