import { Aggregate } from "mongoose";
import { User } from "./user.model";
import { Service } from "../../common/service.common";
import { IModel } from "../../common/mongoose-schema.common";
import { IUserDoc } from "./user.interface";

class UserService<TDoc> extends Service<TDoc> {
  constructor(Model: IModel<TDoc>) {
    super(Model);
  }

  // create extra service here if needed..
  sayHello(): Aggregate<TDoc[]> {
    return this.model.aggregate([{ $sort: { user_name: 1 } }]);
  }
}

const userService = new UserService<IUserDoc>(User);

export { userService };
