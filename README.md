# node-hw

Do not forget to run <i>npm install</i> in the application directory

## To create DB follow the next steps (for Mac):

#### If you’re using Windows, download a [Windows installer](https://www.postgresql.org/download/windows/) of PostgreSQL and follow the steps from 3.

1. Open up the Terminal and install postgresql with brew.

```shell
brew install postgresql
```

2. After the installation is complete, we’ll want to get the postgresql up and
   running, which we can do with `services start`:

```shell
brew services start postgresql
==> Successfully started `postgresql` (label: homebrew.mxcl.postgresql)
```

If at any point you want to stop the postgresql service, you can run
`brew services stop postgresql`.

PostgreSQL is installed now, so the next step is to connect to the postgres
command line, where we can run SQL commands.

psql is the PostgreSQL interactive terminal. Running psql will connect you to a
PostgreSQL host. Running `psql --help` will give you more information about the
available options for connecting with psql.

3. Connect to the default postgres database with the default login information –
   no option flags.

```shell
psql postgres
```

4. Now let's create the DB in the terminal inside psql in the postgres database
   by

```shell
CREATE DATABASE pg_db;
```

5. In the root folder (node-hw/) create a file with a name `db.config.ts` and
   add the following code inside of it

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

You can check your 'YOUR_USERNAME' by the command `\list` in the terminal inside
psql in the postgres database You'll see sth like

```shell
pg_db=# \list
                             List of databases
   Name    |     Owner     | Encoding | Collate | Ctype |   Access privileges
-----------+---------------+----------+---------+-------+-----------------------
 pg_db     | YOUR_USERNAME | UTF8     | C       | C     |
```

6. Create the 'users', the 'groups' and the 'usergroup' tables and generate data
   in it by

```shell
npm run db:seed
```

Now you have the tables w/ all the test data. You can check it by the commands

```shell
\c pg_db
```

and `SELECT * FROM users;` / `SELECT * FROM groups;` /
`SELECT * FROM usergroup;` in the terminal inside psql in the postgres database.
You'll see sth like

```shell
pg_db=# SELECT * FROM users;
                  id                  |      login      | password | age | isDeleted | token
--------------------------------------+-----------------+----------+-----+-----------+-------
 2f85eb0-407e-11ea-b467-d7f6bf5cef68  | ivan@stud.com   | password |  20 | f         |
 2f85eb5-407e-11ea-b467-d7f6bf5cef68  | andrei@stud.com | password |  20 | f         |
 02f85eb6-407e-11ea-b467-d7f6bf5cef68 | sachar@stud.com | password |  20 | f         |
 02f85eb4-407e-11ea-b467-d7f6bf5cef68 | tolya@stud.com  | password |  20 | f         |
 02f85eb3-407e-11ea-b467-d7f6bf5cef68 | serg@stud.com   | password |  20 | f         |
 02f85eb7-407e-11ea-b467-d7f6bf5cef68 | kostya@stud.com | password |  20 | f         |
 02f85eb1-407e-11ea-b467-d7f6bf5cef68 | petr@stud.com   | password |  20 | f         |
 02f85eb8-407e-11ea-b467-d7f6bf5cef68 | kolya@stud.com  | password |  20 | f         |
 02f85eb9-407e-11ea-b467-d7f6bf5cef68 | anton@stud.com  | password |  20 | f         |
 2f85eb2-407e-11ea-b467-d7f6bf5cef68  | vasia@stud.com  | password |  20 | f         |


pg_db=# SELECT * FROM groups;
                  id                  |  name  |         permissions
--------------------------------------+--------+-----------------------------
 ca2278d0-4b38-11ea-9d6c-e99a947f6918 | group1 | {READ}
 ca2278d1-4b38-11ea-9d6c-e99a947f6918 | group2 | {WRITE,DELETE}
 ca2278d3-4b38-11ea-9d6c-e99a947f6918 | group4 | {WRITE,UPLOAD_FILES,DELETE}
 ca2278d2-4b38-11ea-9d6c-e99a947f6918 | group3 | {READ,SHARE}


pg_db=# SELECT * FROM usergroup;
                  id                  |                userId                |               groupId
--------------------------------------+--------------------------------------+--------------------------------------
 3b908010-4b3f-11ea-9535-395fa2417949 | 02f85eb0-407e-11ea-b467-d7f6bf5cef68 | ca2278d0-4b38-11ea-9d6c-e99a947f6918
 3b90ce30-4b3f-11ea-9535-395fa2417949 | 02f85eb1-407e-11ea-b467-d7f6bf5cef68 | ca2278d0-4b38-11ea-9d6c-e99a947f6918
 3b90ce31-4b3f-11ea-9535-395fa2417949 | 02f85eb2-407e-11ea-b467-d7f6bf5cef68 | ca2278d0-4b38-11ea-9d6c-e99a947f6918
 3b90ce32-4b3f-11ea-9535-395fa2417949 | 02f85eb0-407e-11ea-b467-d7f6bf5cef68 | ca2278d1-4b38-11ea-9d6c-e99a947f6918
 3b90ce35-4b3f-11ea-9535-395fa2417949 | 02f85eb9-407e-11ea-b467-d7f6bf5cef68 | ca2278d3-4b38-11ea-9d6c-e99a947f6918
 3b90ce36-4b3f-11ea-9535-395fa2417949 | 02f85eb9-407e-11ea-b467-d7f6bf5cef68 | a2278d2-4b38-11ea-9d6c-e99a947f6918
 3b90ce34-4b3f-11ea-9535-395fa2417949 | 02f85eb9-407e-11ea-b467-d7f6bf5cef68 | ca2278d1-4b38-11ea-9d6c-e99a947f6918
 3b90ce33-4b3f-11ea-9535-395fa2417949 | 02f85eb7-407e-11ea-b467-d7f6bf5cef68 | ca2278d1-4b38-11ea-9d6c-e99a947f6918
```

