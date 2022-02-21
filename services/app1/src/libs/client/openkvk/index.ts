import https from 'https'
import Errors from 'http-errors'

class OpenKvK {
  private apiKey: string
  private hostName: string

  constructor() {
    this.apiKey = String(process.env.OPEN_KVK_API_KEY)
    this.hostName = String(process.env.OPEN_KVK_HOSTNAME)
  }

  private makeRequest = async (options: object) => {
    const defaultOptions = {
      hostname: this.hostName,
      port: 443,
      headers: {
        'ovio-api-key': this.apiKey,
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
      request.on('error', (error) => {
        reject(error)
      })
      request.end()
    })
  }

  public getCompanyById = async ({ companyId }: { companyId: string }) => {
    const options = {
      path: `/openkvk/${companyId}`,
      method: 'GET',
    }
    // we should always return same object, what if the API service change?
    return await this.makeRequest(options).catch((error) => {
      console.error(error)
      const serviceUnavailable = new Errors.ServiceUnavailable()
      serviceUnavailable.expose = true
      throw serviceUnavailable
    })
  }
}

export default OpenKvK
