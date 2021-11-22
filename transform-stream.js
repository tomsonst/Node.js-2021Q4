const { Transform } = require('stream');
const caesarChipher = require('./ciphers/caesar');
const atbashCipher = require('./ciphers/atbash');

class TransformStream extends Transform {
  constructor(conf) {
    super();
    this.conf = conf;
  }

  _transform(data, encoding, callback){
    let result = data.toString('utf8');
    this.conf.forEach(elem => {
      if(elem[0] === 'C'){
        if(elem[1] === '0'){
          result = caesarChipher(result, 1, 0);
        } else if(elem[1] === '1'){
          result = caesarChipher(result, 1, 1);
        }
      } else if(elem[0] === 'R'){
        if(elem[1] === '0'){
          result = caesarChipher(result, 8, 0);
        } else if(elem[1] === '1'){
          result = caesarChipher(result, 8, 1);
        }
      } else if(elem[0] === 'A'){
        result = atbashCipher(result);
      }
    });
    this.push(result);
    callback()
  }
}

module.exports = TransformStream;