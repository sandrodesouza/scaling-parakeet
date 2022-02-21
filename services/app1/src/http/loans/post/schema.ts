/**
 * @schema CreateLoan
 * required:
 *   - amount
 *   - companyId
 * properties:
 *   amount:
 *     type: number
 *   companyId:
 *     type: string
 */

const CreateLoan = {
  type: 'object',
  properties: {
    amount: { type: 'number' },
    companyId: { type: 'string' },
  },
  required: ['amount', 'companyId'],
  additionalProperties: false,
}

/**
 * @schema CreateLoanResponse
 * required:
 *   - id
 * properties:
 *   id:
 *     type: string
 */

const CreateLoanResponse = {
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
      body: CreateLoan,
    },
  },
  outputSchema: {
    type: 'object',
    properties: {
      body: CreateLoanResponse,
    },
  },
}
