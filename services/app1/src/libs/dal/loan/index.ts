import Joi from 'joi'
import dynamo from '@libs/aws/dynamo'
import Errors from 'http-errors'

export const LoanStatuses = {
  OFFERED: 'offered',
  DISBURSED: 'disbursed',
}

class LoanDAL {
  private client
  constructor() {
    this.client = dynamo.define('Loan', {
      hashKey: 'id',
      timestamps: true,
      schema: {
        id: dynamo.types.uuid(),
        amount: Joi.number().required(),
        status: Joi.string(),
      },
    })
  }

  create = async (loan: { amount: number }) => {
    return await this.client.create({ amount: loan.amount, status: LoanStatuses.OFFERED })
  }
  destroy = async (loan: { id: string }) => {
    const response = await this.client.destroy(loan.id, { ReturnValues: 'ALL_OLD' })
    if (!response) throw new Errors.NotFound()
    return response
  }
  getAll = async () => {
    return await new Promise((resolve, reject) => {
      const querystream = this.client.scan().loadAll().exec()
      const data = []
      querystream.on('readable', () => {
        const items = querystream.read()
        if (items && items.Items) data.push(...items.Items)
      })
      querystream.on('error', reject)
      querystream.on('end', () => resolve(data))
    })
  }
}

export default LoanDAL
