const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  tenant_name: String,
  account_type: String,
  company_name: String,
  noOfEmployees: Number,
  User_id: String,
});
module.exports = mongoose.model("User", UserSchema);
