
const secretsManager = require('./utils/secretsManager.js');
var MongoClient = require('mongodb').MongoClient;

exports.handler = async(event) => {
    var dbInfo = await loadDBConfig()
    var connection = `mongodb://${dbInfo.username}:${dbInfo.password}@${dbInfo.host}:27017/?tls=true&replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false`;
    //console.log(`connection is ${connection}`)
   
    
    const client = await connectDB(connection);
    client.db("chatdb").collection("chatroom").insertOne(event);
    const response = {
        statusCode: 200,
        body: JSON.stringify('message saved!'),
    };
    return response;
};

async function connectDB(dbURL) {
    const client = new MongoClient(dbURL,{tlsCAFile: `global-bundle.pem`});
    await client.connect();
    return client;
}


const loadDBConfig = async () => {
    var secretName = process.env.SecretArn;
    var region = 'us-east-2';
    var dbConnectionInfo = await secretsManager.getSecret(secretName, region);;
    
    return JSON.parse(dbConnectionInfo);
}