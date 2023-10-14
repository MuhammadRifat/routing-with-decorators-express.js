import mongoose from "mongoose";

export interface RouteDefinition {
  path: string;
  requestMethod: 'get' | 'post' | 'delete' | 'options' | 'put' | 'patch';
  methodName: string;
}


interface IAuditTrail {
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
  created_by?: string;
  updated_by?: string;
  deleted_by?: string;
  created_detail?: string;
  updated_detail?: string;
  deleted_detail?: string;
  admin_note?: string;
}

interface ICommon {
  _id: mongoose.Types.ObjectId;
  is_deleted: boolean;
  audit_trails: IAuditTrail;
}

export { ICommon, IAuditTrail };
