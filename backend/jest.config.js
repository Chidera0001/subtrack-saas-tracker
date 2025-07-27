export default {
	testEnvironment: 'node',
	extensionsToTreatAsEsm: ['.js'],
	globals: {
		'ts-jest': {
			useESM: true,
		},
	},
	moduleNameMapper: {
		'^(\\.{1,2}/.*)\\.js$': '$1',
	},
	transform: {},
	preset: undefined,
	testMatch: ['**/__tests__/**/*.js'],
	collectCoverageFrom: ['**/*.js', '!**/node_modules/**', '!**/coverage/**'],
};
