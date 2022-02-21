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
 *     type: object
 */

// TODO: more details on company schema

const ListLoanResponse = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    amount: { type: 'number' },
    status: { type: 'string' },
    createdAt: { type: 'string' },
    company: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        BTW: { type: 'string' },
        LEI: { type: 'string' },
        RSIN: { type: 'string' },
        actief: { type: 'boolean' },
        // bestaandehandelsnaam: Joi.array(), // TODO: arrays
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
        // sbi: Joi.array(),
        // statutairehandelsnaam: Joi.array(),
        straat: { type: 'string' },
        subdossiernummer: { type: 'string' },
        type: { type: 'string' },
        vbo_id: { type: 'string' },
        vestigingsnummer: { type: 'string' },
      },
    },
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
