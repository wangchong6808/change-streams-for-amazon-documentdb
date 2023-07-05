#!/bin/sh

zip -r function.zip . > /dev/null
echo 'upload function eventsDetector'
aws lambda update-function-code --function-name eventsDetector --region us-east-2 --zip-file fileb://function.zip > /dev/null
rm function.zip