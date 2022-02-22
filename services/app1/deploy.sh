#!/bin/bash
set -e

if [ -z "$1" ]; then
    printf "* Error: missing stage, try: bash deploy.sh <stage> *\n"
    exit 1
fi

yarn
yarn build

# deploy SAM 
ENVIRONMENT=$1
STACK_NAME="simple-loan-$ENVIRONMENT-services-app1"

DEPLOYMENT_BUCKET=$(aws cloudformation list-exports --query 'Exports[?Name==`'simple-loan-$ENVIRONMENT-sam-deployment-bucket'`].Value' --output text)
DYNAMO_LOAN_TABLE=$(aws cloudformation list-exports --query 'Exports[?Name==`'simple-loan-$ENVIRONMENT-data-layer-LoanTable'`].Value' --output text)
APP2_API_KEY_ID=$(aws cloudformation list-exports --query 'Exports[?Name==`'simple-loan-$ENVIRONMENT-services-app2-InternalApiKeyId'`].Value' --output text)
APP2_API_ENDPOINT=$(aws cloudformation list-exports --query 'Exports[?Name==`'simple-loan-$ENVIRONMENT-services-app2-ApiEndpoint'`].Value' --output text)

# TODO: APP2_API_KEY_ID > APP2_API_KEY, the output has a attribute stageKeys as array
APP2_API_KEY$(aws apigateway get-api-key --api-key $APP2_API_KEY_ID)

PARAMETERS="Stage=\"$ENVIRONMENT\" \
App2ApiEndpoint=\"$APP2_API_ENDPOINT\" \
App2ApiKey=\"$APP2_API_KEY\" \
LoanTable=\"$DYNAMO_LOAN_TABLE\""


sam deploy --stack-name "$STACK_NAME" \
        --config-env "$ENVIRONMENT" \
        --no-fail-on-empty-changeset \
        --s3-bucket "$DEPLOYMENT_BUCKET" \
        --parameter-overrides "$PARAMETERS" \
        --capabilities "CAPABILITY_IAM"