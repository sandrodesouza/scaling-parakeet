module.exports = {
  testEnvironment: 'jest-dynalite/environment',
  collectCoverage: true,
  collectCoverageFrom: ['./src/**/*.{js,ts}'],
  coverageThreshold: {
    global: {
      branches: 85,
      functions: 85,
      lines: 85,
      statements: 85,
    },
  },
  transform: {
    '^.+\\.tsx?$': 'esbuild-jest',
  },
}
