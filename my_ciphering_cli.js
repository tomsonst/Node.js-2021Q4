const fs = require('fs');
const WriteStream = require('./write-Stream.js');
const ReadStream = require('./read-stream');
const TransformStream = require('./transform-stream');
const ValidationError = require('./validation-error');
const configArgs = process.argv;

const getIndexElement = (str) => {
  return configArgs.indexOf(str) + 1
}
const inputFileIndex = getIndexElement('-i') || getIndexElement('--input');
const outputFileIndex =  getIndexElement('-o') || getIndexElement('--output');
const configIndex = getIndexElement('-c') || getIndexElement('--config');

const amountConfigFlags = configArgs.filter((elem) => {return elem === '-c' || elem === '--config'}).length;
const amountInputFileFlags = configArgs.filter((elem) => {return elem === '-i' || elem === '--input'}).length;
const amountOutputFlags = configArgs.filter((elem) => {return elem === '-o' || elem === '--output'}).length;

const config = configArgs[configIndex].split('-');

const inputPathType = inputFileIndex !== 0 ? configArgs[inputFileIndex] : null;
const outputPathType = outputFileIndex !== 0 ? configArgs[outputFileIndex] : null;

try{
  if(!configIndex) {
    throw new ValidationError('Enter the config using flag "-c" of "--config" in the format "{XY(-)}n"');
  } else if (amountConfigFlags > 1 || amountInputFileFlags > 1 || amountOutputFlags > 1){
    throw new ValidationError('Duplicate elements are not allowed');
  }
  
  for(let elem of config) {
    if(elem.length > 2 || elem.length < 1){
      throw new ValidationError('Enter the config in the format "{XY(-)}n"');
    } else if(elem[0] !== 'A' && elem[0] !== 'C' && elem[0] !== 'R'){
      throw new ValidationError('The first argument can be "A" or "C" or "R"');
    } else if(elem[0] === 'A' && elem.length > 1){
      throw new ValidationError('The "A" argument is used without a second argument');
    } else if((elem[0] === 'C' || elem[0] === 'R') && elem.length === 1){
      throw new ValidationError('With "C" or "R" use the second argument');
    }else if((elem[0] === 'C' || elem[0] === 'R') && (elem[1] !== '1' && elem[1] !== '0')){
      throw new ValidationError('The second argument in "R" or "C" can be 0 or 1');
    }
  }
  
  if(inputFileIndex && !fs.existsSync(inputPathType)) {
    throw new ValidationError('Enter correct path to input file')
  } else if(outputFileIndex && !fs.existsSync(outputPathType)){
    throw new ValidationError('Enter correct path to output file')
  }
} catch(err){
  return process.stderr.write(err.message)
}

const input = new ReadStream(inputPathType);
const output = new WriteStream(outputPathType);
const transform = new TransformStream(config);

input.pipe(transform).pipe(output);