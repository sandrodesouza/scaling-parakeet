const Errors = require('http-errors')
const Ajv = require('ajv')
const ajv = new Ajv({
  strict: true,
  coerceTypes: 'array', // important for query string params
  allErrors: true,
  useDefaults: 'empty',
})

export const inputValidator = (event, schema) => {
  if (!schema) return
  const inputSchema = ajv.compile(schema)
  const valid = inputSchema(event)
  if (!valid) {
    // Bad Request
    const error = new Errors.BadRequest(inputSchema.errors)
    throw error
  }
}

export const outputValidator = (response, schema) => {
  if (!schema) return
  const outputSchema = ajv.compile(schema)
  const valid = outputSchema({ ...response, body: JSON.parse(response?.body) })
  if (!valid) {
    const error = new Errors.InternalServerError()
    console.error(outputSchema.errors)
    throw error
  }
}
