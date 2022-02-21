module.exports = {
  testEnvironment: 'jest-dynalite/environment',
  setupFilesAfterEnv: ['jest-dynalite/setupTables', 'jest-dynalite/clearAfterEach'],
  collectCoverage: true,
  // collectCoverageFrom: ['./src/**/*.{js,ts}'],
  // coverageThreshold: {
  //   global: {
  //     branches: 85,
  //     functions: 85,
  //     lines: 85,
  //     statements: 85,
  //   },
  // },
  transform: {
    '^.+\\.tsx?$': 'esbuild-jest',
  },
  transformIgnorePatterns: ['node_modules/(?!logger|middle)'],
  moduleNameMapper: {
    '@libs/(.*)': '<rootDir>/src/libs/$1',
  },
  setupFiles: ['<rootDir>/.jest/setupEnv.js'],
}
