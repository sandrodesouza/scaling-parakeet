import { securityHeaders } from './security-headers'
import { cors } from './cors'
import { bodyParse } from './body-parse'
import { processUnknownError } from './unknown-error'
import { normalizeHttpResponse } from './normalize-http-response'
import { inputValidator, outputValidator } from './validator'

const doNotWaitForEmptyEventLoop = (context) => {
  context.callbackWaitsForEmptyEventLoop = false
  return context
}

export const middle = (baseHandler, schema) => {
  const instance = async (event = {}, context = {}) => {
    const request = {
      event,
      context,
      response: undefined,
      error: undefined,
      internal: {},
    }
    try {
      request.context = doNotWaitForEmptyEventLoop(request.context)
      bodyParse(request)
      await inputValidator(request.event, schema?.inputSchema)
      request.response = await baseHandler(request.event, request.context)
      request.response = normalizeHttpResponse(request.response)
      await outputValidator(request.response, schema?.outputSchema)
    } catch (error) {
      request.response = processUnknownError(request, error)
    } finally {
      securityHeaders(request.response.headers)
      cors(request.response.headers)
    }
    return request.response
  }
  return instance
}

export const responseHelper = (response = {}, statusCode = 200) => ({
  statusCode,
  body: JSON.stringify(response),
  headers: {
    ['Content-Type']: 'application/json',
  },
})
