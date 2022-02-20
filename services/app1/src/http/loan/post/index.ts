import LoanDAL from '@libs/dal/loan'

const loadDAL = new LoanDAL()

export const handler = async (event: AWSLambda.APIGatewayEvent) => {
  const { amount } = event.pathParameters
  const loan = await loadDAL.create({ amount })
  return {
    statusCode: 200,
    body: JSON.stringify(loan),
  }
}
