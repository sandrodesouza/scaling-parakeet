import { handler } from '.'

describe('rest controller :: loan :: post', () => {
  it('create new loan', async () => {
    const response = await handler({
      pathParameters: {
        amount: 100,
      },
    })
    expect(response.statusCode).toBe(200)
    expect(JSON.parse(response.body)).toMatchObject({
      amount: 100,
      status: 'offered',
    })
  })
})
