import { handler } from '.'
import LoadDAL from '@libs/dal/loan'
const loadDAL = new LoadDAL()

describe('rest controller :: loan :: get all', () => {
  test('it should returns a list of loans from datastore', async () => {
    await loadDAL.create({ amount: 10000 })
    await loadDAL.create({ amount: 10000 })
    const response = await handler()
    expect(response.statusCode).toBe(200)
    expect(JSON.parse(response.body)).toMatchObject([
      {
        amount: 10000,
        status: 'offered',
      },
      {
        amount: 10000,
        status: 'offered',
      },
    ])
  })
})
