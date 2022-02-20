import Joi from 'joi'
import dynamo from '@libs/aws/dynamo'

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
    return this.client.create({ amount: loan.amount, status: LoanStatuses.OFFERED })
  }
}

export default LoanDAL
