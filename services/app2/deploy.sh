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
STACK_NAME="simple-loan-$ENVIRONMENT-services-app2"

DEPLOYMENT_BUCKET=$(aws cloudformation list-exports --query 'Exports[?Name==`'simple-loan-$ENVIRONMENT-sam-deployment-bucket'`].Value' --output text)
DYNAMO_LOAN_TABLE=$(aws cloudformation list-exports --query 'Exports[?Name==`'simple-loan-$ENVIRONMENT-data-layer-LoanTable'`].Value' --output text)

PARAMETERS="Stage=\"$ENVIRONMENT\" \
LoanTable=\"$DYNAMO_LOAN_TABLE\""


sam deploy --stack-name "$STACK_NAME" \
        --config-env "$ENVIRONMENT" \
        --no-fail-on-empty-changeset \
        --s3-bucket "$DEPLOYMENT_BUCKET" \
        --parameter-overrides "$PARAMETERS" \
        --capabilities "CAPABILITY_IAM"