let AWS = require("aws-sdk");
const lambda = new AWS.Lambda();

exports.lambdaInvoke = async (params) => {
  // const data = JSON.parse(event.body);
  console.log("event ", params);
  // const params = {
  //   FunctionName: "ConsoleSharkIOT-dev-createLog",
  //   InvocationType: "Event",
  //   Payload: JSON.stringify(event),
  // };
  return await lambda.invoke(params).promise();
};

exports.getResponse = async (statusCode, message) => {
  return (response = {
    statusCode: statusCode,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "*",
      "Content-Type": "application/json",
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Credentials": true,
      preflightContinue: true,
    },
    body: message,
  });
};
