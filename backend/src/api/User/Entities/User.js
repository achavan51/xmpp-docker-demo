const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  email: String,
  temp_password: String,
  name: String,
});
module.exports = mongoose.model("User", UserSchema);
