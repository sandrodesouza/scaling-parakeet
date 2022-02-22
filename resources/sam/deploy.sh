#!/bin/bash
set -e

if [ -z "$1" ]; then
    printf "* Error: missing stage, try: bash deploy.sh <stage> *\n"
    exit 1
fi

ENVIRONMENT=$1
STACK_NAME="simple-loan-$ENVIRONMENT-sam"

aws cloudformation deploy --template-file "template.yml" \
                          --stack-name "$STACK_NAME" \
                          --no-fail-on-empty-changeset \
                          --capabilities "CAPABILITY_IAM"
