module.exports = options => {
    const { gulp } = options;
    const Server   = require('karma').Server;

    return {
        all: done => {
            new Server({
                configFile: __dirname + '/../karma.js',
                singleRun: true
            }, done).start();
        }
    };
};
