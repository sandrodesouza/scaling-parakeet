import { handler } from '.'

describe('rest controller :: loan', () => {
  it('matches snapshot', async () => {
    expect(await handler()).toBe(1)
  })
})
