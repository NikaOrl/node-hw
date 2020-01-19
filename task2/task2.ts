import express, { NextFunction, Response, Request } from 'express';
import { v1 as uuid } from 'uuid';
import Joi from '@hapi/joi';

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
    .filter(
      (user: User) => !user.isDeleted && user.login.includes(loginSubstring)
    )
    .sort((a: User, b: User) => a.login.localeCompare(b.login))
    .slice(0, limit);
}

const schema: Joi.Schema = Joi.object({
  login: Joi.string().required(),
  password: Joi.string()
    .pattern(new RegExp('^(?=.*[A-Za-z])(?=.*[0-9])[A-Za-z0-9]{2,}$'))
    .required(),
  age: Joi.number()
    .integer()
    .min(4)
    .max(130)
    .required()
});

function validateUser() {
  return (req: Request, res: Response, next: NextFunction): boolean | void => {
    const { error } = schema.validate(req.body);

    if (error && error.isJoi) {
      res.status(400).json(error.message);
      return false;
    }
    next();
  };
}

const app: express.Application = express();
app.listen(3000, () => {
  console.info('Server is started');
});
app.use(express.json());

// get user by id
app.get('/users/:id', (req: Request, res: Response) => {
  const user: User | undefined = users.find(
    (u: User) => u.id === req.params.id
  );
  if (!user) {
    res.status(404).json({ mesage: 'User not found' });
  }
  res.json(user);
});

// create user
app.post('/users', validateUser(), (req: Request, res: Response) => {
  const user: User = req.body;
  user.id = uuid();
  user.isDeleted = false;
  users.push(user);

  res.location(`/users/${user.id}`);
  res.status(201).json(user);
});

// update user
app.put('/users/:id', validateUser(), (req: Request, res: Response) => {
  const id: string = req.params.id;
  const user: User | undefined = users.find((u: User) => u.id === id);

  if (!user) {
    res.status(404).send('User is not found');
  } else {
    user.login = req.body.login;
    user.password = req.body.password;
    user.age = req.body.age;

    res.json(user);
  }
});

// get user list by limit (number of users) and loginSubstring
app.get('/users', (req: Request, res: Response) => {
  const { loginSubstring = '', limit = users.length } = req.query;
  const list: User[] = getAutoSuggestUsers(loginSubstring, limit);
  if (!list || list.length === 0) {
    res.status(404).json({ mesage: 'There no users for this request' });
  } else {
    res.send(list);
  }
});

// remove user
app.delete('/users/:id', (req: Request, res: Response) => {
  const id: string = req.params.id;
  const user: User | undefined = users.find((u: User) => u.id === id);

  if (!user || user.isDeleted) {
    res.status(404).send('User is not found');
  } else {
    user.isDeleted = true;
    res.json(user);
  }
});
