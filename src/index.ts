import express, { Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import { MongooseError } from "mongoose";
import { UserModel } from "./model/Users";
const app = express();
app.use(express.json());
app.use(cors());
mongoose.connect(
  "mongodb+srv://olegbobokhidze:user123@cluster0.p4rmi7u.mongodb.net/?retryWrites=true&w=majority"
);
app.get("/getUsers", (req: Request, res: Response): void => {
  UserModel.find({}, (err: MongooseError, result: any): void => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});
app.delete("/users/:id", (req: Request, res: Response): void => {
  const id = req.params.id;
  UserModel.findByIdAndDelete(id, (err: MongooseError) => {
    if (err) {
      res.send(err);
    } else {
      res.send("Item deleted successfully");
    }
  });
});
app.put("/:id", (req: Request, res: Response) => {
  UserModel.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
    .then((user) => {
      res.json(user);
      console.log(user?.id);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});
app.post("/createUser", async (req, res) => {
  const user = req.body;
  console.log(user);
  const newUser = new UserModel(user);
  await newUser.save();
  res.json(user);
});
app.listen(process.env.CYCLIC_URL || 3010, (): void => {
  console.log("Server running on port 3001");
});
