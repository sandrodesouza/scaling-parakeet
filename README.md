# a simple loan application

> This documentation assumes you are familiar with AWS, serverless and NodeJS.

### Requirements

- Node (or Nvm)
- AWS CLI (installed and setup)
- Yarn

### Getting started

- Install dependencies: `yarn install`
- Run tests: `yarn test`
- Run for development: `yarn start`
- Check lint issues: `yarn lint`

### Apps v2

#### Technologies

- Platform: Node.js
- Programming language: Javascript (ES6) / Typescript (preferred)
- Framework: AWS SAM
- Main AWS Services: Lambda, DynamoDB

#### app1 has these features:

- create a loan (post /loan)
- delete a loan (delete /loan/{id})
- list all loans (get /loan)
- disburse a loan (post /disburse)

#### app2 has these features:

- disburse a loan (post /disburse)
