const OrganizationRepo = require("../Repositories/OrganizationRepo");
const service = require("../../../Service/service");
const connectToDatabase = require("../../../Database/db");
exports.createOrganization = async (data) => {
  let response;
  await connectToDatabase()
    .then(() => OrganizationRepo.create(data))
    .then((res) => {
      console.log("res", res);
      response = service.getResponse(200, JSON.stringify(res));
    })
    .catch((err) => {
      console.log("err", err);
      response = service.getResponse(400, err.message);
    });
  return response;
};
exports.getOrganizations = async () => {
  let response;
  await connectToDatabase()
    .then(() => OrganizationRepo.getAll())
    .then((res) => {
      console.log("res", res);
      response = service.getResponse(200, JSON.stringify(res));
    })
    .catch((err) => {
      console.log("err", err);
      response = service.getResponse(400, err.message);
    });
  return response;
};

exports.getOrganization = async (filter) => {
  let response;
  await connectToDatabase()
    .then(() => OrganizationRepo.get(filter))
    .then((res) => {
      console.log("res", res);
      response = service.getResponse(200, JSON.stringify(res));
    })
    .catch((err) => {
      console.log("err", err);
      response = service.getResponse(400, err.message);
    });
  return response;
};

exports.updateOrganization = async (Organization_id, data) => {
  let response;
  await connectToDatabase()
    .then(() => OrganizationRepo.update(Organization_id, data))
    .then((res) => {
      console.log("res", res);
      response = service.getResponse(200, JSON.stringify(res));
    })
    .catch((err) => {
      console.log("err", err);
      response = service.getResponse(400, err.message);
    });
  return response;
};

exports.deleteOrganization = async (Organization_id) => {
  let response;
  await connectToDatabase()
    .then(() => OrganizationRepo.delete(Organization_id))
    .then((res) => {
      console.log("res", res);
      response = service.getResponse(200, JSON.stringify(res));
    })
    .catch((err) => {
      console.log("err", err);
      response = service.getResponse(400, err.message);
    });
  return response;
};
