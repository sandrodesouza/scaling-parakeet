export const normalizeHttpResponse = (response) => {
  if (response === undefined) {
    response = {}
  } else if (Array.isArray(response) || typeof response !== 'object' || response === null) {
    response = { body: response }
  }
  response.headers = response?.headers ?? {}
  response.statusCode = response?.statusCode ?? 200
  return response
}
