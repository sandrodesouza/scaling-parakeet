# A Simple Loan Application

> This documentation assumes you are familiar with development, AWS, serverless and NodeJS.

### Requirements

- Node
- Yarn
- [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html) installed and configured
- [AWS SAM](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html) installed

### Technologies

- Platform: Node.js
- Programming language: Javascript / Typescript
- Framework: AWS SAM
- Main AWS Services: Lambda, DynamoDB

### Repository Rundown

| Directory              | Description                                                                                                           |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------- |
| resources              | CloudFormation resources                                                                                              |
| resources/data-storage | CloudFormation stack for DynamoDB creation                                                                            |
| resources/sam          | CloudFormation stack for S3 buckets creation                                                                          |
| services               | Our micro services                                                                                                    |
| services/app1          | Loan Service simple rest api for loans                                                                                |
| services/app2          | Disburse Service, an internal service to disburse loans                                                               |
| shared                 | Shared components                                                                                                     |
| shared/configs         | Shared settings for eslint, prettier, webpack, etc...                                                                 |
| shared/libs            | Shared libraries                                                                                                      |
| shared/logger          | Custom universal logging library                                                                                      |
| shared/middle          | Very simple middleware that help us validate, cors, normalization, parsing, capture errors and apply security headers |

### Application Overview

> Before running any deployment script, setup your AWS user, CLI and SAM.

#### resources/sam

To deploy our services we must have a S3 bucket available to upload artifacts. This template will deploy a cloudformation that creates one S3 bucket and exports it as output to be use in others deployments.

To initiate this process, perform the following steps:

```bash
cd resources/data-storage
bash deploy.sh <stage>

# You may also deploy using a specific AWS CLI profile and region, for instance:
AWS_PROFILE=profile1 AWS_REGION=us-east-1 bash deploy.sh <stage>
```

Where `stage` is the environment name.

#### resources/data-storage

This directory has our dynamodb table cloudformation template, it also exports the table name to be use in the project.

To initiate this process, perform the following steps:

```bash
cd resources/data-storage
bash deploy.sh <stage>
```

Where `stage` is the environment name. You may also deploy using a specific AWS CLI profile and region, for instance:

```bash
AWS_PROFILE=profile1 AWS_REGION=us-east-1 bash deploy.sh dev
```

#### services/app1

The app1 service has implemented the following features:

- Create a loan (post /loan)
- Delete a loan (delete /loan/{id})
- List all loans (get /loan)
- Disburse a loan (post /loan/disburse)

The API was created with AWS SAM as framework, Javascript as language with Typescript support. Jest and dynalite for testings. Webpack, babel and esbuild for bundle and optimization.

> This service is not production ready, since it doesn't protect their endpoints.

##### Docs

You can access the OpenApi specification on [services/app1/docs/app1.json](./services/app1/docs/app1.json), you can also recreate the specification with the following steps:

```bash
cd service/app1
yarn
yarn docs
```

The output file will be in [services/app1/docs/app1.json](./services/app1/docs/app1.json)

##### Testing

