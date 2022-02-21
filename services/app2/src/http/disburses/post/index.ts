import LoanDAL, { LoanStatuses } from '@libs/dal/loan'
import { middle } from 'middle'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { schemaValidation } from './schema'
import Errors from 'http-errors'

const loadDAL = new LoanDAL()

/*
 * @api [post] /disburse
 *    description: "disburse an exist loan"
 *    operationId: "disburseLoan"
 *    requestBody:
 *      description: "Disburse Loan Request"
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: "#/components/schemas/DisburseLoan"
 *    responses:
 *      "200":
 *        description: "loan response"
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/DisburseLoanResponse"
 *      "400":
 *        description: "Bad Request"
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/ErrorModel"
 *      "404":
 *        description: "Not Found"
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
    const { id } = event.body

    const loan = await loadDAL.getById({ id })
    if (!loan) throw new Errors.NotFound('Loan not found')

    if (loan.get('status') === LoanStatuses.OFFERED) {
      const updatedLoan = await loadDAL.update({ id, status: LoanStatuses.DISBURSED })
      return {
        statusCode: 200,
        body: JSON.stringify({ id, status: updatedLoan.get('status') }),
      }
    } else {
      throw new Errors.BadRequest(`Loan hasn't the status expected`)
    }
  },
  schemaValidation
)
