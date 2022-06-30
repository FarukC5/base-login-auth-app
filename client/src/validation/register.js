import Validator from "validator";
import isEmpty from "is-empty";

const validateRegisterInput = (user, values) => {
  let errors = {};
  
  user.name = !isEmpty(user.name) ? user.name : "";
  user.email = !isEmpty(user.email) ? user.email : "";
  user.password = !isEmpty(user.password) ? user.password : "";
  values.repeatPassword = !isEmpty(values.repeatPassword)
    ? values.repeatPassword
    : "";

  if (Validator.isEmpty(user.name)) {
    errors.name = "Name field is required";
  }

  if (Validator.isEmpty(user.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(user.email)) {
    errors.email = "Email is invalid";
  }
 
  if (!Validator.isLength(user.password, { min: 6 })) {
    errors.password = "Password must be at least 6 characters";
  }

  if (!Validator.equals(user.password, values.repeatPassword)) {
    errors.repeatPassword = "Passwords must match";
  }  else if (!Validator.isLength(values.repeatPassword, {min: 6})) {
    errors.repeatPassword = "Repeat password must be at least 6 characters"
  }

  if (Validator.isEmpty(user.password)) {
    errors.password = "Password field is required";
  }
 
  if (Validator.isEmpty(values.repeatPassword)) {
    errors.repeatPassword = "Repeat password field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export default validateRegisterInput;
