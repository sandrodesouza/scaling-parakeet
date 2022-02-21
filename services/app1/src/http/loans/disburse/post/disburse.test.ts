import '@libs/tests/internal_app2_mock'
import { COMPANY_DEMO } from '@libs/tests/openkvk_mock'
import { handler } from '.'
import { handler as create } from '../../post'

describe('rest controller :: loan :: disburse :: post', () => {
  test('it should create new loan and disburse it', async () => {
    const response = await create({
      body: {
        amount: 100,
        companyId: COMPANY_DEMO,
      },
    })

    const { id } = JSON.parse(response.body)
    console.log('id', id)

    const disburseResponse = await handler({
      body: {
        id,
      },
    })
    console.log('disburseResponse', disburseResponse)
    expect(disburseResponse.statusCode).toBe(200)
    expect(JSON.parse(disburseResponse.body)).toMatchObject({
      id,
    })
  })
})
