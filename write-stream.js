const fs = require('fs');
const { Writable } = require('stream');

class WriteStream extends Writable {
  constructor(filename) {
    super();
    this.filename = filename;
  }

  _write(chunk, encoding, callback) {
    if(fs.existsSync(this.filename)){
      fs.appendFile(this.filename, chunk, callback);
    } else {
      process.stdout.write(chunk, callback)
    }
  }
  _destroy(err, callback) {
    if (this.fd) {
      fs.close(this.fd, (er) => callback(er || err));
    } else {
      callback(err);
    }
  }
}

module.exports = WriteStream;