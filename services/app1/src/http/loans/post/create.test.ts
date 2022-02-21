import '@libs/tests/openkvk_mock'
import { COMPANY_DEMO } from '@libs/tests/openkvk_mock'
import { handler } from '.'

describe('rest controller :: loan :: post', () => {
  test('it should create new loan', async () => {
    const response = await handler({
      body: {
        amount: 100,
        companyId: COMPANY_DEMO,
      },
    })
    expect(response.statusCode).toBe(201)
    expect(response.body).toMatch(/id/)
  })

  test('it should fail to create a loan because the company isn`t active', async () => {
    const response = await handler({
      body: {
        amount: 100,
        companyId: 'hoofdvestiging-57842019-0000-van-der-lei-techniek-bv-false',
      },
    })
    expect(response.statusCode).toBe(400)
    expect(JSON.parse(response.body)).toMatchObject({
      error: `The company isn't active`,
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
        {
          instancePath: '/body',
          keyword: 'required',
          message: "must have required property 'companyId'",
          params: {
            missingProperty: 'companyId',
          },
        },
      ],
    })
  })

  test('it should fail to create new loan with bad request error :: wrong amount type', async () => {
    const response = await handler({
      body: { amount: 'text', companyId: 1 },
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
