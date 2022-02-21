set -e
declare -a services=( 

            "services/app1" \
            "services/app2" \
            
             )

for key in "${!services[@]}"; do
    SERVICE2DEPLOY=${services[$key]}
    echo "testing $SERVICE2DEPLOY"
    pushd $SERVICE2DEPLOY 
    yarn
    yarn lint
    yarn test
    yarn test:build
    popd
done