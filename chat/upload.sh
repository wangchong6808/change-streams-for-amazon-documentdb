#!/bin/sh

zip -r function.zip . > /dev/null
echo 'upload function persistChatMessage'
aws lambda update-function-code --function-name persistChatMessage --region us-east-2 --zip-file fileb://function.zip > /dev/null
rm function.zip