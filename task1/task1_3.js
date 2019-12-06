/* task1 */

import * as readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

process.stdout.write('Input: ');
rl.on('line', answer => {
  process.stdout.write(
    `Output: ${answer
      .split('')
      .reverse()
      .join('')}\n`
  );
  process.stdout.write('Input: ');
});

/* task2 */

import { createReadStream, createWriteStream } from 'fs';
import { csv } from 'csvtojson';

const readStream = createReadStream(
  './task1/csv/node_mentoring_t1_2_input_example.csv'
).on('error', error => {
  console.log(error);
});
const writeStream = createWriteStream('task1/output_by_task3.txt').on(
  'error',
  error => {
    console.log(error);
  }
);

readStream.pipe(csv()).pipe(writeStream);
