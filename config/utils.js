var path = require('path');

const PROJECT_ROOT = path.resolve(__dirname);
function projectDir(args) {
    Array.prototype.slice.call(arguments, 0);
    return path.join.apply(path, [PROJECT_ROOT].concat(args));
}

module.exports = {
    PROJECT_ROOT: PROJECT_ROOT,
    projectDir: projectDir
};
