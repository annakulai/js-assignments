/**
 * Takes two strings including only letters from a to z.
 * Returns a new sorted string containing distinct letters.
 *
 * @param {string} value1
 * @param {string} value2
 * @return {string}
 *
 * @example
 *   'azy', 'bk' => 'abkyz'
 *   'zxxlal','laxk'    => 'aklxz'
 *   'abcdefghijklmnop',  'lmnopqrstuvwxyz'  => 'abcdefghijklmnopqrstuvwxyz'
 */
function distinctLettersString(value1, value2) {
  return [...new Set([...value1, ...value2].sort())].join('');
}

/**
 * Takes a string with any characters.
 * Returns an object containing appearence of every distinct letters in lower case.
 *
 * @param {string} value
 * @return {Object}
 *
 * @example
 *  'Who you are, Buddy?' => { a:1, d:2, e:1, h:1, o:2, r:1, u:2, y:2 }
 *
 */

function lowerLetters(value) {
  return value.replace(/[^a-z]/g, '').split('').sort().reduce((acc, el) => {
    acc[el] = acc[el] + 1 || 1;
    return acc;
  }, {});
}

/**
 * Write a function that will convert a string into title case, given an optional
 * list of exception (minor words). The list of minor words will be given as a
 * string with each word separated by a space. Your function should ignore the
 * case of the minor words string - it should behave in the same way even if the
 * case of the minor word is changed
 *
 * @param {string} the original string to be converted
 * @param {string} list of minor words that must always be lowercase except for
 *                  the first word in the string
 * @return {string}
 *
 * @example
 *    'a clash if KINGS', 'a an the of'  =>  'A Clash of Kings'
 *    'THE WIND IN THE WILLOWS', 'The In'  => 'The Wind in the Willows'
 *    'the quick brown fox'  => 'The Quick Brown Fox'
 */

function titleCaseConvert(title, minorWords) {
  const transformToArray = str => str.toLowerCase().split(' ');
  const minorArray = !minorWords ? [] : transformToArray(minorWords);
  const minorTitle = transformToArray(title);
  const capitalize = x => x[0].toUpperCase() + x.slice(1);

  return minorTitle.reduce((acc, x, i) => {
    if (minorArray.includes(x) && i > 0) {
      acc.push(x);
    } else {
      acc.push(capitalize(x));
    }
    return acc;
  }, []).join(' ');
}

/**
 * Your job is to create a calculator which evaluates expressions in Reverse Polish
 * notation (https://en.wikipedia.org/wiki/Reverse_Polish_notation). Empty expression
 * should evaluate to 0. Expression without operation returns the last number.
 *
 * @param {string} RPN string, each number and operation separated by a space
 *
 * @return {Number}
 *
 * @example
 *  ''  =>  0  // empty expression returns 0
 *  '1 2 3'  =>  3  // expression without operation returns the last number
 *  '4 2 +'  =>  6  // 4 + 2
 *  '2 5 * 2 + 3 /'  =>  4   //  ((5 * 2) + 2) / 3
 *  '5 1 2 + 4 * + 3 -'  =>  14   // 5 + ((1 + 2) * 4) -3
 */

function calcRPN(expression) {
  const expr = expression.split(' ');
  const stack = [];
  if (expr === '') {
    return 0;
  }

  for (let i = 0; i < expr.length; i++) {
    if (!isNaN(expr[i]) && isFinite(expr[i])) {
      stack.push(expr[i]);

    } else {
      const a = stack.pop();
      const b = stack.pop();
      if (expr[i] === '+') {
        stack.push(parseInt(a) + parseInt(b));
      } else if (expr[i] === '-') {
        stack.push(parseInt(b) - parseInt(a));
      } else if (expr[i] === '*') {
        stack.push(parseInt(a) * parseInt(b));
      } else if (expr[i] === '/') {
        stack.push(parseInt(b) / parseInt(a));
      }
    }
  }

  return (stack.length > 1) ? stack[stack.length - 1] : stack[0];
}

module.exports = {
  distinctLettersString,
  lowerLetters,
  titleCaseConvert,
  calcRPN
};
