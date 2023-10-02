/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  verbose: true,
  testEnvironment: 'jsdom',
  // setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect']
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  moduleDirectories: ['node_modules', 'src'],
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@helpers$': '<rootDir>/src/helpers/index.ts',
    '^@appTypes/(.*)$': '<rootDir>/src/types/$1',
    '\\.(css|scss)$': 'identity-obj-proxy',
  },
  transform: {
    '.+\\.(png|jpg|svg)$': 'jest-transform-stub',
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
    '.(ts|tsx)': 'ts-jest',
  },
};
