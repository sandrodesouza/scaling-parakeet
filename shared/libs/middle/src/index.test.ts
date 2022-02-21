import { middle, responseHelper } from '.'

describe('middle', () => {
  it('run a dummy function and return json', async () => {
    const dummyHandler = async (event, context) => {
      console.log('event', event)
      console.log('context', context)
      return responseHelper({ message: 'test' })
    }
    const middleHandler = middle(dummyHandler, {})
    const response = await middleHandler({ body: '' }, {})
    console.log('response', response)
    expect(JSON.parse(response.body)).toStrictEqual({ message: 'test' })
    expect(response.statusCode).toBe(200)
  })

  it('run a dummy function and return object', async () => {
    const dummyHandler = async (event, context) => {
      console.log('event', event)
      console.log('context', context)
      return responseHelper({ message: 'ok' })
    }
    const middleHandler = middle(dummyHandler, {})
    const response = await middleHandler({ body: '' }, {})
    console.log('response', response)
    expect(JSON.parse(response.body)).toStrictEqual({ message: 'ok' })
    expect(response.statusCode).toBe(200)
  })

  it('run a dummy function and return failure', async () => {
    const dummyHandler = async (event, context) => {
      throw new Error('bu')
    }
    const middleHandler = middle(dummyHandler, {})
    const response = await middleHandler({ body: '' }, {})
    console.log('response', response)
    expect(response.statusCode).toBe(500)
    expect(JSON.parse(response.body)).toStrictEqual({ error: 'Internal Server Error' })
  })

  it('run a dummy function with schema validator', async () => {
    const dummyHandler = async (event, context) => {
      return responseHelper({ hello: 'world' })
    }
    const middleHandler = middle(dummyHandler, {
      inputSchema: {
        type: 'object',
        properties: {
          body: {
            type: 'object',
            properties: {
              id: {
                type: 'string',
                minLength: 1,
              },
            },
            required: ['id'],
          },
        },
      },
    })
    const response = await middleHandler({ body: { id: 'text' } }, {})
    console.log('response', response)
    expect(response.statusCode).toBe(200)
    expect(JSON.parse(response.body)).toStrictEqual({ hello: 'world' })
  })

  it('run a dummy function with schema validator and fails', async () => {
    const dummyHandler = async (event, context) => {
      return responseHelper({ hello: 'world' })
    }
    const middleHandler = middle(dummyHandler, {
      inputSchema: {
        type: 'object',
        properties: {
          body: {
            type: 'object',
            properties: {
              id: {
                type: 'string',
                minLength: 1,
              },
            },
            required: ['id'],
          },
        },
      },
    })
    const response = await middleHandler({ body: '' }, {})
    console.log('response', response)
    expect(response.statusCode).toBe(400)
    expect(JSON.parse(response.body)).toStrictEqual({
      error: [
        {
          instancePath: '/body',
          schemaPath: '#/properties/body/type',
          keyword: 'type',
          params: { type: 'object' },
          message: 'must be object',
        },
      ],
    })
  })
})
