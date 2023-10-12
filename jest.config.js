const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/app/$1',
    '^@components/(.*)$': '<rootDir>/app/_components/$1',
    '^@context/(.*)$': '<rootDir>/app/_context/$1',
    '^@functions/(.*)$': '<rootDir>/app/_functions/$1',
    '^@types/(.*)$': '<rootDir>/app/_types/$1'
  },
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
