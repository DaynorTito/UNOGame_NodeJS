export default {
    transform: {
      '^.+\\.jsx?$': 'babel-jest',
    },
    collectCoverage: true,
    coverageDirectory: 'coverage',
    coverageReporters: ['json', 'lcov', 'text', 'clover'],
};