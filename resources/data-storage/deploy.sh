#!/bin/bash
set -e

if [ -z "$1" ]; then
    printf "* Error: missing stage, try: bash deploy.sh <stage> *\n"
    exit 1
fi

# deploy SAM 
ENVIRONMENT=$1
STACK_NAME="simple-loan-$ENVIRONMENT-data-layer"

sam deploy --stack-name "$STACK_NAME" \
        --config-env "$ENVIRONMENT" \
        --no-fail-on-empty-changeset \
        --capabilities "CAPABILITY_IAM" \
        --template "template.yml"