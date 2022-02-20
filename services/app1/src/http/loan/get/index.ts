// import console from 'logger'
import { middle } from 'middle'

const baseHandler = async () => {
  return 1
}

export const handler = middle(baseHandler, {})
