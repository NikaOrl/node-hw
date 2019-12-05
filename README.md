# node-hw

Do not forget to run <i>npm install</i> in the application directory

## Task 1

### TASK 1.1

Write a program which reads a string from the standard input stdin, reverses it and then writes it to the standard output stdout.

- The program should be running in a stand-by mode and should not be terminated after the
  first-string processing

The task is started by <i>npm run task1.1</i>

### TASK 1.2

Write a program which should do the following:

- Read the content of csv file from ./csv directory. Example: https://epa.ms/nodejs19-hw1-ex1
- Use the csvtojson package (https://github.com/Keyang/node-csvtojson) to convert csv file to json object.
- Write the csv file content to a new txt file.
  Use the following format: https://epa.ms/nodejs19-hw1-ex2.
- Do not load all the content of the csv file into RAM via stream (read/write file content line by line).
- In case of read/write errors, log them in the console.

The task is started by <i>npm run task1.2</i>

### TASK 1.3

Rewrite the above-mentioned programs to use babel (https://babeljs.io/) and ES6 modules.

The task is started by <i>npm run task1.3</i>
