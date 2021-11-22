const fs = require('fs');
const WriteStream = require('./write-Stream.js');
const ReadStream = require('./read-stream');
const TransformStream = require('./transform-stream');
const ValidationError = require('./validation-error');
const validate = require('./validation');

const runApp = () => {
  const configArgs = process.argv;
  const {inputPathType, outputPathType, config} = validate(configArgs);

  const input = new ReadStream(inputPathType);
  const output = new WriteStream(outputPathType);
  const transform = new TransformStream(config);
  
  input.pipe(transform).pipe(output);
}

runApp();

module.exports = runApp;