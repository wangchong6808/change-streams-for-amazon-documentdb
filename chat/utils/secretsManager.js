'use strict'

const { SecretsManagerClient, GetSecretValueCommand } = require("@aws-sdk/client-secrets-manager");

class SecretsManager {

    static async getSecret (secretName, region){
        const config = { region : region }
        
        const client = new SecretsManagerClient(config);
        try {
            const command = new GetSecretValueCommand({ SecretId: secretName});
            let response = await client.send(command);
            return response.SecretString;
        } catch (err) {
            throw err;
        }
    } 
}
module.exports = SecretsManager;