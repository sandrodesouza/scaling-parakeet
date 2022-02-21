import { handler } from '.'
import LoadDAL from '@libs/dal/loan'
const loadDAL = new LoadDAL()

describe('rest controller :: loan :: delete', () => {
  test('it should delete a existing loan', async () => {
    const loanResponse = await loadDAL.create({ amount: 1000 })
    const response = await handler({
      pathParameters: {
        id: loanResponse.get('id'),
      },
    })
    console.log('response', response)
    expect(response.statusCode).toBe(204)
    expect(JSON.parse(response.body)).toMatchObject({
      amount: 1000,
      status: 'offered',
    })
  })

  test('it should fail to delete an inexistent loan', async () => {
    const response = await handler({
      pathParameters: {
        id: 'text',
      },
    })
    console.log('response', response)
    expect(response.statusCode).toBe(404)
    expect(JSON.parse(response.body)).toMatchObject({
      error: 'Not Found',
    })
  })
})
