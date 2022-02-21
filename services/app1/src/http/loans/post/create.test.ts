import { handler } from '.'

describe('rest controller :: loan :: post', () => {
  test('it should create new loan', async () => {
    const response = await handler({
      body: {
        amount: 100,
      },
    })
    expect(response.statusCode).toBe(200)
    expect(JSON.parse(response.body)).toMatchObject({
      amount: 100,
      status: 'offered',
    })
  })

  test('it should fail to create new loan with bad request error :: missing amount', async () => {
    const response = await handler({
      body: {},
    })
    expect(response.statusCode).toBe(400)
    expect(JSON.parse(response.body)).toMatchObject({
      error: [
        {
          instancePath: '/body',
          schemaPath: '#/properties/body/required',
          keyword: 'required',
          params: { missingProperty: 'amount' },
          message: "must have required property 'amount'",
        },
      ],
    })
  })

  test('it should fail to create new loan with bad request error :: wrong amount type', async () => {
    const response = await handler({
      body: { amount: 'text' },
    })
    expect(response.statusCode).toBe(400)
    expect(JSON.parse(response.body)).toMatchObject({
      error: [
        {
          instancePath: '/body/amount',
          schemaPath: '#/properties/body/properties/amount/type',
          keyword: 'type',
          params: { type: 'number' },
          message: 'must be number',
        },
      ],
    })
  })
})
