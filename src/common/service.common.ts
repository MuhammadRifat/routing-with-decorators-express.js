import mongoose, { Model, Types } from "mongoose";
import { IModel } from "./mongoose-schema.common";

interface IQueryPayload {
  query?: object;
  select?: object;
}
interface IIdPayload {
  _id: mongoose.Types.ObjectId;
  select?: object;
}

interface IArrayItemPayload {
  query: object;
  item: any;
  select?: object;
}

interface IUpdateByIdPayload extends IIdPayload {
  updateBody: object;
}
interface IUpdateByQueryPayload {
  query: object;
  updateBody: object;
  select?: object;
}

class Service<TDoc, TModel = IModel<TDoc>> {
  protected model: Model<any, any> & IModel<TDoc> & TModel;

  constructor(model: TModel) {
    this.model = <Model<any, any> & IModel<TDoc> & TModel>model;
  }

  // create a document
  createOne = <T>(body: T): Promise<TDoc> => {
    const newData = new this.model(body);

    return newData.save();
  };

  // get all documents by query
  findAllByQuery = ({ query = {}, select = {} }: IQueryPayload = {}): Promise<TDoc[]> => {
    return this.model.find(query).select(select).notDeleted();
  };

  // get one document by query
  findOneByQuery = ({
    query = {},
    select = {},
  }: IQueryPayload): Promise<TDoc> => {
    return this.model.findOne(query).select(select).notDeleted();
  };

  // get one document by id
  findOneById = ({ _id, select = {} }: IIdPayload): Promise<TDoc> => {
    return this.model.findById(_id).select(select).notDeleted();
  };

  // update document by id
  updateById = ({
    _id,
    updateBody,
    select = {},
  }: IUpdateByIdPayload): Promise<TDoc> => {
    return this.model
      .findByIdAndUpdate(
        _id,
        {
          $set: {
            ...updateBody,
          },
        },
        { new: true }
      )
      .select(select)
      .notDeleted();
  };

  // update documents by query
  updateByQuery = ({
    query,
    updateBody,
    select = {},
  }: IUpdateByQueryPayload): Promise<TDoc> => {
    return this.model
      .findOneAndUpdate(
        query,
        {
          $set: {
            ...updateBody,
          },
        },
        {
          new: true,
        }
      )
      .select(select)
      .notDeleted();
  };

  // delete document by id
  deleteById = (_id: mongoose.Types.ObjectId): Promise<TDoc> => {
    return this.model
      .findByIdAndUpdate(
        _id,
        {
          $set: {
            is_deleted: true,
          },
        },
        { new: true }
      )
      .notDeleted();
  };

  // push array item by query in the document
  pushArrayItemByQuery = ({
    query,
    item,
    select = {},
  }: IArrayItemPayload): Promise<TDoc> => {
    return this.model
      .findOneAndUpdate(
        query,
        {
          $push: item,
        },
        {
          new: true,
        }
      )
      .select(select)
      .notDeleted();
  };

  // remove array item by query in the document
  removeArrayItemByQuery = ({
    query,
    item,
    select = {},
  }: IArrayItemPayload): Promise<TDoc> => {
    return this.model
      .findOneAndUpdate(
        query,
        {
          $pull: item,
        },
        {
          new: true,
        }
      )
      .select(select)
      .notDeleted();
  };

  // soft deleting by _id
  softDeleteById = (_id: Types.ObjectId): Promise<TDoc> => {
    return this.model
      .findByIdAndUpdate(
        _id,
        {
          $set: {
            is_deleted: true,
          },
        },
        { new: true }
      )
      .notDeleted();
  };

  // soft deleting by query
  softDelete = (query: object): Promise<unknown> => {
    return this.model
      .updateMany(query, {
        $set: {
          is_deleted: true,
        },
      })
      .notDeleted();
  };

  // restore document by _id
  restoreById = (_id: Types.ObjectId): Promise<TDoc> => {
    return this.model
      .findByIdAndUpdate(
        _id,
        {
          $set: {
            is_deleted: false,
          },
        },
        { new: true }
      )
      .onlyDeleted();
  };

  // restore documents by query
  restore = (query: object): Promise<unknown> => {
    return this.model
      .updateMany(query, {
        $set: {
          is_deleted: false,
        },
      })
      .onlyDeleted();
  };

  // restore all documents
  restoreAll = (): Promise<unknown> => {
    return this.model.updateMany(
      { is_deleted: true },
      {
        $set: {
          is_deleted: false,
        },
      }
    );
  };

  // force delete by _id
  forceDeleteById = (_id: Types.ObjectId): Promise<TDoc> => {
    return this.model.findByIdAndDelete(_id, { new: true });
  };

  // force delete by _id
  forceDelete = (query: object): Promise<TDoc> => {
    return this.model.deleteMany(query, { new: true });
  };
}

export { Service };
