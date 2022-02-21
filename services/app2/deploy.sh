#!/bin/bash
set -e

yarn build

# deploy SAM 
ENVIRONMENT=$1
STACK_NAME="simple-loan-$ENVIRONMENT-services-app2"

DYNAMO_LOAN_TABLE=$(aws cloudformation list-exports --query 'Exports[?Name==`'simple-loan-$ENVIRONMENT-data-layer-LoanTable'`].Value' --output text)

PARAMETERS="Stage=\"$ENVIRONMENT\" \
LoanTable=\"$DYNAMO_LOAN_TABLE\""


sam deploy --stack-name "$STACK_NAME" \
        --config-env "$ENVIRONMENT" \
        --no-fail-on-empty-changeset \
        --parameter-overrides "$PARAMETERS" \
        --capabilities "CAPABILITY_IAM"