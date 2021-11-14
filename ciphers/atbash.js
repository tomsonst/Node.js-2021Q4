function atbashCipher(str){
  const arrStr = str.split('');
  const result = arrStr.map((elem) => {
  
    const codeElem = elem.charCodeAt();
    if(codeElem >=65 && codeElem <= 90){
      let newCodeElem;
      newCodeElem = 90 - (codeElem - 65);
      return String.fromCharCode(newCodeElem)
    } else if(codeElem >=97 && codeElem <= 122){
      let newCodeElem;
      newCodeElem = 122 - (codeElem - 97);
      return String.fromCharCode(newCodeElem)
    }

    return elem
  })
  return result.join('');
}

module.exports = atbashCipher;