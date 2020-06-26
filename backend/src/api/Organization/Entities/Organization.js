const mongoose = require("mongoose");
const OrganizationSchema = new mongoose.Schema({
  tenant_name: String,
  account_type: String,
  company_name: String,
  numberOfEmployees: Number,
  User_id: String,
});
module.exports = mongoose.model("Organization", OrganizationSchema);
