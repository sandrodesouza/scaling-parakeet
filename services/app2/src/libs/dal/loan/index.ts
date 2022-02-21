import Joi from 'joi'
import dynamo from '@libs/aws/dynamo'

export const LoanStatuses = {
  OFFERED: 'offered',
  DISBURSED: 'disbursed',
}

const LoanSchema = {
  hashKey: 'id',
  timestamps: true,
  schema: {
    id: dynamo.types.uuid(),
    amount: Joi.number().required(),
    status: Joi.string(),
  },
}

class LoanDAL {
  private client
  constructor() {
    this.client = dynamo.define('Loan', LoanSchema)
  }

  // for testing only
  create = async ({ amount }: { amount: number }) => {
    return await this.client.create({
      amount: amount,
      status: LoanStatuses.OFFERED,
    })
  }

  update = async ({ id, status }: { id: string; status: string }) => {
    return await this.client.update({
      id,
      status,
    })
  }

  getById = async ({ id }: { id: string }) => {
    return await new Promise((resolve, reject) => {
      const querystream = this.client.query(id).exec()
      const data = []
      querystream.on('readable', () => {
        const items = querystream.read()
        if (items && items.Items) data.push(...items.Items)
      })
      querystream.on('error', reject)
      querystream.on('end', () => resolve(data.shift()))
    })
  }
}

export default LoanDAL
