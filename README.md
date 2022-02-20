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

### Technologies

- Platform: Node.js
- Programming language: Javascript (ES6) / Typescript (preferred)
- Framework: AWS SAM
- Main AWS Services: Lambda, DynamoDB

### Apps V1

#### app1 has these features:

- create a loan (get /create/{amount})
- delete a loan (get /delete/{id})
- list all loans (get /all)
- disburse a loan (get /disburse/{id})

#### app2 has these features:

- disburse a loan (not implemented)
