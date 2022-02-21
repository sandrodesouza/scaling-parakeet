/**
 * @schema CreateLoan
 * required:
 *   - amount
 * properties:
 *   amount:
 *     type: number
 */

const CreateLoan = {
  type: 'object',
  properties: {
    amount: { type: 'number' },
  },
  required: ['amount'],
  additionalProperties: false,
}

/**
 * @schema CreateLoanResponse
 * required:
 *   - amount
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
 */

const CreateLoanResponse = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    amount: { type: 'number' },
    status: { type: 'string' },
    createdAt: { type: 'string' },
  },
  required: ['id', 'amount'],
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
