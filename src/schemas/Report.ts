import { Document, Schema, Model, model } from "mongoose";
import { ReportInterface } from "../interfaces/Report";

export interface ReportModel extends ReportInterface, Document {}

const ReportSchema = new Schema(
  {
    description: {
      type: String,
      trim: true,
      required: false
    },
    city: {
      type: String,
      required: true,
      enum: ["Recife", "São Paulo"],
      trim: true
    },
    report_type: {
      type: String,
      required: true,
      enum: ["Ameaça", "Manutenção", "Invasão", "Ciclofaixa apagada"],
      trim: true
    }
  },
  {
    timestamps: true
  }
);

export const Report: Model<ReportModel> = model<ReportModel>(
  "Report",
  ReportSchema
);
