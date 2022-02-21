jest.mock('@libs/client/internal-app2', () => {
  return jest.fn().mockImplementation(() => {
    return {
      requestLoanDisburse: ({ id }: { id: string }) => ({
        statusCode: 200,
        body: `{"id":"${id}","status":"disbursed"}`,
        headers: {
          'Cache-Control': 'no-store',
          'Content-Security-Policy': "frame-ancestors 'none'",
          'Strict-Transport-Security': 'max-age=15552000; includeSubDomains; preload',
          'X-Content-Type-Options': 'nosniff',
          'X-Frame-Options': 'DENY',
          'Access-Control-Allow-Origin': '*',
        },
      }),
    }
  })
})
