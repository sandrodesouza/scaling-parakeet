/**
 * @schema DeleteLoan
 * required:
 *   - id
 * properties:
 *   id:
 *     type: string
 */

const DeleteLoan = {
  type: 'object',
  properties: {
    id: { type: 'string' },
  },
  required: ['id'],
  additionalProperties: false,
}

/**
 * @schema DeleteLoanResponse
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
 */

const DeleteLoanResponse = {
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
      pathParameters: DeleteLoan,
    },
  },
  outputSchema: {
    type: 'object',
    properties: {
      body: DeleteLoanResponse,
    },
  },
}
