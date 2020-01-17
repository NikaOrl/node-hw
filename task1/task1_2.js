const fs = require('fs');
const csv = require('csvtojson');
const csvFilePath = './task1/csv/node_mentoring_t1_2_input_example.csv';

csv()
  .fromFile(csvFilePath)
  .then(jsonArray => {
    fs.writeFile(
      'task1/output_by_task2.txt',
      jsonArray.map(item => JSON.stringify(item)).join('\n'),
      err => {
        if (err) {
          console.log(err);
          throw err;
        }
        console.log('Saved!');
      }
    );
  })
  .catch(err => console.log(err));
