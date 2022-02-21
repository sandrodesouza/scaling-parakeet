import '@libs/tests/openkvk_mock'
import { COMPANY_DEMO } from '@libs/tests/openkvk_mock'
import { handler } from '.'
import { handler as create } from '../post'

describe('rest controller :: loan :: delete', () => {
  test('it should delete a existing loan', async () => {
    const loanResponse = await create({ body: { amount: 10000, companyId: COMPANY_DEMO } })
    const { id } = JSON.parse(loanResponse.body)
    const response = await handler({
      pathParameters: {
        id,
      },
    })
    expect(response.statusCode).toBe(204)
    expect(JSON.parse(response.body)).toMatchObject({
      id,
    })
  })

  test('it should fail to delete an inexistent loan', async () => {
    const response = await handler({
      pathParameters: {
        id: 'text',
      },
    })
    expect(response.statusCode).toBe(404)
    expect(JSON.parse(response.body)).toMatchObject({
      error: 'Not Found',
    })
  })
})
