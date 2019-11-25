/* task1 */

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Input: ', answer => {
  console.log(
    `Output: ${answer
      .split('')
      .reverse()
      .join('')}`
  );

  rl.close();
});

/* task2 */
