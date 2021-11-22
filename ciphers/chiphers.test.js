const atbashCipher = require('./atbash');
const caesarChipher = require('./caesar');

const mockString = 'This is secret. Message about "_" symbol!';
const result = 'Uijt jt tfdsfu. Nfttbhf bcpvu \"_\" tzncpm!';

describe('Atbash cipher', () => {
  test('return correct values', () => {
    expect(atbashCipher('ABC')).toEqual('ZYX');
    expect(atbashCipher('abc')).toEqual('zyx');
    expect(atbashCipher(mockString)).toEqual('Gsrh rh hvxivg. Nvhhztv zylfg \"_\" hbnylo!');
  });
});

describe('Caesar cipher', () => {
  test('return correct values', () => {
    expect(caesarChipher('ABC', 1, 1)).toEqual('BCD');
    expect(caesarChipher('abc', 8, 0)).toEqual('stu');
    expect(caesarChipher(mockString, 1, 1)).toEqual(result);
    expect(caesarChipher(result, 1, 0)).toEqual(mockString);
  });
});