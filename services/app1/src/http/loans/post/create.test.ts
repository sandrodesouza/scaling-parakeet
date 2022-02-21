import { handler } from '.'

const exampleCompany = {
  BTW: 'NL852760103B01',
  LEI: '724500VPC3YN0IKS8559',
  RSIN: '852760103',
  _links: {
    self: {
      href: '/openkvk/hoofdvestiging-57842019-0000-van-der-lei-techniek-bv',
    },
  },
  actief: true,
  bestaandehandelsnaam: ['Van der Lei techniek B.V.'],
  dossiernummer: '57842019',
  handelsnaam: 'Van der Lei techniek B.V.',
  huisnummer: '21',
  locatie: {
    lat: '52.1892035430478',
    lon: '6.2135914495005',
  },
  pand_id: '0262100000005464',
  plaats: 'Gorssel',
  postcode: '7213GB',
  sbi: ['64303'],
  statutairehandelsnaam: ['Van der Lei techniek B.V.'],
  straat: 'Markeweg',
  subdossiernummer: '0000',
  type: 'Hoofdvestiging',
  vbo_id: '0262010000005535',
  vestigingsnummer: '000027244687',
}

jest.mock('@libs/client/openkvk', () => {
  return jest.fn().mockImplementation(() => {
    return {
      getCompanyById: ({ companyId }) => {
        if (companyId === 'hoofdvestiging-57842019-0000-van-der-lei-techniek-bv') {
          return exampleCompany
        } else {
          return { actief: false }
        }
      },
    }
  })
})

describe('rest controller :: loan :: post', () => {
  test('it should create new loan', async () => {
    const response = await handler({
      body: {
        amount: 100,
        companyId: 'hoofdvestiging-57842019-0000-van-der-lei-techniek-bv',
      },
    })
    expect(response.statusCode).toBe(200)
    expect(JSON.parse(response.body)).toMatchObject({
      amount: 100,
      status: 'offered',
      company: {
        BTW: 'NL852760103B01',
        LEI: '724500VPC3YN0IKS8559',
        RSIN: '852760103',
        actief: true,
        dossiernummer: '57842019',
        handelsnaam: 'Van der Lei techniek B.V.',
        huisnummer: '21',
        pand_id: '0262100000005464',
        plaats: 'Gorssel',
        postcode: '7213GB',
        straat: 'Markeweg',
        subdossiernummer: '0000',
        type: 'Hoofdvestiging',
        vbo_id: '0262010000005535',
        vestigingsnummer: '000027244687',
        id: 'hoofdvestiging-57842019-0000-van-der-lei-techniek-bv',
      },
    })
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
