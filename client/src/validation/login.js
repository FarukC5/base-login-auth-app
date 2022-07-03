import Validator from "validator";
import isEmpty from "is-empty";

const validateLoginInput = (user, values) => {
  let errors = {};
  user.email = !isEmpty(user.email) ? user.email : "";
  user.password = !isEmpty(user.password) ? user.password : "";

  if (Validator.isEmpty(user.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(user.email)) {
    errors.email = "Email is invalid";
  }

  if (Validator.isEmpty(user.password)) {
    errors.password = "Password field is required";
  }

  const { users } = values;

  const userFound = users.some((object) =>
    Validator.equals(object.email, user.email)
  );
  if (!userFound) errors.email = "User not found!";

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export default validateLoginInput;
