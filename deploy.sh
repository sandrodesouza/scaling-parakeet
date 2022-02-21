#!/bin/bash
set -e

if [ -z "$1" ]; then
    printf "* Error: missing stage, try: bash deploy.sh <stage> *\n"
    exit 1
fi

declare -a services=( 
            "resources/data-storage" \

            "services/app2" \
            "services/app1" \
            
             )

for key in "${!services[@]}"; do
    SERVICE2DEPLOY=${services[$key]}
    echo "deploying $SERVICE2DEPLOY"
    pushd $SERVICE2DEPLOY 
    bash deploy.sh $@
    popd
done