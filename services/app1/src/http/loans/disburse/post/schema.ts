/**
 * @schema DisburseLoan
 * required:
 *   - id
 * properties:
 *   id:
 *     type: string
 */

const DisburseLoan = {
  type: 'object',
  properties: {
    id: { type: 'string' },
  },
  required: ['id'],
  additionalProperties: false,
}

/**
 * @schema DisburseLoanResponse
 * required:
 *   - id
 * properties:
 *   id:
 *     type: string
 */

const DisburseLoanResponse = {
  type: 'object',
  properties: {
    id: { type: 'string' },
  },
  required: ['id'],
  additionalProperties: false,
}

export const schemaValidation = {
  inputSchema: {
    type: 'object',
    properties: {
      body: DisburseLoan,
    },
  },
  outputSchema: {
    type: 'object',
    properties: {
      body: DisburseLoanResponse,
    },
  },
}
