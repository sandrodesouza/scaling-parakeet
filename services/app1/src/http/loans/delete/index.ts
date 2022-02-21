import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { middle } from 'middle'
import LoanDAL from '@libs/dal/loan'
import { schemaValidation } from './schema'

const loadDAL = new LoanDAL()

/*
 * @api [delete] /loans/{id}
 *    description: "Deletes a loan"
 *    operationId: "DeleteLoan"
 *    parameters:
 *      -
 *        name: "id"
 *        in: "path"
 *        description: "id of loan to delete"
 *        required: true
 *        schema:
 *          type: "string"
 *    responses:
 *      "204":
 *        description: "delete loan response"
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/DeleteLoanResponse"
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
 */
export const handler = middle(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const { id } = event.pathParameters
    console.log('delete request for id: ', id)
    const loan = await loadDAL.destroy({ id })
    return {
      statusCode: 204,
      body: JSON.stringify({ id }),
    }
  },
  schemaValidation
)
