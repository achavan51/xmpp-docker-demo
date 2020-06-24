const Organization = require("../Entities/Organization");

exports.create = async (data) => {
  return await Organization.create(data);
};

exports.getAll = async () => {
  return await Organization.find();
};

exports.get = async (filter) => {
  return await Organization.findOne({ email: filter });
};

exports.update = async (Organization_id, data) => {
  return await Organization.findByIdAndUpdate(Organization_id, data, {
    new: true,
  });
};

exports.delete = async (Organization_id) => {
  return await Organization.findByIdAndRemove(Organization_id);
};
