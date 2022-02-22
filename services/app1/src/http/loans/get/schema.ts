/**
 * @schema CompanyModel
 * required:
 *   - id
 * properties:
 *   id:
 *     type: string
 *   BTW:
 *     type: string
 *   LEI:
 *     type: string
 *   RSIN:
 *     type: string
 *   actief:
 *     type: boolean
 *   bestaandehandelsnaam:
 *     type: array
 *     items:
 *       type: string
 *   dossiernummer:
 *     type: string
 *   handelsnaam:
 *     type: string
 *   huisnummer:
 *     type: string
 *   locatie:
 *     type: object
 *     properties:
 *       lat:
 *         type: string
 *       lon:
 *         type: string
 *   pand_id:
 *     type: string
 *   plaats:
 *     type: string
 *   postcode:
 *     type: string
 *   sbi:
 *     type: array
 *     items:
 *       type: string
 *   statutairehandelsnaam:
 *     type: array
 *     items:
 *       type: string
 *   straat:
 *     type: string
 *   subdossiernummer:
 *     type: string
 *   type:
 *     type: string
 *   vbo_id:
 *     type: string
 *   vestigingsnummer:
 *     type: string
 */
const CompanyModel = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    BTW: { type: 'string' },
    LEI: { type: 'string' },
    RSIN: { type: 'string' },
    actief: { type: 'boolean' },
    bestaandehandelsnaam: {
      type: 'array',
      items: {
        type: 'string',
      },
    },
    dossiernummer: { type: 'string' },
    handelsnaam: { type: 'string' },
    huisnummer: { type: 'string' },
    locatie: {
      type: 'object',
      properties: {
        lat: { type: 'string' },
        lon: { type: 'string' },
      },
    },
    pand_id: { type: 'string' },
    plaats: { type: 'string' },
    postcode: { type: 'string' },
    sbi: {
      type: 'array',
      items: {
        type: 'string',
      },
    },
    statutairehandelsnaam: {
      type: 'array',
      items: {
        type: 'string',
      },
    },
    straat: { type: 'string' },
    subdossiernummer: { type: 'string' },
    type: { type: 'string' },
    vbo_id: { type: 'string' },
    vestigingsnummer: { type: 'string' },
  },
}

/**
 * @schema ListLoanResponse
 * required:
 *   - id
 * properties:
 *   id:
 *     type: string
 *   amount:
 *     type: number
 *   status:
 *     type: string
 *   createdAt:
 *     type: string
 *   company:
 *     $ref: "#/components/schemas/CompanyModel"
 */

const ListLoanResponse = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    amount: { type: 'number' },
    status: { type: 'string' },
    createdAt: { type: 'string' },
    company: CompanyModel,
  },
  required: ['id'],
  additionalProperties: false,
}

export const schemaValidation = {
  outputSchema: {
    type: 'object',
    properties: {
      body: {
        type: 'array',
        items: ListLoanResponse,
      },
    },
  },
}
