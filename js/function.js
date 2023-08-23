// Функция проверки на паллиндром

function palindromeCheck(string) {
  sameWord = sameWord.replaceAll(' ', '').toLowerCase();
      const LAST_INDEX = sameWord.length - 1;
      for (let i = 0; i < sameWord.length / 2; i++) {
          if (sameWord[i] !== sameWord[LAST_INDEX - i]) {
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
   console.log(getNumberFromString('tgerg ef -4543.6,4'));

// Функция принимающая три параметра и возвращающая исходную строку, дополненную указанными символами до заданной длины

   const MAKE_NEW_STRING = (string, maxLength, symbol) => {
    const DIFFERENCE = maxLength - string.length;

    let newString = ''.concat(string);
    let newSymbol = symbol;

    if (string.length >= maxLength) {
      return string;
    } else if (symbol.length >= DIFFERENCE) {
      newSymbol = symbol.substr(0, DIFFERENCE);
      newString = newSymbol.concat(string);
      return newString;
    }
    newSymbol = symbol.slice(0, DIFFERENCE % symbol.length) + symbol.repeat(DIFFERENCE / symbol.length);
    newString = newSymbol.concat(string);
    return newString;
  };
  MAKE_NEW_STRING('q', 4, 'werty');


  // Функция для проверки длины строки

  const CHECK_LENGTH = (enteredString, lengthLimit) => enteredString.length <= lengthLimit;

  CHECK_LENGTH('проверяемая строка', 20);
