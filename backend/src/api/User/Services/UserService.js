const UserRepo = require("../Repositories/UserRepo");
const service = require("../../../Service/service");
const connectToDatabase = require("../../../Database/db");
exports.createUser = async (data) => {
  let response;
  await connectToDatabase()
    .then(() => UserRepo.create(data))
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
exports.getUsers = async () => {
  let response;
  await connectToDatabase()
    .then(() => UserRepo.getAll())
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

exports.getUser = async (filter) => {
  let response;
  await connectToDatabase()
    .then(() => UserRepo.get(filter))
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

exports.updateUser = async (User_id, data) => {
  let response;
  await connectToDatabase()
    .then(() => UserRepo.update(User_id, data))
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

exports.deleteUser = async (User_id) => {
  let response;
  await connectToDatabase()
    .then(() => UserRepo.delete(User_id))
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
