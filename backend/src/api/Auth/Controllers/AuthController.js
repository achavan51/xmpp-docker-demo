let AWS = require("aws-sdk");
const AuthService = require("../Services/AuthService");
// var cognitoServiceProvider = new AWS.CognitoIdentityServiceProvider();
// const AmazonCognitoIdentity = require("amazon-cognito-identity-js");
dbClient = new AWS.DynamoDB.DocumentClient();
global.fetch = require("node-fetch");
require("dotenv").config();

// const table = "consoleShark_verification";
// const poolData = {
//   UserPoolId: process.env.UserPoolId,
//   ClientId: process.env.ClientId,
// };

// const pool_region = process.env.pool_region;
// console.log("POOLDATA: ", poolData);
// const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
// let cognitoUser;

exports.signUp = async (event) => {
  console.log("DATA IN STORE FUNC:", JSON.stringify(event));
  const data = JSON.parse(event.body);
  return await AuthService.signup(data);
};

exports.login = async (event) => {
  console.log("EVENT IN LOGIN:", event);
  let data = JSON.parse(event.body);
  return await AuthService.login(data);
};

// exports.sendOtp = async (event) => {
//   console.log("EVENT IN SIGNUP:", JSON.stringify(event));
//   const data = JSON.parse(event.body);
//   return await AuthService.sendOtp(data);
// };

// exports.verifyPhone = async function (event, context) {
//   console.log("verify event ", JSON.stringify(event));
//   const data = JSON.parse(event.body);
//   console.log("verify event ", data);
//   return await AuthService.verifyOtp(data);
// };

// exports.sendMail = async (event) => {
//   console.log("event", JSON.stringify(event));
//   return await AuthService.sendMail(event);
// };

// exports.verifyEmail = async (event) => {
//   console.log("Event", event);
//   const data = JSON.parse(event.body);
//   return await AuthService.verifyEmail(data);
// };

// exports.changePassword = async (event) => {
//   const data = JSON.parse(event.body);
//   return await AuthService.changePassword(data);
// };
