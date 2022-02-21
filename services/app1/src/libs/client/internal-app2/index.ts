import https from 'https'
import Errors from 'http-errors'

class InternalAPP2 {
  private apiKey: string
  private hostName: string
  private pathPrefix: string

  constructor() {
    this.apiKey = String(process.env.INTERNAL_APP2_API_KEY) // we dont know this value yet, we can use secrets or wait for app2 deployment output
    this.hostName = String(process.env.INTERNAL_APP2_HOSTNAME) // we dont know this value yet, we can use domains or wait for app2 deployment output
    this.pathPrefix = String(process.env.INTERNAL_APP2_PATH_PREFIX) // maybe we need to define a stage
  }

  private makeRequest = async (options: object, postBody?: string) => {
    const defaultOptions = {
      hostname: this.hostName,
      path: this.pathPrefix + options?.path,
      port: 443,
      headers: {
        'x-api-key': this.apiKey,
      },
      timeout: 2000,
      ...options,
    }
    return await new Promise((resolve, reject) => {
      const request = https.request(defaultOptions, (response) => {
        let data = ''
        response.on('data', (chunk) => {
          data += chunk.toString()
        })
        response.on('end', () => {
          const body = JSON.parse(data)
          resolve(body)
        })
      })
      if (postBody) {
        request.write(postBody)
      }
      request.on('error', (error) => {
        reject(error)
      })
      request.end()
    })
  }

  public requestLoanDisburse = async ({ id }: { id: string }) => {
    const postBody = JSON.stringify({ id })
    const options = {
      path: `/disburse`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': postBody.length,
      },
    }
    return await this.makeRequest(options, postBody).catch((error) => {
      console.error(error)
      const serviceUnavailable = new Errors.ServiceUnavailable()
      serviceUnavailable.expose = true
      throw serviceUnavailable
    })
  }
}

export default InternalAPP2
