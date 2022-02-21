import LoanDAL from '@libs/dal/loan'
import { middle } from 'middle'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { schemaValidation } from './schema'
import Errors from 'http-errors'
import OpenKvK from '@libs/client/openkvk'

const loadDAL = new LoanDAL()
const openKvK = new OpenKvK()

const getCompanyInformation = async ({ companyId }: { companyId: string }) => {
  const company = await openKvK.getCompanyById({ companyId })
  if (!company) throw new Errors.BadRequest(`The company doesn't exists`)
  if (company && !company.actief) throw new Errors.BadRequest(`The company isn't active`)
  delete company._links
  company.id = companyId
  return company
}

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
 *      "503":
 *        description: "service unavailable"
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/ErrorModel"
 */
export const handler = middle(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const { amount, companyId } = event.body

    const company = await getCompanyInformation({ companyId })
    const loan = await loadDAL.create({ amount, company })

    return {
      statusCode: 200,
      body: JSON.stringify(loan),
    }
  },
  schemaValidation
)
