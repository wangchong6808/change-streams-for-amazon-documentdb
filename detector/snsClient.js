const { SNSClient, PublishCommand } = require("@aws-sdk/client-sns")

// Set the AWS Region.
const REGION = "us-east-2"; 
// Create SNS service object.
const snsClient = new SNSClient({ region: "us-east-2" });

module.exports = snsClient;