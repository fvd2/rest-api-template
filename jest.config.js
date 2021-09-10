module.exports = {
    preset: '@shelf/jest-mongodb',
    watchPathIgnorePatterns: ['globalConfig'],    
    setupFiles: ['<rootDir>/.jest/setEnvVars.js']
}