jest.mock('@libs/client/internal-app2', () => {
  return jest.fn().mockImplementation(() => {
    return {
      requestLoanDisburse: () => {},
    }
  })
})
