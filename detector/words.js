
const fs = require('fs');
const { SNSClient, PublishCommand } = require("@aws-sdk/client-sns")
var words = JSON.parse(fs.readFileSync('words.json', 'utf8')); ////https://7esl.com/negative-words/

function replaceAll(search, replace) {
    return this.split(search).join(replace);
}
String.prototype.replaceAll = replaceAll

const handler = async (event) => {
    // TODO implement
    //"SubscriptionArn": "arn:aws:sns:us-east-2:272892137628:chat_event_topic:69818445-0de1-4bc3-8a80-7140516b6889"
    console.log('event is -- ' + JSON.stringify(event));
    const snsClient = new SNSClient({ region: "us-east-2" });
    var params = {
        Message: "MESSAGE is " + JSON.stringify(event), // MESSAGE_TEXT
        TopicArn: "arn:aws:sns:us-east-2:272892137628:chat_event_topic", //TOPIC_ARN
      };
    const data = await snsClient.send(new PublishCommand(params));
    console.log("sns response " + JSON.stringify(data))
    var msg = "some key words like Reject are included \"in the, 'message".replaceAll("'", "").replaceAll("\"", "").replaceAll("'", "");

    var list = msg.split(" ")
    console.log(list)
    console.log((words.filter(value => list.includes(value))).length)
    
    const response = {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda!'),
    };
    return response;
};


handler({"request":"ok"})
