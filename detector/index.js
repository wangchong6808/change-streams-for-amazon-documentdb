
const fs = require('fs');
const { SNSClient, PublishCommand } = require("@aws-sdk/client-sns")
var words = JSON.parse(fs.readFileSync('words.json', 'utf8')); 

function replaceAll(search, replace) {
    return this.split(search).join(replace);
}
String.prototype.replaceAll = replaceAll

exports.handler = async (event) => {
    
    const message = event.events[0].event.fullDocument.message;
    const normalizedMsg = message.replaceAll("'", "").replaceAll("\"", "").replaceAll("'", "");
    const list = normalizedMsg.split(" ")
    const matchedWords = (words.filter(value => list.includes(value))).length;
    console.log(`message is ${message}, matched words is ${matchedWords}`);
    if (matchedWords > 0) {
        const snsClient = new SNSClient({ region: "us-east-2" });
        var params = {
            Message: "Warning: Please note that the message received is highly potential of fruad. Message is " + event.events[0].event.fullDocument.message, // MESSAGE_TEXT
            TopicArn: process.env.TopicArn
        };
        const data = await snsClient.send(new PublishCommand(params));
    }

    const response = {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda!'),
    };
    return response;
};


