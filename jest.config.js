/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "babel",
  preset: 'ts-jest',
  testEnvironment: 'node',
};