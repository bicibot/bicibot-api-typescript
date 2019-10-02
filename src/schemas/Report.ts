import { Document, Schema, Model, model } from "mongoose";
import { ReportInterface } from "../interfaces/Report";

export interface ReportModel extends ReportInterface, Document {}

const ReportSchema = new Schema(
  {
    email: String,
    firstName: String,
    lastName: String
  },
  {
    timestamps: true
  }
);

export const Report: Model<ReportModel> = model<ReportModel>(
  "Report",
  ReportSchema
);
