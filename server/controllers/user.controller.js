import User from "../models/user.model";
import bcrypt from "bcryptjs";
import validateRegisterInput from "../validation/register";

const register = (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ name: req.body.name, email: req.body.email }).then((user) => {
    if (user) {
      return res
        .status(400)
        .json({ email: "Email already exists", name: "Name already exists" });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => res.json(user))
            .catch((err) => console.log(err));
        });
      });
    }
  });
};

export default { register };
