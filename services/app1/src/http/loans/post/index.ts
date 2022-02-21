import LoanDAL from '@libs/dal/loan'
import { middle } from 'middle'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { schemaValidation } from './schema'

const loadDAL = new LoanDAL()

/*
 * @api [post] /loans
 *    description: "Creates a new loan"
 *    operationId: "createLoan"
 *    requestBody:
 *      description: "Create Loan Request"
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: "#/components/schemas/CreateLoan"
 *    responses:
 *      "200":
 *        description: "loan response"
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/CreateLoanResponse"
 *      "400":
 *        description: "Bad Request"
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/ErrorModel"
 *      "500":
 *        description: "unexpected error"
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/ErrorModel"
 */
export const handler = middle(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const { amount } = event.body
    const loan = await loadDAL.create({ amount })
    return {
      statusCode: 200,
      body: JSON.stringify(loan),
    }
  },
  schemaValidation
)
