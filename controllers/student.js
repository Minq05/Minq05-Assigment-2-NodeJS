import { studentModel } from "../models/student.js";
import { validateStudent } from "../validate/validateStudent.js";

export const getList = async (req, res) => {
  try {
    const body = req.body;

    const student = await studentModel.find(body);

    res.status(200).send({
      message: "Lay du lieu thanh cong !",
      status: true,
      data: student,
    });
  } catch (error) {
    console.log(error);
    res.status(error.code ?? 500).send({
      message: "Lay du lieu khong thanh cong !",
      status: false,
    });
  }
};

export const add = async (req, res) => {
  try {
    const body = req.body;
    const { name, age } = body;

    const { error } = validateStudent.validate(
      { name, age },
      { abortEarly: false }
    );
    if (error) throw { mess: error.details.map((item) => item.message) };
    const student = await new studentModel(body).save();
    res.status(200).send({
      message: "Them du lieu thanh cong !",
      status: true,
      data: student,
    });
  } catch (error) {
    console.log(error);
    res.status(error.code ?? 500).send({
      message: error.mess ?? "Them khong thanh cong !",
      status: false,
    });
  }
};

export const deleteID = async (req, res) => {
  try {
    const id = req.params.id;

    const studentId = await studentModel.findOne({ _id: id });

    if (studentId) {
      await studentModel.findOneAndDelete({ _id: id });
      res.status(200).send({
        message: "Xoa du lieu thanh cong !",
        status: true,
      });
    } else throw { mess: "Khong ton tai du lieu !", code: 404 };
  } catch (error) {
    console.log(error);
    res.status(error.code ?? 500).send({
      message: error.mess ?? "Xoa khong thanh cong !",
      status: false,
    });
  }
};

export const getId = async (req, res) => {
  try {
    const id = req.params.id;

    const studentId = await studentModel.findOne({ _id: id });

    if (studentId) {
      res.status(200).send({
        message: "Lay chi tiet du lieu thanh cong !",
        status: true,
        data: studentId,
      });
    } else throw { mess: "Khong ton tai du lieu !", code: 404 };
  } catch (error) {
    console.log(error);
    res.status(error.code ?? 500).send({
      message: error.mess ?? "Lay chi tiet du lieu khong thanh cong !",
      status: false,
    });
  }
};

export const update = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const { name, age } = body;

    const { error } = validateStudent.validate(
      { name, age },
      { abortEarly: false }
    );
    if (error) throw { mess: error.details.map((item) => item.message) };
    const studentId = await studentModel.findOne({ _id: id });

    if (studentId) {
      const newStudent = await studentModel.findOneAndUpdate(
        { _id: id },
        body,
        { new: true }
      );
      res.status(200).send({
        message: "Sua du lieu thanh cong !",
        status: true,
        data: newStudent,
      });
    } else throw { mess: "Khong ton tai du lieu !", code: 404 };
  } catch (error) {
    console.log(error);
    res.status(error.code ?? 500).send({
      message: error.mess ?? "Sua du lieu khong thanh cong !",
      status: false,
    });
  }
};