The app uses [dynalite](https://github.com/mhart/dynalite) and [jest-dynalite](https://www.npmjs.com/package/jest-dynalite) for testings against our data layer. This allows us to run our unit tests against a local DynamoDB instance in a really fast way. If you create new tables or changed the current one, you must update the file [./shared/configs/jest-dynalite-config.js](./shared/configs/jest-dynalite-config.js), where we keep the structure of our dynamoDB table.

To testing this service you should following the steps:

```bash
cd service/app1
yarn
yarn test
```

You can access the coverage files in services/app1/coverage

You can also run test for a specific file or folder, with our without outputs or coverage. For instance:

```bash
yarn test src/http/loans/delete --coverage false --silent
```

##### Development

This development was started thinking in testing, our start script runs our testing runner with watch capabilities. We use esbuild to bundle our test files, it take ~3s to run our tests (in silent mode and without coverage).

To start coding you should following the steps:

```bash
cd service/app1
yarn
yarn start
```

For any code you change, tests will re-run.

You can also run eslint and prettier scripts to check the code:

```bash
cd service/app1
yarn lint # for eslint
yarn format # for prettier
```

##### Code structure

The code is organize as similar the way the API it is, inside the `src/http` folder you can find all endpoints from our API, inside those you will find the methods available (fi: get, post).

For instance, our "list all loans" feature will be found in `src/http/loans/get/index.ts`. Inside the `index.ts` file you will find the OpenApi spec as comment. In this same folder you will find tests file and a file called `schema.ts` that has the input schema to validate the requests, the output schema to validate responses and OpenApi Spec schemas used in this endpoint.

##### Deployment

> app1 has dependencies from app2, so be sure to deploy app2 first.

To deploy the service you should following steps:

```bash
cd service/app1
bash deploy.sh <stage>
```

Where `stage` is the environment name.

You may also deploy using a specific AWS CLI profile and region, for instance:

```bash
AWS_PROFILE=profile1 AWS_REGION=us-east-1 bash deploy.sh dev
```

##### Security

This service has not implemented any endpoint security, like JWT or ApiKey. It should have at least one. It also has permissive cors, that means: allowing all origins.

It use the security headers recommended by [OWASP](https://cheatsheetseries.owasp.org/cheatsheets/REST_Security_Cheat_Sheet.html#security-headers).

#### services/app2

The app1 service has implemented the following features:

- Disburse a loan (post /disburse)

All services has the same implementation, same structure. The idea is to have the same way to test, develop, build, deploy all our services. You can run all instructions for app1 in the app2 folder with same results.

> The only difference is that this app has implemented api-key as authorizer, it means that you can only call the endpoints sending a valid api-key in the headers.

For instance:

```bash
curl -X POST -H "x-api-key: theKey" -H "Content-Type: application/json" -d '{"key":"val"}' https://[api-id].execute-api.[region].amazonaws.com/[stage]
```

This API hasn't cors enabled, you will not be able to consume it through a webapp.

OpenApi Spec can be access in [services/app2/docs/app2.json](./services/app2/docs/app2.json)

#### shared/logger

The Logger works as plugin that we can use in our services, it is just a implementation of console.log. This exists with the idea to become an universal logging library, something like Winston or Pino.

#### shared/middle

The Middle works as middleware library that we can use in our services. It has the following middlewares implemented (also, runs in this numbered order):

1. doNotWaitForEmptyEventLoop: this will prevent Lambda from timing out because of open database connections, etc.
2. bodyParse: automatically parses requests with a JSON body into an object.
3. inputValidator: automatically validates incoming events.
4. mainHandler: you functions will run at this moment.
5. normalizeHttpResponse: automatically normalize responses.
6. outputValidator: automatically validates outgoing responses.
7. processErrors: capture any failure and expose only certain error types (statusCode < 500 or expose=true), otherwise will return the "internal server error" message.
8. securityHeaders: automatically applies all security headers recommended by owasp.
9. cors: automatically applies a permissive cors header rule.

##### Usage

It is very simple and requires just few steps:

- Write your Lambda handlers as usual
- Import middle
- Wrap your handler in the middle(yourFunction, schemaToValidate) factory function.

This will return a new enhanced instance of your original handler with all middlewares attached to it.

```javascript
import { middle } from "middle";
const schemaValidation = {
  inputSchema: {
    type: "object",
    properties: {
      pathParameters: {
        type: "object",
        properties: {
          id: { type: "string" },
        },
        required: ["id"],
        additionalProperties: false,
      },
    },
  },
  outputSchema: {
    type: "object",
    properties: {
      body: {
        type: "object",
        properties: {
          id: { type: "string" },
        },
        required: ["id"],
        additionalProperties: false,
      },
    },
  },
};
const myHandler = async () => {
  return {
    statusCode: 201, // if not define, will defaults to 200
    // all body responses should be string, I can stringify an object if needed
    body: JSON.stringify({ hello: "world" }),
  };
};
export const handler = middle(myHandler, schemaValidation);
```

### Deployment

To deploy all apps and resources, you can just run the next commands:

```bash
# from root folder
bash deploy.sh stage # stage as our environment name

# you may also use a specific aws cli profile and region
AWS_PROFILE=profile1 AWS_REGION=us-east-1 bash deploy.sh stage
```

To running tests on all services:

```bash
# from root folder
bash test.sh
```

This script also check for lint errors.

### Whys?

#### AWS SAM vs Serverless Framework

I have been using Serverless Framework from a long time and there is a tone of plugins to help the development. But on every deploy we made, all lambdas (no matter if changes or not) will be updated and if we have a lot of lambdas it will take a lot of time to deploy.

AWS SAM just update the lambdas that had changed, automatically. It also keep the developer more close to cloudformation. Helps to understand how this serverless works.

#### Middleware validator vs AWS API Gateway Request validations

Basically the decision was thinking in customization and internationalization.

#### OpenAPI snippet in code comments vs one OpenApi file

The decision was made thinking in maintainability, it is easy to keep this documentation update on every change we made if it is close to the code we will change.

This plugin seek for snippet comment all over our files and using a base structure, it builds a complete documentation for the API.

Here is an example:

```javascript
/*
 * @api [get] /loans
 *    description: "returns all loans"
 *    operationId: "findLoans"
 *    responses:
 *      "200":
 *        description: "list loan response"
 *        content:
 *          application/json:
 *            schema:
 *              type: "array"
 *              items:
 *                $ref: "#/components/schemas/ListLoanResponse"
 */

/**
 * @schema DisburseLoanResponse
 * required:
 *   - id
 * properties:
 *   id:
 *     type: string
 *   status:
 *     type: string
 */
```

### TO DO LIST

- [ ] implement JWT Authorization in the app1
- [ ] more tests and coverage is low (66~98%)
- [ ] implement a real logger
- [ ] the middle should be more customizable
- [ ] more typescript code
- [ ] API get methods should have pagination and filter capabilities
- [ ] use ssm instead of cloudformation outputs
- [ ] find a way of unify @schema snippet with javascript object, avoiding dup code
- [ ] move reusable internal libs to shared libs, as libs/aws/\* or libs/dal/loan
- [ ] split this doc
- [ ] openkvk apikey should be in ssm or in deployment scripts
