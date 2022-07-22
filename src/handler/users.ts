import { Router, Response, Request } from "express";
import { User, UserStore } from "../models/user";

const users: Router = Router();
const store = new UserStore();

const index = async (req: Request, res: Response) => {
  try {
    const users = await store.index();
    users ? res.json(users) : res.sendStatus(404);
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
    res.sendStatus(500);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const newUsers = [];
    const users = req.body;
    for (const user of users) {
      const newUser = await store.create(user);
      newUsers.push(newUser);
    }
    res.json(newUsers);
  } catch (err) {
    res.sendStatus(500);
  }
};

users.get("/", index).get("/:id", show).post("/", create);

export default users;
