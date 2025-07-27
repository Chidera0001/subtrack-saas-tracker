export default {
	testEnvironment: 'node',
	transform: {
		'^.+\\.jsx?$': 'babel-jest',
	},
	moduleNameMapper: {
		'^(\\.{1,2}/.*)\\.js$': '$1',
	},
	testMatch: ['**/__tests__/**/*.js'],
	collectCoverageFrom: ['**/*.js', '!**/node_modules/**', '!**/coverage/**'],
};
