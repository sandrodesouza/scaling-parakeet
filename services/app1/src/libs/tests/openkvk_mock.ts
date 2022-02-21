export const COMPANY_DEMO = 'hoofdvestiging-57842019-0000-van-der-lei-techniek-bv'

export const exampleCompany = {
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
