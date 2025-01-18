/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+.tsx?$": ["ts-jest",{}],
  },
  roots: [
    '<rootDir>/src'
  ],
  moduleNameMapper: {
    '@lib/(.*)': '<rootDir>/src/lib/$1',
    '@type/(.*)': '<rootDir>/src/types/$1',
    '@files/(.*)': '<rootDir>/src/files/$1'
  }
};