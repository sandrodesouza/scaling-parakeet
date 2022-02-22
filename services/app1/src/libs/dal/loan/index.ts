import Joi from 'joi'
import dynamo from '@libs/aws/dynamo'
import Errors from 'http-errors'

export const LoanStatuses = {
  OFFERED: 'offered',
  DISBURSED: 'disbursed',
}

const CompanySchema = {
  id: Joi.string().required(),
  BTW: Joi.string(),
  LEI: Joi.string(),
  RSIN: Joi.string(),
  actief: Joi.boolean(),
  bestaandehandelsnaam: Joi.array(),
  dossiernummer: Joi.string(),
  handelsnaam: Joi.string(),
  huisnummer: Joi.string(),
  locatie: {
    lat: Joi.string(),
    lon: Joi.string(),
  },
  pand_id: Joi.string(),
  plaats: Joi.string(),
  postcode: Joi.string(),
  sbi: Joi.array(),
  statutairehandelsnaam: Joi.array(),
  straat: Joi.string(),
  subdossiernummer: Joi.string(),
  type: Joi.string(),
  vbo_id: Joi.string(),
  vestigingsnummer: Joi.string(),
}

const LoanSchema = {
  tableName: process.env.LOAN_DYNAMO_TABLE,
  hashKey: 'id',
  timestamps: true,
  schema: {
    id: dynamo.types.uuid(),
    amount: Joi.number().required(),
    status: Joi.string(),
    company: CompanySchema,
  },
}

class LoanDAL {
  private client
  constructor() {
    this.client = dynamo.define('Loan', LoanSchema)
  }

  create = async (loan: { amount: number; company: object }) => {
    return await this.client.create({
      amount: loan.amount,
      status: LoanStatuses.OFFERED,
      company: loan.company,
    })
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
  getById = async ({ id }) => {
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
