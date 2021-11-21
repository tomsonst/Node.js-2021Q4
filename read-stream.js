const { Readable } = require('stream');
const fs = require('fs');

class ReadStream extends Readable {
  constructor(filename) {
    super();
    this.filename = filename;
    this.fd = null;
  }

  _read(n) {
    const buf = Buffer.alloc(n);
    if(fs.existsSync(this.filename)){
      fs.open(this.filename, (err, fd) => {
        this.fd = fd;
        if (err) {
          callback(err);
        } else {
          fs.read(fd, buf, 0, n, null, (err, bytesRead) => {
            if (err) {
              this.destroy(err);
            } else {
              this.push(bytesRead > 0 ? buf.slice(0, bytesRead) : null);
              this.push(null);
            }
          });
        }
      });
    } else {
      process.stdin.once('data', (chunk) => {
        this.push(chunk);
      });
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

module.exports = ReadStream;