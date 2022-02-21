import { handler } from '.'
import LoanDAL from '@libs/dal/loan'
const loanDAL = new LoanDAL()

describe('rest controller :: disburse :: post', () => {
  test('it should create new loan in database and disburse the loan', async () => {
    const loan = await loanDAL.create({ amount: 1000 })

    const response = await handler({
      body: {
        id: loan.get('id'),
      },
    })
    expect(response.statusCode).toBe(200)
    expect(JSON.parse(response.body)).toMatchObject({
      id: loan.get('id'),
      status: 'disbursed',
    })
  })
})
