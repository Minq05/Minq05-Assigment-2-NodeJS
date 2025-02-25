import mongoose from "mongoose";

const ModelSchema = mongoose.Schema({
  email: {
    type: String,
  },
  password: {
    type: String,
  },
});

export const userModel = mongoose.model("users", ModelSchema);
