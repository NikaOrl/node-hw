# node-hw

Do not forget to run <i>npm install</i> in the application directory

## To create DB follow the next steps (for Mac):

#### If you’re using Windows, download a [Windows installer](https://www.postgresql.org/download/windows/) of PostgreSQL and follow the steps from 3.

1. Open up the Terminal and install postgresql with brew.

```shell
brew install postgresql
```

2. After the installation is complete, we’ll want to get the postgresql up and running, which we can do with `services start`:

```shell
brew services start postgresql
==> Successfully started `postgresql` (label: homebrew.mxcl.postgresql)
```

If at any point you want to stop the postgresql service, you can run `brew services stop postgresql`.

PostgreSQL is installed now, so the next step is to connect to the postgres command line, where we can run SQL commands.

psql is the PostgreSQL interactive terminal. Running psql will connect you to a PostgreSQL host. Running `psql --help` will give you more information about the available options for connecting with psql.

3. Connect to the default postgres database with the default login information – no option flags.

```shell
psql postgres
```

4. Now let's create the DB in the terminal inside psql in the postgres database by

```shell
CREATE DATABASE pg_db;
```

5. In the root folder (node-hw/) create a file with a name `db.config.ts` and add the following code inside of it

```shell
export const options = {
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'YOUR_USERNAME',
    database: 'pg_db'
  }
};
```

You can check your 'YOUR_USERNAME' by the command `\list` in the terminal inside psql in the postgres database
You'll see sth like

```shell
pg_db=# \list
                             List of databases
   Name    |     Owner     | Encoding | Collate | Ctype |   Access privileges
-----------+---------------+----------+---------+-------+-----------------------
 pg_db     | YOUR_USERNAME | UTF8     | C       | C     |
```

6. Create the 'users' table and generate data in it by

```shell
npm run gen_table
```

Now you have the table w/ all the test data. You can check it by the commands `\c pg_db` and `SELECT * FROM users;` in the terminal inside psql in the postgres database. You'll see sth like

```shell
pg_db=# SELECT * FROM users;
                  id                  |      login      | password | age | isDeleted
--------------------------------------+-----------------+----------+-----+-----------
 02f85eb0-407e-11ea-b467-d7f6bf5cef68 | ivan@stud.com   | password |  20 | f
 02f85eb1-407e-11ea-b467-d7f6bf5cef68 | petr@stud.com   | password |  20 | f
 02f85eb2-407e-11ea-b467-d7f6bf5cef68 | vasia@stud.com  | password |  20 | f
 02f85eb3-407e-11ea-b467-d7f6bf5cef68 | serg@stud.com   | password |  20 | f
 02f85eb4-407e-11ea-b467-d7f6bf5cef68 | tolya@stud.com  | password |  20 | f
 02f85eb5-407e-11ea-b467-d7f6bf5cef68 | andrei@stud.com | password |  20 | f
 02f85eb6-407e-11ea-b467-d7f6bf5cef68 | sachar@stud.com | password |  20 | f
 02f85eb7-407e-11ea-b467-d7f6bf5cef68 | kostya@stud.com | password |  20 | f
 02f85eb8-407e-11ea-b467-d7f6bf5cef68 | kolya@stud.com  | password |  20 | f
 02f85eb9-407e-11ea-b467-d7f6bf5cef68 | anton@stud.com  | password |  20 | f
```

## Task 1

### TASK 1.1

Write a program which reads a string from the standard input stdin, reverses it and then writes it to the standard output stdout.

- The program should be running in a stand-by mode and should not be terminated after the
  first-string processing

The task could be started by <i>npm run task1.1</i>

### TASK 1.2

Write a program which should do the following:

- Read the content of csv file from ./csv directory. Example: https://epa.ms/nodejs19-hw1-ex1
- Use the csvtojson package (https://github.com/Keyang/node-csvtojson) to convert csv file to json object.
- Write the csv file content to a new txt file.
  Use the following format: https://epa.ms/nodejs19-hw1-ex2.
- Do not load all the content of the csv file into RAM via stream (read/write file content line by line).
- In case of read/write errors, log them in the console.

The task could be started by <i>npm run task1.2</i>

### TASK 1.3

Rewrite the above-mentioned programs to use babel (https://babeljs.io/) and ES6 modules.

The task could be started by <i>npm run task1.3</i>

## Task 2

The task could be started by <i>npm run task2</i>

### TASK 2.1

Write a simple REST service withCRUD operations for User entity.

- To create REST service,use ExpressJS (https://expressjs.com/)
- Service should have the following CRUD operations for User:

  - get user by id;
  - create and update user;
  - get auto-suggest list from limitusers, sorted by login property and filtered by loginSubstringin the login property
  - remove user (soft delete–user gets marked with isDeletedflag, but not removed from the collection).

- Store user’scollection in the service memory (while the service is running).

### TASK 2.2

Add server-side validation for create/update operations of Userentity:

- all fields are required;
- login validationis required;
- password must contain letters and numbers;
- user’s age must be between 4 and 130.

In case of any property does not meet the validation requirements or the field is absent, return 400 (Bad Request) and detailed error message. For requests validation use special packages like joi.

## Task 3
