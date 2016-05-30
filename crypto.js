/// This is a temporary file to fix a problem with the systemjs module loader.
/// The reflect-metadata package considers itself to be in a node.js environment, so thinks it can load crypto.js
/// This is what it gets instead
/// See `https://github.com/angular/angular/issues/4999`

module.exports = false;
