import { Router, Response, Request } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User, UserStore } from "../models/user";
import auth from "../middleware/auth";

const users: Router = Router();
const store = new UserStore();

const index = async (req: Request, res: Response) => {
  try {
    const users = await store.index();
    users.length > 0 ? res.json(users) : res.sendStatus(404);
  } catch (err) {
    res.sendStatus(500);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const user = await store.show(id);
    user ? res.json(user) : res.sendStatus(404);
  } catch (err) {
    res.sendStatus(400);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const newUsers = [];
    const users = req.body;
    for (const user of users) {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(user.password, salt);
      const userObject = {
        ...user,
        password: hash,
      };
      const newUser = await store.create(userObject);
      newUsers.push(newUser);
    }
    res.status(201).json(newUsers);
  } catch (err) {
    res.sendStatus(400);
  }
};

const authenticate = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await store.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string);
      res.json({ token });
    } else {
      res.sendStatus(401);
    }
  } catch (err) {
    res.sendStatus(400);
  }
};

users
  .get("/", auth, index)
  .get("/:id", auth, show)
  .post("/", auth, create)
  .post("/auth", authenticate);

export default users;
