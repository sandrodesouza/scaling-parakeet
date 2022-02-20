import dynamo from 'dynamodb'

const dynamodbConfig = {
  ...(process.env.MOCK_DYNAMODB_ENDPOINT && {
    endpoint: process.env.MOCK_DYNAMODB_ENDPOINT,
    sslEnabled: false,
    region: 'local',
  }),
}
dynamo.AWS.config.update(dynamodbConfig)
// dynamo.log.level('info')
export default dynamo
