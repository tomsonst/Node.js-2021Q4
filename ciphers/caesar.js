function caesarChipher(str, offset, directon){
  const arrStr = str.split('');
  const result = arrStr.map((elem) => {
  
    const codeElem = elem.charCodeAt();
    if(codeElem >=65 && codeElem <= 90){
      let newCodeElem;
      if(directon){
        newCodeElem = (codeElem + offset);
        newCodeElem = newCodeElem > 90 ? newCodeElem - 26 : newCodeElem;
      } else {
        newCodeElem = codeElem - offset;
        newCodeElem = newCodeElem < 65 ? newCodeElem + 26 : newCodeElem;
      }
      return String.fromCharCode(newCodeElem)
    } else if(codeElem >=97 && codeElem <= 122){
      let newCodeElem;
      if(directon){
        newCodeElem = codeElem + offset;
        newCodeElem = newCodeElem > 122 ? newCodeElem - 26 : newCodeElem;
      } else {
        newCodeElem = codeElem - offset;
        newCodeElem = newCodeElem < 97 ? newCodeElem + 26 : newCodeElem;
      }
      return String.fromCharCode(newCodeElem)
    }

    return elem
  })
  return result.join('');
}

module.exports = caesarChipher;
