import express from 'express';
import { v1 as uuid } from 'uuid';

type User = {
  id: string;
  login: string;
  password: string;
  age: number;
  isDeleted: boolean;
};

const users: Array<User> = [];

function getAutoSuggestUsers(
  loginSubstring: string,
  limit: number
): Array<User> {
  return users
    .filter(user => !user.isDeleted && user.login.includes(loginSubstring))
    .sort((a, b) => a.login.localeCompare(b.login))
    .slice(0, limit);
}

const app = express();
app.listen(3000, () => {
  console.info('Server is started');
});
app.use(express.json());

// get user by id
app.get('/users/:id', (req, res) => {
  const user = users.find((user: User) => user.id === req.params.id);
  if (!user) {
    res.status(404).json({ mesage: 'User not found' });
  }
  res.json(user);
});

// create user
app.post('/users', (req, res) => {
  const user: User = req.body;
  user.id = uuid();
  user.isDeleted = false;
  users.push(user);

  res.location('/users/' + user.id);
  res.status(201).json(user);
});

// update user
app.put('/users/:id', (req, res) => {
  const id = req.params.id;
  let user = users.find(user => user.id === id);

  if (!user) {
    res.status(404).send('User is not found');
  } else {
    user.login = req.body.login || user.login;
    user.password = req.body.password || user.password;
    user.age = req.body.age || user.age;

    res.json(user);
  }
});

// get user list by limit (number of users) and loginSubstring
app.get('/users', (req, res) => {
  const { loginSubstring = '', limit = users.length } = req.query;
  const list = getAutoSuggestUsers(loginSubstring, limit);
  if (!list || list.length === 0) {
    res.status(404).json({ mesage: 'There no users for this request' });
  } else {
    res.send(list);
  }
});

// remove user
app.delete('/users/:id', (req, res) => {
  const id = req.params.id;
  let user = users.find(user => user.id === id);

  if (!user || user.isDeleted) {
    res.status(404).send('User is not found');
  } else {
    user.isDeleted = true;
    res.json(user);
  }
});
