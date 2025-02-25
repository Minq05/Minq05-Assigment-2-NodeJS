import mongoose from "mongoose";

const ModelSchema = mongoose.Schema({
  name: {
    type: String,
  },
  age: {
    type: Number,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
});

export const studentModel = mongoose.model("students", ModelSchema);
