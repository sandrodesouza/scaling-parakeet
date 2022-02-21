import { normalizeHttpResponse } from '../normalize-http-response'

export const processUnknownError = (request, error) => {
  const { message, statusCode, stack } = error
  console.error({ message, statusCode, stack })
  // Set default expose value, only passes in when there is an override
  if (error?.statusCode && error?.expose === undefined) {
    error.expose = error.statusCode < 500
  }
  // Non-http error OR expose set to false
  if (!error?.statusCode || !error?.expose) {
    error = {
      statusCode: 500,
      message: 'Internal Server Error',
      expose: true,
    }
  }
  if (error?.expose) {
    request.response = normalizeHttpResponse(request.response)
    request.response.statusCode = error?.statusCode
    request.response.body = JSON.stringify({ error: error?.message })
    request.response.headers['Content-Type'] = 'application/json'
    return request.response
  }
}
