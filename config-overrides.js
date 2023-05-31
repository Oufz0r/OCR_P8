const crypto = require.resolve('crypto-browserify');
const stream = require.resolve('stream-browserify');
const buffer = require.resolve('buffer/');

module.exports = {
    webpack: (config, env) => {
        // Ajoutez la résolution des modules crypto, stream et buffer
        config.resolve.fallback = {
            crypto,
            stream,
            buffer,
        };
        
        return config;
    },
    resolve: {
        fallback: {
            stream: require.resolve('stream-browserify')
        }
    }
};