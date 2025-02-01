const mongoose = require("mongoose");
const conn = async () => {
  try {
    const response = await mongoose.connect("mongodb://localhost:27017/taskApp");
    if (response) {
      console.log("database connected");
    }
  } catch (error) {
    console.log(error);
  }
};

conn();
