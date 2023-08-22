// Функция проверки на паллиндром

function palindromeCheck(sameWord) {
  sameWord = sameWord.replaceAll(' ', '').toLowerCase();
      const LAST_INDEX = sameWord.length - 1;
      for (let i = 0; i < sameWord.length / 2; i++) {
           //console.log(sameWord[i]);
          //  console.log(sameWord[lastIndex - i]);
          if (sameWord[i] !== sameWord[LAST_INDEX - i]) {
              return false;
          }
      }
      return true;
  }
  palindromeCheck('топот твовт топоТ');


  // Функция, которая принимает строку, извлекает содержащиеся в ней цифры от 0 до 9 и возвращает их в виде целого положительного числа.

   function stringTransform (sameString) {
    sameString = sameString.replace(/[^0-9]+/g, '') || Math.abs(sameString);
  return Number(sameString);
   }
   console.log(stringTransform('tgerg ef -4543.6,4'));



  // Функция для проверки длины строки

  const CHECK_LENGTH = (enteredString, lengthLimit) => enteredString.length <= lengthLimit;

  CHECK_LENGTH('проверяемая строка', 20);
