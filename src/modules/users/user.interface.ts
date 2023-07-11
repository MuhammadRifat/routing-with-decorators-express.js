import { ICommon } from "../../common/interface.common";

interface IUser {
  name: string;
  email: string;
  role: string;
  password: string;
}

interface IUserDoc extends IUser, ICommon {}

export { IUser, IUserDoc };
