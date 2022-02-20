module.exports = {
  tables: [
    {
      AttributeDefinitions: [{ AttributeName: 'id', AttributeType: 'S' }],
      KeySchema: [{ AttributeName: 'id', KeyType: 'HASH' }],
      TableName: 'loans',
      ProvisionedThroughput: { ReadCapacityUnits: 5, WriteCapacityUnits: 5 },
    },
  ],
  basePort: 8000,
}
