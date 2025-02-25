import { userModel } from "../models/user.js";
import bcryptjs from "bcryptjs";
import { validateUser } from "../validate/validateUser.js";
import jwt from "jsonwebtoken";
export const Register = async (req, res) => {
  try {
    const body = req.body;
    const { email, password } = body;

    const { error } = validateUser.validate(
      { email, password },
      { abortEarly: false }
    );
    if (error) throw { mess: error.details.map((item) => item.message) };

    const check = await userModel.findOne({ email: email });
    if (check) throw { mess: "Tai khoan da ton tai !", code: 400 };

    body.password = await bcryptjs.hash(password, 11);
    const user = await new userModel(body).save();
    user.password = undefined;
    res.status(200).send({
      message: "Dang ky thanh cong !",
      status: true,
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(error.code ?? 500).send({
      message: error.mess ?? "Dang ky khong thanh cong !",
      status: false,
    });
  }
};

export const Login = async (req, res) => {
  try {
    const body = req.body;
    const { email, password } = body;

    const { error } = validateUser.validate(
      { email, password },
      { abortEarly: false }
    );
    if (error) throw { mess: error.details.map((item) => item.message) };

    const user = await userModel.findOne({ email: email });
    if (!user) throw { mess: "Tai khoan khong ton tai !", code: 404 };

    const compare = await bcryptjs.compare(password, user.password);
    if (!compare) throw { mess: "Sai mat khau !", code: 400 };

    user.password = undefined;
    const token = jwt.sign({ id: user._id, email: user.email }, "123123", {
      expiresIn: "7d",
    });
    res.status(200).send({
      message: "Dang nhap thanh cong !",
      status: true,
      data: user,
      token: token,
    });
  } catch (error) {
    console.log(error);
    res.status(error.code ?? 500).send({
      message: error.mess ?? "Dang nhap khong thanh cong !",
      status: false,
    });
  }
};
