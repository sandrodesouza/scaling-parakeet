import console from 'logger'
import { middle } from 'middle'

const baseHandler = async () => {
  console.log('hello world')
  return 1
}

export const handler = middle(baseHandler, {})
