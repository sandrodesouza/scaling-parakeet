import middy from '@middy/core'

export const middle = (handler, schema) => {
  return middy(handler)
}
