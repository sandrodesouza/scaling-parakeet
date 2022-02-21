import LoanDAL, { LoanStatuses } from '@libs/dal/loan'
import { middle } from 'middle'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { schemaValidation } from './schema'
import Errors from 'http-errors'
import InternalAPP2 from '@libs/client/internal-app2'

const loanDAL = new LoanDAL()
const internalApp2 = new InternalAPP2()

/*
 * @api [post] /loans/disburse
 *    description: "Disburse an existing loan"
 *    operationId: "DisburseLoan"
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
 *        description: "Not found"
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
 *      "503":
 *        description: "service unavailable"
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/ErrorModel"
 */

const requestInternalDisburseService = async ({ id }: { id: string }) => {
  return await internalApp2.requestLoanDisburse({ id })
}

export const handler = middle(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const { id } = event.body

    const loan = await loanDAL.getById({ id })

    if (!loan) throw new Errors.NotFound('Loan not found')

    if (loan.get('id') && loan.get('status') === LoanStatuses.OFFERED) {
      const disburseRequest = await requestInternalDisburseService({ id: loan.get('id') })
      console.log('disburseRequest', disburseRequest)
    } else {
      throw new Errors.BadRequest(`Loan hasn't the status expected`)
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ id }),
    }
  },
  schemaValidation
)
