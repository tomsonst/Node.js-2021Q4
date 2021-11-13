const fs = require('fs');
const WriteStream = require('./write-Stream.js');
const ReadStream = require('./read-stream');
const TransformStream = require('./transform-stream');
const configArgs = process.argv;

const getIndexElement = (str) => {
  return configArgs.indexOf(str) + 1
}
const inputFileIndex = getIndexElement('-i') || getIndexElement('--input');
const outputFileIndex =  getIndexElement('-o') || getIndexElement('--output');
const configIndex = getIndexElement('-c') || getIndexElement('--config');

const inputPathType = inputFileIndex !== 0 ? configArgs[inputFileIndex] : null;
const outputPathType = outputFileIndex !== 0 ? configArgs[outputFileIndex] : null;
const config = configArgs[configIndex]

const input = new ReadStream(inputPathType);
const output = new WriteStream(outputPathType);
const transform = new TransformStream(config.split('-'));

input.pipe(transform).pipe(output);
