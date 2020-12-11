/*!
 * Copyright (C) 2016-present, Yuansuan.cn
 */

module.exports = {
  rootDir: '.',
  roots: ['<rootDir>/src', '<rootDir>/tests'],
  setupFiles: ['<rootDir>/tests/setup.js'],
  testMatch: ['**/*.test.js'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.jsx?$': 'babel-jest',
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
}
