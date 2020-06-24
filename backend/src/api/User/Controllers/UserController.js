global.fetch = require("node-fetch");
require("dotenv").config();
const UserService = require("../Services/UserService");

exports.createUser = async (event) => {
  console.log("event", event);
  const data = JSON.parse(event.body);
  return await UserService.createUser(data);
};

exports.getUsers = async (event) => {
  console.log("event", event);
  return await UserService.getUsers();
};

exports.getUser = async (event) => {
  console.log("event", event);
  const filter = event.queryStringParameters.filter;
  return await UserService.getUser(filter);
};

exports.updateUser = async (event) => {
  console.log("event", event);
  const User_id = event.queryStringParameters.User_id;
  const data = JSON.parse(event.body);
  return await UserService.updateUser(User_id, data);
};

exports.deleteUser = async (event) => {
  console.log("event", event);
  const User_id = event.queryStringParameters.User_id;
  return await UserService.deleteUser(User_id);
};
