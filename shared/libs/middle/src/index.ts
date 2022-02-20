import middy from '@middy/core'

export const middle = async (handler, schema) => {
  return await middy(handler)
}
