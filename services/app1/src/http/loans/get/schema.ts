/**
 * @schema ListLoanResponse
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

const ListLoanResponse = {
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
