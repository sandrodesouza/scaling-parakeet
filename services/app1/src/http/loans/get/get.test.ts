import '@libs/tests/openkvk_mock'
import { COMPANY_DEMO } from '@libs/tests/openkvk_mock'
import { handler } from '.'
import { handler as create } from '../post'

describe('rest controller :: loan :: get all', () => {
  test('it should returns a list of loans from datastore', async () => {
    await create({ body: { amount: 10000, companyId: COMPANY_DEMO } })
    await create({ body: { amount: 10000, companyId: COMPANY_DEMO } })
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