\* 7. To clear db use script

```shell
npm run db:clear
```

## Task 1

### TASK 1.1

Write a program which reads a string from the standard input stdin, reverses it
and then writes it to the standard output stdout.

- The program should be running in a stand-by mode and should not be terminated
  after the first-string processing

The task could be started by <i>npm run task1.1</i>

### TASK 1.2

Write a program which should do the following:

- Read the content of csv file from ./csv directory. Example:
  https://epa.ms/nodejs19-hw1-ex1
- Use the csvtojson package (https://github.com/Keyang/node-csvtojson) to
  convert csv file to json object.
- Write the csv file content to a new txt file. Use the following format:
  https://epa.ms/nodejs19-hw1-ex2.
- Do not load all the content of the csv file into RAM via stream (read/write
  file content line by line).
- In case of read/write errors, log them in the console.

The task could be started by <i>npm run task1.2</i>

### TASK 1.3

Rewrite the above-mentioned programs to use babel (https://babeljs.io/) and ES6
modules.

The task could be started by <i>npm run task1.3</i>

## Task 2

The task could be started by <i>npm run task2</i>

### TASK 2.1

Write a simple REST service withCRUD operations for User entity.

- To create REST service,use ExpressJS (https://expressjs.com/)
- Service should have the following CRUD operations for User:

  - get user by id;
  - create and update user;
  - get auto-suggest list from limitusers, sorted by login property and filtered
    by loginSubstringin the login property
  - remove user (soft delete–user gets marked with isDeletedflag, but not
    removed from the collection).

- Store user’scollection in the service memory (while the service is running).

### TASK 2.2

Add server-side validation for create/update operations of Userentity:

- all fields are required;
- login validationis required;
- password must contain letters and numbers;
- user’s age must be between 4 and 130.

In case of any property does not meet the validation requirements or the field
is absent, return 400 (Bad Request) and detailed error message. For requests
validation use special packages like joi.

## Task 3

There are two versions of task 3.

- To start version w/ express pls use

```shell
npm run start
```

- To start version w/ nestJs framework pls use

```shell
npm run task3_nest
```

### TASK 3.1

- Install DB PostgreSQL on your machine or use a free web hosting services for
  PostgreSQL (https://www.heroku.com/postgresor
  https://www.elephantsql.com/plans.html).
- Write SQL script which will create Users table in the DB and fillit in with
  predefined users’collection.
- Configure your REST service to work with PostgreSQL.
- Use the sequelize package(http://docs.sequelizejs.com/)as ORM to work with
  PostgreSQL. As an alternative to sequelizeyou can use more low-level
  query-builderlibrary(http://knexjs.org/).

### TASK 3.2

The service should adhere to 3-layer architecture principles
(https://softwareontheroad.com/ideal-nodejs-project-structure/) and contain the
following set of directories:

- routers/
- controllers/
- services/
- data-access/
- models/

## Task 4

### TASK 4.1

Add Groupentity to already existing REST service with CRUD operations:

- TheGroup entity should have the following properties(you can use UUIDas Group
  id)
- The service should provide the following CRUDoperations for Group:

  - get group by id;
  - get all groups;
  - create and update a group;
  - remove group (hard delete–group data is fully removed from the DB).

- Storing of groups data should be done in PostgreSQL in Groups table.
- The service should follow the principles of 3-layer architecture.

### TASK 4.2

Link User records in one table with Group records in another table.

- Add a UserGroup table(“many-to-many” relationship) which will store the data
  describing which users are assigned to which group.
- If any record gets removed from the DB, then all linked records should be
  removed from UserGroupas well.

### TASK 4.3

Add addUsersToGroup(groupId, userIds) method which will allow adding users to a
certain group. Use transactionsto save records in DB.

## Task 5

### TASK 5.1

Add express middlewarewhich will log which service method has been invoked and
which arguments have been passed to it.

### TASK 5.2

- Add express middlewarewhich will log all unhandled errors and return a
  standard message with HTTPcode 500(Internal Server Error).

  <i>Remark:</i> Do not modify the status code and the message for other errors
  like validation errors from the previous task.

- Add error handling to process.on(‘uncaughtException’,...).

- Add Unhandled promiserejection listener to log errors.

### TASK 5.3

Every method in the controllers should log the errors which should include the
following information:

- method name;
- arguments which have been passed to the method;
- error message.

## Task 6

### TASK 6.1

Add authorization to the already existing REST service:

- Add login(username, password) method which should return JWTtoken;
- Add a middleware which will proxy all the requests (except login) and check
  that HTTPAuthorizationheader has the correct value of JWTtoken;
- In case of the HTTPAuthorizationheader is absent in the request, the
  middleware should stop further controller method execution and return HTTP 401
  code (Unauthorized Error) and standard error message;
- In case of HTTPAuthorization header has invalid JWTtoken in the request, the
  middleware should return HTTP code 403 (Forbidden Error) and standard error
  message.

### TASK 6.2

Add CORS middleware to access service methods from WEB applications hosted on
another domains (https://github.com/expressjs/cors).
