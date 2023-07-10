import {
    HydratedDocument,
    Model,
    QueryWithHelpers,
    Schema,
    SchemaDefinition,
    SchemaDefinitionType,
    Types,
} from "mongoose";
import { ICommon } from "./interface.common";

// interface for query helpers
export interface IQueryHelpers<T> {
    notDeleted(): QueryWithHelpers<
        HydratedDocument<T>,
        HydratedDocument<T>,
        IQueryHelpers<T>
    >;
    onlyDeleted(): QueryWithHelpers<
        HydratedDocument<T>,
        HydratedDocument<T>,
        IQueryHelpers<T>
    >;
    withDeleted(): QueryWithHelpers<
        HydratedDocument<T>,
        HydratedDocument<T>,
        IQueryHelpers<T>
    >;
}

// interface for model
export interface IModel<
    IDoc,
    TQueryHelpers = IQueryHelpers<IDoc>,
    TInstanceMethods = {}
> extends Model<IDoc, TQueryHelpers, TInstanceMethods> {
    // softDeleteById(_id: Types.ObjectId): IDoc;
}

class MongooseSchema<
    IDoc,
    IInstanceMethods = {},
    QueryHelpers = {}
> extends Schema<
    IDoc,
    IModel<IDoc, QueryHelpers, IInstanceMethods>,
    IInstanceMethods,
    IQueryHelpers<IDoc> & QueryHelpers
> {
    constructor(schema: SchemaDefinition<SchemaDefinitionType<IDoc & ICommon>>) {
        // bind audit_trails in every schema
        schema.audit_trails = {
            created_at: Date,
            updated_at: Date,
            deleted_at: Date,
            created_by: String,
            updated_by: String,
            deleted_by: String,
            created_detail: String,
            updated_detail: String,
            deleted_detail: String,
            admin_note: String,
        };

        // bind is_deleted in every schema
        schema.is_deleted = {
            type: Boolean,
            default: false,
        };

        super(schema);
        this.bindSoftDeletingQueryHelpers();
        // this.bindSoftDeletingStaticMethods();
    }

    // bind query helpers for soft deleting
    bindSoftDeletingQueryHelpers() {
        // query helper for soft deleting
        this.query.notDeleted = function notDeleted(
            this: QueryWithHelpers<any, HydratedDocument<IDoc>, IQueryHelpers<IDoc>>
        ) {
            return this.where({ is_deleted: false });
        };

        // query helper for soft deleting
        this.query.onlyDeleted = function onlyDeleted(
            this: QueryWithHelpers<any, HydratedDocument<IDoc>, IQueryHelpers<IDoc>>
        ) {
            return this.where({ is_deleted: true });
        };

        // query helper for soft deleting
        this.query.withDeleted = function withDeleted(
            this: QueryWithHelpers<any, HydratedDocument<IDoc>, IQueryHelpers<IDoc>>
        ) {
            return this.where({ is_deleted: { $exists: true } });
        };
    }

    // bind statics methods for soft deleting
    bindSoftDeletingStaticMethods() {
        // soft delete by id
        // this.statics.softDeleteById = function (_id: Types.ObjectId) {
        //   return this.findOneAndUpdate(
        //     { _id, is_deleted: false },
        //     {
        //       $set: {
        //         is_deleted: true,
        //       },
        //     },
        //     { new: true },
        //   );
        // };
    }
}

export { MongooseSchema };
