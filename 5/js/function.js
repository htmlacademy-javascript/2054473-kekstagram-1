// Функция проверки на паллиндром
function palindromeCheck(string) {
  string = string.replaceAll(' ', '').toLowerCase();
  const LAST_INDEX = string.length - 1;
  for (let i = 0; i < string.length / 2; i++) {
    if (string[i] !== string[LAST_INDEX - i]) {
      return false;
    }
  }
  return true;
}
palindromeCheck('топот твовт топоТ');

// Функция, которая принимает строку, извлекает содержащиеся в ней цифры от 0 до 9 и возвращает их в виде целого положительного числа
function getNumberFromString (sameString) {
  sameString = sameString.replace(/[^0-9]+/g, '') || Math.abs(sameString);
  return Number(sameString);
}
getNumberFromString('tgerg ef -4543.6,4');

// Функция принимающая три параметра и возвращающая исходную строку, дополненную указанными символами до заданной длины
const makeNewString = (string, maxLength, symbol) => {
  const difference = maxLength - string.length;
  let newString = ''.concat(string);
  let newSymbol = symbol;
  if (string.length >= maxLength) {
    return string;
  } else if (symbol.length >= difference) {
    newSymbol = symbol.substr(0, difference);
    newString = newSymbol.concat(string);
    return newString;
  }
  newSymbol = symbol.slice(0, difference % symbol.length) + symbol.repeat(difference / symbol.length);
  newString = newSymbol.concat(string);
  return newString;
};
makeNewString('q', 4, 'werty');

// Функция для проверки длины строки
const checkLength = (enteredString, lengthLimit) => enteredString.length <= lengthLimit;
checkLength('проверяемая строка', 20);
