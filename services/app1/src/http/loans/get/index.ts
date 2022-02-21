import LoanDAL from '@libs/dal/loan'
import { middle } from 'middle'
import { APIGatewayProxyResult } from 'aws-lambda'
import { schemaValidation } from './schema'

const loadDAL = new LoanDAL()

/*
 * @api [get] /loans
 *    description: "returns all loans"
 *    operationId: "findLoans"
 *    responses:
 *      "200":
 *        description: "list loan response"
 *        content:
 *          application/json:
 *            schema:
 *              type: "array"
 *              items:
 *                $ref: "#/components/schemas/ListLoanResponse"
 *      "500":
 *        description: "unexpected error"
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/ErrorModel"
 */
export const handler = middle(async (): Promise<APIGatewayProxyResult> => {
  const loans = await loadDAL.getAll()
  return {
    statusCode: 200,
    body: JSON.stringify(loans),
  }
}, schemaValidation)
