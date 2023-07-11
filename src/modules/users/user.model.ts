import mongoose, {
  HydratedDocument,
  Model,
  model,
  QueryWithHelpers,
} from "mongoose";
import { IUser, IUserDoc } from "./user.interface";
import { IModel, MongooseSchema } from "../../common/mongoose-schema.common";

// user schema

const userSchema = new MongooseSchema<IUserDoc>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    default: "author",
  },
  password: {
    type: String,
    required: true,
  },
});

// create user model
const User = model<IUserDoc, IModel<IUserDoc>>("User", userSchema);

export { User };
