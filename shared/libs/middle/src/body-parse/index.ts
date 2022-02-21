export const bodyParse = (request) => {
  const { body } = request.event
  try {
    const data = request.event.isBase64Encoded ? Buffer.from(body, 'base64').toString() : body
    request.event.rawBody = body
    request.event.body = JSON.parse(data)
  } catch (err) {}
}
