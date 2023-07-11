import { transformHandler } from "../../common/transformer.common";
import { IUserDoc } from "./user.interface";

// const userTransformer = (user: IUserDoc[] | IUserDoc) => transformHandler(user, (user: IUserDoc) => {
//     return {
//         _id: user._id,
//         email: user.email,
//         name: user.name,
//         role: user.role
//     }
// });

const userTransformer: any = (data: unknown) => {
  return transformHandler(data, (user: IUserDoc) => {
    return {
      _id: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
    };
  });
};

export { userTransformer };
