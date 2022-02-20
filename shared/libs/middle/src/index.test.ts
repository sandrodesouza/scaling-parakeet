import { middle } from '.'

describe('middle', () => {
  it('run a dummy function and return 1', async () => {
    const dummyHandler = async (event, context) => {
      console.log('event', event)
      console.log('context', context)
      return 1
    }
    const middleHandler = await middle(dummyHandler, {})
    middleHandler({}, null, (err, res) => {
      expect(res).toEqual(1)
    })
  })
})
