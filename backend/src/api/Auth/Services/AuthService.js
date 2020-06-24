let AWS = require("aws-sdk");
var cognitoServiceProvider = new AWS.CognitoIdentityServiceProvider();
const AmazonCognitoIdentity = require("amazon-cognito-identity-js");
// dbClient = new AWS.DynamoDB.DocumentClient();
global.fetch = require("node-fetch");
require("dotenv").config();
const service = require("../../../Service/service");

// const table = "consoleShark_verification";
const poolData = {
  UserPoolId: process.env.UserPoolId,
  ClientId: process.env.ClientId,
};
const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
let cognitoUser;
exports.signup = async (data) => {
  let response;
  let email = data.email;
  let password = data.password;
  var userData = {
    Username: email,
    Pool: userPool,
  };
  cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
  var params = {
    ClientId: process.env.ClientId,
    Username: email,
    Password: password,
    UserAttributes: [
      {
        Name: "email",
        Value: email,
      },
    ],
  };
  await cognitoServiceProvider
    .signUp(params)
    .promise()
    .then((res) => {
      console.log("DATA SUCCESS: ", res);
      response = service.getResponse(200, JSON.stringify(res));
    })
    .catch((err) => {
      console.log("ERROR", err);
      response = service.getResponse(400, err.message);
    });
  return response;
};

exports.login = async (data) => {
  let userData = {
    Username: data.email,
    Pool: userPool,
  };
  cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
  let authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
    Username: data.email,
    Password: data.password,
  });
  return new Promise((resolve, reject) => {
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function (result) {
        console.log("access token + " + result.getAccessToken().getJwtToken());
        resolve(service.getResponse(200, JSON.stringify(result)));
      },
      onFailure: function (err) {
        console.log("err", err.message);
        resolve(service.getResponse(400, err.message));
      },
    });
  });
};

// exports.sendOtp = async (data) => {
//   const secretLoginCode = Date.now().toString().slice(-4);
//   let response;
//   let finalResponse;
//   console.log("mobile", data.mobile_number);
//   const params = {
//     Message: secretLoginCode /* required */,
//     PhoneNumber: data.mobile_number,
//     MessageAttributes: {
//       "AWS.SNS.SMS.SMSType": {
//         DataType: "String",
//         StringValue: "Transactional",
//       },
//     },
//   };
//   await new AWS.SNS({ apiVersion: "2010-03-31" })
//     .publish(params)
//     .promise()
//     .then(async (res) => {
//       let params = {
//         TableName: table,
//         Item: {
//           phone_number: data.mobile_number,
//           otp: secretLoginCode || "null",
//         },
//       };
//       finalResponse = new Promise((resolve, reject) => {
//         dbClient.put(params, function (err, data) {
//           if (err) {
//             console.log("Error", err);
//             reject(service.getResponse(400, err.message));
//           }
//           console.log("Success:.........", data);
//           resolve(service.getResponse(200, JSON.stringify(res)));
//         });
//       });
//     })
//     .catch((err) => {
//       console.log("Error", err);
//       finalResponse = service.getResponse(400, err.message);
//     });
//   return finalResponse;
// };
// exports.verifyOtp = async (data) => {
//   let response;
//   const verifyOtp = data.otp;
//   let params = {
//     TableName: table,
//     Key: {
//       phone_number: data.mobile_number,
//     },
//   };
//   await dbClient
//     .get(params, function (err, data) {
//       if (err) {
//         console.log("Error", err);
//         response = service.getResponse(400, err.message);
//       } else {
//         console.log("Success:.........", data);
//         if (Object.keys(data).length > 0) {
//           if (verifyOtp == data.Item.otp) {
//             console.log("enter otp", data);
//             response = service.getResponse(
//               200,
//               JSON.stringify({ Message: "Phone successfully verified." })
//             );
//           } else {
//             response = service.getResponse(
//               400,
//               JSON.stringify({ Message: "User enters an incorrect otp." })
//             );
//           }
//         } else {
//           response = service.getResponse(
//             400,
//             JSON.stringify({ Message: "Phone number not registered for otp." })
//           );
//         }
//       }
//     })
//     .promise();
//   console.log("response", response);
//   return response;
// };

exports.sendMail = async (event) => {
  // Identify why was this function invoked
  if (event.triggerSource === "CustomMessage_SignUp") {
    // Ensure that your message contains event.request.codeParameter. This is the placeholder for code that will be sent
    const { codeParameter } = event.request;
    const { userName, region } = event;
    const { clientId } = event.callerContext;
    const { email } = event.request.userAttributes;
    const url = "http://localhost:3000/signup";
    const link = `<a href="${url}?code=${codeParameter}&username=${userName}&clientId=${clientId}&region=${region}&email=${email}&formType=submit" target="_blank">here</a>`;
    event.response.emailSubject = "Your verification link"; // event.request.codeParameter
    event.response.emailMessage = `Thank you for signing up. Click ${link} to verify your email.`;
  }
  // Return to Amazon Cognito
  return event;
};

// exports.verifyEmail = async (data) => {
//   const params = {
//     ClientId: data.clientId,
//     ConfirmationCode: data.code,
//     Username: data.username,
//   };

//   try {
//     await cognitoServiceProvider.confirmSignUp(params).promise();
//     return service.getResponse(
//       200,
//       JSON.stringify({ Message: "Email Verified successfully." })
//     );
//   } catch (error) {
//     console.log("error", error);
//     return service.getResponse(400, error.message);
//   }
// };

// exports.changePassword = async (data) => {
//   var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
//     Username: data.username,
//     Password: data.password,
//   });
//   var userData = {
//     Username: data.username,
//     Pool: userPool,
//   };
//   var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
//   return new Promise((resolve, reject) => {
//     cognitoUser.authenticateUser(authenticationDetails, {
//       onSuccess: function (result) {
//         cognitoUser.changePassword(
//           data.password,
//           data.newpassword,
//           (err, result) => {
//             if (err) {
//               console.log("error", err);
//               reject(service.getResponse(400, JSON.stringify(err.message)));
//             } else {
//               console.log("Successfully changed password of the user.");
//               console.log(result);
//               resolve(
//                 service.getResponse(
//                   200,
//                   JSON.stringify({ Message: "Password successfully changed." })
//                 )
//               );
//             }
//           }
//         );
//       },
//       onFailure: function (err) {
//         console.log("err", err.message);
//         resolve(service.getResponse(400, err.message));
//       },
//     });
//   });
// };
